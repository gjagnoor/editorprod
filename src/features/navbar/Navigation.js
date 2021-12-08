/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {connect} from 'react-redux';
import {fetchUserAsync, logoutAsync} from '../user/userSlice.js';
import {Navbar, Alignment} from '@blueprintjs/core';
import User from '../user/User.js';

function Navigation({user}) {
  return (
    <Navbar id='navbar'>
      {
          window.location.pathname !== '/' ?
      <Navbar.Group align={Alignment.LEFT}>
        <h2 className='app-heading'> EDITOR </h2>
        <Navbar.Divider />
        <a
          className='bp3-button bp3-icon-home bp3-minimal'
          style={{color: 'white'}}
          href='/'
        >
            Home
        </a>
      </Navbar.Group> : null
      }
      <Navbar.Group align={Alignment.RIGHT}>
        {
          user ?
            <a
              className='bp3-button bp3-icon-code bp3-minimal'
              style={{color: 'white'}}
              href='/editor'
            >
              Editor
            </a> :
               null
        }
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
