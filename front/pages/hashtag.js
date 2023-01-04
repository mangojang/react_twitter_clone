import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import PostCard from '../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';

const Hashtag = ({tag}) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state=>state.post);
    
    useEffect(()=>{
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag
        })
    },[tag]);

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

export async function getServerSideProps(context) {
    console.log('ctx',context.req.params.tag);
    return {
      props: {tag: parseInt(context.req.params.tag)},
    }
}

export default Hashtag;