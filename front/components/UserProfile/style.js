import styled from 'styled-components';

export const UserProfleCard = styled.div`
    padding: 12px;
    .ant-card-meta-title{
        margin-bottom: 4px !important;
    }
    .btn_more{
        border-radius: 50%;
        &:hover{
            background-color: #0F14191A;
        }
    }
    @media (max-width: 1200px) {
        display: none;
    }
`;

export const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;