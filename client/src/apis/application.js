import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const getUserObject = () => {
   return JSON.parse(localStorage.getItem('user'));
};
// Get all Applications
export const getAllApplications = () => {
   return new Promise((resolve, reject) => {
      axios
         .get('/AdvertisementServices/applications/getAll/')
         .then((response) => resolve(response.data))
         .catch((error) => reject(new Error(error)));
   });
};

// Create an Application
export const createApplication = (data) => {
   var userinfo = getUserObject();
   var mdata = { ...data, fullName: userinfo.full_name, userId: userinfo._id };
   return new Promise((resolve, reject) => {
      axios
         .post('/AdvertisementServices/applications/create/', mdata, {
            headers: {
               'Content-Type': 'application/json'
            }
         })
         .then((response) => resolve(response.data))
         .catch((error) => reject(new Error(error)));
   });
};

// Get Application by ID
export const getApplicationById = (applicationId) => {
   return new Promise((resolve, reject) => {
      axios
         .get(`/AdvertisementServices/applications/getById/${applicationId}`)
         .then((response) => resolve(response.data))
         .catch((error) => reject(new Error(error)));
   });
};

// Update an Application
export const updateApplication = (applicationId, data) => {
   return new Promise((resolve, reject) => {
      axios
         .put(`/AdvertisementServices/applications/update/${applicationId}`, data, {
            headers: {
               'Content-Type': 'application/json'
            }
         })
         .then((response) => resolve(response.data))
         .catch((error) => reject(new Error(error)));
   });
};

// Delete an Application
export const deleteApplication = (applicationId) => {
   return new Promise((resolve, reject) => {
      axios
         .delete(`{{hostname}}/AdvertisementServices/applications/delete/${applicationId}`)
         .then((response) => resolve(response.data))
         .catch((error) => reject(new Error(error)));
   });
};

// Get Applications by Advertisement ID
export const getApplicationsByAdId = (advertisementId) => {
   return new Promise((resolve, reject) => {
      axios
         .get(`/AdvertisementServices/applications/getByAdId/${advertisementId}`)
         .then((response) => resolve(response.data))
         .catch((error) => reject(new Error(error)));
   });
};

export const getApplicationsByUserId = (userId) => {
   return new Promise((resolve, reject) => {
      axios
         .get(`/AdvertisementServices/applications/getByUserId/${userId}`)
         .then((response) => resolve(response.data))
         .catch((error) => reject(new Error(error)));
   });
};
