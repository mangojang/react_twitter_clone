import produce from 'immer';

// const dummyUser = {
//     nickname:'mangojang',
//     posts:[],
//     followings:[{name:'mango'}],
//     followers:[],
//     signupData: {
//         userId: '',
//         nickname: '',
//         password: ''
//     }
// }

export const initialState = {
    //login
    mine: null, //내 정보
    isLoggedIn: false, //로그인 여부
    isLoggingIn: false, //로그인 시도중
    loginErrorReason: '', //로그인 실패 사유
    //logout
    isLoggingOut: false, //로그아웃 시도중
    logoutErrorReason: '',
    //signup
    signedUp: false, //회원가입 성공
    isSigningUp: false, //회원가입 시도중
    signUpErrorReason:'', //회원 가입 실패 사유
    //load_user
    userInfo: null, //남의 정보
    isLoadingUser: false,
    loadUserErrorReason:'',
    //load_myinfo
    isLoadingMyInfo: false,
    loadMyInfoErrorReason:'',
    //follow_user
    isFollowing: false,
    followErrorReason:'',
    //unfollow_user
    isUnfollowing: false,
    unfollowErrorReason:'',
    //add_post_to_me
    //load_followers
    followerList: [], //팔로워 리스트
    isLoadingFollower: false,
    loadFollowersErrorReason:'',
    hasMoreFollower: false,
    //load_followings
    followingList: [], //팔로잉 리스트
    isLoadingFollowing: false,
    loadFollowingsErrorReason:'',
    hasMoreFollowing: false,
    //remove_follower
    isRemoveFollower: false,
    removeFollowerErrorReason:'',
    //edit_nickname
    isEditingNickname: false, //닉네임 수정중
    editNicknameErrorReason: '', //닉네임 수정 실패 사유
    //remove_post_of_me
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

export const REMOVE_POST_OF_ME ='REMOVE_POST_OF_ME';

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
    return produce(state, (draft)=>{
        switch (action.type) {
            case LOG_IN_REQUEST:{
                draft.isLoggedIn= true;
                draft.loginErrorReason='';
                break;
            }
            case LOG_IN_SUCCESS:{
                draft.isLoggingIn = false;
                draft.isLoggedIn = true;
                draft.mine= action.data;
                break;
            }
            case LOG_IN_FAILURE:{
                draft.isLoggingIn = false;
                draft.isLoggedIn = false;
                draft.loginErrorReason = action.error.reason;
                draft.mine= null;
                break;
            }   
            case LOG_OUT_REQUEST:{
                draft.isLoggingOut = true;
                break;
            }
            case LOG_OUT_SUCCESS:{
                draft.isLoggingOut = false;
                draft.isLoggedIn = false;
                draft.mine = null;
                break;
            }
            case LOG_OUT_FAILURE:{
                draft.isLoggingOut = false;
                draft.isLoggedIn = true;
                break;
            }
            case SIGN_UP_REQUEST:{
                draft.isSigningUp = true;
                draft.signUpErrorReason ='';
                break;
            }
            case SIGN_UP_SUCCESS:{
                draft.isSigningUp = false;
                draft.signedUp = true;
                break;
            }
            case SIGN_UP_FAILURE:{
                draft.isSigningUp = false;
                draft.signedUp = false;
                draft.signUpErrorReason = action.error;
                break;
            }
            case LOAD_USER_REQUEST:{
                draft.isLoadingUser= true;
                draft.loadUserErrorReason='';
                break;
            }
            case LOAD_USER_SUCCESS:{
                draft.userInfo = action.data;
                draft.isLoadingUser= false;
                break;
            }
            case LOAD_USER_FAILURE:{
                draft.isLoadingUser= false;
                draft.loadUserErrorReason = action.error;
                break;
            }
            case LOAD_MYINFO_REQUEST:{
                draft.isLoadingMyInfo= true;
                draft.loadMyInfoErrorReason= '';
                break;
            }
            case LOAD_MYINFO_SUCCESS:{
                draft.mine = action.data;
                draft.isLoadingMyInfo= false;
                break;
            }
            case LOAD_MYINFO_FAILURE:{
                draft.isLoadingMyInfo= false;
                draft.loadMyInfoErrorReason = action.error;
                break;
            }
            case FOLLOW_USER_REQUEST:{
                draft.isFollowing= true;
                draft.followErrorReason='';
                break;
            }
            case FOLLOW_USER_SUCCESS:{
                draft.mine.Followings.unshift({id: action.data});
                draft.userInfo && draft.userInfo.id? draft.userInfo.Followers.unshift({id: action.data}) : null;
                draft.isFollowing= false;
                break;
            }
            case FOLLOW_USER_FAILURE:{
                draft.isFollowing= false;
                draft.followErrorReason=action.error;
                break;
            }
            case UNFOLLOW_USER_REQUEST:{
                draft.isUnfollowing= true;
                draft.unfollowErrorReason= '';
                break;
            }
            case UNFOLLOW_USER_SUCCESS:{
                const followingIndex =  draft.mine.Followings.findIndex(v=>v.id == action.data);
                draft.mine.Followings.splice(followingIndex,1);
                draft.isUnfollowing= false;
                const followingListIndex = draft.followingList.findIndex(v=>v.id == action.data);
                draft.followingList.splice(followingListIndex,1);

                // const userFollowerIndex =  draft.userInfo && draft.userInfo.id? draft.followerList.findIndex(v=>v.id == action.data) : null;
                // userFollowerIndex>-1 && draft.userInfo.Followers.splice(userFollowerIndex,1);
                // const followingListIndex = draft.userInfo && draft.userInfo.id? draft.followerList.findIndex(v=>v.id == action.data) : draft.followingList.findIndex(v=>v.id == action.data);
                // draft.userInfo && draft.userInfo.id? draft.followerList.splice(followingListIndex,1) : draft.followingList.splice(followingListIndex,1);
                
                break;
            }
            case UNFOLLOW_USER_FAILURE:{
                draft.isUnfollowing= false;
                draft.unfollowErrorReason= action.error;
                break;
            }
            case ADD_POST_TO_ME:{
                draft.mine.Post.unshift({id:action.data});
                break;
            }
            case LOAD_FOLLOWERS_REQUEST:{
                draft.followerList = !action.offset? [] : draft.followerList;
                draft.isLoadingFollower = true;
                draft.loadFollowersErrorReason = '';
                draft.hasMoreFollower = action.offset? draft.hasMoreFollower : true;
                break;
            }
            case LOAD_FOLLOWERS_SUCCESS:{
                action.data.forEach(el => {
                    draft.followerList.push(el);    
                });
                draft.isLoadingFollower = false;
                draft.hasMoreFollower = action.data.length === 3;
                break;
            }
            case LOAD_FOLLOWERS_FAILURE:{
                draft.isLoadingFollower = false;
                draft.loadFollowersErrorReason = action.error;
                break;
            }
            case LOAD_FOLLOWINGS_REQUEST:{
                draft.followingList = !action.offset? [] : draft.followingList;
                draft.isLoadingFollowing = true;
                draft.loadFollowingsErrorReason = '';
                draft.hasMoreFollowing = action.offset ? draft.hasMoreFollowing: true;
                break;
            }
            case LOAD_FOLLOWINGS_SUCCESS:{
                action.data.forEach(el => {
                    draft.followingList.push(el);
                });
                draft.isLoadingFollowing = false;
                draft.hasMoreFollowing = action.data.length ===3;
                break;
            }
            case LOAD_FOLLOWINGS_FAILURE:{
                draft.isLoadingFollowing = false;
                draft.loadFollowingsErrorReason = action.erorr;
                break;
            }
            case REMOVE_FOLLOWER_REQUEST:{
                draft.isRemoveFollower = true;
                draft.removeFollowerErrorReason = '';
                break;
            }
            case REMOVE_FOLLOWER_SUCCESS:{
                const followerIndex = draft.mine.Followers.findIndex(v=>v.id== action.data);
                draft.mine.Followers.splice(followerIndex, 1);
                const followerListIndex = draft.followerList.findIndex(v=>v.id == action.data);
                draft.followerList.splice(followerListIndex, 1);
                draft.isRemoveFollower = false;
                break;
            }
            case REMOVE_FOLLOWER_FAILURE:{
                draft.isRemoveFollower = false;
                draft.removeFollowerErrorReason = action.error;
                break;
            }
            case EDIT_NICKNAME_REQUEST:{
                draft.isEditingNickname = true;
                draft.editNicknameErrorReason = '';
                break;
            }
            case EDIT_NICKNAME_SUCCESS:{
                draft.isEditingNickname = false;
                draft.mine.nickname = action.data;
                break;
            }
            case EDIT_NICKNAME_FAILURE:{
                draft.isEditingNickname = false;
                draft.editNicknameErrorReason = action.error;
                break;
            }
            
            case REMOVE_POST_OF_ME:{
                const postIndex= draft.mine.Post.findIndex(v=>v.id == action.data);
                draft.mine.Post.splice(postIndex, 1);
                break;
            }
            default: {
                break;
            }
        }
    })
};

export default reducer;