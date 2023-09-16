import React from 'react';
import './User.css'; // Import the CSS for styling

const AdminPanel = () => {
  
  return (
    <div className="admin-panel">
      <div className="header">Admin User Panel</div>
      <div className="form-container">
        <form>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" />
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
