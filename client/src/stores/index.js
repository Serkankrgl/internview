import { configureStore } from '@reduxjs/toolkit';

import advertisement from './advertisementStore';
import userStore from './userStore';
import interviewReducer from './interviewStore/interviewReducers';

const store = configureStore({
   reducer: {
      advertisement,
      userStore,
      interviewReducer
   }
});

export default store;
