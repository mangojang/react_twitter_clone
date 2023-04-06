import { Button, Input, Checkbox } from 'antd';
import { useRouter } from 'next/router'
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MYINFO_REQUEST, signupAction } from '../reducers/user';
import wrapper from '../store/configureStore';
import { END } from "redux-saga";
import PageLayout from '../components/PageLayout';
import { FormRow } from '../components/Styles';

const axios = require("axios");

const Signup = () => {
    const router = useRouter()
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [confirmId, setConfirmId] = useState(true);
    const [confirmNickname, setConfirmNickname] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState(true);
    const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(true);
    const [confirmTerm, setConfirmTerm] = useState(true);
    const { isSigningUp, mine, signUpErrorReason } = useSelector(state=>state.user)

    useEffect(()=>{
        if(mine){
            alert('로그인시 접근 불가합니다.')
            router.push('/')    
        }
    },[mine && mine.id]);

    useEffect(()=>{
        if(signUpErrorReason){
            alert(signUpErrorReason)
        }
    },[signUpErrorReason]);

    // const useInput = (initValue = null) => {
    //     const [value, setter] = useState(initValue);
    //     const handler = useCallback((e) => {
    //         setter(e.target.value);
    //     },[]);
    //     return [value, handler]
    // };

    // const [userId, onChangeId] = useInput('');
    // const [nickname, onChangeNickname] = useInput('');

    const dispatch = useDispatch();

    const validation = useCallback(()=>{
        let pass = true;
        if(id.trim()==''){
            setConfirmId(false);
            pass = false;
        }
        if(nickname.trim()==''){
            setConfirmNickname(false);
            pass= false;
        }
        if(password.trim()==''){
            setConfirmPassword(false);
            pass = false;
        }
        if(passwordCheck.trim()==''|| password!==passwordCheck){
            setConfirmPasswordCheck(false);
            pass= false;
        }
        if(!term){
            setConfirmTerm(false);
            pass= false;
        }
        
        return pass;
    },[id, nickname, password, passwordCheck, term])
   
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if(validation()){
            dispatch(signupAction({
                userId : id,
                nickname,
                password,
            }))
            alert('회원가입 완료되었습니다.');
            router.push('/');
        }
    },[ id, nickname, password, passwordCheck, term]);

   const onChangeId = useCallback((e)=>{
        setId(e.target.value);
        if(!confirmId && e.target.value.trim()!=''){
            setConfirmId(true);
        }
   },[confirmId]);

   const onChangeNickname = useCallback((e)=>{
        setNickname(e.target.value);
        if(!confirmNickname && e.target.value.trim()!=''){
            setConfirmNickname(true);
        }
    },[confirmNickname]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
        if(!confirmPassword &&  e.target.value.trim()!=''){
            setConfirmPassword(true);
        }
    },[confirmPassword]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        
        if(confirmPasswordCheck){
            if(e.target.value !== password){
                setConfirmPasswordCheck(false);
            }
        }else{
            if(e.target.value == password){
                setConfirmPasswordCheck(true);
            }
        }
    },[confirmPasswordCheck, password]);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        if(!confirmTerm &&  e.target.checked){
            setConfirmTerm(true);
        }
    },[confirmTerm]);

    if(mine){
        return null;
    }

    return (
        <PageLayout title={'회원가입'}>
            <div style={{padding: '0 16px',marginTop: '16px'}}>
                <form onSubmit={onSubmit}>
                    <FormRow>
                        <label htmlFor='signup_id'>아이디</label>
                        <Input name='signup_id' value={id} onChange={onChangeId}/>
                        <span style={confirmId? {visibility:'hidden'} : {visibility:'visible'}} className='cmt'>아이디를 다시 확인해주세요.</span>
                    </FormRow>
                    <FormRow>
                        <label htmlFor='signup_nickname'>닉네임</label>
                        <Input name='signup_nickname' value={nickname} onChange={onChangeNickname}/>
                        <span style={confirmNickname? {visibility:'hidden'} : {visibility:'visible'}} className='cmt'>닉네임을 다시 확인해주세요.</span>
                    </FormRow>
                    <FormRow>
                        <label htmlFor='signup_password'>비밀번호</label>
                        <Input.Password name='signup_password' value={password} onChange={onChangePassword}/>
                        <span style={confirmPassword? {visibility:'hidden'} : {visibility:'visible'}} className='cmt'>비밀번호를 다시 확인해주세요.</span>
                    </FormRow>
                    <FormRow>
                        <label htmlFor='signup_password_check'>비밀번호 확인</label>
                        <Input.Password name='signup_password_check' value={passwordCheck} onChange={onChangePasswordCheck} />
                        <span style={confirmPasswordCheck? {visibility:'hidden'} : {visibility:'visible'}} className='cmt'>비밀번호 확인을 다시 확인해주세요.</span>
                    </FormRow>
                    <FormRow>
                        <Checkbox value={term} onChange={onChangeTerm} style={{display:'flex'}}>개인정보 사용에 동의하십니까?</Checkbox>
                        <span style={confirmTerm? {visibility:'hidden'} : {visibility:'visible'}} className='cmt'>개인정보 사용에 동의해주세요.</span>
                    </FormRow>
                    <div className='btns_area'>
                        <Button type="primary" htmlType="submit" loading={isSigningUp} size={'large'}>가입하기</Button>
                    </div>
                </form>
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