import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({user:{}, errorMessage: ""});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return {...state, user: action.payload}
    },
  }
})


export const { updateUser } = userSlice.actions;

export const userInput = (state) => state.user;

export default userSlice.reducer;