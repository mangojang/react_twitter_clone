const dummyUser = {
    nickname:'mangojang',
    posts:[],
    followings:[{name:'mango'}],
    followers:[],
    signupData: {
        userId: '',
        nickname: '',
        password: ''
    }
}

export const initialState = {
    isLoggedIn: false, //로그인 여부
    isLoggingIn: false, //로그인 시도중
    isLoggingOut: false, //로그아웃 시도중
    loginErrorReason: '', //로그인 실패 사유
    signedUp: false, //회원가입 성공
    isSigningUp: false, //회원가입 시도중
    signUpErrorReason:'', //회원 가입 실패 사유
    mine: null, //내 정보
    followingList: [], //팔로잉 리스트
    followerList: [], //팔로워 리스트
    userInfo: null, //남의 정보
    isEditingNickname: false, //닉네임 수정중
    editNicknameErrorReason: '', //닉네임 수정 실패 사유
    logoutErrorReason: '',
    loadUserErrorReason:'',
    loadMyInfoErrorReason:'',
    followErrorReason:'',
    unfollowErrorReason:'',
    loadFollowersErrorReason:'',
    loadFollowingsErrorReason:'',
    removeFollowerErrorReason:'',

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

export const LOAD_MYINFO_REQUEST ='LOAD_MYINFO_REQUEST';
export const LOAD_MYINFO_SUCCESS ='LOAD_MYINFO_SUCCESS';
export const LOAD_MYINFO_FAILURE ='LOAD_MYINFO_FAILURE';

export const LOAD_USER_REQUEST ='LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS ='LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE ='LOAD_USER_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST ='LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS ='LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE ='LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST ='LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS ='LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE ='LOAD_FOLLOWERS_FAILURE';

export const FOLLOW_USER_REQUEST ='FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS ='FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE ='FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST ='UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS ='UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE ='UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST ='REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS ='REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE ='REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

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
                isLoggingIn: true,
                loginErrorReason:'',
            }
        }
        case LOG_IN_SUCCESS:{
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                mine: action.data,
            }
        }
        case LOG_IN_FAILURE:{
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
                loginErrorReason:action.error.reason,
                mine: null,
            }
        }   
        case LOG_OUT_REQUEST:{
            return {
                ...state,
                isLoggingOut: true,
            }
        }
        case LOG_OUT_SUCCESS:{
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                mine: null,
            }
        }
        case LOG_OUT_FAILURE:{
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: true,
            }
        }
        case SIGN_UP_REQUEST:{
            return {
                ...state,
                isSigningUp: true,
                signUpErrorReason: '',
            }
        }
        case SIGN_UP_SUCCESS:{
            return {
                ...state,
                isSigningUp: false,
                signedUp: true,
            }
        }
        case SIGN_UP_FAILURE:{
            return {
                ...state,
                isSigningUp: false,
                signedUp: false,
                signUpErrorReason: action.error,
            }
        }
        case LOAD_USER_REQUEST:{
            return {
                ...state,
                loadUserErrorReason:'',
            }
        }
        case LOAD_USER_SUCCESS:{
            return {
                ...state,
                userInfo: action.data,
            }
        }
        case LOAD_USER_FAILURE:{
            return {
                ...state,
                loadUserErrorReason: action.error,
            }
        }
        case LOAD_MYINFO_REQUEST:{
            return {
                ...state,
                loadMyInfoErrorReason:'',
            }
        }
        case LOAD_MYINFO_SUCCESS:{
            return {
                ...state,
                mine: action.data,
            }    
        }
        case LOAD_MYINFO_FAILURE:{
            return {
                ...state,
                loadMyInfoErrorReason: action.error,
            }
        }
        case FOLLOW_USER_REQUEST:{
            return {
                ...state,
            }
        }
        case FOLLOW_USER_SUCCESS:{
            return {
                ...state,
                mine: {
                    ...state.mine,
                    Followings: [{id: action.data}, ...state.mine.Followings],
                }
            }    
        }
        case FOLLOW_USER_FAILURE:{
            return {
                ...state,
            }
        }
        case UNFOLLOW_USER_REQUEST:{
            return {
                ...state,
            }
        }
        case UNFOLLOW_USER_SUCCESS:{
            return {
                ...state,
                mine: {
                    ...state.mine,
                    Followings: [...state.mine.Followings].filter(v=>v.id !== action.data),
                },
                followingList: state.followingList.filter(v=>v.id !== action.data),
            }    
        }
        case UNFOLLOW_USER_FAILURE:{
            return {
                ...state,
            }
        }
        case ADD_POST_TO_ME:{
            return {
                ...state,
                mine: {
                    ...state.mine,
                    Post: [{id: action.data}, ...state.mine.Post],
                }
            }
        }
        case LOAD_FOLLOWERS_REQUEST:{
            return {
                ...state,
            }
        }
        case LOAD_FOLLOWERS_SUCCESS:{
            return {
                ...state,
                followerList: action.data,
            }    
        }
        case LOAD_FOLLOWERS_FAILURE:{
            return {
                ...state,
            }
        }
        case LOAD_FOLLOWINGS_REQUEST:{
            return {
                ...state,
            }
        }
        case LOAD_FOLLOWINGS_SUCCESS:{
            return {
                ...state,
                followingList: action.data,
            }    
        }
        case LOAD_FOLLOWINGS_FAILURE:{
            return {
                ...state,
            }
        }
        case REMOVE_FOLLOWER_REQUEST:{
            return {
                ...state,
            }
        }
        case REMOVE_FOLLOWER_SUCCESS:{
            return {
                ...state,
                mine: {
                    ...state.mine,
                    Followers: [...state.mine.Followers].filter(v=>v.id !== action.data),
                },
                followerList: state.followerList.filter(v=>v.id !== action.data),
            }    
        }
        case REMOVE_FOLLOWER_FAILURE:{
            return {
                ...state,
            }
        }
        case EDIT_NICKNAME_REQUEST:{
            return {
                ...state,
                isEditingNickname: true,
                editNicknameErrorReason : '',
            }
        }
        case EDIT_NICKNAME_SUCCESS:{
            return {
                ...state,
                isEditingNickname: false,
                mine: {
                    ...state.mine,
                    nickname : action.data
                },
            }    
        }
        case EDIT_NICKNAME_FAILURE:{
            return {
                ...state,
                isEditingNickname: false,
                editNicknameErrorReason: action.error,
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