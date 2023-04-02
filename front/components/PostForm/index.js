import React, {useCallback, useState, useEffect, useRef} from 'react';
import { Button, Form, Input, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGE_REQUEST } from '../../reducers/post';
import { Btn } from '../Styles';
import { PictureOutlined, CloseOutlined } from '@ant-design/icons';
import { PostFormBox } from './style';

const { TextArea } = Input;

const PostForm = (props) => {
    const { imagePaths, isAddingPost, postAdded } = useSelector(state=>state.post);
    const { mine } = useSelector(state=>state.user);
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
        <PostFormBox>
            <div className='left'>
                <Avatar className='postform_avatar' size="large">{mine.nickname.slice(0,1)}</Avatar>
            </div>
            <div className='right'>
                <Form encType='multipart/form-data' onFinish={onSubmit}>
                    <TextArea name="post_content" placeholder="무슨 일이 일어나고 있나요?" value={content} onChange={onChangeContent} maxLength={140} />
                    <div style={{display:'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px'}}>
                        <input name='post_image' type='file' hidden={true} ref={imageInput} onChange={onChangeImages} style={{display:'none'}}/>
                        <Button icon={<PictureOutlined />} title={'이미지 업로드'} onClick={onClickImageUpload}/>
                        <Button type='primary' htmlType='submit' loading={isAddingPost}>트윗하기</Button>
                    </div>
                    <div className='image_container'>
                        {imagePaths.map((v, i) => {
                            return(
                                <div key={v}>
                                    <div>
                                        <Btn icon={<CloseOutlined />} title={'삭제'} styletype='icon' onClick={onRemoveImage(i)}/>
                                    </div>
                                    <img src={`${backURL}/`+v} style={{width:'200px'}} alt={v}/>
                                </div>
                            )
                        })}
                    </div>
                </Form>
            </div>
        </PostFormBox>
    );
};


export default PostForm;