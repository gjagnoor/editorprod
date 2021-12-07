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
        <Navbar.Heading> EDITOR </Navbar.Heading>
        <Navbar.Divider />
        <AnchorButton
          className="bp3-button bp3-minimal"
          role="button"
          icon="home"
          href="/"
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
