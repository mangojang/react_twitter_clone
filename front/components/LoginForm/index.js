import { Form, Button, Input } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { loginAction } from '../../reducers/user';
import { LoginFormBox } from './style';
import { Btn } from '../Styles';

const LoginForm = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { isLoggingIn, loginErrorReason } = useSelector(state=>state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(loginErrorReason){
            alert(loginErrorReason)
        }
    },[loginErrorReason]);

    const onSubmit = useCallback((e) => {
        return dispatch(loginAction({userId: id, password: password}));
    },[id, password]);

    const onFinishFailed = (error) => {
        console.log('Failed:', error);
    };


    const onChangeId = useCallback((e)=>{
        setId(e.target.value);
    },[]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    },[]);

    return (
        <LoginFormBox style={{paddingTop:'20px'}}>
        <Form onFinish={onSubmit} onFinishFailed={onFinishFailed}>
            <Form.Item
                label="아이디"
                name="user_id"
                rules={[
                {
                    required: true,
                    message: '아이디를 입력하세요!',
                },
                ]}
            >
                <Input className='login_input' value={id} onChange={onChangeId}/>
            </Form.Item>
            <Form.Item
                label="비밀번호"
                name="user_password"
                rules={[
                {
                    required: true,
                    message: '비밀번호를 입력하세요!',
                },
                ]}
            >
                <Input.Password className='login_input' value={password} onChange={onChangePassword}/>
            </Form.Item>
            <div className='btns_box'>
                <Btn type="primary" htmlType="submit" loading={isLoggingIn} styleType='primary'>로그인</Btn>
                <Link href='/signup' legacyBehavior><a><Btn styleType='default'>가입하기</Btn></a></Link>
            </div>
        </Form>
        </LoginFormBox>
    );
};

export default LoginForm;