// components/ThemeToggle.tsx
'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext'; // Import the useTheme hook

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function

  return (
    <button
      onClick={toggleTheme}
      className="toggle p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-blue-700 dark:text-gray-400"
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ThemeToggle;
