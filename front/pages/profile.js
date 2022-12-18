import React from 'react';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import NicknameEditForm from '../components/NicknameEditForm';


const Profile = () => {
    return (
        <div>
            <NicknameEditForm/>
            <List
                style={{marginBottom: '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{width: '100%'}}>더 보기</Button>}
                bordered
                dataSource={['빨간색', '초록색', '중간에 그 어딘가']}
                renderItem={(item)=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<StopOutlined key='block' />]}><Card.Meta description={item}/></Card>
                    </List.Item>
                )}
            />
            <List
                style={{marginBottom: '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<Button style={{width: '100%'}}>더 보기</Button>}
                bordered
                dataSource={['빨간색', '초록색', '중간에 그 어딘가']}
                renderItem={(item)=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<StopOutlined key='block'/>]}><Card.Meta description={item}/></Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Profile;