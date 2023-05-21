import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** register user function */
export async function registerUser(credentials) {
   try {
      const { data, status } = await axios.post(`/UserServices/Registries/signup/`, credentials);

      let { full_name, email } = credentials;

      // TODO: kayıt işlemi sonrasında mail gönder
      if (data.error) {
         return Promise.reject({ error: data.error });
      }
      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject({ error });
   }
}

/** login function */
export async function loginUser({ email, password }) {
   try {
      if (email) {
         const { data } = await axios.post('/UserServices/Registries/login/', {
            email,
            password
         });
         console.log('data :>> ', data.error);

         if (data.error) {
            return Promise.reject({ error: data.error });
         }
         return Promise.resolve({ data });
      }
   } catch (error) {
      return Promise.reject({ error: error.error });
   }
}
