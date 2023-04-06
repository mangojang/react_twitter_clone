import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Zoom = styled.div`
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px; 
    background: white; 
    position: relative; 
    padding: 0; 
    text-align: center;
    .title{
        font-size: 20px;
        font-weight: 700;
    }
`;

export const BtnClose = styled(CloseOutlined)`
    position: absolute;
    right: 0;
    top: 5px;
    padding: 14px;
    line-height: 14px;
    cursor: pointer;
`;

export const Body = styled.div`
    height: calc(100% - 44px);
    background-color: #090909;
    .inner{
        height: 100%;
        position: relative;
        .image_box{
            >div{
                 display: flex;
                align-items: center;
                justify-content: center;
                height: calc(100vh - 44px);
            }
            img{
                border-radius: 0;
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            }
        }
        .pagination{
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            border-radius: 15px;
            background-color: #313131;
            padding: 4px 16px;
            span{
                color: white;
            }

        }
    }
`;