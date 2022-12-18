import React from 'react';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

const dummyData ={
    nickname:'mangojang',
    posts:[],
    followings:[],
    followers:[],
    isLoggedIn: false
}

const UserProfile = () => {
    return (
        <Card
            actions={[
            <div key="twit">짹짹<br/>{dummyData.posts.length}</div>,
            <div key="following">팔로잉<br/>{dummyData.followings.length}</div>,
            <div key="follower">팔로워<br/>{dummyData.followers.length}</div>,
            ]}
        >
            <Meta
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            title={dummyData.nickname}
            />
        </Card>
    );
};

export default UserProfile;