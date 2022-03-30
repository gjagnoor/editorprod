/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {writeCodeOnState} from './projectSlice.js';
import MonacoEditor from 'react-monaco-editor';
import {useMediaQuery} from 'react-responsive';

const height = '30em';
function Monaco({current, writeCode}) {
  // const isDesktopOrLaptop = useMediaQuery({
  // query: '(min-width: 1224px)',
  // });
  // const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'});
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'});
  const width = isTabletOrMobile ? '80%' : '30em';
  useEffect(() => {
    window.sessionStorage.setItem('currentProject', JSON.stringify(current));
  }, [current]);
  return (
    <div id="monaco">
      <div>
        <p>HTML5</p>
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
          className="editor"
        />
      </div>
      <div>
        <p>CSS</p>
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
          className="editor"
        />


      </div>
      <div>
        <p>JavaScript</p>
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
          className="editor"
        />
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
