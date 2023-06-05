import React, { useRef, useEffect } from 'react';

export default function ScreenSharePreview({ stream }) {
   const localPreviewRef = useRef();

   useEffect(() => {
      const video = localPreviewRef.current;

      video.srcObject = stream;

      video.onloadedmetadata = () => {
         video.play();
      };
   }, [stream]);
   return (
      <div className="local_screen_share_preview">
         <video muted autoPlay ref={localPreviewRef}></video>
      </div>
   );
}
