import React, { useEffect, useRef } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import {LOAD_MYINFO_REQUEST} from '../reducers/user'; 
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';
import { END } from "redux-saga";
import SearchInput from '../components/SearchInput';

// import axios from 'axios';

const axios = require("axios");


const Home = () => {
    const dispatch = useDispatch();
    const countRef = useRef([]);

    const {mine} = useSelector(state => state.user);
    const {mainPosts, retweetErrorReason, hasMorePost} = useSelector((state) => state.post);

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePost) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    if(!countRef.current.includes(lastId)){
                        dispatch({
                            type: LOAD_MAIN_POSTS_REQUEST,
                            lastId,
                        });
                        countRef.current.push(lastId);
                    }
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePost, mainPosts[mainPosts.length - 1]?.id]);

    useEffect(()=>{
        if(retweetErrorReason){
            alert(retweetErrorReason)
        }
    },[retweetErrorReason==='']);

    
    return (
        <div>
            {mine ? <PostForm/> : <SearchInput/>}
            {mainPosts.map((v,i)=>{
                return(
                    <PostCard key={v.id} post={v}/>  
                )
            })}
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const cookie = req? req.headers.cookie:'';

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