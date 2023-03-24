import React, { useCallback, useState } from 'react';
import Proptypes from 'prop-types';
import Slick from 'react-slick';
import  {Header, BtnClose, Zoom, Body } from './style';


const ImageZoom = ({images, onClose}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <Zoom>
            <Header>
                <h1 className='title'>상세이미지</h1>
                <BtnClose onClick={onClose} size={'large'}/>
            </Header>
            <Body>
                <div className='inner'>
                    <Slick
                        adaptiveHeight={true}
                        initialSlide={0}
                        afterChange={(slide)=>{setCurrentSlide(slide)}}
                        infinite={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                        style={{outline: '1px solid white'}}
                    >
                        {images.map((v)=>{
                            return(
                                <div className='image_box'>
                                    <div>
                                        <img src={`http://localhost:8000/${v.content}`}/>
                                    </div>
                                </div>
                            )
                        })}
                    </Slick>
                    <div className='pagination'>
                        <span>{currentSlide + 1} / {images.length}</span>
                    </div>
                </div>
            </Body>
        </Zoom>
    );
};

ImageZoom.Proptypes ={
    images: Proptypes.arrayOf( Proptypes.shape({
        content:Proptypes.string,
    })).isRequired,
    onClose: Proptypes.func.isRequired
}

export default ImageZoom;