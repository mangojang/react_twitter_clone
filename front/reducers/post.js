export const initialState ={
    mainPosts: [{
        User: {
            id:1,
            nickname:'mangojang',
        },
        content:'얄리얄리얄라리얄라',
        img:'',
        createdAt: new Date()
    }], //화면에 보일 포스트들
    imagePaths: [], // 미리보기 이미지 경로
    addPostErrorReason: false, // 포스트 업로드 실패 사유
    isAddingPost: false //포스트 업로드 중
}

const LOAD_MAIN_POSTS_REQUEST ='LOAD_MAIN_POSTS_REQUEST';
const LOAD_MAIN_POSTS_SUCCESS ='LOAD_MAIN_POSTS_SUCCESS';
const LOAD_MAIN_POSTS_FAILURE ='LOAD_MAIN_POSTS_FAILURE';

const LOAD_HASHTAG_POSTS_REQUEST ='LOAD_HASHTAG_POSTS_REQUEST';
const LOAD_HASHTAG_POSTS_SUCCESS ='LOAD_HASHTAG_POSTS_SUCCESS';
const LOAD_HASHTAG_POSTS_FAILURE ='LOAD_HASHTAG_POSTS_FAILURE';

const LOAD_USER_POSTS_REQUEST ='LOAD_USER_POSTS_REQUEST';
const LOAD_USER_POSTS_SUCCESS ='LOAD_USER_POSTS_SUCCESS';
const LOAD_USER_POSTS_FAILURE ='LOAD_USER_POSTS_FAILURE';

const UPLOAD_IMAGE_REQUEST ='UPLOAD_IMAGE_REQUEST';
const UPLOAD_IMAGE_SUCCESS ='UPLOAD_IMAGE_SUCCESS';
const UPLOAD_IMAGE_FAILURE ='UPLOAD_IMAGE_FAILURE';

const REMOVE_IMAGE = 'REMOVE_IMAGE';

const ADD_POST_REQUEST ='ADD_POST_REQUEST';
const ADD_POST_SUCCESS ='ADD_POST_SUCCESS';
const ADD_POST_FAILURE ='ADD_POST_FAILURE';

const LIKE_POST_REQUEST ='LIKE_POST_REQUEST';
const LIKE_POST_SUCCESS ='LIKE_POST_SUCCESS';
const LIKE_POST_FAILURE ='LIKE_POST_FAILURE';

const UNLIKE_POST_REQUEST ='UNLIKE_POST_REQUEST';
const UNLIKE_POST_SUCCESS ='UNLIKE_POST_SUCCESS';
const UNLIKE_POST_FAILURE ='UNLIKE_POST_FAILURE';

const ADD_COMMENT_REQUEST ='ADD_COMMENT_REQUEST';
const ADD_COMMENT_SUCCESS ='ADD_COMMENT_SUCCESS';
const ADD_COMMENT_FAILURE ='ADD_COMMENT_FAILURE';

const LOAD_COMMENT_REQUEST ='LOAD_COMMENT_REQUEST';
const LOAD_COMMENT_SUCCESS ='LOAD_COMMENT_SUCCESS';
const LOAD_COMMENT_FAILURE ='LOAD_COMMENT_FAILURE';

const RETWEET_REQUEST ='RETWEET_REQUEST';
const RETWEET_SUCCESS ='RETWEET_SUCCESS';
const RETWEET_FAILURE ='RETWEET_FAILURE';

const REMOVE_POST_REQUEST ='REMOVE_POST_REQUEST';
const REMOVE_POST_SUCCESS ='REMOVE_POST_SUCCESS';
const REMOVE_POST_FAILURE ='REMOVE_POST_FAILURE';

const ADD_DUMMY ='ADD_DUMMY';

const addPost= {
    type: ADD_POST_REQUEST,
}

const addDummy={
    type: ADD_DUMMY,
    data: {
        content:'Hello',
        UserId: 1,
        User:{
            nickname:'mangojang'
        }
     }
}

const reducer = (state=initialState,action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:{
            return {
                ...state
            }
        }
        case ADD_DUMMY: {
            return{
                ...state,
                mainPosts: [
                    action.data,
                    ...state.mainPosts
                ]
            }
        }
    
        default: {
            return {
                ...state
            }
        }
            break;
    }
}

export default reducer;