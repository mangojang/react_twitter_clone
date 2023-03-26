import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import PostCard from '../PostCard';
import { Empty } from 'antd';

const TweetList = () => {
    const dispatch = useDispatch();
    const { mine } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    
    useEffect(() => {
        function onScroll() {
            // console.log('@@mainPosts', mainPosts[mainPosts.length-1].id);
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePost) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_USER_POSTS_REQUEST,
                        data: mine.id,
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


export default TweetList;