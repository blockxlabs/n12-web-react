
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import historyMenuReducer from "../components/menu/history-menu.slice";
import notificationReducer from "../domain/notification/notification.slice";
import snackbarReducer from "../components/snackbar/snackbar.slice";

// import commentReducer from "../features/Comments/commentsSlice";

const middleware = [...getDefaultMiddleware()]
const reducer = {
  historyMenu: historyMenuReducer,
  notification: notificationReducer,
  snackbar: snackbarReducer
}

// const preloadedState = {
//   searchForm: [],
// }

export default configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});