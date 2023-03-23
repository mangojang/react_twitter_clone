import React, {useCallback} from 'react';
import { Avatar, Button, Card, Popover } from 'antd';
import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../reducers/user';
import Link from 'next/link';
import { TitleBox, UserProfleCard } from './style';
import { Btn } from '../Styles';

const { Meta } = Card;


const UserProfile = () => {
    const { mine } = useSelector(state => state.user);
    const dispatch= useDispatch();

    const onClickLogout = useCallback((e)=>{
        dispatch(logoutAction);
    },[]);

    const titleComponent = ()=>{
        return(
            <TitleBox>
                <div>{mine.nickname}</div>
                <Popover key="ellipsis" trigger="click" content={
                    <Button.Group>
                        <Btn onClick={onClickLogout}>로그아웃</Btn>
                    </Button.Group>
                }>
                    <EllipsisOutlined key="ellipsis" title='더보기' className='btn_more' />
                </Popover>
            </TitleBox>
        )
    }

    return (
        <UserProfleCard>
            <Card>
                <Meta
                    avatar={<Avatar size="large">{mine.nickname.slice(0,1)}</Avatar>}
                    title={titleComponent()}
                    description={'@'+mine.userId}
                />
            </Card>
        </UserProfleCard>
    );
};

export default UserProfile;