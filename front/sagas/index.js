import { all, call } from "@redux-saga/core/effects";
import user from './user';
import post from './post';
import { backURL } from "../config/config";

const axios = require("axios");

axios.defaults.baseURL = `${backURL}/api`;
axios.defaults.withCredentials = true;

export default function* rootSaga(){
    yield all([
        call(user),
        call(post)
    ])
}