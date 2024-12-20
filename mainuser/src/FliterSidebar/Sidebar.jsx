import React, { useState } from 'react';
import './Sidebar.css';
import { RiFilter2Line } from 'react-icons/ri';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { TfiClose } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ applyFilters }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Define the filter options
  const menuOptions = [
    { text: 'Color', filterType: 'color', options: ['Red', 'Blue', 'Green', 'Yellow'] },
    { text: 'Size', filterType: 'size', options: ['Small', 'Medium', 'Large', 'XL'] },
    { text: 'Price Range', filterType: 'price', options: ['Cheap', 'Affordable', 'Expensive'] },
  ];

  const handleFilterClick = (filterType, option) => {
    // Update the URL query parameters with the selected filter
    const queryParams = new URLSearchParams(location.search);
    queryParams.set(filterType, option);
    navigate(`?${queryParams.toString()}`);
    setOpenMenu(false);

    // Apply filters by calling the applyFilters function
    applyFilters(queryParams);
  };

  return (
    <div className="navbar-mean">
      <div className="navbar-menu-container">
        <RiFilter2Line onClick={() => setOpenMenu(true)} />
        <p>
          <strong>Filter</strong>
        </p>
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="left">
        <div style={{ textAlign: 'right', padding: '10px' }}>
          <TfiClose onClick={() => setOpenMenu(false)} />
        </div>
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
                <List>
                  {item.options.map((option) => (
                    <ListItem
                      key={option}
                      button
                      onClick={() => handleFilterClick(item.filterType, option)}
                    >
                      <ListItemText primary={option} />
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </div>
  );
};

export default Sidebar;
