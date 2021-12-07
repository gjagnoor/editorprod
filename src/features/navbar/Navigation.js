/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {connect} from 'react-redux';
import {fetchUserAsync, logoutAsync} from '../user/userSlice.js';
import {Navbar, Alignment, AnchorButton} from '@blueprintjs/core';
import User from '../user/User.js';

function Navigation({user, logout, fetchUser}) {
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Navbar id='navbar'>
      {
          window.location.pathname !== '/' ?
      <Navbar.Group align={Alignment.LEFT}>
        <h2 className='app-heading'> EDITOR </h2>
        <Navbar.Divider />
        <AnchorButton
          role="button"
          icon="home"
          href="/"
          className='bp3-minimal'
          style={{color: 'white'}}
        >
                    Home
        </AnchorButton>
      </Navbar.Group>: null
      }
      <Navbar.Group align={Alignment.RIGHT}>
        <Navbar.Divider />
        <User />
      </Navbar.Group>
    </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
