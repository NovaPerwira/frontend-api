import React from 'react';
import { User, Mail, Phone, MapPin, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-6">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-blue-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                    <Edit2 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">123 Main St, City, State 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                
                <div className="space-y-4">
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <h3 className="font-medium text-gray-900 mb-1">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                  </button>
                  
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <h3 className="font-medium text-gray-900 mb-1">Email Preferences</h3>
                    <p className="text-sm text-gray-500">Manage your email notification settings</p>
                  </button>
                  
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <h3 className="font-medium text-gray-900 mb-1">Privacy Settings</h3>
                    <p className="text-sm text-gray-500">Control your privacy and data sharing preferences</p>
                  </button>
                  
                  <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200">
                    <h3 className="font-medium text-red-600 mb-1">Delete Account</h3>
                    <p className="text-sm text-red-500">Permanently delete your account and all data</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;