export const initialState = {
    isLoggedIn: false,
    user: {},
};

const LOG_IN ='LOG_IN';
const LOG_OUT ='LOG_OUT';

const loginAction = {
    type: 'LOG_IN',
    data: {
        nickname: 'mangojang'
    },
};

const logoutAction = {
    type: 'LOG_OUT',
    data: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:{
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case LOG_OUT:{
            return {
                ...state,
                isLoggedIn: false,
                user: action.data,
            }
        }
            
            break;
    
        default: {
            return {
                ...state
            }
        }
            break;
    }
};

export default reducer;