import { all, delay, takeLatest, fork, put } from "@redux-saga/core/effects";
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE } from '../reducers/post';

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
            error: e
        })
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
    ]);
}