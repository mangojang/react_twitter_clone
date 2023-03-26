import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Card, Avatar, Button, List, Popover } from 'antd';
import { Comment } from '@ant-design/compatible';
import { RetweetOutlined, HeartOutlined, EllipsisOutlined, MessageOutlined, HeartTwoTone } from '@ant-design/icons';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LIKE_POST_REQUEST, LOAD_COMMENT_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST, REMOVE_POST_REQUEST } from '../../reducers/post';
import Link from 'next/link';
import PostImages from '../PostImages';
import PostCardContent from '../PostCardContent';
import { PostCard } from './style';
import CommentForm from '../CommentForm';
import FollowButton from '../FollowButton';

const { Meta } = Card;


const postCard = memo(({post}) => {
    const [commentFormOpend, setCommentFormOpend] = useState(false);

    const id= useSelector(state=>state.user.mine && state.user.mine.id);
    const {userInfo}= useSelector(state=>state.user);
    const dispatch = useDispatch();

    // const postMemory = useRef(mine);

    // useEffect(()=>{
    //     console.log('mine useEffect',postMemory.current, postMemory.current === mine)
    // },[mine])

    const onToggleComment = useCallback(()=>{
        setCommentFormOpend(prev => !prev);
        if(!commentFormOpend){
            dispatch({
                type: LOAD_COMMENT_REQUEST,
                data: post.id,
            },[]);
        }
    },[]); 


    const onLike = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요합니다.')
        }

        return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id
        });
    },[id, post && post.id]);

    const onUnLike = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요합니다.')
        }

        return dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id
        });
    },[id, post && post.id]);

    const liked = id ? post.Likers && post.Likers.find((v) => v.id === id) : false;

    const onRetweet = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요합니다.')
        }

        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id
        });
    },[id, post && post.id]);

    const onRemovePost = useCallback(userId=>()=>{
        const isConfirm =confirm("정말 삭제 하시겠습니까?");
        if(isConfirm){
            return dispatch({
                type: REMOVE_POST_REQUEST,
                data: userId
            });
        }
    },[]);

    return (
        <PostCard> 
            <Card 
                className='postcard'
                cover={post.Images && post.Images.length>0 ? <PostImages images={post.Images}/> : null}
                actions={[
                    <RetweetOutlined key="retweet" title='리트윗' onClick={onRetweet} />,
                    liked?<HeartTwoTone key="heart" title='좋아요' onClick={onUnLike} />:<HeartOutlined key="heart" title='좋아요' onClick={onLike} />,
                    <MessageOutlined key="message" title='댓글' onClick={onToggleComment}/>,
                    
                    <Popover key="ellipsis" trigger="click" content={
                        <Button.Group>
                            {
                                id?
                                    post.UserId === id
                                    ?(
                                        <>
                                            <Button onClick={()=>alert('준비중입니다.')}>수정</Button>
                                            <Button onClick={onRemovePost(post.id)}>삭제</Button>
                                        </>
                                    ) 
                                    :userInfo 
                                    ?(<div>Hi!</div>)
                                    :(<FollowButton user={post.User}/>)
                                : (<Button onClick={()=>alert('준비중입니다.')}>신고</Button>)
                            }               
                        </Button.Group>
                    }>
                        <EllipsisOutlined key="ellipsis" title='더보기' />
                    </Popover>
                    
                ]}
                title={post.RetweetId? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
            >
            {post.RetweetId && post.Retweet ?
                (
                <Card
                    cover={post.Retweet.Images && post.Retweet.Images.length>0 ? <PostImages images={post.Retweet.Images}/> : null}    
                >
                    <Meta
                    avatar={<Link href={`/user/${post.Retweet.User.id}`} legacyBehavior><a><Avatar>{post.Retweet.User.nickname.slice(0,1)}</Avatar></a></Link>}
                    title={post.Retweet.User.nickname}
                    description={<PostCardContent postData={post.Retweet.content}/>}
                    />
                </Card>
                )
                :
                <Meta
                avatar={<Link href={`/user/${post.User.id}`} legacyBehavior><a><Avatar>{post.User.nickname.slice(0,1)}</Avatar></a></Link>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content}/>}
                />
            }
            </Card>
            {commentFormOpend && (
                <>
                    <CommentForm post={post}/>
                    <List
                        header={`${post.Comments ? post.Comments.length : 0} 답글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={item=>(
                            <List.Item >
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Link  href={`/user/${post.User.id}`} legacyBehavior><a><Avatar>{item.User.nickname.slice(0,1)}</Avatar></a></Link>}
                                    content={item.content}
                                />
                            </List.Item>
                        )}
                    />
                </>
            )}
        </PostCard>
                            
    );
});

postCard.Proptypes ={
    post: Proptypes.shape({
        User: Proptypes.object,
        content:Proptypes.string,
        img:Proptypes.string,
        createdAt: Proptypes.object
    })
}

export default postCard;