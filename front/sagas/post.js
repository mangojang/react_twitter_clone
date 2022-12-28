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

function* addCommentAPI(){

}
function* addComment(action){
    try {
        //yield call(addCommentAPI)
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

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPost),
        fork(watchAddComment),
    ]);
}