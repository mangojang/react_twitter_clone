import React, {useCallback} from 'react';
import { Avatar, Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';

const { Meta } = Card;


const UserProfile = () => {
    const { user} = useSelector(state => state.user);
    const dispatch= useDispatch();

    const onClickLogout = useCallback((e)=>{
        dispatch(logoutAction);
    },[]);

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
            description={<Button onClick={onClickLogout}>로그아웃</Button>}
            />
        </Card>
    );
};

export default UserProfile;