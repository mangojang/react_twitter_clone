import React, { useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button} from 'antd';
import Proptypes from 'prop-types';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../../reducers/user';


const FollowButton = ({post}) => {
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
            {mine.Followings && mine.Followings.find(v=>v.id === post.User.id)
            ? <Button onClick={onUnFollow(post.User.id)}>언팔로우</Button>
            : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
            }
        </>
    );
};

FollowButton.Proptypes ={
    post: Proptypes.shape({
        User: Proptypes.object,
        content:Proptypes.string,
        img:Proptypes.string,
        createdAt: Proptypes.object
    })
}

export default FollowButton;