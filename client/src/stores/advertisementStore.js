import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   advertisement: [],
   selectedAd: {},
   adToApply: {}
};

const advertisement = createSlice({
   name: 'advertisement',
   initialState,
   reducers: {
      setSelectedAd: (state, payload) => {
         state.selectedAd = payload.payload;
      },
      setAdToApply: (state, payload) => {
         state.adToApply = payload.payload;
      },
      setListOfAds: (state, payload) => {
         console.log('payload :>> ', payload);
         state.advertisement = payload.payload;
      }
   }
});

export const { setSelectedAd, setListOfAds, setAdToApply } = advertisement.actions;
export default advertisement.reducer;
