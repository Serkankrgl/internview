import React from 'react';
import ChatLabel from './ChatLabel';
import MessageHistory from './MessageHistory';
import NewMessage from './NewMessage';
export default function ChatSection() {
   return (
      <div className="chat_section_container">
         <ChatLabel />
         <MessageHistory />
         <NewMessage />
      </div>
   );
}
