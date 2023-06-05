import React from 'react';
import Participants from './Participants';
export default function MeetingParticipant() {
   return (
      <>
         <div className="participants_label_container">
            <p className="participants_label_paragraph">Katılımcılar</p>
         </div>
         <Participants />
      </>
   );
}
