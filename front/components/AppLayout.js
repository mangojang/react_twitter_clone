import React from 'react';
import { Button, Menu, Input, Col, Row, Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import LoginForm from './LoginForm';

const { Meta } = Card;

const { Search } = Input;

const dummyData ={
    nickname:'mangojang',
    posts:[],
    followings:[],
    followers:[],
    isLoggedIn: false
}

const items =[
    {
        label: (
            <Link href="/" legacyBehavior><a>홈</a></Link>
        ),
        key: 'home',
    },
    {
        label: (
            <Link href="/profile" legacyBehavior><a>프로필</a></Link>
        ),
        key: 'profile',
    },
    {
        label: (
            <Search placeholder="input search text" enterButton style={{ verticalAlign: 'middle' }} />
          ),
        key: 'mail',
    },
]

const AppLayout = ({children}) => {
    return (
        <div>
            <Menu mode="horizontal" items={items}/>
            <Row>
                <Col xs={24} md={6}>
                    {dummyData.isLoggedIn?
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
                    :
                    <LoginForm/>
                    }
                </Col>
                <Col xs={24} md={12}>
                    {children}
                    </Col>
                <Col xs={24} md={6}>세번째</Col>
            </Row>
        </div>
    );
};

export default AppLayout;