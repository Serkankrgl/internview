import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const getUserObject = () => {
   return JSON.parse(localStorage.getItem('user'));
};
export async function listAds(payload) {
   try {
      const { data } = await axios.get('/AdvertisementServices/Advertisement/listAds/', payload);

      if (data.error) {
         return Promise.reject({ error: data.error });
      }
      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject({ error });
   }
}

export async function createAd(payload) {
   var userInfo = getUserObject();
   var mPayload = { ...payload, ad_owner: userInfo.full_name, ad_owner_id: userInfo._id };

   try {
      const { data } = await axios.post('/AdvertisementServices/Advertisement/createAd/', mPayload);

      if (data.error) {
         return Promise.reject({ error: data.error });
      }
      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject({ error });
   }
}

export const getAdsByOwnerId = () => {
   return new Promise((resolve, reject) => {
      axios
         .get(`/AdvertisementServices/Advertisement/getAdsByOwnerId/${getUserObject()._id}`)
         .then((response) => resolve(response.data))
         .catch((error) => reject(new Error(error)));
   });
};

export const getAdvertisementById = (AdvertisementID) => {
   return new Promise((resolve, reject) => {
      axios
         .get(`/AdvertisementServices/Advertisement/getAdvertisementById/${AdvertisementID}`)
         .then((response) => resolve(response.data))
         .catch((error) => reject(new Error(error)));
   });
};

export const AdvertisementsByUserId = async (userId) => {
   try {
      const response = await axios.get(
         `/AdvertisementServices/Advertisement/advertisements/${userId}`
      );
      return response.data;
   } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching advertisements.');
   }
};

export const removeAdvertisementsById = async (AdId) => {
   try {
      const response = await axios.delete(`/AdvertisementServices/Advertisement/deleteAd/${AdId}`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw new Error('An error occurred while deleting advertisements.');
   }
};

export async function updateAd() {}

export async function removeAd() {}
