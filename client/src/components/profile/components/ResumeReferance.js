import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';
import trashCan from 'assets/trash.svg';
export default function ResumeReferance() {
   const dispatch = useDispatch();
   const { resume } = useSelector((state) => state.userStore);

   const [referanceList, setReferanceList] = useState([]);
   const [fullName, setFullName] = useState('');
   const [title, setTitle] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const handleAddReferance = () => {
      var newReferance = {
         full_name: fullName,
         title: title,
         email: email,
         phone: phone
      };

      setReferanceList([...referanceList, newReferance]);
      setFullName('');
      setTitle('');
      setEmail('');
      setPhone('');
   };

   useEffect(() => {
      setReferanceList(resume.referances);
   }, []);

   useEffect(() => {
      const newResume = { ...resume, referances: referanceList };
      dispatch(setResume(newResume));
   }, [referanceList, dispatch]);
   return (
      <div className="form-box">
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="field1">
               <label className="header-label">Referanslar </label>
               <div className="left-field">
                  <label></label>
                  <label>İsim Soyisim</label>
                  <input
                     placeholder="İsim Soyisim"
                     value={fullName}
                     onChange={(e) => setFullName(e.target.value)}
                  />

                  <label>Ünvan</label>
                  <input
                     placeholder="Ünvan"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />

                  <label>E-mail</label>
                  <input
                     placeholder="me@internview.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />

                  <label>Telefon</label>
                  <input
                     placeholder="+90 000 000 0000"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                  />

                  <button onClick={handleAddReferance}>Ekle</button>
               </div>
               <div className="right-field">
                  {referanceList.map((referance, index) => (
                     <div
                        key={index}
                        className="box"
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between'
                        }}>
                        <div>
                           <p>
                              <h3>
                                 {referance.full_name}{' '}
                                 <small>
                                    <small>({referance.title})</small>
                                 </small>
                              </h3>
                           </p>
                           <p>
                              İletişim: {referance.email} - {referance.phone}
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
