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
    LOAD_USER_FAILURE, 
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    REMOVE_FOLLOWER_FAILURE,
    EDIT_NICKNAME_REQUEST,
    EDIT_NICKNAME_SUCCESS,
    EDIT_NICKNAME_FAILURE,
    LOAD_MYINFO_REQUEST,
    LOAD_MYINFO_SUCCESS,
    LOAD_MYINFO_FAILURE
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
            error: error.response.data
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
            error: error.response.data
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
            error: error.response.data,
        })
    }
}
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}


function loadUserAPI(data){
    return axios.get( `/user/${data}`, {
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
            error: error.response.data,
        })
    }
}
function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

function loadMyInfoAPI(data){
    return axios.get(`/user`)
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* loadMyInfo(action){
    const { response, error } = yield call(loadMyInfoAPI, action.data)
    if (response){
        yield put({
            type: LOAD_MYINFO_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_MYINFO_FAILURE,
            error: error.response.data,
        })
    }
}
function* watchLoadMyInfo(){
    yield takeEvery(LOAD_MYINFO_REQUEST, loadMyInfo)
}

function followAPI(data){
    return axios.post(`/user/${data}/follow`,{}, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* follow(action){
    const { response, error } = yield call(followAPI, action.data)
    if (response){
        yield put({
            type: FOLLOW_USER_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: FOLLOW_USER_FAILURE,
            error: error.response.data
        })
    }
}
function* watchFollow(){
    yield takeLatest(FOLLOW_USER_REQUEST, follow)
}

function unfollowAPI(data){
    return axios.delete(`/user/${data}/follow`, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* unfollow(action){
    const { response, error } = yield call(unfollowAPI, action.data)
    if (response){
        yield put({
            type: UNFOLLOW_USER_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error: error.response.data
        })
    }
}
function* watchUnFollow(){
    yield takeLatest(UNFOLLOW_USER_REQUEST, unfollow)
}

function loadFollowersAPI(data){
    return axios.get(`/user/${data || 0}/followers`, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* loadFollowers(action){
    const { response, error } = yield call(loadFollowersAPI, action.data)
    if (response){
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: error.response.data
        })
    }
}
function* watchLoadFollowers(){
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers)
}

function loadFollowingsAPI(data){
    return axios.get(`/user/${data || 0}/followings`, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* loadFollowings(action){
    const { response, error } = yield call(loadFollowingsAPI, action.data)
    if (response){
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: error.response.data
        })
    }
}
function* watchLoadFollowings(){
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings)
}

function removeFollowerAPI(data){
    return axios.delete(`/user/${data}/follower`, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* removeFollower(action){
    const { response, error } = yield call(removeFollowerAPI, action.data)
    if (response){
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: error.response.data
        })
    }
}
function* watchRemoveFollower(){
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower)
}

function editNicknameAPI(data){
    return axios.patch(`/user/nickname`, data, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
    
}
function* editNickname(action){
    const { response, error } = yield call(editNicknameAPI, action.data)
    if (response){
        yield put({
            type: EDIT_NICKNAME_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: EDIT_NICKNAME_FAILURE,
            error: error.response.data
        })
    }
}
function* watchEditNickname(){
    yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchLoadUser),
        fork(watchLoadMyInfo),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
    ]);
}