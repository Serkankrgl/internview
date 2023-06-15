import React from 'react';

export default function Solveit({ problem }) {
   return (
      <div className="problem-viewer">
         <div className="problem-details">
            <h2>{problem.title}</h2>
            <h4>Difficulty: {problem.difficulty}</h4>
            <p>{problem.description}</p>
         </div>
         <div className="problem-test-cases">
            <h3>Test Cases</h3>
            {problem.testCases.map((testCase, index) => (
               <div key={index} className="test-case">
                  <h4>Test Case {index + 1}</h4>
                  <h5>Parameters:</h5>
                  <pre>{JSON.stringify(testCase.parameters, null, 2)}</pre>
                  <h5>Expected Output:</h5>
                  <pre>{JSON.stringify(testCase.expectedOutput, null, 2)}</pre>
               </div>
            ))}
         </div>
      </div>
   );
}
