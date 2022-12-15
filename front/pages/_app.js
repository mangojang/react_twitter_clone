import React from 'react';
import Proptypes from 'prop-types';
import AppLayout from '../components/AppLayout';

const twitter = ({Component}) => {
    return (
        <AppLayout>
            <Component/>
        </AppLayout>
    );
};

twitter.Proptypes ={
    Component: Proptypes.node,
}

export default twitter;