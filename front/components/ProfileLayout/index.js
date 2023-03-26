import React from 'react';
import { Avatar, Tabs } from 'antd';
import Proptypes from 'prop-types';
import { Container } from './style';
import TweetList from '../../components/TweetList';
import FollowList from '../../components/FollowList';

const ProfileLayout = ({user, rightSideRender}) => {
    return (
        <Container>
            <div className='top_container'>
                <div className='bg_box'></div>
                <div className='user_info_box'>
                    <div className='top_box'>
                        <div><Avatar className='user_avatar'>{user.nickname.slice(0,1)}</Avatar></div> 
                        {rightSideRender&&rightSideRender()}
                    </div>
                    <div className='mid_box'>
                        <p className='nickname'>{user.nickname}</p>
                        <p className='userid'>@{user.userId}</p>
                    </div>
                    <div className='bottom_box'>
                        <p><span>{user.Followings.length}</span> 팔로우 중</p>
                        <p><span>{user.Followers.length}</span> 팔로워</p>
                    </div>
                </div>
            </div>
            <div className='bottom_container'>
                <Tabs
                    defaultActiveKey="1"
                    size={'large'}
                    centered="true"
                    items={[
                        {
                            label: "트윗",
                            key: 0,
                            children: <TweetList user={user}/>,
                        },
                        {
                            label: "팔로우",
                            key: 1,
                            children: <FollowList user={user} type={"following"}/>,
                        },
                        {
                            label: "팔로워",
                            key: 2,
                            children: <FollowList user={user} type={"follower"}/>,
                        }
                    ]}
                />
            </div>
        </Container>
    );
};

ProfileLayout.Proptypes ={
    user : Proptypes.shape({
        userId: Proptypes.number.isRequired,
        nickname: Proptypes.string.isRequired,
        Followings: Proptypes.array,
        Followers: Proptypes.array,
    }),
    rightSideRender: Proptypes.func || Proptypes.element
}

export default ProfileLayout;