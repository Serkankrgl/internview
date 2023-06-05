import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import 'styles/CollaborativeIDE.scss';
const ENDPOINT = 'http://localhost:3090';
const socket = socketIOClient(ENDPOINT);

function App() {
   const [code, setCode] = useState('');
   const [output, setOutput] = useState('');
   const [language, setLanguage] = useState('javascript');

   useEffect(() => {
      socket.on('updateCode', (updatedCode) => {
         setCode(updatedCode);
      });

      socket.on('output', (data) => {
         setOutput((prevOutput) => prevOutput + data);
      });

      return () => {
         socket.off('updateCode');
         socket.off('output');
      };
   }, []);

   const handleCodeChange = (event) => {
      const updatedCode = event.target.value;
      setCode(updatedCode);
      socket.emit('codeUpdate', updatedCode);
   };

   const handleLanguageChange = (event) => {
      const selectedLanguage = event.target.value;
      setLanguage(selectedLanguage);
   };

   const handleRunCode = () => {
      setOutput('');
      socket.emit('runCode', { code, language });
   };

   return (
      <div className="App">
         <div className="editor">
            <textarea value={code} onChange={handleCodeChange} />
            <div>
               <label htmlFor="language">Language:</label>
               <select id="language" value={language} onChange={handleLanguageChange}>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="ruby">Ruby</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                  <option value="csharp">C#</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                  <option value="swift">Swift</option>
                  <option value="php">PHP</option>
                  <option value="perl">Perl</option>
                  <option value="lua">Lua</option>
                  <option value="typescript">TypeScript</option>
                  <option value="bash">Bash</option>
                  {/* Eklemek istediğiniz başka dilleri buraya ekleyebilirsiniz */}
               </select>
            </div>
            <button onClick={handleRunCode}>Run</button>
         </div>
         <div className="output">
            <pre>{output}</pre>
         </div>
      </div>
   );
}

export default App;
