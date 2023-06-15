import React, { useState } from 'react';

export default function UserApplicationItem({ advertise, application }) {
   const [isExpanded, setIsExpanded] = useState(false);

   const handleToggle = () => {
      setIsExpanded(!isExpanded);
      console.log('application :>> ', application);
   };

   return (
      <div className="application-container">
         <span onClick={handleToggle} className="x">
            ↓↑
         </span>
         <div>
            <h1>{advertise.title}</h1>
            <small title={advertise.company_info}>{advertise.company}</small>
            <br></br>
            <small>
               {advertise.location}- {advertise.employment_type} - {advertise.seniority} -{' '}
               {advertise.role}
            </small>
            <hr></hr>
         </div>
         <div>
            <h3>iş Tanımı</h3>
            <p>{advertise.description}</p>
         </div>
         <hr />
         {isExpanded && (
            <div>
               <div className="detail-container">
                  <h3>Gereksinimler</h3>
                  <hr />
                  <ul>
                     {advertise.requirement.map((requirement, index) => {
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
                           S: <b>{question.question}</b>
                           <br></br>
                           C: <span>{question.answer}</span>
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
