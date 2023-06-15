import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'styles/problems/solve.scss';
import IDE from 'components/shared/IDE';
import { createRoom } from 'utils/IDEws';
export default function Solve() {
   const { problem } = useSelector((state) => state.problemStore);
   useEffect(() => {
      console.log('problems :>> ', problem);
      createRoom('6485ebcc0e2ccecba9252a4c');
   }, []);

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
                  <pre>{JSON.stringify(testCase.params)}</pre>
                  <h5>Expected Output:</h5>
                  <pre>{JSON.stringify(testCase.output)}</pre>
               </div>
            ))}
         </div>
         <IDE defCode={problem.functionText} justjs={true} />
      </div>
   );
}
