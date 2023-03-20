import React from 'react';
import Proptypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';
import Head from 'next/head';
import { Reset } from 'styled-reset'


const App = ({Component, ...rest }) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Head>
                <title>react-twitter-clone</title>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="description" content="react-twitter-clone"></meta>
                <meta property="og:title" content="react-twitter-clone" key="title" />
                <meta property="og:description" content="react-twitter-clone" key="description" />
                <meta property="og:type" content="website"/>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout>
                <Reset />
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




