import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { setRoomId, setIdentity } from 'stores/interviewStore/interviewActions';
import { getRoomExists } from 'apis/webRtcApis';

import { getApplicationById } from 'apis/application';
export default function PreInterviewContent({ locationx }) {
   let { isRoomHost, roomId } = useSelector((state) => state.interviewReducer);
   let { Application } = useSelector((state) => state.advertisement);

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [errorMessage, setErrorMessage] = useState(null);
   const [xroomId, setxRoomId] = useState(null);

   useEffect(() => {
      setxRoomId(roomId);
   }, [roomId, dispatch]);

   const handleJoinRoom = async () => {
      let user = JSON.parse(localStorage.getItem('user'));
      dispatch(setIdentity(user._id));
      if (isRoomHost) {
         createRoom();
      } else {
         console.log(' JOIN isRoomHost :>> ', isRoomHost);
         await joinRoom();
      }
   };
   const joinRoom = async () => {
      const responseMessage = await getRoomExists(Application.interviewLocation);
      console.log('Application.interviewLocation :>> ', Application.interviewLocation);
      const { roomExists, full } = responseMessage;
      console.log('roomExists2 :>> ', roomExists);
      if (roomExists) {
         if (full) {
            setErrorMessage('Toplantı dolu. Daha sonra tekrar deneyin...');
         } else {
            // join a room !
            setRoomId(roomId);
            console.log('JOIN :>> ');
            navigate(`/interview/${Application.interviewLocation}`);
            // history.push('/room');
         }
      } else {
         setErrorMessage('Toplantı bulunamadı.Toplantı id sini kontrol edin...');
      }
   };
   const createRoom = () => {
      console.log('CREATE :>> ');
      navigate(`/interview/${roomId}`);
      //   history.push('/room');
   };
   return (
      <>
         <button onClick={handleJoinRoom}></button>
      </>
   );
}
