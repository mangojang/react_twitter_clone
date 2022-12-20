import { all, call, delay, fork, put, take, takeLatest } from "@redux-saga/core/effects";
import { LOG_IN, LOG_IN_FAILURE, LOG_IN_SUCCESS } from "../reducers/user";

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
    while (true) {
        yield take(LOG_IN);
        yield delay(2000);
        yield put({
            type: LOG_IN_SUCCESS
        })    
    }
} 

export default function* userSaga(){
    yield all([
        fork(watchLogin)
    ]);
}