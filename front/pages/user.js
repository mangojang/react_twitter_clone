import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LOAD_USER_REQUEST } from '../reducers/user';

const { Meta } = Card;

const User = ({id}) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state=>state.post);
    const { userInfo } = useSelector(state=>state.user);

    useEffect(()=>{
        dispatch({
            type: LOAD_USER_REQUEST,
            data: id
        })
        dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: id
        })
    });
    
    return (
        <div>
            {userInfo?
            <Card
                actions={[
                <div key="twit">짹짹<br/>{ userInfo.Post? userInfo.Post.length : 0 }</div>,
                <div key="following">팔로잉<br/>{userInfo.Followings? userInfo.Followings.length : 0 }</div>,
                <div key="follower">팔로워<br/>{userInfo.Followers? userInfo.Followers.length : 0}</div>,
                ]}
            >
                <Meta
                avatar={<Avatar size="large" icon={<UserOutlined />} />}
                title={userInfo.nickname}
                />
            </Card>
            :null}
            {mainPosts.map((v,i)=>{
                return(
                    <PostCard key={i} post={v}/>  
                )
            })}
        </div>
    );
};

User.Proptypes ={
    id: Proptypes.string.isRequired
}

export async function getServerSideProps(context) {
    console.log('ctx',context.req.params.id);
    return {
      props: {id: parseInt(context.req.params.id)},
    }
}


export default User;