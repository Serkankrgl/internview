import React, { useEffect, useState } from 'react';
import { setResume } from 'stores/userStore';
import { useDispatch, useSelector } from 'react-redux';

import trashCan from 'assets/trash.svg';
export default function ResumeCertificate() {
   const dispatch = useDispatch();
   const { resume } = useSelector((state) => state.userStore);

   const [certificateList, setCertificateList] = useState([]);
   const [name, setName] = useState('');
   const [agency, setAgency] = useState('');
   const [certificateIdentity, setCertificateIdentity] = useState('');

   const handleAddCertificate = () => {
      const newCertificate = {
         name: name,
         agency: agency,
         certificate_identity: certificateIdentity
      };

      setCertificateList([...certificateList, newCertificate]);
      setName('');
      setAgency('');
      setCertificateIdentity('');
   };

   useEffect(() => {
      setCertificateList(resume.certificates);
   }, []);

   useEffect(() => {
      const newResume = { ...resume, certificates: certificateList };
      dispatch(setResume(newResume));
   }, [certificateList, dispatch]);

   return (
      <div className="form-box">
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="field1">
               <label className="header-label">Sertifikalar</label>
               <div className="left-field">
                  <div className="form-item">
                     <label>Sertifika Adı</label>
                     <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sertifika Adı"
                     />
                  </div>
                  <div className="form-item">
                     <label>Alınan Kurum</label>
                     <input
                        type="text"
                        value={agency}
                        onChange={(e) => setAgency(e.target.value)}
                        placeholder="Alınan Kurum"
                     />
                  </div>
                  <div className="form-item">
                     <label>Yeterlilik Kimliği</label>
                     <input
                        type="text"
                        value={certificateIdentity}
                        onChange={(e) => setCertificateIdentity(e.target.value)}
                        placeholder="Yeterlilik Kimliği"
                     />
                  </div>
                  <button type="button" onClick={handleAddCertificate}>
                     Ekle
                  </button>
               </div>
               <div className="right-field">
                  {certificateList.map((certificate, index) => (
                     <div
                        className="box"
                        key={index}
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between'
                        }}>
                        <div>
                           <h3>{certificate.name}</h3>
                           <small>Kurum: {certificate.agency}</small>
                           <p>Yeterlilik Kimliği: {certificate.certificate_identity}</p>
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
