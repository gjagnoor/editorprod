/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from '@blueprintjs/core';
import {postProjectAsync, writeName} from './projectSlice';

function Editor({current, all, addProject, saveName}) {
  const [showAddForm, setShowAddForm] = useState(false);
  console.log('empty or not: ', current.name);
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
        >
        </Button>
        <Button
          icon='download'
          intent='primary'
        >
        </Button>
      </ButtonGroup>
      {
        showAddForm ? <div>
          <input
            type='text'
            value={current.name}
            onChange={(evt) => saveName(evt.target.value)}
          />
          <Button type='submit' onSubmit={() => addProject(current)} text='Create New Project'/>
        </div> : null
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
    saveName: (name) => dispatch(writeName(name)),
    addProject: (project) => dispatch(postProjectAsync(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
