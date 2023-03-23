import { Form, Button, Input, Checkbox } from 'antd';
import Router from 'next/router';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MYINFO_REQUEST, signupAction } from '../reducers/user';
import wrapper from '../store/configureStore';
import { END } from "redux-saga";
import { Btn } from '../components/Styles';
import PageLayout from '../components/PageLayout';

const axios = require("axios");

const Signup = () => {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const { isSigningUp, mine, signUpErrorReason } = useSelector(state=>state.user)

    useEffect(()=>{
        if(mine){
            alert('로그인시 접근 불가합니다.')
            Router.push('/')    
        }
    },[mine && mine.id]);

    useEffect(()=>{
        if(signUpErrorReason){
            alert(signUpErrorReason)
        }
    },[signUpErrorReason]);

    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue);
        const handler = useCallback((e) => {
            setter(e.target.value);
        },[]);
        return [value, handler]
    };

    const [userId, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');

    const dispatch = useDispatch();
   
    const onSubmit = useCallback((values) => {
        dispatch(signupAction({
            userId,
            nickname,
            password,
        }))
        console.log({
            userId,
            nickname,
            password,
            passwordCheck,
            term
        });
    },[ userId, nickname, password, passwordCheck, term]);

    const onFinishFailed = (error) => {
        console.log('Failed:', error);
      };

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    },[]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
    },[]);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
    },[]);

    if(mine){
        return null;
    }

    return (
        <PageLayout title={'회원가입'}>
            <div style={{padding: '0 16px'}}>
                <Form onFinish={onSubmit} onFinishFailed={onFinishFailed}>
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
                        <Input value={userId} onChange={onChangeId}/>
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
                                if (!value || getFieldValue('signup_password') === value) {
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
                    <div className='btns_area'>
                        <Btn type="primary" htmlType="submit" loading={isSigningUp} size={'large'} styletype='primary' style={{borderRadius: '9999px'}}>가입하기</Btn>
                    </div>
                </Form>
            </div>
        </PageLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const cookie = req? req.headers.cookie:'';

    axios.defaults.headers.Cookie= '';
    if(req&&cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    
    store.dispatch({
        type: LOAD_MYINFO_REQUEST
    });
    
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Signup;