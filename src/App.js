/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {fetchUserAsync} from './features/user/userSlice.js';
import {fetchProjectsAsync} from './features/editor/projectSlice.js';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Navigation from './features/navbar/Navigation.js';
import './App.css';
import Home from './Home.js';
import Editor from './features/editor/Editor.js';

function App({user, fetchUser, loadAllProjects}) {
  React.useEffect(() => {
    fetchUser();
    loadAllProjects();
  }, [fetchUser, loadAllProjects]);
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/editor' element={<Editor />} />
      </Routes>
      <Fab variant="extended" style={{position: 'fixed', bottom: '1em', left: '1em'}} href="#">
        <NavigationIcon sx={{mr: 1}} />
        Navigate
      </Fab>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUserAsync()),
    loadAllProjects: () => dispatch(fetchProjectsAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
