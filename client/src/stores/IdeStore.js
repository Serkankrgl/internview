import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   IDEidentity: '',
   IDEroomId: ''
};

const IdeSlice = createSlice({
   name: 'Ide',
   initialState,
   reducers: {
      setIDEroomId: (state, action) => {
         state.IDEroomId = action.payload;
      },
      setIDEidentity: (state, action) => {
         state.IDEidentity = action.payload;
      }
   }
});

export const { setIDEroomId, setIDEidentity } = IdeSlice.actions;
export default IdeSlice.reducer;
