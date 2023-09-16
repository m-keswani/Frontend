// Layout.js
import React from 'react';
import Head from '../Main/Head';
const Layout = ({ children }) => {
  return (
    <div>
      
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
