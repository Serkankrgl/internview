import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   advertisement: [],
   selectedAd: {}
};

const advertisement = createSlice({
   name: 'advertisement',
   initialState,
   reducers: {
      setSelectedAd: (state, payload) => {
         state.selectedAd = payload.payload;
      },
      setListOfAds: (state, payload) => {
         console.log('payload :>> ', payload);
         state.advertisement = payload.payload;
      }
   }
});

export const { setSelectedAd, setListOfAds } = advertisement.actions;
export default advertisement.reducer;
