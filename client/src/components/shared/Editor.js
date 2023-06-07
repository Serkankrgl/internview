import React from 'react';
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'styles/shared/IDE.scss'; // Stil dosyasını içe aktar

import { Controlled as CodeMirror } from 'react-codemirror2-react-17';

const CodeEditor = ({ code, language, onCodeChange, onLanguageChange }) => {
   const handleCodeChange = (editor, data, value) => {
      onCodeChange(value);
   };

   return (
      <div className="code-editor">
         <div className="code-editor-toolbar">
            <label htmlFor="language">Language:</label>
            <select id="language" value={language} onChange={onLanguageChange}>
               <option value="javascript">JavaScript</option>
               <option value="python">Python</option>
               {/* Add other language options here */}
            </select>
         </div>
         <CodeMirror
            value={code}
            options={{
               mode: language,
               theme: 'dracula',
               lineNumbers: true,
               viewportMargin: Infinity
            }}
            onBeforeChange={handleCodeChange}
         />
      </div>
   );
};

CodeEditor.propTypes = {
   code: PropTypes.string.isRequired,
   language: PropTypes.string.isRequired,
   onCodeChange: PropTypes.func.isRequired,
   onLanguageChange: PropTypes.func.isRequired
};

export default CodeEditor;
