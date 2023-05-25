import io from 'socket.io-client';
import { setRoomId, setParticipants, setSocketId } from 'stores/interviewStore/interviewActions';
import * as webRTCHandler from './webRtcHandler';
import store from 'stores';
import { appendNewMessageToChatHistory } from './dm';

const SERVER = 'http://localhost:5002';
let socket = null;

export const connectWithSocketIOServer = () => {
   socket = io(SERVER);

   socket.on('connect', handleSocketConnect);
   socket.on('room-id', handleRoomId);
   socket.on('room-update', handleRoomUpdate);
   socket.on('conn-prepare', handleConnectionPrepare);
   socket.on('conn-signal', handleConnectionSignal);
   socket.on('conn-init', handleConnectionInit);
   socket.on('user-disconnected', handleUserDisconnected);
   socket.on('direct-message', handleDirectMessage);
};

const handleSocketConnect = () => {
   console.log('Successfully connected with Socket.io server');
   console.log(socket.id);
   store.dispatch(setSocketId(socket.id));
};

const handleRoomId = (data) => {
   const { roomId } = data;
   store.dispatch(setRoomId(roomId));
};

const handleRoomUpdate = (data) => {
   const { connectedUsers } = data;
   store.dispatch(setParticipants(connectedUsers));
};

const handleConnectionPrepare = (data) => {
   const { connUserSocketId } = data;
   webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
   socket.emit('conn-init', { connUserSocketId });
};

const handleConnectionSignal = (data) => {
   webRTCHandler.handleSignalingData(data);
};

const handleConnectionInit = (data) => {
   const { connUserSocketId } = data;
   webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
};

const handleUserDisconnected = (data) => {
   webRTCHandler.removePeerConnection(data);
};

const handleDirectMessage = (data) => {
   appendNewMessageToChatHistory(data);
};

export const createNewRoom = (identity, onlyAudio) => {
   const data = {
      identity,
      onlyAudio
   };
   socket.emit('create-new-room', data);
};

export const joinRoom = (identity, roomId, onlyAudio) => {
   const data = {
      roomId,
      identity,
      onlyAudio
   };
   socket.emit('join-room', data);
};

export const signalPeerData = (data) => {
   socket.emit('conn-signal', data);
};

export const sendDirectMessage = (data) => {
   socket.emit('direct-message', data);
};
