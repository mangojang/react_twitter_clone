import styled from 'styled-components';

export const SearchBox = styled.div`
    position: sticky;
    top: 0;
    background-color: #fff;
    padding: 8px 16px;
    z-index: 10;
    .search_input{
        vertical-align: middle;
        button{
            background-color: var(--primary_color);
        }
    }
`;