/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {connect} from 'react-redux';
import {fetchUserAsync, logoutAsync} from './userSlice.js';
import {AnchorButton} from '@blueprintjs/core';
import {Link} from 'react-router-dom';

function User({user, logout, fetchUser}) {
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  console.log(user);
  return (
    <div>
      {user.info ? (
        <Link to='/'>
          <AnchorButton icon="log-out" text="Logout" onClick={logout} href={process.env.NODE_ENV === 'development' ?
                        `http://localhost:3000` :
            `https://editorprod.herokuapp.com`}
          className='bp3-minimal'
          style={{color: 'white'}}
          />
        </Link>
            ) : (
              <AnchorButton icon="log-in" text="Login" href={
                    process.env.NODE_ENV === 'development' ?
                        `http://localhost:7000/api/github` :
              `https://editorprod.herokuapp.com/api/github`
              }
              className='bp3-minimal'
              style={{color: 'white'}}
              />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
