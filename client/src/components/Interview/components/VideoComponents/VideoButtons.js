import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import LeaveButton from './LeaveButton';
import ScreenShareButton from './ScreenShareButton';
export default function VideoButton() {
   let { connectOnlyWithAudio } = useSelector((state) => state.interviewReducer);
   return (
      <div className="video_buttons_container">
         <MicButton />
         {!connectOnlyWithAudio && <CameraButton />}

         <LeaveButton />

         {!connectOnlyWithAudio && <ScreenShareButton />}
      </div>
   );
}
