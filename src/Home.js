/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';

function Home() {
  return (
    <div className="App-header">
      <h2 className='app-heading'>EDITOR _</h2>
      <p>A simple code editor for someone who is just </p>
      <p>starting to learn to code.</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
