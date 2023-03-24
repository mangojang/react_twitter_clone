import React, { useCallback, useState } from 'react';
import Proptypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImageZoom from '../ImageZoom';
import { Container } from './style';


const PostImages = ({images}) => {
    const [showImageZoom, setShowImageZoom] = useState(false);
    
    const onZoom = useCallback(()=>{
        setShowImageZoom(true);
    },[]);

    const onClose = useCallback(()=>{
        setShowImageZoom(false);
    },[]);


    if(images.length === 1){
        return(
            <Container>
                <img alt={images[0].content} src={'http://localhost:8000/'+ images[0].content} onClick={onZoom}/>
                {showImageZoom && <ImageZoom images={images} onClose={onClose}/>}
            </Container>
        )
    }

    if(images.length === 2){
        return(
            <Container>
                <div className='group'>
                    <img alt={images[0].content} src={'http://localhost:8000/'+ images[0].content} width="50%" onClick={onZoom}/>
                    <img alt={images[1].content} src={'http://localhost:8000/'+ images[1].content} width="50%" onClick={onZoom}/>
                </div>
                {showImageZoom && <ImageZoom images={images} onClose={onClose}/>}
            </Container>
        )
    }
    return (
        <Container>
            <div className='group'>
                <img alt={images[0].content} src={'http://localhost:8000/'+ images[0].content} width="50%" onClick={onZoom}/>
                <div className='more' onClick={onZoom}>
                    <div>
                        <PlusOutlined/>
                        <p>{images.length -1}개의 사진 더보기</p> 
                    </div>
                </div>
            </div>
            {showImageZoom && <ImageZoom images={images} onClose={onClose}/>}
        </Container>
    );
};

PostImages.Proptypes ={
    images: Proptypes.arrayOf( Proptypes.shape({
        content:Proptypes.string,
    })).isRequired
}

export default PostImages;