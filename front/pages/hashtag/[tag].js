import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Proptypes from 'prop-types';
import PostCard from '../../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MYINFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { END } from "redux-saga";
import PageLayout from '../../components/PageLayout';

const axios = require("axios");

const Hashtag = ({tag}) => {
    const dispatch = useDispatch();
    const { mainPosts, retweetErrorReason, hasMorePost } = useSelector((state)=>state.post);
    

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePost) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_HASHTAG_POSTS_REQUEST,
                        data: tag,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePost, mainPosts[mainPosts.length - 1]?.id, tag]);
    
    useEffect(()=>{
        if(retweetErrorReason){
            alert(retweetErrorReason)
        }
    },[retweetErrorReason]);

    return (
        <PageLayout title={"검색 결과"}>
            {mainPosts.map((v,i)=>{
                return(
                    <PostCard key={v.id} post={v}/>  
                )
            })}
        </PageLayout>
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