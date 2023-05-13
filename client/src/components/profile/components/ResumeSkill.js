import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';

import trashCan from 'assets/trash.svg';
export default function ResumeSkill() {
   const dispatch = useDispatch();
   const { resume } = useSelector((state) => state.userStore);

   const [skillList, setSkillList] = useState([]);
   const [skill, setSkill] = useState('');

   const handleAddSkill = () => {
      setSkillList([...skillList, skill]);
      setSkill('');
   };

   useEffect(() => {
      setSkillList(resume.skills);
   }, []);

   useEffect(() => {
      const newResume = { ...resume, skills: skillList };
      dispatch(setResume(newResume));
   }, [skillList, dispatch]);

   return (
      <div className="form-box">
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="field1">
               <label className="header-label"> Yetenekler </label>
               <div className="left-field">
                  <label>Yetenek</label>
                  <input
                     placeholder="Yetenek"
                     onChange={(e) => setSkill(e.target.value)}
                     value={skill}
                  />

                  <button onClick={handleAddSkill}>Ekle</button>
               </div>
               <div className="right-field d-flex">
                  {skillList.map((skill, index) => (
                     <div
                        key={index}
                        className="flex-box "
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between'
                        }}>
                        <p>{skill}</p>
                        <img className="icon" src={trashCan} alt="React Logo" />
                     </div>
                  ))}
               </div>
            </div>
         </form>
      </div>
   );
}
