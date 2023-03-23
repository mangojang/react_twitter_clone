import React from 'react';
import { Container } from './style';

const PageLayout = (props) => {
    return (
        <Container>
            <div className='header'>
                <p className='title'>{props.title}</p>
                <p className='desc'>{props.desc}</p>
            </div>
            <div className='body'>
                {props.children}
            </div>
        </Container>
    );
};

export default PageLayout;