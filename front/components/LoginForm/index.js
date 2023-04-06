import { Button, Input } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { loginAction } from '../../reducers/user';
import { LoginFormBox } from './style';
import { FormRow } from '../Styles';

const LoginForm = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmId, setConfirmId] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState(true);
    const { isLoggedIn, loginErrorReason } = useSelector(state=>state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(loginErrorReason){
            alert(loginErrorReason)
            setId('');
            setPassword('');
        }
    },[loginErrorReason]);

    const validation = useCallback(()=>{
        let pass = true;
        if(id.trim()==''){
            setConfirmId(false);
            pass = false;
        }
        if(password.trim()==''){
            setConfirmPassword(false);
            pass = false;
        }
        return pass;
    },[id, password]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if(validation()){
            return dispatch(loginAction({userId: id, password: password}));
        }
    },[id, password]);

    const onChangeId = useCallback((e)=>{
        setId(e.target.value);
        if(!confirmId &&  e.target.value.trim()!=''){
            setConfirmId(true);
        }
    },[confirmId]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
        if(!confirmPassword &&  e.target.value.trim()!=''){
            setConfirmPassword(true);
        }
    },[confirmPassword]);

    return (
        <LoginFormBox style={{paddingTop:'20px'}}>
            <form onSubmit={onSubmit}>
                <FormRow>
                    <label htmlFor="user-id">아이디</label>
                    <Input name='user-id' className='login_input' value={id} onChange={onChangeId}/>
                    <span style={confirmId? {visibility:'hidden'} : {visibility:'visible'}} className='cmt_block'>아이디를 다시 확인해주세요.</span>
                </FormRow>
                <FormRow>
                    <label htmlFor="user-password">비밀번호</label>
                    <Input.Password name='user-password' className='login_input' value={password} onChange={onChangePassword}/>
                    <span style={confirmPassword? {visibility:'hidden'} : {visibility:'visible'}} className='cmt_block'>비밀번호를 다시 확인해주세요.</span>
                </FormRow>
                <div className='btns_box'>
                    <Button type="primary" htmlType="submit" loading={isLoggedIn}>로그인</Button>
                    <Link href='/signup' legacyBehavior><a><Button>가입하기</Button></a></Link>
                </div>
            </form>
        </LoginFormBox>
    );
};

export default LoginForm;