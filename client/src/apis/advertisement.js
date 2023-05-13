import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function listAds(payload) {
   try {
      const { data } = await axios.get('AdvertisementServices/Advertisement/listAds', payload);

      if (data.error) {
         return Promise.reject({ error: data.error });
      }
      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject({ error });
   }
}

export async function createAd(payload) {
   try {
      const { data } = await axios.post('AdvertisementServices/Advertisement/createAd', payload);

      if (data.error) {
         return Promise.reject({ error: data.error });
      }
      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject({ error });
   }
}

export async function updateAd() {}

export async function removeAd() {}
