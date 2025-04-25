'use client';

import React, { useState, useEffect } from 'react';
import UserList from './UserList'; // Import UserList component
import UserProfile from './UserProfile'; // Import UserProfile component
import UserForm from './UserForm'; // Import UserForm component
import EditUserForm from './EditUserForm'; // Import EditUserForm component
import ThemeToggle from './ThemeToggle'; // Import ThemeToggle button

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  avatar: string | null;
}
interface UserDashboardProps {
  onAddUser: (user: User) => void; // Add prop type
}

const UserDashboard: React.FC<UserDashboardProps> = ({onAddUser}) => {
  const [users, setUsers] = useState<User[]>([]); // State to manage users temporarily
  const [selectedUser, setSelectedUser] = useState<User | null>(null);  // State to hold the selected user for the profile
  const [isEditing, setIsEditing] = useState(false);  // State to toggle between profile and editing form
  const [isFormVisible, setIsFormVisible] = useState(false);  // State to toggle the form visibility

  useEffect(() => {
  const defaultUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'Administrator',
      isActive: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: 'User',
      isActive: false,
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      role: 'Moderator',
      isActive: true,
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      role: 'Administrator',
      isActive: true,
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      role: 'User',
      isActive: false,
    },
    {
      id: '6',
      name: 'Saraah Brown',
      email: 'sarah.brown@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      role: 'User',
      isActive: true,
    },
  ];

  // Load users from localStorage when the component mounts
  
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(defaultUsers);  // Set default users if nothing is in localStorage
    }
  }, []);

  const handleAddUser = (newUser: User) => {
      onAddUser(newUser); // Use onAddUser prop
      setIsFormVisible(false);

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers); // Update the state to show the new user in the list

    // Persist the updated list to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setIsFormVisible(false); // Close the form after adding the user
  };

  const handleCancelForm = () => {
    setIsFormVisible(false); // Close the form without saving any user
  };

  const handleEditUser = () => {
    setIsEditing(true); // Set editing state to true to show the edit form
  };

  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers); // Update the users list with the updated user

    // Persist the updated list to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setIsEditing(false); // Close the edit form
    setSelectedUser(updatedUser); // Set the updated user as the selected user
  };

  const handleBackToList = () => {
    setIsEditing(false); // Go back to the list view
    setSelectedUser(null); // Clear selected user to show the user list
  };

  const handleViewProfile = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setSelectedUser(user); // Set the selected user to display the profile
    }
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers); // Update the state to remove the user from the list

    // Persist the updated list to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setSelectedUser(null); // Clear the selected user after deletion
  };

  return (
    <div className="min-h-screen page1 flex flex-col gap-4 bg-[lightblue] dark:bg-black">
      <header className="max-[430px]:mb-0 flex justify-between items-center">
        <h1 className="sec1 text-4xl font-bold text-blue-500">
          User Management Interface
        </h1>
        <ThemeToggle /> {/* Add the theme toggle button */}
      </header>

      <div className="card1">
        {isEditing ? (
          <EditUserForm
            user={selectedUser!} // Pass selectedUser to EditUserForm
            onUpdate={handleUpdateUser}
            onCancel={handleBackToList} // Pass handleBackToList to return to the list
          />
        ) : selectedUser ? (
          <UserProfile
            user={selectedUser}
            onEdit={handleEditUser} // Show the Edit button
            onBack={handleBackToList}
            onDelete={handleDeleteUser} // Pass handleDeleteUser to delete the user
          />
        ) : isFormVisible ? (
          <UserForm onSubmit={handleAddUser} onCancel={handleCancelForm} />
        ) : (
          <UserList
            users={users}
            onViewProfile={handleViewProfile} // Pass handleViewProfile to display the profile
            onAddUser={handleAddUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
