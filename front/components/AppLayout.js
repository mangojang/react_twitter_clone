import React from 'react';
import { Menu } from 'antd';
import { Input } from 'antd';

const { Search } = Input;

const items =[
    {
        label: '홈',
        key: 'home',
    },
    {
        label: '프로필',
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
            {children}
        </div>
    );
};

export default AppLayout;