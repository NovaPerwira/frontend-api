import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();

  // Mock NFT orders data
  const orders = [
    {
      id: '12345',
      date: '2024-01-15',
      status: 'completed',
      total: 12.99,
      items: [
        {
          name: 'Cyber Punk Jacket',
          image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 2.5,
          quantity: 1
        },
        {
          name: 'Golden Crown NFT',
          image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 5.8,
          quantity: 1
        }
      ]
    },
    {
      id: '12344',
      date: '2024-01-10',
      status: 'minting',
      total: 15.8,
      items: [
        {
          name: 'Quantum Phone NFT',
          image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 15.8,
          quantity: 1
        }
      ]
    },
    {
      id: '12343',
      date: '2024-01-05',
      status: 'pending',
      total: 8.5,
      items: [
        {
          name: 'Ethereum Ring',
          image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=100',
          price: 8.5,
          quantity: 1
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'minting':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'minting':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to view your NFT collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My NFT Collection</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-purple-100">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Transaction #{order.id}</h3>
                      <p className="text-sm text-gray-500">Purchased on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{order.total.toFixed(2)} ETH</p>
                    <p className="text-sm text-gray-500">{order.items.length} NFT{order.items.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{item.price.toFixed(2)} ETH</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {order.status === 'completed' && (
                    <>
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        View in Wallet
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        Share Collection
                      </button>
                    </>
                  )}
                  {order.status === 'minting' && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      Track Minting
                    </button>
                  )}
                  {order.status === 'pending' && (
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      Cancel Order
                    </button>
                  )}
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No NFTs yet</h3>
            <p className="text-gray-600 mb-6">Start collecting unique digital assets</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Explore NFTs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;