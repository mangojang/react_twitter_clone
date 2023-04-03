import React from 'react';
import { useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import wrapper from '../../store/configureStore';
import { END } from "redux-saga";
import { LOAD_POST_REQUEST } from '../../reducers/post';
import Head from 'next/head';
// import { backURL } from '../../config/config';

const Post = ({id}) => {
    const { singlePost } = useSelector( state => state.post);
    return (
        <>
            <Head>
                <title>{singlePost.User.nickname}님의 글</title>
                <meta name="description" content={singlePost.content}></meta>
                <meta property="og:title" content={`${singlePost.User.nickname}님의 글`} key="title" />
                <meta property="og:description" content={singlePost.content} key="description" />
                <meta property="og:image" content={singlePost.Images[0].content} key="image" />
                {/* <meta property="og:image" content={`${backURL}/${singlePost.Images[0].content}`} key="image" /> */}
            </Head>
            <div>{singlePost.content}</div>
            <div>{singlePost.User.nickname}</div>
            <div>{singlePost.Images[0] && <img src={singlePost.Images[0].content}/>}</div>
            {/* <div>{singlePost.Images[0] && <img src={`${backURL}/${singlePost.Images[0].content}`}/>}</div> */}
        </>
    );
};

Post.Proptypes ={
    id: Proptypes.number.isRequired
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    // const cookie = req? req.headers.cookie:'';

    // axios.defaults.headers.Cookie= '';
    // if(req&&cookie){
    //     axios.defaults.headers.Cookie = cookie;
    // }
    const id = parseInt(etc.query.id, 10) ;

    store.dispatch({
        type: LOAD_POST_REQUEST,
        data : id
    });
    
    store.dispatch(END);

    await store.sagaTask.toPromise();

    return {props: {id}}
});

export default Post;