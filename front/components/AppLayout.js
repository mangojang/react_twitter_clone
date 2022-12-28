import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Input, Col, Row} from 'antd';
import Link from 'next/link';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { LOAD_USER_REQUEST } from '../reducers/user';



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

    const {isLoggedIn, mine} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!mine){
            dispatch({
                type: LOAD_USER_REQUEST
            })
        }
    },[]);

    return (
        <div>
            <Menu mode="horizontal" items={items}/>
            <Row gutter={10}>
                <Col xs={24} md={6}>
                    {mine?
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