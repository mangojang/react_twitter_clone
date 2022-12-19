import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user'; 


const dummy = {
    isLoggenIn: true,
    imagePaths: [],
    mainPosts: [{
        User: {
            id:1,
            nickname:'mangojang',
        },
        content:'얄리얄리얄라리얄라',
        img:'',
        createdAt: new Date()
    }]
}


const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user.user
    });
    useEffect(()=>{
        dispatch(loginAction);
        //dispatch(logoutAction);
    },[]);

    return (
        <div style={{paddingTop:'20px'}}>
            {user? <div>로그인 했습니다.{user.nickname}</div> : <div>로그아웃 했습니다.</div>}
            {dummy.isLoggenIn && <PostForm/>}
            {dummy.mainPosts.map((v,i)=>{
                return(
                    <PostCard key={v} post={v}/>  
                )
            })}
        </div>
    );
};

export default Home;