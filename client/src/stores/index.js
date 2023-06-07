import { configureStore } from '@reduxjs/toolkit';

import advertisement from './advertisementStore';
import userStore from './userStore';
import InterviewStore from './interviewStore';
import IdeStore from './IdeStore';

const store = configureStore({
   reducer: {
      advertisement,
      userStore,
      InterviewStore,
      IdeStore
   }
});

export default store;
