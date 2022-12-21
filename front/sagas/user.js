import { all, call, delay, fork, put, take, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_IN_SUCCESS } from "../reducers/user";

function* loginAPI(){

}

function* login(){
    try {
        yield call(loginAPI)
        yield put({
            type: LOG_IN_SUCCESS
        })
    } catch (error) {
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login)
} 

export default function* userSaga(){
    yield all([
        fork(watchLogin)
    ]);
}