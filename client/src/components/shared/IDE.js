import React, { useState, useEffect } from 'react';
import {
   updateCode,
   runCode,
   subscribeToOutput,
   subscribeToUpdateCode,
   subscribeToLanguageChanged,
   changeLanguage,
   offEditor
} from 'utils/IDEws';
// import 'styles/CollaborativeIDE.scss';
import CodeEditor from './Editor';

import 'styles/shared/IDE.scss'; // Stil dosyasını içe aktar

function App() {
   const [code, setCode] = useState('');
   const [output, setOutput] = useState('');
   const [language, setLanguage] = useState('javascript');

   useEffect(() => {
      subscribeToUpdateCode((supdatedCode) => {
         console.log('test1 :>> ', supdatedCode);
         setCode(supdatedCode);
      });

      subscribeToOutput((data) => {
         console.log('data :>> ', data);
         setOutput((prevOutput) => prevOutput + data);
      });
      subscribeToLanguageChanged((language) => {
         console.log('language :>> ', language);
         setLanguage(language);
      });

      return () => {
         offEditor();
      };
   }, []);

   const handleCodeChange = (value) => {
      const updatedCode = value;
      setCode(updatedCode);
      updateCode(updatedCode);
   };

   const handleLanguageChange = (event) => {
      const selectedLanguage = event.target.value;
      setLanguage(selectedLanguage);
      changeLanguage(selectedLanguage);
   };

   const handleRunCode = () => {
      runCode({ code, language });
   };

   return (
      <div className="App">
         <CodeEditor
            code={code}
            language={language}
            onCodeChange={handleCodeChange}
            onLanguageChange={handleLanguageChange}
         />
         <div className="output">
            <pre>{output}</pre>
         </div>
         <button onClick={handleRunCode}>Run</button>
      </div>
   );
}

export default App;
