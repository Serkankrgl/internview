import React, { useEffect, useState } from 'react';
import { getAdvertisementById } from 'apis/advertisement';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import 'styles/shared/FormElements.scss';
import { getRoomExists } from 'apis/webRtcApis';
import { setRoomId } from 'stores/interviewStore';
import { useDispatch } from 'react-redux';
import { setApplication } from 'stores/advertisementStore';
export default function InviteContent({ Application }) {
   const [advertisement, setAdvertisement] = useState({});
   const [currentRoomExists, setCurrentRoomExists] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const getAdvertisement = () => {
      let adPromis = getAdvertisementById(Application.advertisementId);
      toast.promise(adPromis, {
         loading: 'İşlem Yapılıyor...',
         success: 'İşlemi başarılı...!',
         error: (err) => err?.response?.data?.msg ?? 'Bir şeyler yanlış gitti'
      });

      adPromis.then((res) => {
         setAdvertisement(res);
      });
   };

   useEffect(async () => {
      const responseMessage = await getRoomExists(Application.interviewLocation);
      const { roomExists, full } = responseMessage;
      setCurrentRoomExists(roomExists);
      getAdvertisement();
   }, []);

   const handleJoinInterview = () => {
      dispatch(setApplication(Application));
      if (currentRoomExists) {
         dispatch(setRoomId(Application.interviewLocation));

         navigate(`/JoinMeeting`);
      } else {
         dispatch(setRoomId(null));
         navigate(`/JoinMeeting?host=true`);
      }
   };

   return (
      <div className="invite-content">
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
            <div className="ap-button-group">
               <button onClick={handleJoinInterview}>Mülakata katıl</button>
            </div>
         </div>
      </div>
   );
}
