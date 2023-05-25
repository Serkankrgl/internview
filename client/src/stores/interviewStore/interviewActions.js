const Actions = {
   SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
   SET_CONNECT_ONLY_WITH_AUDIO: 'SET_CONNECT_ONLY_WITH_AUDIO',
   SET_IDENTITY: 'SET_IDENTITY',
   SET_ROOM_ID: 'SET_ROOM_ID',
   SET_SHOW_OVERLAY: 'SET_SHOW_OVERLAY',
   SET_PARTICIPANTS: 'SET_PARTICIPANTS',
   SET_MESSAGES: 'SET_MESSAGES',
   SET_ACTIVE_CONVERSATION: 'SET_ACTIVE_CONVERSATION',
   SET_DIRECT_CHAT_HISTORY: 'SET_DIRECT_CHAT_HISTORY',
   SET_SOCKET_ID: 'SET_SOCKET_ID'
};

const createAction = (type) => (payload) => ({
   type,
   payload
});

export const setIsRoomHost = createAction(Actions.SET_IS_ROOM_HOST);
export const setConnectOnlyWithAudio = createAction(Actions.SET_CONNECT_ONLY_WITH_AUDIO);
export const setIdentity = createAction(Actions.SET_IDENTITY);
export const setRoomId = createAction(Actions.SET_ROOM_ID);
export const setShowOverlay = createAction(Actions.SET_SHOW_OVERLAY);
export const setParticipants = createAction(Actions.SET_PARTICIPANTS);
export const setMessages = createAction(Actions.SET_MESSAGES);
export const setActiveConversation = createAction(Actions.SET_ACTIVE_CONVERSATION);
export const setDirectChatHistory = createAction(Actions.SET_DIRECT_CHAT_HISTORY);
export const setSocketId = createAction(Actions.SET_SOCKET_ID);

export default Actions;
