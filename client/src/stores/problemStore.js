import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   problem: {}
};

const ProblemSlice = createSlice({
   name: 'problem',
   initialState,
   reducers: {
      setProblem: (state, action) => {
         state.problem = action.payload;
      }
   }
});

export const { setProblem } = ProblemSlice.actions;
export default ProblemSlice.reducer;
