import { all, call } from "@redux-saga/core/effects";
import user from './user';
import post from './post';

export default function* rootSaga(){
    yield all([
        call(user),
        call(post)
    ])
}