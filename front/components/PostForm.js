import React, {useCallback, useState, useEffect} from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

const { TextArea } = Input;

const PostForm = () => {
    const { imagePaths, isAddingPost, postAdded } = useSelector(state=>state.post)
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
        setContent('');
    },[postAdded==true]);

    const onSubmit = useCallback((e) => {
        console.log({
            content
        });
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                content: content
            },
        });
    },[content]);

    const onClickImageUpload = useCallback((e)=>{
        const postImage = document.getElementById('postImage');
        postImage.click();
    },[]);

    const onChangeContent = useCallback((e)=>{
        setContent(e.target.value);
    },[]);

    return (
        <Form encType='multipart/form-data' onFinish={onSubmit}>
            <TextArea name="post_content" placeholder="어떤 일이 있으셨나요?" value={content} onChange={onChangeContent} maxLength={140} />
            <div style={{display:'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px'}}>
                <input id='postImage' name='post_image' type='file' hidden={true} style={{display:'none'}}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type='primary' htmlType='submit' loading={isAddingPost}>짹짹</Button>
            </div>
            {imagePaths.map((v,i)=>{
                return(
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={'http://localhost:3000/'+v} style={{width:'200px'}} alt={v}/>
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                )
            })}
        </Form>
    );
};

export default PostForm;