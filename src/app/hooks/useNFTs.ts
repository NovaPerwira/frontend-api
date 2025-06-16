import { useState, useEffect } from 'react';
import { apiService, NFT } from '../services/api';

export const useNFTs = () => {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const response = await apiService.getNFTs();
        if (response.success && response.data) {
          setNFTs(response.data);
        } else {
          setError(response.error || 'Failed to fetch NFTs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return { nfts, loading, error, refetch: () => fetchNFTs() };
};

export const useNFTsByCategory = (categoryId: number | null) => {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (categoryId === null) return;
      
      try {
        setLoading(true);
        const response = await apiService.getNFTsByCategory(categoryId);
        if (response.success && response.data) {
          setNFTs(response.data);
        } else {
          setError(response.error || 'Failed to fetch NFTs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [categoryId]);

  return { nfts, loading, error };
};

export const useNFT = (id: number | null) => {
  const [nft, setNFT] = useState<NFT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFT = async () => {
      if (id === null) return;
      
      try {
        setLoading(true);
        const response = await apiService.getNFTById(id);
        if (response.success && response.data) {
          setNFT(response.data);
        } else {
          setError(response.error || 'NFT not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [id]);

  return { nft, loading, error };
};