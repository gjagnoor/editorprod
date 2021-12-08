/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {Button, Overlay, TextArea} from '@blueprintjs/core';
import {writeName, postProjectAsync, writeNew} from './projectSlice';

function AddProjectForm({showAddForm, setShowAddForm, saveName, resetNew, addProject, newProject}) {
  function handleSave(e) {
    e.stopPropagation();
    addProject(newProject);
    resetNew({
      name: '',
      key: '',
      content: {
        html: '',
        js: '',
        css: '',
      },
    });
    setShowAddForm(false);
  }
  return (
    <Overlay
      isOpen={showAddForm}
      onClose={() => setShowAddForm(false)}
      canEscapeKeyClose={true}
      canOutsideClickClose={false}
    >
      <div className='App-header createProject'>
        <h5>Create a New Project</h5>
        <TextArea
          growVertically={false}
          large={false}
          intent='primary'
          placeholder='Add a unique name'
          onChange={(evt) => saveName(evt.target.value)}
          value={newProject.name}
        />
        <Button
          icon='plus'
          intent='success'
          onClick={(e) => handleSave(e)}
          text='Create Project'
          style={{margin: '1em'}}
        />
        <Button
          intent='danger'
          icon='small-cross'
          onClick={() => setShowAddForm(false)}
          text='I dont want to create a project, yet'
          style={{margin: '1em'}}
        />
      </div>
    </Overlay>
  );
}

const mapStateToProps = (state) => {
  return {
    newProject: state.project.new,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: (project) => dispatch(postProjectAsync(project)),
    saveName: (name) => dispatch(writeName(name)),
    resetNew: (newProject) => dispatch(writeNew(newProject)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectForm);
