import React, { useEffect, useState } from 'react';
// import { setIsRoomHost, setRoomId, setIdentity } from 'stores/interviewStore/interviewActions';
import { setApplication } from 'stores/advertisementStore';
import { getApplicationById } from 'apis/application';
import { getRoomExists } from 'apis/webRtcApis';
import PreInterviewContent from './PreInterviewContent';
import * as webRTCHandler from '../../utils/webRTCHandler';
import { Interview } from 'components/Interview';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
export default function PreInterview() {
   const dispatch = useDispatch();
   const { id } = useParams();
   let locationx = null;
   const [isLoading, setIsLoading] = useState(true);
   const [CurrentApplication, setCurrentApplication] = useState({});
   const [isHost, setIsHost] = useState(false);
   const [identity, setIdentity] = useState('');
   const [roomId, setmyRoomId] = useState(null);
   const [connectOnlyWithAudio, setConnectOnlyWithAudio] = useState(false);

   const navigate = useNavigate();
   useEffect(async () => {
      let appPromise = getApplicationById(id);
      appPromise.then(async (res) => {
         locationx = res.interviewLocation;

         const responseMessage = await getRoomExists(locationx);
         const { roomExists, full } = responseMessage;
         console.log('roomExists :>> ', roomExists);
         if (!roomExists) {
            dispatch(setRoomId(null));
            dispatch(setIsRoomHost(true));
            setIsHost(true);
            setmyRoomId(null);
         } else {
            setmyRoomId(locationx);
         }

         setCurrentApplication(res);
         dispatch(setApplication(res));
      });
      let user = JSON.parse(localStorage.getItem('user'));
      dispatch(setIdentity(user._id));
      setIdentity(user._id);
   }, []);

   const handleJoinRoom = async () => {
      console.log('Application :>> ', CurrentApplication);
      console.log('oda oluştur :>> ', isHost, identity, roomId, connectOnlyWithAudio);
      webRTCHandler.getLocalPreviewAndInitRoomConnection(
         isHost,
         identity,
         roomId,
         connectOnlyWithAudio
      );
      setIsLoading(false);
   };

   return (
      <>
         {isLoading ? (
            <div className="join_room_page_container">
               <div className="join_room_page_panel">
                  {/* <img src={logo} className="join_room_page_img"></img> */}
               </div>
               <div className="join_room_page_panel">
                  <p className="join_room_title">Toplantıya katıl</p>;
                  <button onClick={handleJoinRoom}></button>
               </div>
            </div>
         ) : (
            <Interview />
         )}
      </>
   );
}
