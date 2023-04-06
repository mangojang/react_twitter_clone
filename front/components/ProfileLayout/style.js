import styled from 'styled-components';

export const Container = styled.div`
    .top_container{
        .bg_box{
            height: 200px;
            background-color: #CFD9DE;
        }
        .user_info_box{
            padding: 16px;
            .top_box{
                display: flex;
                justify-content: space-between;
                .user_avatar{
                    width: 133px;
                    height: 133px;
                    margin-top: -72px;
                    border: 5px solid white;
                    font-size: 72px;
                    line-height: 1.6em;
                }
            }
            .mid_box{
                margin: 4px 0 12px;
                .nickname{
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .userid{
                    font-size: 15px;
                    color: var(--grey_color);
                }
            }
            .bottom_box{
                display: flex;
                gap: 16px;
                p {
                    color: var(--grey_color); 
                    span{
                        font-weight: bold;
                        color: var(--default_color);
                        margin-right: 4px;
                    } 
                }
            }
        }
    }
    .bottom_container{
        .btns_box{
            display: flex;
            justify-content: center;
            margin: 16px 0;
        }
    }  
`;