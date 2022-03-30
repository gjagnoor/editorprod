/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {connect} from 'react-redux';
import {fetchUserAsync, logoutAsync} from './userSlice.js';

function User({user, logout, fetchUser}) {
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  console.log(user);
  return (
    <div>
      {user.info ? (
          <a
            className="bp3-button bp3-icon-log-out bp3-minimal"
            onClick={logout}
            href={process.env.NODE_ENV === 'development' ?
                        `http://localhost:3000` :
            `https://editorprod.herokuapp.com`}
            style={{color: 'white'}}
          >
            Logout
          </a>
      ) : (
          <a
            className='bp3-button bp3-icon-log-in bp3-minimal'
            href={
                    process.env.NODE_ENV === 'development' ?
                        `http://localhost:8000/api/github` :
              `https://editorprod.herokuapp.com/api/github`
            }
            style={{color: 'white'}}
          >
            Login
          </a>
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
