import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';
import { END } from "redux-saga";
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MYINFO_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';
import PageLayout from '../components/PageLayout';
import  ProfileLayout from '../components/ProfileLayout';

const axios = require("axios");


const Profile = () => {
    const router = useRouter()
    const { mine } = useSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        if(!mine ){
            alert('로그아웃시 접근 불가합니다.')
            router.push('/')    
        }
    },[mine && mine.id]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const rightSideRender = () => {
        return(
            <>
                <div><Button onClick={showModal}>프로필 수정</Button></div>
                <Modal title="프로필 수정" cancelText="취소" okText="확인" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <NicknameEditForm/>
                </Modal>
            </>
        )
    };

    
    
    if(!mine ){
        return null;
    }

    return (
        <PageLayout title={mine.nickname} desc={mine.Post.length+"트윗"}>
            <ProfileLayout user={mine} rightSideRender={rightSideRender}/>
            {/* <ProfileLayout>
                <div className='top_container'>
                    <div className='bg_box'></div>
                    <div className='user_info_box'>
                        <div className='top_box'>
                            <div><Avatar className='user_avatar'>{mine.nickname.slice(0,1)}</Avatar></div> 
                            {rightSideRender()}
                        </div>
                        <div className='mid_box'>
                            <p className='nickname'>{mine.nickname}</p>
                            <p className='userid'>@{mine.userId}</p>
                        </div>
                        <div className='bottom_box'>
                            <p><span>{mine.Followings.length}</span> 팔로우 중</p>
                            <p><span>{mine.Followers.length}</span> 팔로워</p>
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
                                children: <TweetList/>,
                            },
                            {
                                label: "팔로우",
                                key: 1,
                                children: <FollowList type={"following"}/>,
                            },
                            {
                                label: "팔로워",
                                key: 2,
                                children: <FollowList type={"follower"}/>,
                            }
                        ]}
                    />
                </div>
            </ProfileLayout> */}
        </PageLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const cookie = req? req.headers.cookie:'';

    const state = store.getState();

    axios.defaults.headers.Cookie= '';
    if(req&&cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    
    store.dispatch({
        type: LOAD_MYINFO_REQUEST
    });

    store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: state.user &&state.user.mine && state.user.mine.id,
    });
    
    store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: state.user &&state.user.mine && state.user.mine.id,
    });

    store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: state.user &&state.user.mine && state.user.mine.id,
    });

    store.dispatch(END);

    await store.sagaTask.toPromise();

});

export default Profile;