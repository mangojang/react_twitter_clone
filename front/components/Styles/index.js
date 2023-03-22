import styled from 'styled-components';
import { Button } from 'antd';

export const Btn = styled(Button)`
    ${(props) => {
        switch (props.styletype) {
        case "primary":
            return `
                background-color: var(--primary_color);
            `;
            case "icon":
                return `
                    background-color: rgba(15, 20, 25, 0.75);
                    color: white;
                    &:hover{
                        background-color: rgba(39, 44, 48, 0.75);
                        color: white !important;
                        border-color: white !important;
                    }
                    
                `;
        default:
            return `
                background-color: white;
            `;
        }
    }}
    border-radius: 9999px;
`;