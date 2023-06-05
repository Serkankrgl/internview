import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as webRTCHandler from '../../utils/webRTCHandler';
import VideoSection from './components/VideoComponents/VideoSection';
import { updateApplication } from 'apis/application';
import 'styles/interview/VideoSection.scss';
import CodeEditor from './components/IDE/CodeEditor';
import ScreenSharePreview from './components/VideoComponents/ScreenSharePreview';
export default function Interview() {
   let { isRoomHost, roomId, identity, showOverlay, connectOnlyWithAudio, isScreenSharingActive } =
      useSelector((state) => state.interviewReducer);
   let { Application } = useSelector((state) => state.advertisement);
   const [share, setShare] = useState(false);
   var dispatch = useDispatch();
   useEffect(() => {
      console.log(isRoomHost, roomId, identity, showOverlay, connectOnlyWithAudio);
      if (!isRoomHost && !roomId) {
         console.log('object :>> ', isRoomHost, roomId);
         const siteUrl = window.location.origin;
         // window.location.href = siteUrl;
      }
   }, []);

   useEffect(() => {
      console.log('roomId change:>> ', roomId);
      var app = { ...Application, interviewLocation: roomId };
      console.log('app :>> ', app);
      let prom = updateApplication(app._id, app);
   }, [roomId, dispatch]);

   return (
      <div>
         <div className="video-section">
            <div id="videos_portal"></div>
            <VideoSection />
         </div>
         <div className="content-section">
            {' '}
            <CodeEditor />
         </div>
         <div className="third-section">
            <div className="message-1">merhaba</div>
            <input className="MessageBox" type="text"></input>
            <button className="send-button">Gönder</button>
            {/* TODO: Chat section goes here*/}
         </div>
      </div>
   );
}
