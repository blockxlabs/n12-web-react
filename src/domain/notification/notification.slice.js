import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const notificationAdapter = createEntityAdapter();

const initialState = notificationAdapter.getInitialState({selectedNotifications: [], selectedDapp:""});

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateSelectedNotifications: (state, action) => {
      return {...state, selectedNotifications: [...action.payload]}
      },
    updateSelectedDapp: (state, action) => {
      return {...state, selectedDapp: action.payload}
    },
  }
})


export const { updateSelectedNotifications,updateSelectedDapp } = notificationSlice.actions;

export const Notification = (state) => state.notification;

export default notificationSlice.reducer;