import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   identity: '',
   isRoomHost: false,
   connectOnlyWithAudio: false,
   roomId: null,
   showOverlay: true,
   participants: [],
   messages: [],
   activeConversation: null,
   directChatHistory: [],
   socketId: null
};

const interviewSlice = createSlice({
   name: 'interview',
   initialState,
   reducers: {
      setIsRoomHost: (state, action) => {
         state.isRoomHost = action.payload;
      },
      setConnectOnlyWithAudio: (state, action) => {
         state.connectOnlyWithAudio = action.payload;
      },
      setRoomId: (state, action) => {
         console.log('action :>> ', action);
         state.roomId = action.payload;
      },
      setIdentity: (state, action) => {
         state.identity = action.payload;
      },
      setShowOverlay: (state, action) => {
         state.showOverlay = action.payload;
      },
      setParticipants: (state, action) => {
         state.participants = action.payload;
      },
      setMessages: (state, action) => {
         state.messages = action.payload;
      },
      setActiveConversation: (state, action) => {
         state.activeConversation = action.payload;
      },
      setDirectChatHistory: (state, action) => {
         state.directChatHistory = action.payload;
      },
      setSocketId: (state, action) => {
         state.socketId = action.payload;
      }
   }
});

export const {
   setIsRoomHost,
   setConnectOnlyWithAudio,
   setRoomId,
   setIdentity,
   setShowOverlay,
   setParticipants,
   setMessages,
   setActiveConversation,
   setDirectChatHistory,
   setSocketId
} = interviewSlice.actions;
export default interviewSlice.reducer;
