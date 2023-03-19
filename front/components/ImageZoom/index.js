import React, { useCallback, useState } from 'react';
import Proptypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import Slick from 'react-slick';
import styled from 'styled-components';
import  {Header, BtnClose } from './style';

// const Header = styled.div`
//     height: 44px; 
//     background: white; 
//     position: relative; 
//     padding: 0; 
//     text-align: center;
// `;

// const BtnClose = styled(CloseOutlined)`
//     position: absolute;
//     right: 0;
//     top: 0;
//     padding: 14px;
//     line-height: 14px;
//     cursor: pointer;
// `;

const ImageZoom = ({images, onClose}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div style={{position: 'fixed', zIndex: 5000, top: 0, left: 0, right: 0, bottom: 0}}>
            <Header>
                <h1 style={{ margin: 0, fontSize: '17px', color: '#333', lineHeight: '44px'}}>상세이미지</h1>
                <BtnClose onClick={onClose}/>
            </Header>
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