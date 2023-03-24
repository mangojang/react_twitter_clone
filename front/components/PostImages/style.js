import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    img{
        display: block;
        object-fit: cover;
        cursor: pointer;
    }
    .group{
        display: flex;
        gap: 4px;
        .more{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            cursor:pointer;
            text-align: center;
        }
    }
    >img{
        width: 100%;
    }
`;