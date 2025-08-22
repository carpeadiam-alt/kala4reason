"use client"
import { useState, useEffect } from 'react';
import { User, Edit2, Save, X, Phone, Mail, MapPin } from 'lucide-react';
import Image from "next/image";

// TODO: Replace with your actual API base URL
const API_BASE_URL = 'https://thecodeworks.in/kala';

// TODO: This is a dummy profile data structure
// When integrating with real backend, this should match your API response format
const DUMMY_PROFILE_DATA = {
  email: 'user@example.com',
  first_name: 'Arjun',
  last_name: 'Sharma',
  phone: '+91 9876543210',
  age: '28',
  state: 'Karnataka',
  address: '123 MG Road, Bengaluru, Karnataka 560001'
};

function ProfilePage() {
  // State management for profile data
  const [profileData, setProfileData] = useState(DUMMY_PROFILE_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(DUMMY_PROFILE_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // TODO: Replace this with actual API call to fetch user profile
  // Expected API endpoint: GET /api/get_profile
  // Expected response format: { email, first_name, last_name, phone, age, state, address }
  const fetchProfileData = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Uncomment and modify when real API is ready
      /*
      const response = await fetch(`${API_BASE_URL}/api/get_profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // For session-based auth
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setProfileData(data);
      setEditedData(data);
      */
      
      // Using dummy data for now
      setTimeout(() => {
        setProfileData(DUMMY_PROFILE_DATA);
        setEditedData(DUMMY_PROFILE_DATA);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
      setIsLoading(false);
    }
  };

  // TODO: Replace this with actual API call to update user profile
  // Expected API endpoint: POST/PUT /api/update_profile
  // Expected request body: { first_name, last_name, phone, age, state, address }
  const updateProfileData = async () => {
    setIsLoading(true);
    setError('');
    setSaveSuccess(false);
    
    try {
      // TODO: Uncomment and modify when real API is ready
      /*
      const response = await fetch(`${API_BASE_URL}/api/update_profile`, {
        method: 'POST', // or 'PUT' depending on your API design
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // For session-based auth
        body: JSON.stringify({
          first_name: editedData.first_name,
          last_name: editedData.last_name,
          phone: editedData.phone,
          age: editedData.age,
          state: editedData.state,
          address: editedData.address
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      */
      
      // Simulating API call with dummy data
      setTimeout(() => {
        setProfileData(editedData);
        setIsEditing(false);
        setSaveSuccess(true);
        setIsLoading(false);
        
        // Hide success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
      }, 1000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
      setIsLoading(false);
    }
  };

  // Load profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Handle input changes in edit mode
  const handleInputChange = (field: keyof typeof profileData, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Cancel editing and revert changes
  const handleCancelEdit = () => {
    setEditedData(profileData);
    setIsEditing(false);
    setError('');
  };

  // Save changes
  const handleSaveChanges = () => {
    // Basic validation
    if (!editedData.first_name.trim() || !editedData.last_name.trim()) {
      setError('First name and last name are required');
      return;
    }
    
    if (editedData.phone && !/^\+?\d{10,15}$/.test(editedData.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number');
      return;
    }
    
    updateProfileData();
  };

  if (isLoading && !profileData.email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-100 to-green-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <span className="text-gray-700">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-100 to-green-100" style={{ backgroundColor: "#ECFF72" }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-full px-6 py-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Image
                src="/logo.svg"
                alt="Kalarasa logo"
                width={48}
                height={48}
                className="w-48 h-10"
                />
            </div>
            <button
                onClick={() => {
                // Clear localStorage and redirect to login
                localStorage.removeItem('user_id');
                localStorage.removeItem('user_email');
                localStorage.removeItem('is_logged_in');
                localStorage.removeItem('google_user');
                window.location.href = '/login'; // or use router.push('/') if you have useRouter
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 text-sm font-medium transition-colors cursor-pointer mr-8"
            >
                Sign Out
                <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
            </button>
            </div>
        </div>
        </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-yellow-300 to-green-300 px-8 py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-red-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">
                    {profileData.first_name} {profileData.last_name}
                  </h2>
                  <p className="text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {profileData.email}
                  </p>
                </div>
              </div>
              
              {!isEditing ? (
                <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 text-lg font-medium transition-colors cursor-pointer mr-4"
                >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancelEdit}
                    disabled={isLoading}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mx-8 mt-6">
              <p className="text-green-700 text-sm">✅ Profile updated successfully!</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-8 mt-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Profile Details */}
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter first name"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.first_name || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter last name"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.last_name || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.phone || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter age"
                    min="1"
                    max="120"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.age || 'Not provided'}
                  </div>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter state"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.state || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editedData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="Enter full address"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 min-h-[80px]">
                    {profileData.address || 'Not provided'}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Account Information</h4>
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Email:</strong> {profileData.email}
                </p>
                <p className="text-xs text-gray-500">
                  Email address cannot be changed. Contact support if you need to update your email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;