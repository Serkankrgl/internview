import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as webRTCHandler from 'utils/webRTCHandler';
import CameraSection from './components/CameraSection/CameraSection';
import MeetingParticipants from './components/Parts/MeetingParticipant';
import ChatSection from './components/Chat/ChatSection';
import { updateApplication } from 'apis/application';
import 'styles/interview/interview.scss';
export default function Meeting() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { identity, roomId, showOverlay, connectOnlyWithAudio, isRoomHost } = useSelector(
      (state) => state.InterviewStore
   );
   const { Application } = useSelector((state) => state.advertisement);
   useEffect(() => {
      console.log(
         'identity :>> ',
         identity,
         'roomId :>> ',
         roomId,
         'showOverlay :>> ',
         showOverlay,
         'connectOnlyWithAudio :>> ',
         connectOnlyWithAudio,
         'isRoomHost :>> ',
         isRoomHost,
         'Application :>> ',
         Application
      );

      if (!isRoomHost && !roomId) {
         const siteUrl = window.location.origin;
         window.location.href = siteUrl;
      } else {
         webRTCHandler.getLocalPreviewAndInitRoomConnection(
            isRoomHost,
            identity,
            roomId,
            connectOnlyWithAudio
         );
      }
   }, []);

   useEffect(() => {
      console.log('oda id değişti :>> ', roomId);
      let updateAppPromis = updateApplication(Application._id, {
         ...Application,
         interviewLocation: roomId
      });
   }, [roomId, dispatch]);

   return (
      <div className="meeting">
         <div className="video-section">
            <div id="videos_portal"></div>
            <CameraSection />

            {/* <CameraSection /> */}
         </div>
         <div className="content-section">
            {' '}
            <MeetingParticipants />
            <div className="info">
               <div className="box">UserInfo</div>
               <div className="box">UserInfo</div>
               <div className="box">UserInfo</div>
               <div className="box">UserInfo</div>
               <div className="box">UserInfo</div>
               <div className="box">UserInfo</div>
               <div className="box">UserInfo</div>
            </div>
         </div>
         <div className="third-section">
            <ChatSection />
         </div>
      </div>
   );
}
