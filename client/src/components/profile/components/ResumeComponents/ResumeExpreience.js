import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';

import trashCan from 'assets/trash.svg';
export default function ResumeExpreience() {
   const dispatch = useDispatch();
   const { resume } = useSelector((state) => state.userStore);

   const [experienceList, setExperienceList] = useState([]);
   const [companyName, setCompanyName] = useState('');
   const [companyInfo, setCompanyInfo] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [isCurrent, setIsCurrent] = useState(false);

   const handleAddExperience = () => {
      var newExperience = {
         company_name: companyName,
         company_info: companyInfo,
         start_date: startDate,
         end_date: endDate,
         is_current: isCurrent
      };

      setExperienceList([...experienceList, newExperience]);
      setCompanyName('');
      setCompanyInfo('');
      setStartDate('');
      setEndDate('');
      setIsCurrent(false);
   };

   useEffect(() => {
      setExperienceList(resume.experiences);
   }, []);

   useEffect(() => {
      const newResume = { ...resume, experiences: experienceList };
      dispatch(setResume(newResume));
   }, [experienceList, dispatch]);

   const removeExperience = (index) => {
      const updatedExperienceList = [...experienceList];
      updatedExperienceList.splice(index, 1);
      setExperienceList(updatedExperienceList);
   };

   return (
      <div className="form-box">
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="field1">
               <label className="header-label">Deneyim Bilgiler </label>
               <div className="left-field">
                  <label>Şirket Adı</label>
                  <input
                     placeholder="Şirket"
                     value={companyName}
                     onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <label>Şirket Hakkında</label>
                  <textarea
                     placeholder="Hakkında"
                     value={companyInfo}
                     onChange={(e) => setCompanyInfo(e.target.value)}
                  />
                  <label>Başlama Tarihi</label>
                  <input
                     type="date"
                     value={startDate}
                     onChange={(e) => setStartDate(e.target.value)}
                  />
                  <label>Bitiş Tarihi</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  <label htmlFor="checkbox1" className="check-lable">
                     Devam Ediyor :
                  </label>
                  <input
                     type="checkbox"
                     id="checkbox1"
                     name="checkbox1"
                     checked={isCurrent}
                     onChange={(e) => setIsCurrent(e.target.checked)}
                  />
                  <button type="button" onClick={handleAddExperience}>
                     Ekle
                  </button>
               </div>
               <div className="right-field">
                  {experienceList.map((experience, index) => (
                     <div
                        key={index}
                        className="box"
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between'
                        }}>
                        <div>
                           <h3>{experience.company_name}</h3>
                           <p>{experience.company_info}</p>
                           <p>
                              Tarih: {experience.start_date} -
                              {experience.is_current ? 'Devam ediyor.' : experience.end_date}
                           </p>
                        </div>
                        <img
                           onClick={() => removeExperience(index)}
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
