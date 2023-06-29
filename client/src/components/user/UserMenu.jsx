import { Dashboard, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../../hooks/useCheckToken';
import Profile from './Profile';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {!currentUser.google && (
          <MenuItem
            onClick={() =>
              dispatch({
                type: 'UPDATE_PROFILE',
                payload: {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              })
            }
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        )}
        <MenuItem onClick={() => navigate('dashboard')}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;