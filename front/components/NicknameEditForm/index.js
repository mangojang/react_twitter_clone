import React, { useCallback, useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';     
import { EDIT_NICKNAME_REQUEST } from '../../reducers/user';
import { Container } from './style';

const NicknameEditForm = () => {
    const { mine, isEditingNickname } = useSelector(state => state.user);
    const [ editName, setEditName] = useState(mine? mine.nickname:'');
    const dispatch = useDispatch();

    const onChangeNickname = useCallback((e)=>{
        setEditName(e.target.value);
    },[])

    const onEditNickname = useCallback(()=>{
        if(editName.trim()==''){
            alert('닉네임을 다시 확인해 주세요');
            return false;
        }
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: {nickname: editName},
        })
    },[editName])
    return (
        <Container>
            <Form onFinish={onEditNickname}>
                <Form.Item>
                    <div className='row'>
                        <Input className='input' addonBefore="닉네임" value={editName} onChange={onChangeNickname}/>
                        <Button className='btn' type='primary' htmlType="submit" loading={isEditingNickname}>수정</Button>
                    </div>
                </Form.Item>
            </Form>
        </Container>
    );
};

export default NicknameEditForm;