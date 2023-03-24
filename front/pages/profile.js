import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, List, Avatar, Tabs, Empty, Modal } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import NicknameEditForm from '../components/NicknameEditForm';
import { END } from "redux-saga";
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, REMOVE_FOLLOWER_REQUEST, UNFOLLOW_USER_REQUEST, LOAD_MYINFO_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';
import PostCard from '../components/PostCard';
import PageLayout from '../components/PageLayout';
import { ProfileLayout } from '../components/ProfileLayout/style';
import { TitleBox, UserProfleCard } from '../components/UserProfile/style';

const axios = require("axios");

const { Meta } = Card;

const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { mine, followerList, followingList, hasMoreFollowing, hasMoreFollower } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        if(!mine ){
            alert('로그아웃시 접근 불가합니다.')
            router.push('/')    
        }
    },[mine && mine.id]);

    useEffect(() => {
        function onScroll() {
            // console.log('@@mainPosts', mainPosts[mainPosts.length-1].id);
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePost) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_USER_POSTS_REQUEST,
                        data: mine.id,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePost, mainPosts[mainPosts.length - 1]?.id]);

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

    const tweetComponent = ()=>{
        return(
            <div>
                {mainPosts.map((v,i)=>{
                    return(
                        <PostCard key={i} post={v}/>  
                    )
                })}
            </div>
        )
    }

    const titleComponent = props=>{
        const {type, data} = props;
        return(
            <TitleBox>
                <div>{data.nickname}</div>
                { type ==="following"
                    ?<Button onClick={onUnFollow(data.id)}>언팔로우</Button>
                    :<Button onClick={onRemoveFollower(data.id)}>차단</Button>
                }
            </TitleBox>
        )
    }

    const followComponent =  props=>{
        const {key, data} = props;
        return(
            <UserProfleCard key={key}>
                <Card>
                    <Meta
                        avatar={<Avatar size="large">{data.nickname.slice(0,1)}</Avatar>}
                        title={titleComponent(props)}
                        description={'@'+data.userId}
                    />
                </Card>
            </UserProfleCard> 
        )
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    if(!mine ){
        return null;
    }

    return (
        <PageLayout title={mine.nickname} desc={mine.Post.length+"트윗"}>
            <ProfileLayout>
                <div className='top_container'>
                    <div className='bg_box'></div>
                    <div className='user_info_box'>
                        <div className='top_box'>
                            <div><Avatar className='user_avatar'>{mine.nickname.slice(0,1)}</Avatar></div> 
                            <div><Button onClick={showModal}>프로필 수정</Button></div>
                            <Modal title="프로필 수정" cancelText="취소" okText="확인" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <NicknameEditForm/>
                            </Modal>
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
                                children: mainPosts && mainPosts.length? tweetComponent() : <Empty/>,
                            },
                            {
                                label: "팔로우",
                                key: 1,
                                children: followingList && followingList.length? followingList.map((item,i)=> {return followComponent({key:i, data:item, type:"following"})}) : <Empty />,
                            },
                            {
                                label: "팔로워",
                                key: 2,
                                children: followerList && followerList.length? followerList.map((item,i)=> {return followComponent({key:i, data:item, type:"follower"})}) : <Empty />,
                            }
                        ]}
                    />
                </div>
            </ProfileLayout>
            {/* <NicknameEditForm/> */}
            {/* <List
                style={{marginBottom: '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={ hasMoreFollower && <Button style={{width: '100%'}}  onClick={loadMoreFollowers}>더 보기</Button>}
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
                loadMore={hasMoreFollowing && <Button style={{width: '100%'}} onClick={loadMoreFollowings}>더 보기</Button>}
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
            </div> */}
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

    // console.log('@@state.user',state.user);
    // if (state.user.mine){
    //     console.log('@@ 있다')
    //     // return {
    //     //     redirect: {
    //     //         permanent: false,
    //     //         destination: "/",
    //     //     },
    //     //     props:{},
    //     // }
    // }else{
    //     console.log('@@ 없다')
    // }
});

export default Profile;