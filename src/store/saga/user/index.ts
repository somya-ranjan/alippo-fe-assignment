import { AxiosResponse } from "axios";
import { put } from "redux-saga/effects";
import {
  getUserListStart,
  getUserListSuccess,
  getUserListFailed,
} from "../../sagaActions";
import errorHandler from "../../../utility/errorHandler";
import toaster from "../../../lib/toaster";

export function* getUserListSaga() {
  yield put(getUserListStart());
  yield errorHandler({
    endpoint: `data.json`,
    successHandler: yield function* (response: AxiosResponse<any>) {
      yield put(getUserListSuccess(response));
    },
    failHandler: yield function* (response: string) {
      yield put(getUserListFailed());
      toaster.error(response);
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}
