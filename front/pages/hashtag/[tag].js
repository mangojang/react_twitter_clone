import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import PostCard from '../../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MYINFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { END } from "redux-saga";

const axios = require("axios");

const Hashtag = () => {
    const { mainPosts, retweetErrorReason } = useSelector(state=>state.post);

    useEffect(()=>{
        if(retweetErrorReason){
            alert(retweetErrorReason)
        }
    },[retweetErrorReason]);

    return (
        <div>
            {mainPosts.map((v,i)=>{
                return(
                    <PostCard key={i} post={v}/>  
                )
            })}
        </div>
    );
};

Hashtag.Proptypes ={
    tag: Proptypes.string.isRequired
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const cookie = req? req.headers.cookie:'';

    const tag = etc.query.tag;

    axios.defaults.headers.Cookie= '';
    if(req&&cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    
    store.dispatch({
        type: LOAD_MYINFO_REQUEST
    });
    
    store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag
    });

    store.dispatch(END);

    await store.sagaTask.toPromise();

    return { props: { tag } };
});


export default Hashtag;