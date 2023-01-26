import createSagaMiddleware from "@redux-saga/core";
import { createWrapper } from "next-redux-wrapper";

import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";


import reducers from "../reducers";
import rootSaga from "../sagas";



const configureStore = () =>{
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
        console.log(action);
        next(action);
    }];
    const composeEnhancers =
        process.env.NODE_ENV==='production' || typeof window === 'object' && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
    const enhancer = composeEnhancers(applyMiddleware(...middlewares)) 
    const store= createStore(reducers, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

const wrapper = createWrapper(configureStore,{
    debug: true
});

export default wrapper;