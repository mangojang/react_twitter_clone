import { Form, Button, Input } from 'antd';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';

const LoginForm = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = useCallback((e) => {
        console.log({
            id,
            password,
        });
    },[]);

    const onChangeId = useCallback((e)=>{
        setId(e.target.value);
    },[]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    },[]);

    return (
        <div style={{paddingTop:'20px'}}>
        <Form onFinish={onSubmit}>
                <Form.Item
                    label="아이디"
                    name="id"
                    rules={[
                    {
                        required: true,
                        message: '아이디를 입력하세요!',
                    },
                    ]}
                >
                    <Input value={id} onChange={onChangeId}/>
                </Form.Item>
                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: '비밀번호를 입력하세요!',
                    },
                    ]}
                >
                    <Input.Password value={password} onChange={onChangePassword}/>
                </Form.Item>
            <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
            <Link href='/signup' legacyBehavior><a><Button>회원가입</Button></a></Link>
        </Form>
        </div>
    );
};

export default LoginForm;