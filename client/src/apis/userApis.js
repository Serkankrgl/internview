import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const getUserId = () => {
   return localStorage.getItem('user_id');
};

export async function updateResume(payload) {
   try {
      var req = { _id: getUserId(), resume: payload };
      const { data } = await axios.post('UserServices/Users/updateResume', req);
      if (data.error) return Promise.reject({ error: data.error });

      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject(error);
   }
}

export async function getResumeById(payload) {
   try {
      var req = { _id: getUserId() };
      console.log('idx :>> ', JSON.stringify(req));

      const { data } = await axios({
         method: 'GET',
         url: 'UserServices/Users/getResume/' + getUserId(),
         headers: { 'Content-Type': 'application/json' }
      });

      if (data.error) return Promise.reject({ error: data.error });

      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject(error);
   }
}
