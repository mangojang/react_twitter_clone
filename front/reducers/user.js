const dummyUser = {
    nickname:'mangojang',
    posts:[],
    followings:[{name:'mango'}],
    followers:[],
    signupData: {
        id: '',
        nickname: '',
        password: ''
    }
}

export const initialState = {
    isLoggedIn: false,
    mine: null,
    signupData: null,
};

export const SIGN_UP_REQUEST ='SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS ='SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE ='SIGN_UP_FAILURE';

export const LOG_OUT_REQUEST ='LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS ='LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE ='LOG_OUT_FAILURE';

export const LOG_IN_REQUEST ='LOG_IN_REQUEST';
export const LOG_IN_SUCCESS ='LOG_IN_SUCCESS';
export const LOG_IN_FAILURE ='LOG_IN_FAILURE';

export const signupAction = (data)=> ({
    type: SIGN_UP_REQUEST,
    data: data
});

export const loginAction =(data)=> ({
    type: LOG_IN_REQUEST,
    data: data,
});

export const logoutAction ={
    type: LOG_OUT_REQUEST,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:{
            return {
                ...state,
                isLoading: true,
            }
        }
        case LOG_IN_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                mine: dummyUser,
            }
        }
        case LOG_IN_FAILURE:{
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                mine: null,
            }
        }   
        case LOG_OUT_REQUEST:{
            return {
                ...state,
                isLoading: true,
                // isLoggedIn: true,
                // user: dummyUser,
            }
        }
        case LOG_OUT_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                isLoggedOut: true,
                mine: null,
            }
        }
        case LOG_OUT_FAILURE:{
            return {
                ...state,
                isLoading: false,
                isLoggedOut: false,
            }
        }
        case SIGN_UP_REQUEST:{
            return {
                ...state,
                isLoading: true,
            }
        }
        case SIGN_UP_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                signupData: action.data,
            }
        }
        case SIGN_UP_FAILURE:{
            return {
                ...state,
                isLoading: false,
                signupData: null,
            }
        }
            
        default: {
            return {
                ...state
            }
        }
    }
};

export default reducer;