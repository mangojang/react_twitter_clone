import React from 'react';
import Proptypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';


const makeStore = context => createStore(reducer);
const wrapper = createWrapper(makeStore, {debug: true});

const twitter = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest)
    return (
        <Provider store={store}>
        <AppLayout>
            <Component/>
        </AppLayout>
        </Provider>
    );
};

twitter.Proptypes ={
    Component: Proptypes.elementType,
    store: Proptypes.object,
}

export default twitter;




