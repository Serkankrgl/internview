import React, { useState } from 'react';
import * as webRTCHandler from 'utils/webRTCHandler';
import SwitchImg from 'assets/switchToScreenSharing.svg';
import ShareScrnContent from './ShareScrnContent';
const constraints = {
   audio: false,
   video: true
};

export default function ShareScrnBtn() {
   const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
   const [screenSharingStream, setScreenSharingStream] = useState(null);

   const handleScreenShareToggle = async () => {
      if (!isScreenSharingActive) {
         let stream = null;
         try {
            stream = await navigator.mediaDevices.getDisplayMedia(constraints);
         } catch (err) {
            console.log('error occurred when trying to get an access to screen share stream');
         }
         if (stream) {
            setScreenSharingStream(stream);

            webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
            setIsScreenSharingActive(true);
            // execute here function to switch the video track which we are sending to other users
         }
      } else {
         webRTCHandler.toggleScreenShare(isScreenSharingActive);
         setIsScreenSharingActive(false);

         // stop screen share stream
         screenSharingStream.getTracks().forEach((t) => t.stop());
         setScreenSharingStream(null);
      }
   };

   return (
      <>
         <div className="video_button_container">
            <img src={SwitchImg} onClick={handleScreenShareToggle} className="video_button_image" />
         </div>
         {isScreenSharingActive && <ShareScrnContent stream={screenSharingStream} />}
      </>
   );
}
