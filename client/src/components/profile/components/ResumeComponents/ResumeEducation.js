import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';
import trashCan from 'assets/trash.svg';

export default function ResumeEducation() {
   const dispatch = useDispatch();
   const { resume } = useSelector((state) => state.userStore);

   const [educationList, setEducationList] = useState([]);
   const [schoolName, setSchoolName] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [isCurrent, setIsCurrent] = useState(false);
   const [isDateError, setIsDateError] = useState(false);

   const handleAddEducation = () => {
      var newEducation = {
         school_name: schoolName,
         start_date: startDate,
         end_date: endDate,
         is_current: isCurrent
      };
      var edList = [...educationList, newEducation];
      setEducationList(edList);
      console.log('edList :>> ', edList);
      setSchoolName('');
      setStartDate('');
      setEndDate('');
      setIsCurrent(false);
   };
   useEffect(() => {
      console.log('objectx :>> ', resume);
      setEducationList(resume.educations);
   }, []);
   useEffect(() => {
      const newResume = { ...resume, educations: educationList };
      console.log('a :>> ', educationList);
      dispatch(setResume(newResume));
   }, [educationList, dispatch]);

   const handleDelete = () => {
      alert('x');
   };
   return (
      <div className="form-box">
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="field1 ">
               <label className="header-label">Eğitim Bilgiler </label>
               <div className="left-field">
                  <label>Okul Adı</label>
                  <input
                     type="text"
                     name="school_name"
                     onChange={(event) => setSchoolName(event.target.value)}
                     value={schoolName}
                  />
                  <label>Başlangıç Tarihi</label>
                  <input
                     type="date"
                     name="start_date"
                     onChange={(event) => setStartDate(event.target.value)}
                     value={startDate}
                  />
                  <label>Bitiş Tarihi</label>
                  <input
                     type="date"
                     name="end_date"
                     onChange={(event) => setEndDate(event.target.value)}
                     value={endDate}
                  />
                  <label htmlFor="checkbox1" className="check-lable">
                     Devam Ediyor :
                  </label>
                  <input
                     type="checkbox"
                     id="checkbox1"
                     name="checkbox1"
                     checked={isCurrent}
                     onChange={(event) => setIsCurrent(event.target.checked)}
                  />
                  <button type="button" onClick={handleAddEducation}>
                     Ekle
                  </button>
               </div>
               <div className="right-field">
                  {educationList.map((item, index) => (
                     <div
                        className="box"
                        key={index}
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between'
                        }}>
                        <div>
                           <h4>{item.school_name}</h4>
                           <p>
                              Tarih: {item.start_date} -
                              {item.is_current ? 'Devam ediyor.' : item.end_date}
                           </p>
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
