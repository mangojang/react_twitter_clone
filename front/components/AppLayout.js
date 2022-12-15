import React from 'react';
import { Button, Menu } from 'antd';
import { Input } from 'antd';
import Link from 'next/link';

const { Search } = Input;

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
            <Link href='/signup' legacyBehavior><a><Button>회원가입</Button></a></Link>
            {children}
        </div>
    );
};

export default AppLayout;