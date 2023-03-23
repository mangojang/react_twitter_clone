import styled from 'styled-components';
import { TwitterOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Col } from 'antd';

export const Logo = styled.h1`
    a{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 52px;
        height: 52px; 
        border-radius: 50%;
        /* color: #FCC419; */
        color: #1D9BF0;
        &:hover{
            background-color: rgba(29, 155, 240, 0.1); 
        }
    }
`;

export const LogoIcon = styled(TwitterOutlined)`
    svg{
        width: 28px;
        height: 100%;
    }
    &:hover{
        background: initial;
    }
`;

export const HomeIcon = styled(HomeOutlined)`
    svg{
        width: 28px;
        height: 100%;
    }
    &:hover{
        background: initial;
    }
`;

export const ProfileIcon = styled(UserOutlined)`
    svg{
        width: 28px;
        height: 100%;
    }
    &:hover{
        background: initial;
    }
`;

export const SideBarLeft = styled(Col)`
    display: flex;
    justify-content: flex-end;
    border-right: 1px solid rgb(239, 243, 244);
    >div{
        position: fixed;
        min-width: 275px;
        padding: 8px;
    }
    @media (max-width: 1200px) {
        >div{
            min-width: initial;
        }
    }
`;

export const Container = styled.div`
    display: flex;
    .contents{
        width: 600px;
        @media (max-width: 1200px) {
            width: 65%;
        }
    }
    @media (max-width: 992px) {
        flex-wrap: wrap;
        .contents{
            width: 100%;
        }
        .sidebar_right{
            width: 100%;
        }
    }
`;

export const SideBarRight = styled.div`
    /* padding: 8px 16px; */
    border-left: 1px solid rgb(239, 243, 244);
    >div{
        position: sticky;
        top: 0;
        
    }
    .cmt{
        font-size: 13px;
        color: #536471;
        line-height: 1.2;
        word-break: keep-all;
        margin: 8px 16px;
    }
    @media (max-width: 992px) {
        >div{
            position: initial;
        }
    }
`;

export const Gnb = styled.ul`
    li{
        width: 100%;
        height: 52px;
        a{
            display: block;
            .hover_area{
                display: inline-flex;
                align-items: center;
                border-radius: 9999px;
                transition: background-color .2s ease;
                padding: 12px ;
                color: #0F1419;
                .gnb_icon{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .gnb_title{
                    font-size: 20px;
                    margin-left: 20px;
                    margin-right: 16px;
                    @media (max-width: 1200px) {
                       display: none;
                    }
                }
            }
            &:hover{
                .hover_area{
                    background-color: #0F14191A;
                }
            }
        }
        &.on{
            .gnb_title{
                font-weight: 700;
            }
        }
    }
`;
