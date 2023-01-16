import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import NicknameEditForm from '../components/NicknameEditForm';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, REMOVE_FOLLOWER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';


const Profile = () => {
    const dispatch = useDispatch();
    const { mine, followerList, followingList } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    useEffect(()=>{
        if(mine){
            dispatch({
                type: LOAD_FOLLOWERS_REQUEST,
                data: mine.id,
            });
            dispatch({
                type: LOAD_FOLLOWINGS_REQUEST,
                data: mine.id,
            });
            dispatch({
                type: LOAD_USER_POSTS_REQUEST,
                data: mine.id,
            });
        }
    },[mine && mine.id])

    const onUnFollow = useCallback(userId=>()=>{
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId, 
        })
    },[]);

    const onRemoveFollower = useCallback(userId=>()=>{
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: userId, 
        })
    },[]);
    


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
                dataSource={followerList}
                renderItem={(item)=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<StopOutlined key='block' onClick={onRemoveFollower(item.id)} />]}><Card.Meta description={item.nickname}/></Card>
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
                dataSource={followingList}
                renderItem={(item)=>(
                    <List.Item style={{marginTop:'20px'}}>
                        <Card actions={[<StopOutlined key='block' onClick={onUnFollow(item.id)}/>]}><Card.Meta description={item.nickname}/></Card>
                    </List.Item>
                )}
            />
            <div>
            {mainPosts.map((v,i)=>{
                return(
                    <PostCard key={i} post={v}/>  
                )
            })}
        </div>
        </div>
    );
};

export default Profile;