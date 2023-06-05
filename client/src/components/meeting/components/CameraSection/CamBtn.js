import React, { useState } from 'react';
import CameraButtonImg from 'assets/camera.svg';
import CameraButtonImgOff from 'assets/cameraOff.svg';
import * as webRTCHandler from 'utils/webRTCHandler';
export default function CamBtn() {
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
