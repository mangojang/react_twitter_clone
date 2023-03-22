import styled from 'styled-components';
import { Button } from 'antd';

export const LoginFormBox = styled.div`
    .login_input{ 
        margin-bottom: 10px;
    }
    .ant-form-item-explain{
        position: relative;
        top: -3px;
    }
    .btns_box{
        button{
            margin-right: 10px;
            &:last-child{
                margin-right: 0;
            }
        }    
    }
`;

export const Btn = styled(Button)`
    ${(props) => {
        switch (props.styleType) {
        case "primary":
            return `
                background-color: var(--primary_color);
            `;
        default:
            return `
                background-color: white;
            `;
        }
  }}
`;