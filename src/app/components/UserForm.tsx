// src/components/UserForm.tsx
'use client'; // Mark this as a client-side component

import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  isActive: boolean;
}
interface UserFormProps {
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in all required fields');
      return;
    }

    const newUser = {
      id: `${Date.now()}`,  // Generate a unique ID based on the current timestamp
      name,
      email,
      role,
      avatar: null,
      isActive,
    };

    onSubmit(newUser);  // Call onSubmit with the new user
  };

  return (
    <div className="p-6 bg-[lightblue] rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-2xl font-semibold">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-2xl font-semibold">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-2xl font-semibold">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
          </select>
        </div>

        <div>
          <label htmlFor="isActive" className="block text-2xl font-semibold">Active</label>
          <input
            id="isActive"
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="mt-1"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white h-14 w-[100px] rounded-lg hover:bg-blue-600 text-[18px]"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white h-14 w-[100px] rounded-lg hover:bg-gray-600 text-[18px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
