import React from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';

export default function ResumePersonal() {
   const dispatch = useDispatch();
   const { resume } = useSelector((state) => state.userStore);
   const handleInputOnChange = (event) => {
      console.log('resumex :>> ');
      const target = event.target;
      const value = target.value;
      const name = target.name;
      const newResume = { ...resume, [name]: value };
      console.log('newResume :>> ', newResume); // create a new copy of the resume state with the updated value
      dispatch(setResume(newResume));
   };
   return (
      <div className="form-box">
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="field1">
               <label className="header-label">Kişisel Bilgiler </label>
               <label htmlFor="full_name">İsim Soyisim</label>
               <input
                  name="full_name"
                  type="text"
                  onChange={handleInputOnChange}
                  value={resume.full_name}
               />
               <label htmlFor="phone">Telefon Numarası</label>
               <input
                  placeholder="+90 000 000 0000"
                  name="phone"
                  onChange={handleInputOnChange}
                  value={resume.phone}
               />
               <label htmlFor="email">E-Mail</label>
               <input
                  name="email"
                  type="email"
                  onChange={handleInputOnChange}
                  value={resume.email}
               />
               <label htmlFor="about_me">Hakkımda</label>
               <textarea
                  name="about_me"
                  placeholder="..."
                  onChange={handleInputOnChange}
                  value={resume.about_me}
               />
            </div>
         </form>
      </div>
   );
}
