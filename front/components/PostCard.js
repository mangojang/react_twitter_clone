import React from 'react';
import { Card, Avatar } from 'antd';
import { RetweetOutlined, HeartOutlined, EllipsisOutlined, MessageOutlined } from '@ant-design/icons';
import Proptypes from 'prop-types';

const { Meta } = Card;

const postCard = ({post}) => {
    return (
        <Card 
            key={+post.createdAt}
            cover={post.img && <img alt='example' src={post.img}/>}
            actions={[
                <RetweetOutlined key="retweet" />,
                <HeartOutlined key="heart" />,
                <MessageOutlined key="message" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
            style={{marginBottom: '10px'}}
            
        >
            <Meta
            avatar={<Avatar>{post.User.nickname}</Avatar>}
            title={post.User.nickname}
            description={post.content}
            />
        </Card>
    );
};

postCard.Proptypes ={
    post: Proptypes.shape({
        User: Proptypes.object,
        content:Proptypes.string,
        img:Proptypes.string,
        createdAt: Proptypes.object
    })
}

export default postCard;