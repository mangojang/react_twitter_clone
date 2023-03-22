import styled from 'styled-components';

export const LoginFormBox = styled.div`
    padding: 8px 16px;
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

