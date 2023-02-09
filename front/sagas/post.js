import { all, delay, takeLatest, fork, put, call, throttle } from "@redux-saga/core/effects";
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
    LOAD_COMMENT_REQUEST,
    LOAD_COMMENT_SUCCESS,
    LOAD_COMMENT_FAILURE,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    RETWEET_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS  
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

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
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: response.data.id,
        });
    }else{
        yield put({
            type: ADD_POST_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadPostAPI(lastId, limit){
    return axios.get(`/post?lastId=${lastId || 0}&limit=${limit || 10}`)
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* loadPost(action){
    const { response, error } = yield call(loadPostAPI, action.lastId)
    if (response){
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: error.response.data,
        })
    }
}

function* watchLoadPost(){
    // yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadPost);
    yield throttle(5000, LOAD_MAIN_POSTS_REQUEST, loadPost);
}

function addCommentAPI(data){
    return axios.post(`/post/${data.postId}/comment/`, data, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* addComment(action){
    const { response, error } = yield call(addCommentAPI, action.data)
    if (response){
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: error.response.data,
        })
    }
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadCommentsAPI(data){
    return axios.get(`/post/${data}/comments`,{
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* loadComments(action){
    const { response, error } = yield call(loadCommentsAPI, action.data)
    if (response){
        yield put({
            type: LOAD_COMMENT_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_COMMENT_FAILURE,
            error: error.response.data,
        })
    }
}

function* watchLoadComments(){
    yield takeLatest(LOAD_COMMENT_REQUEST, loadComments);
}

function loadUserPostsAPI(data, lastId){
    return axios.get(`/user/${data || 0}/posts?lastId=${lastId || 0}&limit=10`)
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* loadUserPosts(action){
    const { response, error } = yield call(loadUserPostsAPI, action.data, action.lastId)
    if (response){
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: error.response.data,
        })
    }
}

function* watchLoadUserPosts(){
    // yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
    yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function loadHashtagPostsAPI(data, lastId){
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}&limit=10`)
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* loadHashtagPosts(action){
    const { response, error } = yield call(loadHashtagPostsAPI, action.data, action.lastId)
    if (response){
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: error.response.data,
        })
    }
}
function* watchLoadHashtagPosts(){
    // yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
    yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function uploadImagesAPI(data){
    return axios.post(`/post/images`, data, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* uploadImages(action){
    const { response, error } = yield call(uploadImagesAPI, action.data)
    if (response){
        yield put({
            type: UPLOAD_IMAGE_SUCCESS,
            data: response.data,
        })
    }else{
        yield put({
            type: UPLOAD_IMAGE_FAILURE,
            error: error.response.data,
        })
    }
}

function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImages);
}

function likePostAPI(data){
    return axios.post(`/post/${data}/like`, {}, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* likePost(action){
    const { response, error } = yield call(likePostAPI, action.data)
    if (response){
        console.log('@@',response.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: response.data.userId,
            }
        })
    }else{
        yield put({
            type: LIKE_POST_FAILURE,
            error: error.response.data
        })
    }
}

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function unLikePostAPI(data){
    return axios.delete(`/post/${data}/like`, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}
function* unLikePost(action){
    const { response, error } = yield call(unLikePostAPI, action.data)
    if (response){
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: response.data.userId,
            }
        })
    }else{
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: error.response.data
        })
    }
}

function* watchUnlikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

function retweetAPI(data){
    return axios.post(`/post/${data}/retweet`,{}, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}

function* retweet(action){
    const { response, error } = yield call(retweetAPI, action.data)
    if (response){
        yield put({
            type: RETWEET_SUCCESS,
            data: {
                postId: action.data,
                userId: response.data.userId,
            }
        })
    }else{
        yield put({
            type: RETWEET_FAILURE,
            error: error.response.data
        })
    }
}

function* watchRetweet(){
    yield takeLatest(RETWEET_REQUEST, retweet);
}

function removePostAPI(data){
    return axios.delete(`/post/${data}`, {
        withCredentials: true
    })
    .then(response=>({response}))
    .catch(error=>({error}))
}

function* removePost(action){
    const { response, error } = yield call(removePostAPI, action.data)
    if (response){
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: response.data,
        })
        yield put({
            type: REMOVE_POST_OF_ME,
            data: response.data,
        })
        
    }else{
        yield put({
            type: REMOVE_POST_FAILURE,
            error: error.response.data
        })
    }
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPost),
        fork(watchAddComment),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadComments),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchRetweet),
        fork(watchRemovePost),
    ]);
}