import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import PostCard from '../../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import { useRouter } from 'next/router';

const Hashtag = () => {
    const router = useRouter()
    const { tag } = router.query

    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state=>state.post);
    
    useEffect(()=>{
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag
        })
    },[]);

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


export default Hashtag;