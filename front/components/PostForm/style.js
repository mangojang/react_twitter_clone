import styled from 'styled-components';

export const PostFormBox = styled.div`
    padding: 8px 16px;
    display: flex;
    .left{
        padding-right: 12px;
    }
    .right{
        flex: 1;
    }
    .postform_avatar{
        width: 48px;
        height: 48px;
        font-size: 28px;
        line-height: 1.6em;
    }
    .image_container{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
`;