import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationsByAdId, updateApplication, deleteApplication } from 'apis/application';
import { getAdvertisementById, removeAdvertisementsById } from 'apis/advertisement';
import toast, { Toaster } from 'react-hot-toast';
import 'styles/profile/UserAdvertisementDetail.scss';
import { Link, useNavigate } from 'react-router-dom';
import { setApplication } from 'stores/advertisementStore';
import { setRoomId } from 'stores/interviewStore';
import { getRoomExists } from 'apis/webRtcApis';
import { useDispatch } from 'react-redux';
import PDFRender from './components/ResumePdfComponents/PDFRender';
import trashCan from 'assets/trash.svg';
export default function UserAdvertisementDetail() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { id } = useParams();
   const [aplications, setAplications] = useState([]);
   const [advertisement, setAdvertisement] = useState({});
   const [openInterviewModal, setOpenInterviewModal] = useState(false);
   const [openQuestionModal, setOpenQuestionModal] = useState(false);
   const [showPDF, setShofPDF] = useState(false);
   openConfirmModal;
   const [openConfirmModal, setopenConfirmModal] = useState(false);

   const [focusedApplication, setFocusedApplication] = useState('');
   const fetchData = () => {
      let apPromise = getApplicationsByAdId(id);
      let adPromise = getAdvertisementById(id);

      toast.promise(
         Promise.all([apPromise, adPromise])
            .then(([apRes, adRes]) => {
               setAplications(apRes);

               console.log('answer :>> ', aplications);
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

   const handleJoin = async (Application) => {
      const responseMessage = await getRoomExists(Application.interviewLocation);
      const { roomExists, full } = responseMessage;
      dispatch(setApplication(Application));
      if (roomExists) {
         dispatch(setRoomId(Application.interviewLocation));

         navigate(`/JoinMeeting`);
      } else {
         dispatch(setRoomId(null));
         navigate(`/JoinMeeting?host=true`);
      }
   };
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
   const handleRemove = () => {
      var prom = removeAdvertisementsById(advertisement._id);
      prom.then((res) => {
         toast.success('Kayıt sılindi profil sayfasına yönlendiriliyorsunuz.');
         setTimeout(() => {
            navigate('/profile/UserAdvertisement');
         }, 3000);
      });
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
   const handleRemoveApplication = (appId) => {
      let deletePromis = deleteApplication(appId);
      toast.promise(deletePromis, {
         loading: 'İşlem Yapılıyor...',
         success: 'İşlemi başarılı...!',
         error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
      });
      deletePromis.then((res) => {
         fetchData();
      });
   };
   return (
      <>
         <Toaster position="top-center" reverseOrder={false}></Toaster>
         <div className="ad-info-box">
            <img
               className="icon"
               onClick={() => {
                  setopenConfirmModal(!openConfirmModal);
               }}
               src={trashCan}
               alt="React Logo"
            />
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
                        <button
                           onClick={() => {
                              // setFocusedApplication(value);
                              // setShofPDF(!showPDF);
                              navigate(`/profile/pdfresume/${value.userId}`);
                           }}>
                           CV Görüntüle
                        </button>
                        <button
                           onClick={() => {
                              setOpenQuestionModal(!openQuestionModal);
                              setFocusedApplication(value);
                           }}>
                           Cevapları görüntüle
                        </button>
                        <button
                           onClick={() => {
                              setOpenInterviewModal(!openInterviewModal);
                              setFocusedApplication(value);
                           }}>
                           Mülakat tarihi gönder
                        </button>
                        <button
                           onClick={() => {
                              handleJoin(value);
                           }}>
                           Mülakata katıl
                        </button>
                        <button
                           onClick={() => {
                              handleRemoveApplication(value._id);
                           }}>
                           Adayı Ele
                        </button>
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
               <button
                  className="dismiss-button"
                  onClick={() => {
                     setOpenInterviewModal(!openInterviewModal);
                  }}>
                  X
               </button>
            </div>
         )}

         {openQuestionModal && (
            <div className="modal-quest">
               {focusedApplication.custom_question.map((item) => {
                  return (
                     <div className="quest-content">
                        <div>
                           <p>
                              <b>Soru: {'\t'}</b>
                              {item.question}
                           </p>
                        </div>
                        <div>
                           <b>Cevap:</b> {item.answer}
                        </div>
                     </div>
                  );
               })}
               <button
                  onClick={() => {
                     setOpenQuestionModal(!openQuestionModal);
                  }}>
                  X
               </button>
            </div>
         )}

         {showPDF && <PDFRender resumeId={focusedApplication.userId} />}

         {openConfirmModal && (
            <div className="confirm-modal">
               <div>
                  <p>Bu ilanı silmek istediğinize emin misiniz?</p>
               </div>
               <div>
                  <button className="remove-btn" onClick={handleRemove}>
                     Onayla
                  </button>

                  <button
                     className="dismiss-button"
                     onClick={() => {
                        setopenConfirmModal(!openConfirmModal);
                     }}>
                     X
                  </button>
               </div>
            </div>
         )}
      </>
   );
}
