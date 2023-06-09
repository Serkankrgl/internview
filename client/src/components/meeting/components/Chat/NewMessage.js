import React, { useState } from 'react';
import SendMessageButton from 'assets/sendMessageButton.svg';
import * as webRTCHandler from 'utils/webRTCHandler';
export default function NewMessage() {
   const [message, setMessage] = useState('');

   const handleTextChange = (event) => {
      setMessage(event.target.value);
   };

   const handleKeyPressed = (event) => {
      if (event.key === 'Enter') {
         event.preventDefault();

         // send message to other users
         sendMessage();
      }
   };

   const sendMessage = () => {
      if (message.length > 0) {
         webRTCHandler.sendMessageUsingDataChannel(message);
         setMessage('');
      }
   };

   return (
      <div className="new_message_container">
         <input
            className="new_message_input"
            value={message}
            onChange={handleTextChange}
            placeholder="Mesaj yazınız ..."
            type="text"
            onKeyDown={handleKeyPressed}
         />

         <button className="new_message_button" onClick={sendMessage}>
            <img src={SendMessageButton} />
         </button>
      </div>
   );
}
