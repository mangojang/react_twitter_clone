import { all, delay, takeLatest, fork, put } from "@redux-saga/core/effects";
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST } from '../reducers/post';

function* addPostAPI(){

}
function* addPost(){
    try {
        //yield call(addPostAPI)
        yield delay(2000)
        yield put({
            type: ADD_POST_SUCCESS
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: ADD_POST_FAILURE,
            error: error
        })
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
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
        fork(watchAddComment),
    ]);
}