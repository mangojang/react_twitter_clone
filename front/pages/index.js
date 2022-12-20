import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user'; 


const Home = () => {
    const dispatch = useDispatch();

    const {user, isLoggedIn} = useSelector(state => state.user);
    const {mainPosts} = useSelector(state => state.post);

    useEffect(()=>{
        dispatch(loginAction);
        dispatch(logoutAction);
    },[]);

    return (
        <div style={{paddingTop:'20px'}}>
            {user? <div>로그인 했습니다.{user.nickname}</div> : <div>로그아웃 했습니다.</div>}
            {isLoggedIn && <PostForm/>}
            {mainPosts.map((v,i)=>{
                return(
                    <PostCard key={v} post={v}/>  
                )
            })}
        </div>
    );
};

export default Home;