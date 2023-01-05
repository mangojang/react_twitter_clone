import React, { useCallback, useEffect, useState } from 'react';
import { Card, Avatar, Form, Input, Button, List } from 'antd';
import { Comment } from '@ant-design/compatible';
import { RetweetOutlined, HeartOutlined, EllipsisOutlined, MessageOutlined } from '@ant-design/icons';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST, LOAD_COMMENT_REQUEST } from '../reducers/post';
import Link from 'next/link';
import user from '../../back/models/user';

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
        console.log("post",post);
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
    },[])

    return (
        <div style={{marginBottom: '10px'}}> 
            <Card 
                key={post.createdAt}
                cover={post.img && <img alt='example' src={post.img}/>}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    <HeartOutlined key="heart" />,
                    <MessageOutlined key="message" onClick={onToggleComment}/>,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                avatar={<Link href={{pathname:'/user/[id]',query:{id:post.User.id}}} legacyBehavior><a><Avatar>{post.User.nickname}</Avatar></a></Link>}
                title={post.User.nickname}
                description={
                <div>
                    {
                        post.content.split(/(#[^\s]+)/g).map((v)=>{
                            if(v.match(/#[^\s]+/)){
                                return <Link href={{pathname:'/hashtag/[tag]',query:{tag:v.slice(1)}}} legacyBehavior><a>{v}</a></Link>
                            }else{
                                return v;
                            }
                        })
                    }
                </div>
                }
                />
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