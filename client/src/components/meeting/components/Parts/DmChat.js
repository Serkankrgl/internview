import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
const getDmChatHistory = (directChatHistory, socketId = null) => {
   console.log('directChatHistory :>> ', directChatHistory);
   console.log('socketId :>> ', socketId);
   if (!socketId || !directChatHistory) {
      return [];
   }
   const history = directChatHistory.find((h) => h.socketId === socketId);

   return history ? history.chatHistory : [];
};

export default function DmChat() {
   const [messages, setMessages] = useState([]);

   const { activeConversation, directChatHistory } = useSelector((state) => state.InterviewStore);
   useEffect(() => {
      setMessages(
         getDmChatHistory(
            directChatHistory,
            activeConversation ? activeConversation.socketId : null
         )
      );
   }, [activeConversation, directChatHistory]);
   return (
      <div className="direct_chat_container">
         <DirectChatHeader activeConversation={activeConversation} />
         <MessagesContainer messages={messages} />
         <NewMessage />
         {!activeConversation && <ConversationNotChosen />}
      </div>
   );
}
