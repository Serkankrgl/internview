import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';
import trashCan from 'assets/trash.svg';
export default function ResumeTrophy() {
   const dispatch = useDispatch();
   const { resume } = useSelector((state) => state.userStore);

   const [trophyList, setTrophyList] = useState([]);
   const [trophyName, setTrophyName] = useState('');
   const [info, setInfo] = useState('');

   const handleAddTrophy = () => {
      var newTrophy = {
         name: trophyName,
         info: info
      };

      setTrophyList([...trophyList, newTrophy]);
      setTrophyName('');
      setInfo('');
   };
   useEffect(() => {
      setTrophyList(resume.trophies);
   }, []);

   useEffect(() => {
      const newResume = { ...resume, trophies: trophyList };
      dispatch(setResume(newResume));
   }, [trophyList, dispatch]);

   return (
      <div className="form-box">
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="field1">
               <label className="header-label">Başarımlar </label>
               <div className="left-field">
                  <label></label>
                  <label>Başarım Adı</label>
                  <input value={trophyName} onChange={(e) => setTrophyName(e.target.value)} />
                  <label>Açıklama</label>
                  <textarea
                     placeholder="..."
                     value={info}
                     onChange={(e) => setInfo(e.target.value)}
                  />
                  <button onClick={handleAddTrophy}>Ekle</button>
               </div>
               <div className="right-field">
                  {trophyList.map((trophy, index) => (
                     <div
                        className="box"
                        key={index}
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between'
                        }}>
                        <div>
                           <h3>{trophy.name}</h3>
                           <p>{trophy.info}</p>
                        </div>
                        <img className="icon" src={trashCan} alt="React Logo" />
                     </div>
                  ))}
               </div>
            </div>
         </form>
      </div>
   );
}
