import React, { useCallback, useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

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
        <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}} onFinish={onEditNickname}>
            <Form.Item>
                <Input addonBefore="닉네임" value={editName || (mine &&  mine.nickname)} onChange={onChangeNickname}/>
                <Button type='primary' htmlType="submit" loading={isEditingNickname}>수정</Button>
            </Form.Item>
        </Form>
    );
};

export default NicknameEditForm;