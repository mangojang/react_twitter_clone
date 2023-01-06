import React, { useCallback, useState } from 'react';
import Proptypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import Slick from 'react-slick';

const ImageZoom = ({images, onClose}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div style={{position: 'fixed', zIndex: 5000, top: 0, left: 0, right: 0, bottom: 0}}>
            <div style={{ height: 44, background: 'white', position: 'relative', padding: 0, textAlign: 'center'}}>
                <h1 style={{ margin: 0, fontSize: '17px', color: '#333', lineHeight: '44px'}}>상세이미지</h1>
                <CloseOutlined onClick={onClose} style={{position: 'absolute', right: 0, top: 0, padding: 14, lineHeight: '14px', cursor: 'pointer'}}/>
            </div>
            <div style={{height: 'calc(100% - 44px)', background: '#090909'}}>
                <div>
                    <Slick
                        initialSlide={0}
                        afterChange={(slide)=>{setCurrentSlide(slide)}}
                        infinite={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v)=>{
                            return(
                                <div style={{padding: 32, textAlign: 'center'}}>
                                    <img src={`http://localhost:8000/${v.content}`} style={{margin:'0 auto', maxHeight:750}}/>
                                </div>
                            )
                        })}
                    </Slick>
                    <div style={{textAlign: 'center'}}>
                        <div style={{width:75, height:30, linheHeight:'30px', borderRadius:15, background:'#313131', display:'inline-block', textAlign:'center', color:'white', fontSize:'15px'}}>{currentSlide + 1} / {images.length}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ImageZoom.Proptypes ={
    images: Proptypes.arrayOf( Proptypes.shape({
        content:Proptypes.string,
    })).isRequired,
    onClose: Proptypes.func.isRequired
}

export default ImageZoom;