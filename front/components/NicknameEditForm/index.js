import React, { useCallback, useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';     
import { EDIT_NICKNAME_REQUEST } from '../../reducers/user';
import { Container } from './style';

const NicknameEditForm = () => {
    const [ editName, setEditName] = useState('');
    const dispatch = useDispatch();
    const { mine, isEditingNickname } = useSelector(state => state.user);

    const onChangeNickname = useCallback((e)=>{
        setEditName(e.target.value);
    },[])

    const onEditNickname = useCallback(()=>{
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
                        <Input className='input' addonBefore="닉네임" value={editName || (mine &&  mine.nickname)} onChange={onChangeNickname}/>
                        <Button className='btn' type='primary' htmlType="submit" loading={isEditingNickname}>수정</Button>
                    </div>
                </Form.Item>
            </Form>
        </Container>
    );
};

export default NicknameEditForm;