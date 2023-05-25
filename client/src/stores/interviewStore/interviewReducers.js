import Actions from './interviewActions.js';

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

const interviewReducer = (state = initialState, action) => {
   switch (action.type) {
      case Actions.SET_IS_ROOM_HOST:
         return { ...state, isRoomHost: action.payload };
      case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
         return { ...state, connectOnlyWithAudio: action.payload };
      case Actions.SET_ROOM_ID:
         return { ...state, roomId: action.payload };
      case Actions.SET_IDENTITY:
         return { ...state, identity: action.payload };
      case Actions.SET_SHOW_OVERLAY:
         return { ...state, showOverlay: action.payload };
      case Actions.SET_PARTICIPANTS:
         return { ...state, participants: action.payload };
      case Actions.SET_MESSAGES:
         return { ...state, messages: action.payload };
      case Actions.SET_ACTIVE_CONVERSATION:
         return { ...state, activeConversation: action.payload };
      case Actions.SET_DIRECT_CHAT_HISTORY:
         return { ...state, directChatHistory: action.payload };
      case Actions.SET_SOCKET_ID:
         return { ...state, socketId: action.payload };
      default:
         return state;
   }
};

export default interviewReducer;
