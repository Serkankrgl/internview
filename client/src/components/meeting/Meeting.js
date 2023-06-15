import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as webRTCHandler from 'utils/webRTCHandler';
import CameraSection from './components/CameraSection/CameraSection';
import MeetingParticipants from './components/Parts/MeetingParticipant';
import ChatSection from './components/Chat/ChatSection';
import { updateApplication } from 'apis/application';
import 'styles/interview/interview.scss';
import IDE from 'components/shared/IDE';

import {
   joinRoom,
   createRoom,
   subscribeToRoomJoined,
   subscribeToInvalidPassword,
   subscribeToRoomNotFound,
   subscribeToRoomCreated,
   subscribeToRoomExists,
   subscribeToAlreadyJoined
} from 'utils/IDEws';
import { setApplication } from 'stores/advertisementStore';

export default function Meeting() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const Pass = '6469a94107ab213f265ceeaf';
   const [IDERoom, setIDERoom] = useState('');
   const [Room, setRoom] = useState('');
   const { identity, roomId, showOverlay, connectOnlyWithAudio, isRoomHost } = useSelector(
      (state) => state.InterviewStore
   );
   const { IDEidentity, IDEroomId } = useSelector((state) => state.IdeStore);
   const { Application } = useSelector((state) => state.advertisement);
   useEffect(() => {
      subscribeToRoomJoined((data) => {
         console.log('create :>> ', data);
      });
      subscribeToRoomCreated((data) => {
         console.log('join :>> ', data);
      });
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

      if (isRoomHost) {
         createRoom(Pass);
      } else {
         console.log('object :>> ', Application);
         joinRoom(Application.IDERoomId, Pass);
      }
   }, []);

   useEffect(() => {
      var x = {
         IDERoomId: IDEroomId,
         IDERoomPass: Pass
      };

      let updateAppPromis = updateApplication(Application._id, x);
      updateAppPromis.then((data) => {
         setApplication(data);
      });
   }, [IDEroomId, dispatch]);

   useEffect(() => {
      let updateAppPromis = updateApplication(Application._id, {
         interviewLocation: roomId
      });
      updateAppPromis.then((data) => {
         setApplication(data);
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
            {/* <MeetingParticipants />
            {IDEroomId}
            <div>{IDEidentity}</div> */}
            <IDE />
         </div>
         <div className="third-section">
            <ChatSection />
         </div>
      </div>
   );
}
