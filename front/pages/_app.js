import React from 'react';
import Proptypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';
import Head from 'next/head';
import { Reset } from 'styled-reset'
import '../styles/global.css';
import 'antd/dist/reset.css';
// import 'antd/dist/antd.css';


const App = ({Component, ...rest }) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Head>
                <title>mangotwitter</title>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="description" content="개인 포트폴리오용 트위터 클론 사이트 입니다."></meta>
                <meta property="og:title" content="mangotwitter" key="title" />
                <meta property="og:description" content="개인 포트폴리오용 트위터 클론 사이트 입니다." key="description" />
                <meta property="og:type" content="website"/>
                <meta property="og:image" content="/og.png" key="image"/>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <script src='https://polyfill.io/v3/polyfill.min.js?features=es5%2Ces6%2Ces7%2CNodeList.prototype.forEach&flags=gated'/>    
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




