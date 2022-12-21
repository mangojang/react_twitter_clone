import { Form, Button, Input, Checkbox } from 'antd';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupAction } from '../reducers/user';



const Signup = () => {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const { isSigningUp } = useSelector(state=>state.user)

    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue);
        const handler = useCallback((e) => {
            setter(e.target.value);
        },[]);
        return [value, handler]
    };

    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');

    const dispatch = useDispatch();
   
    const onSubmit = useCallback((e) => {
        dispatch(signupAction({
            id,
            nickname,
            password,
        }))
        console.log({
            id,
            nickname,
            password,
            passwordCheck,
            term
        });
    },[password, passwordCheck, term]);

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
        <Form onFinish={onSubmit}>
            <div>회원가입</div>
                <Form.Item
                    label="아이디"
                    name="signup_id"
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
                    name="signup_nickname"
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
                    name="signup_password"
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
                    name="signup_password_check"
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
                    name="signup_term"
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
                
            <Button type="primary" htmlType="submit" loading={isSigningUp} style={{marginTop:'20px'}}>전송하기</Button>
        </Form>
    );
};

export default Signup;