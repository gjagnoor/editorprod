/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import {connect} from 'react-redux';
import {fetchUserAsync, logoutAsync} from './userSlice.js';
import {AnchorButton, Button} from '@blueprintjs/core';

function User({user, logout, fetchUser}) {
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      {user.info.id ? (
            <Button className="bp3-minimal" icon="log-out" text="Logout" onClick={logout} />
            ) : (
              <AnchorButton className="bp3-minimal" icon="log-in" text="Login" href={
                    process.env.NODE_ENV === 'development' ?
                        'http://localhost:7000/api/google' :
                        `https://codebasev1.herokuapp.com/api/google`
              } />
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
