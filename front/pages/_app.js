import React from 'react';
import Proptypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';
import Head from 'next/head';



const App = ({Component, ...rest }) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Head>
                <title>react-twitter-clone</title>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout>
                <Component {...props.pageProps}/>
            </AppLayout>
        </Provider>
    );
};

App.Proptypes ={
    Component: Proptypes.elementType,
    store: Proptypes.object,
}


export default App;




