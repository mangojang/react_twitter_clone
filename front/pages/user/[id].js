import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { END } from "redux-saga";
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST, LOAD_MYINFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import PostCard from '../../components/PostCard';

const axios = require("axios");

const { Meta } = Card;

const User = () => {
    const { mainPosts } = useSelector(state=>state.post);
    let { userInfo } = useSelector(state=>state.user);
    
    return (
        <div>
            {userInfo?
            <Card
                actions={[
                <div key="twit">짹짹<br/>{ userInfo.Post? userInfo.Post.length : 0 }</div>,
                <div key="following">팔로잉<br/>{userInfo.Followings? userInfo.Followings.length : 0 }</div>,
                <div key="follower">팔로워<br/>{userInfo.Followers? userInfo.Followers.length : 0}</div>,
                ]}
                style={{marginBottom: '20px'}}
            >
                <Meta
                avatar={<Avatar size="large" icon={<UserOutlined />} />}
                title={userInfo.nickname}
                />
            </Card>
            :null}
            {mainPosts.map((v,i)=>{
                return(
                    <PostCard key={v.id} post={v}/>  
                )
            })}
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const cookie = req? req.headers.cookie:'';

    const id = parseInt(etc.query.id, 10) ;

    axios.defaults.headers.Cookie= '';
    if(req&&cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    
    store.dispatch({
        type: LOAD_MYINFO_REQUEST
    });
    
    store.dispatch({
        type: LOAD_USER_REQUEST,
        data: id
    });
    
    store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id
    });

    store.dispatch(END);

    await store.sagaTask.toPromise();

    return {props: {id}}
});

export default User;