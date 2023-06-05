import React from 'react';
import MicBtn from './MicBtn';
import CamBtn from './CamBtn';
import LeaveBtn from './LeaveBtn';
import ShareScrnBtn from './ShareScrnBtn';
import { useSelector } from 'react-redux';
export default function CameraButtons() {
   const { connectOnlyWithAudio } = useSelector((state) => state.InterviewStore);
   return (
      <>
         <MicBtn />
         {!connectOnlyWithAudio && <CamBtn />}
         <LeaveBtn />
         {!connectOnlyWithAudio && <ShareScrnBtn />}
      </>
   );
}
