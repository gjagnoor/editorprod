/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {Button, Overlay} from '@blueprintjs/core';
import {loadProjectOnState} from './projectSlice';

function Projects({showProjects, setShowProjects, all, loadProject}) {
  return (
    <Overlay
      isOpen={showProjects}
      onClose={() => setShowProjects(false)}
      canEscapeKeyClose={true}
      canOutsideClickClose={false}
    >
      <div className='App-header createProject'>
        <h5>Your Projects</h5>
        {
          all.map((project, i) => {
            return <div key={i} style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button
                className='bp3-minimal'
                icon='small-cross'
                intent='danger'
              />
              <Button className='bp3-minimal' style={{color: 'white'}} onClick={() => loadProject(project)}>{project.name}</Button>
            </div>;
          })
        }
        <Button
          intent='danger'
          icon='small-cross'
          onClick={() => setShowProjects(false)}
          text='Close'
          style={{margin: '1em'}}
          fill={true}
        />
      </div>
    </Overlay>
  );
}

const mapStateToProps = (state) => {
  return {
    all: state.project.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProject: (project) => dispatch(loadProjectOnState(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
