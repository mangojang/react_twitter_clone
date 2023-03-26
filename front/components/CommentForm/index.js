import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button} from 'antd';
import Proptypes from 'prop-types';
import { ADD_COMMENT_REQUEST} from '../../reducers/post';

const { TextArea } = Input;

const CommentForm = ({post}) => {
    const [commentContent, setCommentContent] = useState('');
    const {mine}= useSelector(state=>state.user);
    const {commentAdded, isAddingComment} = useSelector(state=>state.post);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        setCommentContent('');
    },[commentAdded===true])

    const onSubmitComment = useCallback(()=>{
        if(!mine){
            return alert('로그인이 필요 합니다.')
        }
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

    return(
        <Form onFinish={onSubmitComment}>
            <TextArea name="comment_content" placeholder="내 답글을 트윗합니다." value={commentContent} onChange={onChangeContent} maxLength={140} style={{marginTop: '20px'}}/>
            <Button type='primary' htmlType='submit' loading={isAddingComment} style={{marginTop: '10px'}}>답글</Button>
        </Form>
    );
};

CommentForm.Proptypes ={
    post: Proptypes.shape({
        User: Proptypes.object,
        content:Proptypes.string,
        img:Proptypes.string,
        createdAt: Proptypes.object
    })
}

export default CommentForm;
