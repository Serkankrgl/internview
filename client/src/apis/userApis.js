import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const getUserId = () => {
   var x = JSON.parse(localStorage.getItem('user'));
   JSON.parse(localStorage.getItem('user'));
   console.log('object2 :>> ', x);
   return x._id;
};

export async function updateResume(payload) {
   try {
      var req = { _id: getUserId(), resume: payload };
      const { data } = await axios.post('UserServices/Users/updateResume/', req);
      if (data.error) return Promise.reject({ error: data.error });

      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject(error);
   }
}

export async function getResumeById(payload) {
   try {
      var userId = null;
      if (!payload) {
         userId = getUserId();
      } else {
         userId = payload;
         console.log('userID :>> ', userId);
      }

      const { data } = await axios({
         method: 'GET',
         url: '/UserServices/Users/getResume/' + userId,
         headers: { 'Content-Type': 'application/json' }
      });

      if (data.error) return Promise.reject({ error: data.error });

      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject(error);
   }
}
