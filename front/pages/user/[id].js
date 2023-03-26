import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Card, Button } from 'antd';
import { END } from "redux-saga";
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST, LOAD_MYINFO_REQUEST, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import PageLayout from '../../components/PageLayout';
import ProfileLayout from '../../components/ProfileLayout';
import FollowButton from '../../components/FollowButton';

const axios = require("axios");

const User = () => {
    let { userInfo } = useSelector((state)=>state.user);

    // const rightSideRender = () => {
    //     return(
    //        <FollowButton user={userInfo}/>
    //     )
    // };
    
    if(!userInfo ){
        return null;
    }

    return (
        <PageLayout title={userInfo.nickname} desc={userInfo.Post.length+"트윗"}>
            {/* <ProfileLayout user={userInfo} rightSideRender={rightSideRender}/> */}
            <ProfileLayout user={userInfo}/>
        </PageLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const cookie = req? req.headers.cookie:'';

    const id = parseInt(etc.query.id, 10) ;

    axios.defaults.headers.Cookie= '';
    if(req&&cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    
    store.dispatch({
        type: LOAD_MYINFO_REQUEST
    });
    
    store.dispatch({
        type: LOAD_USER_REQUEST,
        data: id
    });

    store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: id,
    });
    
    store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: id,
    });
    
    store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id
    });

    store.dispatch(END);

    await store.sagaTask.toPromise();

    return {props: {id}}
});

export default User;