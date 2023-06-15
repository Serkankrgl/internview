import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// Problem ekleme
export const createProblem = async (problemData) => {
   try {
      const response = await axios.post('/ProblemService/problems/Create/', problemData);
      return response.data;
   } catch (error) {
      console.log('error :>> ', error);
      throw new Error('Problem eklenemedi.', error);
   }
};

// Tüm problemleri listeleme
export const getAllProblems = async () => {
   try {
      const response = await axios.get('/ProblemService/problems/getAll/');
      return response.data;
   } catch (error) {
      throw new Error('Problemler alınamadı.');
   }
};

// Belirli bir problemi görüntüleme
export const getProblemById = async (problemId) => {
   try {
      const response = await axios.get(`/ProblemService/problems/${problemId}`);
      return response.data;
   } catch (error) {
      throw new Error('Problem alınamadı.');
   }
};

// Problem güncelleme
export const updateProblem = async (problemId, problemData) => {
   try {
      const response = await axios.put(`/ProblemService/problems/${problemId}`, problemData);
      return response.data;
   } catch (error) {
      throw new Error('Problem güncellenemedi.');
   }
};

// Problem silme
export const deleteProblem = async (problemId) => {
   try {
      const response = await axios.delete(`/ProblemService/problems/${problemId}`);
      return response.data;
   } catch (error) {
      throw new Error('Problem silinemedi.');
   }
};
