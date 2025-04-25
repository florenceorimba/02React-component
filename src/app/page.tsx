// src/app/page.tsx
'use client'; 

import React, { useState, useEffect } from 'react';
import UserDashboard from './components/UserDashboard'; // Import UserDashboard component

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const handleAddUser = (newUser: any) => {
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
