import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';


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
    return (
        <div style={{paddingTop:'20px'}}>
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