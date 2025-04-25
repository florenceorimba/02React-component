// src/components/UserProfile.tsx

'use client';

import React from 'react';
import Image from 'next/image';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  isActive: boolean;
}

interface UserProfileProps {
  user: User;
  onEdit: () => void;  // Function to handle editing
  onBack: () => void;  // Function to go back to the list
  onDelete: (userId: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit, onBack, onDelete }) => {
  const handleDelete = () => {
    onDelete(user.id); // Pass only the user ID to the delete function
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <Image 
        src={user.avatar || 'https://randomuser.me/api/portraits/women/6.jpg'} 
        alt={user.name}
        width={40}
        height={40}
        className="rounded-full w-32 h-32 mx-auto" />
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Name: {user.name}</p>
        <p className="text-lg">Email: {user.email}</p>
        <p className="text-lg">Role: {user.role}</p>
        <p className="text-lg">Status: {user.isActive ? 'Active' : 'Inactive'}</p>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Edit
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Back to List
        </button>
        <button
          onClick={handleDelete} // Trigger the delete function
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
