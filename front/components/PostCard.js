import React, { useCallback, useEffect, useState } from 'react';
import { Card, Avatar, Form, Input, Button, List } from 'antd';
import { Comment } from '@ant-design/compatible';
import { RetweetOutlined, HeartOutlined, EllipsisOutlined, MessageOutlined, HeartTwoTone } from '@ant-design/icons';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST, LIKE_POST_REQUEST, LOAD_COMMENT_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import Link from 'next/link';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';

const { Meta } = Card;
const { TextArea } = Input;

const postCard = ({post}) => {
    
    const [commentFormOpend, setCommentFormOpend] = useState(false);
    const [commentContent, setCommentContent] = useState('');

    const {mine}= useSelector(state=>state.user);
    const {commentAdded, isAddingComment} = useSelector(state=>state.post);
    const dispatch = useDispatch();

    useEffect(()=>{
        setCommentContent('');
    },[commentAdded===true])


    const onToggleComment = useCallback(()=>{
        setCommentFormOpend(prev => !prev);
        if(!commentFormOpend){
            dispatch({
                type: LOAD_COMMENT_REQUEST,
                data: post.id,
            },[]);
        }
    },[]); 

    const onSubmitComment = useCallback(()=>{
        if(!mine){
            return alert('로그인이 필요 합니다.')
        }
        console.log("post",post);
        return dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                postId: post.id,
                content: commentContent
            }
        })
    },[mine && mine.id, commentContent]);

    const onChangeContent = useCallback((e)=>{
        setCommentContent(e.target.value);
    },[]);


    const onLike = useCallback(()=>{
        if(!mine){
            return alert('로그인이 필요합니다.')
        }

        return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id
        });
    },[mine && mine.id, post && post.id]);

    const onUnLike = useCallback(()=>{
        if(!mine){
            return alert('로그인이 필요합니다.')
        }

        return dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id
        });
    },[mine && mine.id, post && post.id]);

    const liked = post.Likers && post.Likers.find((v) => v.id === mine.id);

    const onRetweet = useCallback(()=>{
        if(!mine){
            return alert('로그인이 필요합니다.')
        }

        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id
        });
    },[mine && mine.id, post && post.id]);

    return (
        <div style={{marginBottom: '10px'}}> 
            <Card 
                key={+post.id}
                // cover={post.Images[0] && <img alt='example' src={'http://localhost:8000/'+ post.Images[0].content}/>}
                cover={post.Images && post.Images.length>0 ? <PostImages images={post.Images}/> : null}
                actions={[
                    <RetweetOutlined key="retweet" onClick={onRetweet} />,
                    liked?<HeartTwoTone key="heart" onClick={onUnLike} />:<HeartOutlined key="heart" onClick={onLike} />,
                    <MessageOutlined key="message" onClick={onToggleComment}/>,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                title={post.RetweetId? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                extra={<Button>팔로우</Button>}
            >
            {post.RetweetId && post.Retweet ?
                (
                <Card
                    cover={post.Retweet.Images && post.Retweet.Images.length>0 ? <PostImages images={post.Retweet.Images}/> : null}    
                >
                    <Meta
                    avatar={<Link href={{pathname:'/user/[id]',query:{id:post.Retweet.User.id}}} legacyBehavior><a><Avatar>{post.Retweet.User.nickname}</Avatar></a></Link>}
                    title={post.Retweet.User.nickname}
                    description={<PostCardContent postData={post.Retweet.content}/>}
                    />
                </Card>
                )
                :
                <Meta
                avatar={<Link href={{pathname:'/user/[id]',query:{id:post.User.id}}} legacyBehavior><a><Avatar>{post.User.nickname}</Avatar></a></Link>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content}/>}
                />
            }
            </Card>
            {commentFormOpend && (
                <>
                    <Form onFinish={onSubmitComment}>
                        <TextArea name="comment_content" placeholder="댓글을 입력해주세요" value={commentContent} onChange={onChangeContent} maxLength={140} style={{marginTop: '20px'}}/>
                        <Button type='primary' htmlType='submit' loading={isAddingComment} style={{marginTop: '10px'}}>전송</Button>
                    </Form>
                    <List
                        header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={item=>(
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Link  href={{pathname:'/user/[id]',query:{id:post.User.id}}} legacyBehavior><a><Avatar>{item.User.nickname}</Avatar></a></Link>}
                                    content={item.content}
                                    //datetime={item.createdAt}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
    );
};

postCard.Proptypes ={
    post: Proptypes.shape({
        User: Proptypes.object,
        content:Proptypes.string,
        img:Proptypes.string,
        createdAt: Proptypes.object
    })
}

export default postCard;