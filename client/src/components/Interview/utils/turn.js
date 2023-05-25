import * as api from 'apis/webRtcApis';

let turnIceServers = null;

export const fetchTURNCredentials = async () => {
   try {
      const responseData = await api.getTURNCredentials();

      if (responseData.token?.iceServers) {
         turnIceServers = responseData.token.iceServers;
      }

      return turnIceServers;
   } catch (error) {
      console.log('Error fetching TURN credentials:', error);
      return null;
   }
};

export const getTurnIceServers = () => {
   return turnIceServers;
};
