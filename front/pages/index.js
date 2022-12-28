import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user'; 


const Home = () => {
    const dispatch = useDispatch();

    const {mine, isLoggedIn} = useSelector(state => state.user);
    const {mainPosts} = useSelector(state => state.post);

    useEffect(()=>{
       
    },[]);

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

export default Home;