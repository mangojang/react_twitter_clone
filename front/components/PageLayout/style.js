import styled from 'styled-components';

export const Container = styled.div`
        .header{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            height: 54px;
            padding: 0 16px;
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: rgba(255,255,255,.8);
            .title{
                width: 100%;
                font-size: 20px;
                font-weight: 700;
            }
            .desc{
                width: 100%;
                font-size: 13px;
                color: var(--grey_color);
                position: relative;
                top: -2px;
            }
        }
        .btns_area{
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
`;