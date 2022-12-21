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
    user: null,
    signupData: null,
};

export const SIGN_UP ='SIGN_UP';

export const LOG_OUT ='LOG_OUT';

export const LOG_IN_REQUEST ='LOG_IN_REQUEST';
export const LOG_IN_SUCCESS ='LOG_IN_SUCCESS';
export const LOG_IN_FAILURE ='LOG_IN_FAILURE';

export const signupAction = (data)=> {
    return {
        type: SIGN_UP,
        data: data
    }
}

export const loginAction = {
    type: LOG_IN_REQUEST,
    // data: {
    //     nickname: 'mangojang'
    // },
};

export const logoutAction = {
    type: LOG_OUT,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:{
            return {
                ...state,
                isLoading: true,
                // isLoggedIn: true,
                // user: dummyUser,
            }
        }
        case LOG_IN_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                user: dummyUser,
            }
        }
        case LOG_IN_FAILURE:{
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                user: null,
            }
        }   
        case LOG_OUT:{
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        case SIGN_UP:{
            return {
                ...state,
                signupData: action.data,
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