import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import PostCard from '../PostCard';
import { Empty } from 'antd';

const TweetList = ({user}) => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    
    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePost) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_USER_POSTS_REQUEST,
                        data: user.id,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePost, mainPosts[mainPosts.length - 1]?.id]);

    return(
        mainPosts && mainPosts.length
        ?<div>
            {mainPosts.map((v,i)=>{
                return(
                    <PostCard key={i} post={v}/>  
                )
            })}
        </div>
        :<Empty/>
    )
}

TweetList.Proptypes ={
    mine : Proptypes.shape({
        id: Proptypes.number.isRequired,
    })
}


export default TweetList;