import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-indigo-700">TaskFlow</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer transition-colors">
              Dashboard
            </li>
            <li className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer transition-colors">
              My Tasks
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
