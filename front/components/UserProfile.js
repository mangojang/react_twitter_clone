import React from 'react';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Meta } = Card;


const UserProfile = () => {
    const { user} = useSelector(state => state.user);

    return (
        <Card
            actions={[
            <div key="twit">짹짹<br/>{user.posts.length}</div>,
            <div key="following">팔로잉<br/>{user.followings.length}</div>,
            <div key="follower">팔로워<br/>{user.followers.length}</div>,
            ]}
        >
            <Meta
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            title={user.nickname}
            />
        </Card>
    );
};

export default UserProfile;