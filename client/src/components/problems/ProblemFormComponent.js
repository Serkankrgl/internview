import React, { useState } from 'react';
import 'styles/problems/ProblemForm.scss';
import { createProblem } from 'apis/problems';
const ProblemFormComponent = () => {
   const [title, setTitle] = useState('');
   const [difficulty, setDifficulty] = useState('');
   const [description, setDescription] = useState('');
   const [testCases, setTestCases] = useState([{ params: '', output: '' }]);
   const [functionText, setFunctionText] = useState('');

   const handleParamsChange = (e, index) => {
      const updatedTestCases = [...testCases];
      updatedTestCases[index].params = e.target.value;
      setTestCases(updatedTestCases);
   };

   const handleOutputChange = (e, index) => {
      const updatedTestCases = [...testCases];
      updatedTestCases[index].output = e.target.value;
      setTestCases(updatedTestCases);
   };

   const addTestCase = () => {
      setTestCases([...testCases, { params: '', output: '' }]);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const problem = { title, difficulty, description, testCases, functionText };

      const response = await createProblem(problem);
   };

   return (
      <div className="problem-form-container">
         <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="problem-form-label">
               Başlık:
            </label>
            <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="problem-form-input"
            />
            <br />

            <label htmlFor="difficulty" className="problem-form-label">
               Zorluk:
            </label>
            <select
               value={difficulty}
               onChange={(e) => setDifficulty(e.target.value)}
               className="problem-form-select">
               <option value="">Zorluk Seviyesi Seçin</option>
               <option value="Kolay">Kolay</option>
               <option value="Orta">Orta</option>
               <option value="Zor">Zor</option>
            </select>
            <br />

            <label htmlFor="description" className="problem-form-label">
               Açıklama:
            </label>
            <textarea
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               className="problem-form-textarea"
            />
            <br />

            <label htmlFor="functionText" className="problem-form-label">
               Fonksiyon:
            </label>
            <textarea
               value={
                  functionText != ''
                     ? functionText
                     : 'function foo(int A,int B)\n{\n//Kullanıcı burayı dolduracak...\n};\nfoo([0],[0]);'
               }
               onChange={(e) => setFunctionText(e.target.value)}
               className="problem-form-textarea">
               {functionText ?? 'function foo(int A,int B)\n{\n};\nfoo([0],[0]);'}
            </textarea>
            <br />

            <h4 className="problem-form-section-title">Test Cases:</h4>
            {testCases.map((testCase, index) => (
               <div key={index}>
                  <label htmlFor={`params-${index}`} className="problem-form-section-subtitle">
                     Params-{index + 1}:
                  </label>
                  <input
                     type="text"
                     value={testCase.params}
                     onChange={(e) => handleParamsChange(e, index)}
                     className="problem-form-input"
                  />
                  <br />

                  <label htmlFor={`output-${index}`} className="problem-form-section-subtitle">
                     Output-{index + 1}:
                  </label>
                  <input
                     type="text"
                     value={testCase.output}
                     onChange={(e) => handleOutputChange(e, index)}
                     className="problem-form-input"
                  />
                  <br />
               </div>
            ))}

            <button type="button" onClick={addTestCase} className="problem-form-button">
               Test Case Ekle
            </button>
            <br />

            <button type="submit" className="problem-form-button">
               Kaydet
            </button>
         </form>
      </div>
   );
};

export default ProblemFormComponent;
