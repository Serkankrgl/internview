import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';

import trashCan from 'assets/trash.svg';
export default function ResumeHobby() {
   const dispatch = useDispatch();
   const { resume } = useSelector((state) => state.userStore);

   const [hobbyList, setHobbyList] = useState([]);
   const [hobby, setHobby] = useState('');

   const handleAddHobby = () => {
      setHobbyList([...hobbyList, hobby]);
      setHobby('');
   };
   useEffect(() => {
      setHobbyList(resume.hobbies);
   }, []);

   useEffect(() => {
      const newResume = { ...resume, hobbies: hobbyList };
      dispatch(setResume(newResume));
   }, [hobbyList, dispatch]);

   const remove = (index) => {
      const updatedHobbyList = [...hobbyList];
      updatedHobbyList.splice(index, 1);
      setHobbyList(updatedHobbyList);
   };

   return (
      <div className="form-box">
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="field1">
               <label className="header-label">Hobiler </label>
               <div className="left-field">
                  <label>Hobi</label>
                  <input
                     placeholder="Hobi"
                     onChange={(e) => setHobby(e.target.value)}
                     value={hobby}
                  />

                  <button onClick={handleAddHobby}>Ekle</button>
               </div>
               <div className="right-field d-flex">
                  {hobbyList.map((hobby, index) => (
                     <div
                        key={index}
                        className="flex-box"
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between'
                        }}>
                        <p>{hobby}</p>
                        <img
                           onClick={() => {
                              remove(index);
                           }}
                           className="icon"
                           src={trashCan}
                           alt="React Logo"
                        />
                     </div>
                  ))}
               </div>
            </div>
         </form>
      </div>
   );
}
