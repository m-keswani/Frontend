import React, { useState } from 'react';
import './sidebar.css'; // Import your custom CSS file
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <div className={`bar ${isOpen ? 'bar1' : ''}`} />
        <div className={`bar ${isOpen ? 'bar2' : ''}`} />
        <div className={`bar ${isOpen ? 'bar3' : ''}`} />
      </div>
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/adduser">User</Link></li>
        <li>Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;