import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/problems/problems.scss';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setProblem } from 'stores/problemStore';
import { getAllProblems, deleteProblem } from 'apis/problems';
export default function Problems() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [problems, setProblems] = useState([{}]);
   const [isAdmin, setIsAdmin] = useState(false);
   const fetchData = async () => {
      var data = await getAllProblems();
      setProblems(data);
   };
   // Buraya daha fazla soru ekleyebilirsiniz

   useEffect(async () => {
      await fetchData();
      console.log('problems.length :>> ', problems.length);
      var isAd = localStorage.getItem('isAdmin');
      if (isAd) setIsAdmin(true);
   }, []);

   const handleClick = (problem) => {
      dispatch(setProblem(problem));
      navigate('/solveit');
   };

   const handleAddProblem = () => {
      navigate('/ProblemForm');
   };
   const handleDeleteProblem = async (problemId) => {
      var response = await deleteProblem(problemId).catch((err) => {
         console.log('err :>> ', err);
      });
   };

   return (
      <div className="problems">
         <div>
            <h1> Problems</h1>
            <button onClick={handleAddProblem}>Soru Ekle</button>
         </div>
         <ul>
            {problems?.length > 0 ? (
               problems?.map((problem) => (
                  <li
                     onClick={() => {
                        handleClick(problem);
                     }}
                     key={problem.id}>
                     <h3>{problem.title}</h3>
                     <p>{problem.description}</p>
                     <div>
                        <strong>Difficulty:</strong> {problem.difficulty}
                     </div>
                     <div>
                        {isAdmin && (
                           <div>
                              <button
                                 onClick={() => {
                                    handleDeleteProblem(problem._id);
                                 }}>
                                 Sil
                              </button>
                           </div>
                        )}
                     </div>
                  </li>
               ))
            ) : (
               <div>Henüz Kayıtlı Problem bulunmuyor..</div>
            )}
         </ul>
      </div>
   );
}
