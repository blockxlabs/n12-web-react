import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const snackbarAdapter = createEntityAdapter();

const initialState = snackbarAdapter.getInitialState({isOpen: false , type:"",message:""});

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      return {...state, isOpen:true,type: action.payload.type,message: action.payload.message}
      },
    closeSnackbar: (state, action) => {
      return {...state, isOpen:false,type: "",message: ""}
      },  
  }
})


export const { openSnackbar,closeSnackbar } = snackbarSlice.actions;

export const Snackbar = (state) => state.snackbar;

export default snackbarSlice.reducer;