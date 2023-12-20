import { all, takeLatest } from "redux-saga/effects";
import { getUserListData } from "../sagaActions";
import { getUserListSaga } from "./user";

function* userWatcher() {
  yield takeLatest(getUserListData.type, getUserListSaga);
}

export default function* rootSaga() {
  yield all([userWatcher()]);
}
