const API_BASE_URL = 'http://backend-api.test:8080/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface Category {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface NFT {
  id: number;
  title: string;
  price: number;
  image: string;
  category_id: number;
  description?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Categories API
  async getCategories(limit?: number, page?: number): Promise<ApiResponse<Category[]>> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (page) params.append('page', page.toString());
    
    const queryString = params.toString();
    return this.request<Category[]>(`/categories${queryString ? `?${queryString}` : ''}`);
  }

  async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
    return this.request<Category>(`/categories?slug=${slug}`);
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<ApiResponse<Category>> {
    return this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
  }

  async updateCategory(category: Category): Promise<ApiResponse<Category>> {
    return this.request<Category>('/categories', {
      method: 'PUT',
      body: JSON.stringify(category),
    });
  }

  async deleteCategory(slug: string): Promise<ApiResponse<void>> {
    return this.request<void>('/categories', {
      method: 'DELETE',
      body: JSON.stringify({ slug }),
    });
  }

  // NFTs API
  async getNFTs(): Promise<ApiResponse<NFT[]>> {
    return this.request<NFT[]>('/nfts');
  }

  async getNFTById(id: number): Promise<ApiResponse<NFT>> {
    return this.request<NFT>(`/nfts?id=${id}`);
  }

  async getNFTsByCategory(categoryId: number): Promise<ApiResponse<NFT[]>> {
    const response = await this.getNFTs();
    if (response.success && response.data) {
      const filteredNFTs = response.data.filter(nft => nft.category_id === categoryId);
      return {
        success: true,
        data: filteredNFTs
      };
    }
    return response;
  }

  async createNFT(nft: Omit<NFT, 'id'>): Promise<ApiResponse<NFT>> {
    return this.request<NFT>('/nfts', {
      method: 'POST',
      body: JSON.stringify(nft),
    });
  }

  async updateNFT(nft: NFT): Promise<ApiResponse<void>> {
    return this.request<void>('/nfts', {
      method: 'PUT',
      body: JSON.stringify(nft),
    });
  }

  async deleteNFT(id: number): Promise<ApiResponse<void>> {
    return this.request<void>('/nfts', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  }
}

export const apiService = new ApiService();