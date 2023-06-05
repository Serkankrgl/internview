import React from 'react';
import exitimg from 'assets/exit.svg';
export default function LeaveButton() {
   const handleRoomDisconnection = () => {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
   };
   return (
      <div className="video_button_container">
         <img src={exitimg} className="video_button_image" onClick={handleRoomDisconnection} />
      </div>
   );
}
