import React, { useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button} from 'antd';
import Proptypes from 'prop-types';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../../reducers/user';


const FollowButton = ({user}) => {
    const {mine}= useSelector(state=>state.user);
    const dispatch = useDispatch();
    
    const onFollow = useCallback(userId =>()=>{
        return dispatch({
            type: FOLLOW_USER_REQUEST,
            data: userId
        });
    },[]);
    const onUnFollow = useCallback(userId =>()=>{
        return dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId
        });
    },[]);
    
    return (
        <>
            {mine.Followings && mine.Followings.find(v=>v.id === user.id)
            ? <Button onClick={onUnFollow(user.id)}>언팔로우</Button>
            : <Button onClick={onFollow(user.id)}>팔로우</Button>
            }
        </>
    );
};

FollowButton.Proptypes ={
    user:  Proptypes.shape({
        id: Proptypes.number,
    })
}

export default FollowButton;