/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {Button, Overlay} from '@blueprintjs/core';
import {writeRenderProject} from './projectSlice';

function Display({renderProject, current, setRenderProject}) {
  return (
    <Overlay
      isOpen={renderProject}
    >
      <div style={{height: '100vh', width: '100vw'}}>
        <Button
          icon='minimize'
          intent='warning'
          onClick={() => setRenderProject(``)}
          style={{margin: '2em'}}
        />
        <div style={{margin: '2em'}}>
          <iframe
            srcDoc={renderProject}
            title={current.name}
            height='500px'
            width='100%'
          />
        </div>
      </div>
    </Overlay>
  );
}

const mapStateToProps = (state) => {
  return {
    renderProject: state.project.renderProject,
    current: state.project.current,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRenderProject: (project) => dispatch(writeRenderProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
