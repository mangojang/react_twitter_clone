import { all, call, delay, fork, put, take, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { 
    LOG_IN_REQUEST, 
    LOG_IN_FAILURE, 
    LOG_IN_SUCCESS, 
    LOG_OUT_REQUEST, 
    LOG_OUT_SUCCESS, 
    LOG_OUT_FAILURE, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAILURE, 
    LOAD_USER_REQUEST, 
    LOAD_USER_SUCCESS, 
    LOAD_USER_FAILURE 
} from "../reducers/user";

const axios = require('axios')

function loginAPI(data){
    return axios.post(`/user/login`, data, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* login(action){
    const { response, error } = yield call(loginAPI, action.data)
    if (response){
        yield put({
            type: LOG_IN_SUCCESS,
            data: response.data
        })
    }else{
        yield put({
            type: LOG_IN_FAILURE,
            error: error
        })
    }
}
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login)
}

function logoutAPI(){
    return axios.post(`/user/logout`, {}, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* logout(){
    const { response, error } = yield call(logoutAPI)
    if (response){
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    }else{
        yield put({
            type: LOG_OUT_FAILURE,
            error: error
        })
    }
}
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout)
}

function signUpAPI(data){
    return axios.post(`/user/`, data)
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* signUp(action){
    const { response, error } = yield call(signUpAPI, action.data,{
        withCredentials: true
    })
    if (response){
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    }else{
        yield put({
            type: SIGN_UP_FAILURE,
            error: error
        })
    }
}
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}


function loadUserAPI(data){
    let getUrl = data ? `/user/${data}`:`/user`;
    return axios.get(getUrl, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* loadUser(action){
    const { response, error } = yield call(loadUserAPI, action.data)
    if (response){
        yield put({
            type: LOAD_USER_SUCCESS,
            data: response.data,
            mine: !action.data,
        })
    }else{
        yield put({
            type: LOAD_USER_FAILURE,
            error: error
        })
    }
}
function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchLoadUser),
    ]);
}