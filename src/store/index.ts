import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// // static import
import rootSaga from "./saga";
import { authReducer, userReducer } from "./reducer";

// setup saga middleware
const sagaMiddleware = createSagaMiddleware();

// create root reducer
const rootReducer = {
  auth: authReducer,
  user: userReducer,
};

// setup store
const Store = configureStore({
  reducer: rootReducer,
  //   devTools: process.env.REACT_APP_ENV_STATUS !== "production",
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
