import styled from 'styled-components';

export const PostCard = styled.div`
    padding: 8px 16px;
    .postcard{
        transition: background-color .2s ease-in;
        ul{
            background-color: transparent;
        }
        &:hover{
            background-color: rgba(0,0,0,.03);
        }
    }
`;