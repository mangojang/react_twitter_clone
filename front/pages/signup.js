import { Form, Button, Input, Checkbox } from 'antd';
import React, { useState, useCallback } from 'react';
import AppLayout from '../components/AppLayout';



const Signup = () => {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);

    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue);
        const handler = useCallback((e) => {
            setter(e.target.value);
        },[]);
        return [value, handler]
    };

    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
   
    const onSubmit = useCallback((e) => {
        console.log({
            id,
            nickname,
            password,
            passwordCheck,
            term
        });
    },[]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    },[]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
    },[]);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
    },[]);

    

    return (
        <AppLayout>
            <Form onFinish={onSubmit}>
                <div>회원가입</div>
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
                        label="닉네임"
                        name="nickname"
                        rules={[
                        {
                            required: true,
                            message: '닉네임을 입력하세요!',
                        },
                        ]}
                    >
                        <Input value={nickname} onChange={onChangeNickname}/>
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
                    <Form.Item
                        label="비밀번호 확인"
                        name="password_check"
                        dependencies={['password']}
                        rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                            },
                          }),
                        ]}
                    >
                        <Input.Password value={passwordCheck} onChange={onChangePasswordCheck} />
                        
                    </Form.Item>
                    <Form.Item
                        name="개인정보 동의"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('개인정보 사용에 동의해주세요.')),
                            },
                        ]}
                    >
                        <Checkbox value={term}  onChange={onChangeTerm}>개인정보 사용에 동의하십니까?</Checkbox>
                        
                    </Form.Item>
                    
                <Button type="primary" htmlType="submit" style={{marginTop:'20px'}}>전송하기</Button>
            </Form>
        </AppLayout>
    );
};

export default Signup;