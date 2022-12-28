import { all, call } from "@redux-saga/core/effects";
import user from './user';
import post from './post';

const axios = require('axios')

axios.defaults.baseURL = `http://localhost:8000/api`;

export default function* rootSaga(){
    yield all([
        call(user),
        call(post)
    ])
}