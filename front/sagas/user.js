import { all, call, delay, fork, put, take, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_IN_SUCCESS, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../reducers/user";

function* loginAPI(){

}
function* login(){
    try {
        //yield call(loginAPI)
        yield delay(2000)
        yield put({
            type: LOG_IN_SUCCESS
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: LOG_IN_FAILURE,
            error: e
        })
    }
}
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login)
}

function* logoutAPI(){

}
function* logout(){
    try {
        //yield call(logoutAPI)
        yield delay(2000)
        yield put({
            type: LOG_OUT_SUCCESS
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: LOG_OUT_FAILURE,
            error: e
        })
    }
}
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout)
}

function* signUpAPI(){

}
function* signUp(){
    try {
        //yield call(signUpAPI)
        yield delay(2000)
        yield put({
            type: SIGN_UP_SUCCESS
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: SIGN_UP_FAILURE,
            error: e
        })
    }
}
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}


export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp)
    ]);
}