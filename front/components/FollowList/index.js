import React, { useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, REMOVE_FOLLOWER_REQUEST, UNFOLLOW_USER_REQUEST} from '../../reducers/user';
import { Button, List, Avatar, Empty } from 'antd';

const FollowList = ({user, type}) => {
    const dispatch = useDispatch();
    const { mine, followerList, followingList, hasMoreFollowing, hasMoreFollower } = useSelector((state) => state.user);

    const loadMoreFollowings = useCallback(()=>{
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            offset: followingList.length,
        })
    },[followingList.length]);

    const loadMoreFollowers = useCallback(()=>{
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            offset: followerList.length,
        })
    },[followerList.length]);

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

    const followList = type==="following"? followingList : followerList;
    const loadMore = type==="following"
        ? hasMoreFollowing && <div className='btns_box'><Button type='primary' onClick={ loadMoreFollowings }>더 보기</Button></div>
        : hasMoreFollower && <div className='btns_box'><Button type='primary' onClick={ loadMoreFollowers }>더 보기</Button></div>
    
    return (
        followList && followList.length
        ?<List
            loadMore={loadMore}
            itemLayout="horizontal"
            dataSource={followList}
            renderItem={(item)=>(
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar size="large">{item.nickname.slice(0,1)}</Avatar>}
                        title={item.nickname}
                        description={'@'+item.userId}
                    />
                    <div>
                        { mine.id===user.id
                        ?type ==="following"
                            ?<Button onClick={onUnFollow(item.id)}>언팔로우</Button>
                            :<Button onClick={onRemoveFollower(item.id)}>차단</Button>
                        :null }
                    </div>
                </List.Item>
            )}
        />
        :<Empty />
    )
}

FollowList.Proptypes ={
    user : Proptypes.shape({
        id: Proptypes.number.isRequired
    }),
    type : Proptypes.string.isRequired
}

export default FollowList;