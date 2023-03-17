import Error from 'next/error';
import Proptypes from 'prop-types';
import React from 'react';
import wrapper from '../store/configureStore';

const ErrorPage = (props) => {
    return (
        <div>
            <h1>{props.statusCode} 에러 발생</h1>
            {/* <Error statusCode={props.statusCode}/> */}
        </div>
    );
};

ErrorPage.Proptypes ={
    statusCode: Proptypes.number,
}

ErrorPage.defaultProps ={
    statusCode: 200,
}

// ErrorPage.getInitialProps = ({ res, err }) => {
//     const statusCode = res ? res.statusCode : err ? err.statusCode : 404
//     return { statusCode }
// }

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode :  null;

    return {props: {statusCode}}
});

export default ErrorPage;