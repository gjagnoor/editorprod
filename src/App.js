/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React from 'react';
import logo from './logo.png';
import {connect} from 'react-redux';
import {fetchUserAsync, logoutAsync} from './features/user/userSlice.js';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Navigation from './features/navbar/Navigation.js';
import './App.css';

function App({user, logout, fetchUser}) {
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      <Navigation />
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <Fab variant="extended" style={{position: 'fixed', bottom: '1em', left: '1em'}} href="#">
        <NavigationIcon sx={{mr: 1}} />
        Navigate
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAsync()),
    fetchUser: () => dispatch(fetchUserAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
