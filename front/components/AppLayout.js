import React from 'react';
import { Button, Menu, Input, Col, Row, Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

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
            <Row gutter={10}>
                <Col xs={24} md={6}>
                    {dummyData.isLoggedIn?
                    <UserProfile/>
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