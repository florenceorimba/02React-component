// src/app/page.tsx
'use client'; 

import React, { useState, useEffect } from 'react';
import UserDashboard from './components/UserDashboard'; // Import UserDashboard component

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  avatar: string;
}

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const handleAddUser = (newUser: User) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <UserDashboard /> {/* Render UserDashboard */}
    </div>
  );
};

export default HomePage;
