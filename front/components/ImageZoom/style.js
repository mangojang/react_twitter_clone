import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Header = styled.div`
    height: 44px; 
    background: white; 
    position: relative; 
    padding: 0; 
    text-align: center;
`;

export const BtnClose = styled(CloseOutlined)`
    position: absolute;
    right: 0;
    top: 0;
    padding: 14px;
    line-height: 14px;
    cursor: pointer;
`;