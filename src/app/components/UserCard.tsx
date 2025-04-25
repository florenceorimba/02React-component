// components/UserCard.tsx
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

interface UserCardProps {
  user: User;
  onViewProfile: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewProfile }) => {
  return (
    <div className="mainp flex sm:flex-col lg:flex-row max-sm:flex-col items-center gap-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 bg-amber-200 dark:bg-gray-800">
      <Image 
      src={user.avatar || 'https://randomuser.me/api/portraits/men/5.jpg'}
      alt={`${user.name}'s avatar`}
      width={40}
      height={40} className="w-[40px] h-[40px] rounded-full" />
      <div className="flex flex-col w-[180px]">
        <h3 className="name text-lg font-semibold text-blue-500">{user.name}</h3>

        <div className='flex flex-col w-[150px]'>
        <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <p className="text-sm text-gray-500">{user.role}</p>
        <span
          className={`mt-2 inline-block text-xs font-semibold ${
            user.isActive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className='items-center p-2 mx-4 flex'>
      <button
        onClick={() => {
          console.log(`Viewing profile of user with ID: ${user.id}`); // Debugging line
          onViewProfile(user.id); // Calling the function passed via props
        }}
        className="ml-auto px-4 py-2 text-white bg-blue-500 rounded-3xl hover:bg-blue-600 transition-colors duration-300"
      >
        View Profile
      </button>
      </div>
    </div>
  );
};

export default UserCard;
