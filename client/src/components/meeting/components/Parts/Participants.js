import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveConversation } from 'stores/interviewStore';
function SingleParticipant({ identity, lastItem, participant, socketId }) {
   const dispatch = useDispatch();
   const handleOpenActiveChatbox = () => {
      if (participant.socketId !== socketId) {
         dispatch(setActiveConversation(participant));
      }
   };

   return (
      <>
         <p className="participants_paragraph" onClick={handleOpenActiveChatbox}>
            {identity}
         </p>
         {!lastItem && <span className="participants_separator_line"></span>}
      </>
   );
}

export default function Participants() {
   const { participants, socketId } = useSelector((state) => state.InterviewStore);

   return (
      <div className="participants_container">
         {participants.map((participant, index) => {
            return (
               <SingleParticipant
                  key={participant.identity}
                  lastItem={participants.length === index + 1}
                  participant={participant}
                  identity={participant.identity}
                  socketId={socketId}
               />
            );
         })}
      </div>
   );
}
