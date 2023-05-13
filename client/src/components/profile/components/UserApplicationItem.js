import React, { useState } from 'react';

export default function UserApplicationItem({ application }) {
   const [isExpanded, setIsExpanded] = useState(false);

   const handleToggle = () => {
      setIsExpanded(!isExpanded);
   };

   return (
      <div className="application-container">
         <span onClick={handleToggle} className="x">
            ↓↑
         </span>
         <div>
            <h1>{application.title}</h1>
            <small title={application.company_info}>{application.company}</small>
            <br></br>
            <small>
               {application.location}- {application.employment_type} - {application.seniority} -{' '}
               {application.role}
            </small>
            <hr></hr>
         </div>
         <div>
            <h3>iş Tanımı</h3>
            <p>{application.description}</p>
         </div>
         <hr />
         {isExpanded && (
            <div>
               <div className="detail-container">
                  <h3>Gereksinimler</h3>
                  <hr />
                  <ul>
                     {application.requirement.map((requirement, index) => {
                        return (
                           <li>
                              <b>{requirement}</b>
                           </li>
                        );
                     })}
                  </ul>
               </div>
               <div className="detail-container">
                  <h3>Sorular - Cevaplar</h3>
                  <hr />
                  {application.custom_question.map((question, index) => {
                     return (
                        <div>
                           S: <b>{question.Q}</b>
                           <br></br>
                           C: <span>{question.A}</span>
                           <hr></hr>
                        </div>
                     );
                  })}
               </div>
               <div className="detail-container">
                  <h3>Problemler</h3>
                  <hr />
                  {application.problems.map((problem, index) => {
                     return (
                        <div>
                           Problem: <b>{problem.problem.name}</b>
                           <br></br>
                           Durum: <span>{problem.statu}</span>
                           <hr></hr>
                        </div>
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
}
