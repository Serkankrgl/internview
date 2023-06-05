import { configureStore } from '@reduxjs/toolkit';

import advertisement from './advertisementStore';
import userStore from './userStore';
import InterviewStore from './interviewStore';

const store = configureStore({
   reducer: {
      advertisement,
      userStore,
      InterviewStore
   }
});

export default store;
