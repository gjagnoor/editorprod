/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from '@blueprintjs/core';
import Projects from './Projects';
import AddProjectForm from './AddProjectForm';
import Monaco from './Monaco';
import {updateProjectAsync} from './projectSlice';

function Editor({current, all, saveProject}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
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
      </ButtonGroup>
      <AddProjectForm showAddForm={showAddForm} setShowAddForm={setShowAddForm}
      />
      <Projects showProjects={showProjects} setShowProjects={setShowProjects} />
      {
        current.key ? <Monaco /> : null
      }
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
    saveProject: (project) => dispatch(updateProjectAsync(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
