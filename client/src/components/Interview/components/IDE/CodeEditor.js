import 'styles/interview/CodeEditor.scss';
import React, { useState } from 'react';

const CodeEditor = () => {
   const [code, setCode] = useState('');

   const handleChange = (event) => {
      setCode(event.target.value);
   };

   return (
      <div className="code-editor">
         <textarea className="code-editor__textarea" value={code} onChange={handleChange} />
         <pre className="code-editor__preview">{code}</pre>
      </div>
   );
};

export default CodeEditor;
