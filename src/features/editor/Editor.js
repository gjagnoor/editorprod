/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup} from '@blueprintjs/core';

function Editor() {
  return (
    <div>
      <ButtonGroup vertical={true} style={{margin: '15em 0em 0em 1em'}} >
        <Button
          icon='add'
          intent='primary'
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
