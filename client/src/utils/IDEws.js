import socketIOClient from 'socket.io-client';
import store from 'stores';
import { setIDEidentity, setIDEroomId } from 'stores/IdeStore';
const ENDPOINT = 'http://localhost:3090';
const socket = socketIOClient(ENDPOINT);

const setMyStates = (data) => {
   store.dispatch(setIDEidentity(data.userID));
   store.dispatch(setIDEroomId(data.roomID));
};

export const joinRoom = (roomID, password) => {
   socket.emit('joinRoom', { roomID, password });
};

export const createRoom = (password) => {
   socket.emit('createRoom', { password });
};

export const updateCode = (code) => {
   socket.emit('codeUpdate', code);
};

export const runCode = (code, language) => {
   socket.emit('runCode', code, language);
};

export const changeLanguage = (selectedLanguage) => {
   socket.emit('changeLanguage', selectedLanguage);
};

export const subscribeToUpdateCode = (callback) => {
   socket.on('updateCode', callback);
};

export const subscribeToOutput = (callback) => {
   socket.on('output', callback);
};

export const subscribeToRoomJoined = (callback) => {
   socket.on('roomJoined', (data) => {
      setMyStates(data);
      callback();
   });
};

export const subscribeToInvalidPassword = (callback) => {
   socket.on('invalidPassword', callback);
};

export const subscribeToRoomNotFound = (callback) => {
   socket.on('roomNotFound', callback);
};

export const subscribeToRoomCreated = (callback) => {
   socket.on('roomCreated', (data) => {
      setMyStates(data);
      callback();
   });
};

export const subscribeToRoomExists = (callback) => {
   socket.on('roomExists', callback);
};

export const subscribeToAlreadyJoined = (callback) => {
   socket.on('alreadyJoined', callback);
};

export const subscribeToLanguageChanged = (callback) => {
   socket.on('LanguageChanged', callback);
};
export const offEditor = () => {
   socket.off('updateCode');
   socket.off('output');
};
