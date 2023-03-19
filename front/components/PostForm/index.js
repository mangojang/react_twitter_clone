import React, {useCallback, useState, useEffect, useRef} from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGE_REQUEST } from '../../reducers/post';

const { TextArea } = Input;

const PostForm = () => {
    const { imagePaths, isAddingPost, postAdded } = useSelector(state=>state.post)
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const imageInput = useRef();

    useEffect(()=>{
        setContent('');
    },[postAdded==true]);

    const onSubmit = useCallback((e) => {
        if(!content || !content.trim()){
            return alert("게시글을 작성해주세요.")
        }
        console.log(content);
        const formData = new FormData();
        imagePaths.forEach((i)=>{
            formData.append('image', i);
        })
        formData.append('content', content.trim());

        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    },[content, imagePaths]);

    const onClickImageUpload = useCallback((e)=>{
        imageInput.current.click();
    },[]);

    const onChangeContent = useCallback((e)=>{
        setContent(e.target.value);
    },[]);

    const onChangeImages = useCallback((e)=>{
        console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f)=>{
            imageFormData.append('image',f);
        })
        dispatch({
            type: UPLOAD_IMAGE_REQUEST,
            data: imageFormData
        },[]);
    },[]);

    const onRemoveImage = useCallback(index=>(e)=>{
        dispatch({
            type: REMOVE_IMAGE,
            data: index
        },[])
    },[]);


    return (
        <Form encType='multipart/form-data' onFinish={onSubmit}>
            <TextArea name="post_content" placeholder="어떤 일이 있으셨나요?" value={content} onChange={onChangeContent} maxLength={140} />
            <div style={{display:'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px'}}>
                <input name='post_image' type='file' hidden={true} ref={imageInput} onChange={onChangeImages} style={{display:'none'}}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type='primary' htmlType='submit' loading={isAddingPost}>짹짹</Button>
            </div>
            {imagePaths.map((v, i) => {
                return(
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={'http://localhost:8000/'+v} style={{width:'200px'}} alt={v}/>
                        <div>
                            <Button onClick={onRemoveImage(i)}>제거</Button>
                        </div>
                    </div>
                )
            })}
        </Form>
    );
};

export default PostForm;