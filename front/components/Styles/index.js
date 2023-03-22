import styled from 'styled-components';
import { Button } from 'antd';

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
    border-radius: 9999px;
`;