import { all, call, delay, fork, put, take, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_IN_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../reducers/user";

function* loginAPI(){

}
function* login(){
    try {
        yield call(loginAPI)
        yield put({
            type: LOG_IN_SUCCESS
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login)
}

function* signUpAPI(){

}
function* signUp(){
    try {
        yield call(signUpAPI)
        yield put({
            type: SIGN_UP_SUCCESS
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: SIGN_UP_FAILURE
        })
    }
}
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}


export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignUp)
    ]);
}