import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationsByAdId, updateApplication } from 'apis/application';
import { getAdvertisementById } from 'apis/advertisement';
import toast, { Toaster } from 'react-hot-toast';
import 'styles/profile/UserAdvertisementDetail.scss';
import { Link, useNavigate } from 'react-router-dom';
export default function UserAdvertisementDetail() {
   const navigate = useNavigate();
   const { id } = useParams();
   const [aplications, setAplications] = useState([]);
   const [advertisement, setAdvertisement] = useState({});
   const [openInterviewModal, setOpenInterviewModal] = useState(false);
   const [focusedApplication, setFocusedApplication] = useState('');
   const fetchData = () => {
      let apPromise = getApplicationsByAdId(id);
      let adPromise = getAdvertisementById(id);

      toast.promise(
         Promise.all([apPromise, adPromise])
            .then(([apRes, adRes]) => {
               setAplications(apRes);
               setAdvertisement(adRes);
            })
            .catch((err) => {
               toast.error(err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti');
            })
            .finally(() => {
               // This block will execute when both promises are resolved or rejected
               // You can perform any additional actions here
            }),
         {
            loading: 'Veriler Getiriliyor...',
            success: 'Başarılı...!', // Set to null to prevent the automatic success toast
            error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
         }
      );
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      if (name == 'interviewDate') {
         const parts = value.split('-');
         const dateStr = `${parts[2]}/${parts[1]}/${parts[0]}`;
         console.log('object :>> ', dateStr);
         focusedApplication[name] = dateStr;
      } else {
         focusedApplication[name] = value;
      }

      setFocusedApplication(focusedApplication);
   };
   const sendInvite = (e) => {
      e.preventDefault();
      console.log('focusedApplication :>> ', focusedApplication);

      let updatePromise = updateApplication(focusedApplication._id, focusedApplication);
      toast.promise(updatePromise, {
         loading: 'İşlem Yapılıyor...',
         success: 'İşlemi başarılı...!',
         error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
      });
      updatePromise.then((res) => {
         setOpenInterviewModal(false);
      });
   };
   return (
      <>
         <Toaster position="top-center" reverseOrder={false}></Toaster>
         <div className="ad-info-box">
            <h2>{advertisement.title}</h2>
            <div>{advertisement.description}</div>
            <div>
               <h4>Gereksinimler</h4>
               <ul>
                  {advertisement.requirement?.map((value) => {
                     return <li key={value}>{value}</li>;
                  }) || ''}
               </ul>
            </div>
            <div>
               <h4>Sorular</h4>
               <ul>
                  {advertisement.custom_question?.map((value) => {
                     return <li key={value}>{value}</li>;
                  }) || ''}
               </ul>
            </div>
         </div>
         <div className="ap-wrapper">
            <h2>Adaylar</h2>
            <ul></ul>
            {aplications.map((value, index) => {
               return (
                  <li key={index} className="aplicant-box">
                     <div>{value.fullName}</div>
                     <div>
                        Mülakat Tarihi: {value.interviewDate + '-' + value.interviewTime || ''}
                     </div>
                     <div className="ap-button-group">
                        <button>CV Görüntüle</button>
                        <button>Cevapları görüntüle</button>
                        <button
                           onClick={() => {
                              setOpenInterviewModal(!openInterviewModal);
                              setFocusedApplication(value);
                           }}>
                           Mülakat tarihi gönder
                        </button>
                        <button
                           onClick={() => {
                              navigate(`/Preinterview/${value._id}?host=true`);
                           }}>
                           Mülakata katıl
                        </button>
                        <button>Adayı Ele</button>
                     </div>
                  </li>
               );
            })}
         </div>

         {openInterviewModal && (
            <div className="modal">
               <form onSubmit={sendInvite}>
                  <div>
                     <h4>Lütfen mülakat tarihini seçin</h4>
                     <div>
                        <input
                           type="date"
                           id="date"
                           name="interviewDate"
                           onChange={handleInputChange}
                        />
                        <input
                           type="time"
                           id="time"
                           name="interviewTime"
                           onChange={handleInputChange}
                        />
                     </div>
                     <button type="submit">Gönder</button>
                  </div>
               </form>
            </div>
         )}
      </>
   );
}
