import React, { useState } from 'react';
import * as webRTCHandler from '../../../../utils/webRTCHandler';
import CameraButtonImg from 'assets/camera.svg';
import CameraButtonImgOff from 'assets/cameraOff.svg';
export default function CameraButton() {
   const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

   const handleCameraButtonPressed = () => {
      webRTCHandler.toggleCamera(isLocalVideoDisabled);

      setIsLocalVideoDisabled(!isLocalVideoDisabled);
   };
   return (
      <div className="video_button_container">
         <img
            src={isLocalVideoDisabled ? CameraButtonImgOff : CameraButtonImg}
            className="video_button_image"
            onClick={handleCameraButtonPressed}
         />
      </div>
   );
}
