import { createWrapper } from "next-redux-wrapper";

import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";


import reducers from "../reducers";

const configureStore = () =>{
    const middlewares = [];
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
    const enhancer = composeEnhancers(applyMiddleware(...middlewares)) 
    const store= createStore(reducers, enhancer);
    return store;
}

const wrapper = createWrapper(configureStore,{
    debug: true
});

export default wrapper;