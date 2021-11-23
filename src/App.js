/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React from 'react';
import logo from './logo.png';
import {connect} from 'react-redux';
import {fetchUserAsync, logoutAsync} from './features/user/userSlice.js';
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
