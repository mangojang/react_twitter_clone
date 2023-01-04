import { all, delay, takeLatest, fork, put, call } from "@redux-saga/core/effects";
import { 
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS, 
    ADD_POST_FAILURE,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE, 
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT_FAILURE, 
    ADD_COMMENT_REQUEST,
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,  
} from '../reducers/post';

const axios = require('axios')

function addPostAPI(data){
    return axios.post(`/post/`, data, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* addPost(action){
    const { response, error } = yield call(addPostAPI, action.data)
    if (response){
        yield put({
            type: ADD_POST_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: ADD_POST_FAILURE,
            error: error
        })
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadPostAPI(){
    return axios.get(`/post`)
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* loadPost(){
    const { response, error } = yield call(loadPostAPI)
    if (response){
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: error
        })
    }
}

function* watchLoadPost(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadPost);
}

function addCommentAPI(data){
    return axios.post(`/comment/`, data, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* addComment(action){
    try {
        //yield call(addCommentAPI, action.data)
        yield delay(2000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data:{
                postId: action.data.postId
            }
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: error
        })
    }
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadUserPostsAPI(data){
    return axios.get(`/user/${data.id}`)
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* loadUserPosts(action){
    const { response, error } = yield call(loadUserPostsAPI, action.data)
    if (response){
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: error
        })
    }
}

function* watchLoadUserPosts(){
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function loadHashtagPostsAPI(data){
    return axios.get(`/hashtag/${data}`)
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* loadHashtagPosts(action){
    const { response, error } = yield call(loadHashtagPostsAPI, action.data)
    if (response){
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: error
        })
    }
}
function* watchLoadHashtagPosts(){
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPost),
        fork(watchAddComment),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts)
    ]);
}