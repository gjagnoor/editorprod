/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {writeCodeOnState, cacheProjectAsync} from './projectSlice.js';
import MonacoEditor from 'react-monaco-editor';
const height = '30em';
const width = '30em';
function Monaco({current, writeCode}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '2em',
      }}>
      <div>
        <p>HTML5</p>
        <div style={{border: '1px solid #4BB2F9'}}>
          <MonacoEditor
            width={width}
            height={height}
            language='html'
            theme="vs-light"
            value={current.content.html}
            options={{
              selectOnLineNumbers: true,
            }}
            onChange={(value) => writeCode({
              content: value,
              language: 'html',
            })}
            editorDidMount={(editor, monaco) => editor.focus()}
          />
        </div>
      </div>
      <div>
        <p>CSS</p>
        <div style={{border: '1px solid #4BB2F9'}}>
          <MonacoEditor
            width={width}
            height={height}
            language="css"
            theme="vs-dark"
            value={current.content.css}
            options={{
              selectOnLineNumbers: true,
            }}
            onChange={(value) => writeCode({
              content: value,
              language: 'css',
            })}
            editorDidMount={(editor, monaco) => editor.focus()}
          />

        </div>

      </div>
      <div>
        <p>JavaScript</p>
        <div style={{border: '1px solid #4BB2F9'}}>
          <MonacoEditor
            width={width}
            height={height}
            language="javascript"
            theme="vs-dark"
            value={current.content.js}
            options={{
              selectOnLineNumbers: true,
            }}
            onChange={(value) => writeCode({
              content: value,
              language: 'js',
            })}
            editorDidMount={(editor, monaco) => editor.focus()}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    current: state.project.current,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    writeCode: (code) => dispatch(writeCodeOnState(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monaco);
