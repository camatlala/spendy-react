import React, { useState } from 'react';

const NavBar = () => {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const handleNavLinkClick = (itemName) => {
    setActiveLink(itemName);
  };

  const navItems = ['Dashboard'];

  return (
    <div className="bg-gray-900">
      <br />
      <br />

      <div className="flex flex-row pointer-events-auto absolute inset-y-10 right-10 gap-4 bg-gray-800 w-80 h-20 justify-evenly items-center rounded-full px-4">
        {navItems.map((item) => (
          <div
            key={item}
            onClick={() => handleNavLinkClick(item)}
            className={`
              cursor-pointer
              ${
                activeLink === item
                  ? 'bg-amber-900 text-gray-900 ring-indigo-200 dark:bg-white dark:text-gray-800 dark:ring-indigo-900'
                  : 'bg-gray-800 hover:bg-white text-white hover:text-gray-700'
              }
              flex items-center justify-evenly w-60 h-15 rounded-full transition
            `}
          >
            {item}
          </div>
        ))}

        {/* Sign Out Button Styled Like a Nav Item */}
        <button
          onClick={() => {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            window.location.href = '/'; // You could use useNavigate here if this becomes a component with router context
          }}
          className="flex items-center justify-evenly w-40 h-15 rounded-full bg-gray-800 text-white hover:text-red-400 hover:bg-white transition cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
