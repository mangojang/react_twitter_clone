import React, {useCallback} from 'react';
import { Avatar, Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../reducers/user';
import Link from 'next/link';

const { Meta } = Card;


const UserProfile = () => {
    const { mine } = useSelector(state => state.user);
    const dispatch= useDispatch();

    const onClickLogout = useCallback((e)=>{
        dispatch(logoutAction);
    },[]);

    return (
        <Card
            actions={[
            <Link href={'/profile'} key="twit"><div>짹짹<br/>{ mine.Post? mine.Post.length : 0 }</div></Link>,
            <Link href={'/profile'} key="following"><div>팔로잉<br/>{mine.Followings? mine.Followings.length : 0 }</div></Link>,
            <Link href={'/profile'} key="follower"><div>팔로워<br/>{mine.Followers? mine.Followers.length : 0}</div></Link>,
            ]}
        >
            <Meta
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            title={mine.nickname}
            description={<Button onClick={onClickLogout}>로그아웃</Button>}
            />
        </Card>
    );
};

export default UserProfile;