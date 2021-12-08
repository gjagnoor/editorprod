/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Overlay, TextArea} from '@blueprintjs/core';
import {postProjectAsync, writeName, loadProjectOnState, fetchProjectsAsync} from './projectSlice';

function Editor({current, all, addProject, saveName, loadProject, loadAllProjects}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  console.log('project on state ', current);
  console.log('project(s) on state', all);

  useEffect(() => {
    loadAllProjects();
  }, []);
  function handleSave(e) {
    e.stopPropagation();
    addProject(current);
    writeName('');
    setShowAddForm(false);
  }

  return (
    <div>
      <ButtonGroup vertical={true} style={{margin: '10% 0% 0% 1%'}} >
        <Button
          icon='add'
          intent='primary'
          onClick={() => setShowAddForm(true)}
        >
        </Button>
        <Button
          icon='cloud'
          intent='primary'
        >
        </Button>
        <Button
          icon='pin'
          intent='primary'
          onClick={() => setShowProjects(true)}
        >
        </Button>
        <Button
          icon='download'
          intent='primary'
        >
        </Button>
      </ButtonGroup>
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
            value={current.name}
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    current: state.project.current,
    all: state.project.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveName: (name) => dispatch(writeName(name)),
    addProject: (project) => dispatch(postProjectAsync(project)),
    loadProject: (project) => dispatch(loadProjectOnState(project)),
    loadAllProjects: () => dispatch(fetchProjectsAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
