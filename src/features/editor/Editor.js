/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from '@blueprintjs/core';
import Projects from './Projects';
import AddProjectForm from './AddProjectForm';
import Monaco from './Monaco';
import Display from './Display';
import {updateProjectAsync, writeRenderProject} from './projectSlice';

function Editor({current, all, saveProject, render, renderProject}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  console.log('render project', renderProject);
  return (
    <div>
      <ButtonGroup vertical={false} style={{margin: '2em'}} >
        <Button
          icon='add'
          intent='primary'
          onClick={() => setShowAddForm(true)}
        >
        </Button>
        <Button
          icon='cloud-upload'
          intent='primary'
          onClick={() => saveProject(current)}
        >
        </Button>
        <Button
          icon='pin'
          intent='primary'
          onClick={() => setShowProjects(true)}
        >
        </Button>
        <Button
          icon='maximize'
          intent='warning'
          onClick={() => render(`
           
<!DOCTYPE html>
  <html>
    <head>
      <style>
      ${current.content.css}
      </style>
       <script>
        ${current.content.js}
      </script>
    </head>
    <body>
    ${current.content.html} 
    </body>
  </html>       
          `)}
        >
        </Button>
      </ButtonGroup>
      <AddProjectForm showAddForm={showAddForm} setShowAddForm={setShowAddForm}
      />
      <Projects showProjects={showProjects} setShowProjects={setShowProjects} />
      {
        current.key ? <Monaco /> : <p style={{display: 'flex', justifyContent: 'center'}}>Please Select or Create a New Project</p>
      }
      {
        renderProject ? <Display /> : null
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    current: state.project.current,
    all: state.project.all,
    renderProject: state.project.renderProject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProject: (project) => dispatch(updateProjectAsync(project)),
    render: (index) => dispatch(writeRenderProject(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
