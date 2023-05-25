import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'styles/interview/interview.scss';
import { getApplicationById } from 'apis/application';
import { getRoomExists } from 'apis/webRtcApis';
import { setIsRoomHost } from 'stores/interviewStore/interviewActions';
import { useDispatch } from 'react-redux';
export default function Interview() {
   const { id } = useParams();
   const [application, setApplication] = useState({});
   const dispatch = useDispatch();
   useEffect(() => {
      // connectSocketIO();
      let apPromise = getApplicationById(id);

      apPromise.then(async (res) => {
         setApplication(res);
         if (!application.interviewLocation) {
            const responseMessage = await getRoomExists(application.interviewLocation);
            const { roomExists, full } = responseMessage;

            if (!roomExists) {
               dispatch(setIsRoomHost(true));
            }
         } else {
            dispatch(setIsRoomHost(true));
         }
      });
   }, []);

   return (
      <div>
         <div className="video-section">test</div>
         <div className="content-section">
            {application.interviewLocation}
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
         <div className="third-section">{/* TODO: Chat section goes here*/}</div>
      </div>
   );
}
