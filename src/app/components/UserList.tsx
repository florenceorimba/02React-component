'use client';

import React, { useState } from 'react';
import UserCard from './UserCard'; // Import UserCard component
import UserForm from './UserForm';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  isActive: boolean;
}

interface UserListProps {
  users: User[];
  onViewProfile: (userId: string) => void;
  onAddUser: (newUser: User) => void; // Function to add a new user to the list
}

const UserList: React.FC<UserListProps> = ({ users, onViewProfile, onAddUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Filter the users based on search and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filter === 'all' ||
      (filter === 'active' && user.isActive) ||
      (filter === 'inactive' && !user.isActive);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col mb-4 gap-4">
        <div className="flex justify-between items-center lg:flex-row sm:flex-col max-[430px]:flex-col max-[1034px]:flex-row md:flex-row">
          <input
            type="text"
            className="px-4 py-2 border rounded-lg bg-white w-[400px] max-[430px]:w-[300px]"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className=" px-4 py-2 border rounded-lg"
            aria-label="Filter users by status"
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
          </select>

          {/* Add User Link Button */}
          <button
            onClick={() => setIsFormVisible(true)} // Show the modal when clicked
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
        <p className="text-sm text-gray-500 px-4">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found.
        </p>
      </div>

      <div className="card1 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 bg-amber-100 dark:bg-gray-800 rounded-2xl items-center">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} onViewProfile={() => onViewProfile(user.id)} />
        ))}
      </div>

      {/* Modal for the UserForm */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-custom z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <UserForm
              onSubmit={(newUser) => {
                onAddUser(newUser); // Add new user to the list
                setIsFormVisible(false); // Close the form after adding
              }}
              onCancel={() => setIsFormVisible(false)} // Close the form without adding
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
