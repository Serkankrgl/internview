import { setDirectChatHistory } from 'stores/interviewStore/interviewActions';
import store from 'stores';

export const appendNewMessageToChatHistory = (data) => {
   const { isAuthor, receiverSocketId, authorSocketId } = data;
   const targetSocketId = isAuthor ? receiverSocketId : authorSocketId;

   const chatHistory = [...store.getState().directChatHistory];
   const userChatHistory = chatHistory.find((h) => h.socketId === targetSocketId);

   const newDirectMessage = {
      isAuthor: data.isAuthor,
      messageContent: data.messageContent,
      identity: data.identity
   };

   const newUserChatHistory = {
      socketId: targetSocketId,
      chatHistory: userChatHistory
         ? [...userChatHistory.chatHistory, newDirectMessage]
         : [newDirectMessage]
   };

   const newChatHistory = userChatHistory
      ? [...chatHistory.filter((h) => h.socketId !== targetSocketId), newUserChatHistory]
      : [...chatHistory, newUserChatHistory];

   store.dispatch(setDirectChatHistory(newChatHistory));
};
