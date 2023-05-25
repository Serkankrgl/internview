import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export const getRoomExists = async (roomId) => {
   const response = await axios.get(`/WebRTCServices/api/room-exists/${roomId}`);

   return response.data;
};

export const getTURNCredentials = async () => {
   const response = await axios.get(`/WebRTCServices/api/get-turn-credentials`);
   return response.data;
};
