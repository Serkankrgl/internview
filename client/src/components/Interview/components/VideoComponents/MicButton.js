import React, { useState } from 'react';
import * as webRTCHandler from '../../../../utils/webRTCHandler';
import MicButtonImg from 'assets/mic.svg';
import MicButtonImgOff from 'assets/micOff.svg';
export default function MicButton() {
   const [isMicMuted, setIsMicMuted] = useState(false);
   const handleMicButtonPressed = () => {
      webRTCHandler.toggleMic(isMicMuted);

      setIsMicMuted(!isMicMuted);
   };
   return (
      <div className="video_button_container">
         <img
            src={isMicMuted ? MicButtonImgOff : MicButtonImg}
            onClick={handleMicButtonPressed}
            className="video_button_image"
         />
      </div>
   );
}
