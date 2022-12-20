import React from 'react';
import Proptypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';



const App = ({Component, ...rest }) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <AppLayout>
                <Component {...props.pageProps}/>
            </AppLayout>
        </Provider>
    );
};

App.Proptypes ={
    Component: Proptypes.elementType,
    store: Proptypes.object,
}


export default App;




