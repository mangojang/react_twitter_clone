import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MYINFO_REQUEST, LOAD_USER_REQUEST, loginAction, logoutAction } from '../reducers/user'; 
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';
import { END } from "redux-saga";
import axios from 'axios';

const Home = () => {
    const dispatch = useDispatch();

    const {mine, isLoggedIn} = useSelector(state => state.user);
    const {mainPosts, retweetErrorReason} = useSelector(state => state.post);

    useEffect(()=>{
        if(retweetErrorReason){
            alert(retweetErrorReason)
        }
    },[retweetErrorReason==='']);

    
    return (
        <div style={{paddingTop:'20px'}}>
            {mine? <div>로그인 했습니다.{mine.nickname}</div> : <div>로그아웃 했습니다.</div>}
            {mine && <PostForm/>}
            {mainPosts.map((v,i)=>{
                return(
                    <PostCard key={i} post={v}/>  
                )
            })}
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const cookie = req? req.headers.cookie:'';
    console.log('@@cookie', cookie);
    axios.defaults.headers.Cookie= '';
    if(req&&cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    
    store.dispatch({
        type: LOAD_MYINFO_REQUEST
    });
    
    store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST
    });

    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Home;