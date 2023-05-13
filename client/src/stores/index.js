import { configureStore } from '@reduxjs/toolkit';

import advertisement from './advertisementStore';
import userStore from './userStore';

const store = configureStore({
   reducer: {
      advertisement,
      userStore
   }
});

export default store;
