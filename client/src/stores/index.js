import { configureStore } from '@reduxjs/toolkit';

import advertisement from './advertisementStore';
import userStore from './userStore';
import InterviewStore from './interviewStore';
import IdeStore from './IdeStore';
import problemStore from './problemStore';

const store = configureStore({
   reducer: {
      advertisement,
      userStore,
      InterviewStore,
      IdeStore,
      problemStore
   }
});

export default store;
