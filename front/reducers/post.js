export const initialState ={
    mainPosts: [{
        id: 1,
        User: {
            id:1,
            nickname:'mangojang',
        },
        content:'얄리얄리얄라리얄라',
        img:'',
        Comments:[],
        createdAt: new Date()
    }], //화면에 보일 포스트들

    imagePaths: [], // 미리보기 이미지 경로
    addPostErrorReason: false, // 포스트 업로드 실패 사유
    isAddingPost: false, //포스트 업로드 중
    postAdded: false, //포스트 추가하였나
    addPostErrorReason:'',
    isAddingComment: false, // 댓글 업로드 중
    commentAdded: false, //댓글 추가하였나
    addCommentErrorReason: '',
}

const dummyPost = {
    id:2,
    User: {
        id:1,
        nickname:'mangojang',
    },
    content:'얄리얄리얄라리얄라',
    img:'',
    Comments:[],
    createdAt: new Date(),
}

const dummyComment = {
    id:1,
    User:{
        id:1,
        nickname:'장망고',
    },
    createdAt: new Date(),
    content: "더미 댓글입니다."
}

export const LOAD_MAIN_POSTS_REQUEST ='LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS ='LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE ='LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST ='LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS ='LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE ='LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST ='LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS ='LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE ='LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGE_REQUEST ='UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS ='UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE ='UPLOAD_IMAGE_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const ADD_POST_REQUEST ='ADD_POST_REQUEST';
export const ADD_POST_SUCCESS ='ADD_POST_SUCCESS';
export const ADD_POST_FAILURE ='ADD_POST_FAILURE';

export const LIKE_POST_REQUEST ='LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS ='LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE ='LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST ='UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS ='UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE ='UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST ='ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS ='ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE ='ADD_COMMENT_FAILURE';

export const LOAD_COMMENT_REQUEST ='LOAD_COMMENT_REQUEST';
export const LOAD_COMMENT_SUCCESS ='LOAD_COMMENT_SUCCESS';
export const LOAD_COMMENT_FAILURE ='LOAD_COMMENT_FAILURE';

const RETWEET_REQUEST ='RETWEET_REQUEST';
const RETWEET_SUCCESS ='RETWEET_SUCCESS';
const RETWEET_FAILURE ='RETWEET_FAILURE';

const REMOVE_POST_REQUEST ='REMOVE_POST_REQUEST';
const REMOVE_POST_SUCCESS ='REMOVE_POST_SUCCESS';
const REMOVE_POST_FAILURE ='REMOVE_POST_FAILURE';

const addPost= {
    type: ADD_POST_REQUEST,
}

const reducer = (state=initialState,action) => {
    
    switch (action.type) {
        case ADD_POST_REQUEST:{
            return {
                ...state,
                isAddingPost:true,
                postAdded:false,
                addPostErrorReason:'',
                
            }
        }
        case ADD_POST_SUCCESS:{
            return {
                ...state,
                isAddingPost:false,
                postAdded:true,
                mainPosts: [action.data, ...state.mainPosts],
                imagePaths:[]
            }
        }
        case ADD_POST_FAILURE:{
            return {
                ...state,
                isAddingPost:false,
                postAdded:false,
                addPostErrorReason: action.error,
            }
        }
        case LOAD_MAIN_POSTS_REQUEST:
        case LOAD_HASHTAG_POSTS_REQUEST:
        case LOAD_USER_POSTS_REQUEST:{
            return {
                ...state,
                mainPosts: [],
                
            }
        }
        case LOAD_MAIN_POSTS_SUCCESS:
        case LOAD_HASHTAG_POSTS_SUCCESS:
        case LOAD_USER_POSTS_SUCCESS:{
            return {
                ...state,
                mainPosts: action.data
            }
        }
        case LOAD_MAIN_POSTS_FAILURE:
        case LOAD_HASHTAG_POSTS_FAILURE:
        case LOAD_USER_POSTS_FAILURE:{
            return {
                ...state,
                isAddingPost:false,
                postAdded:false,
                addPostErrorReason: action.error,
            }
        }
        case LOAD_COMMENT_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v=>v.id === parseInt(action.data.postId, 10));
            const post = state.mainPosts[postIndex];
            const Comments = action.data.comments;
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Comments};
            return {
                ...state,
                mainPosts,
            }
        }
        case LOAD_COMMENT_FAILURE:{
            return {
                ...state,
            }
        }
        case ADD_COMMENT_REQUEST:{
            return {
                ...state,
            }
        }
        case ADD_COMMENT_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v=>v.id === parseInt(action.data.PostId,10));
            const post = state.mainPosts[postIndex];
            const Comments = [...post.Comments, action.data];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Comments};
            return {
                ...state,
                isAddingComment:false,
                commentAdded:true,
                mainPosts,
            }
        }
        case ADD_COMMENT_FAILURE:{
            return {
                ...state,
                isAddingComment:false,
                commentAdded:false,
                addCommentErrorReason: action.error,
            }
        }
        case UPLOAD_IMAGE_SUCCESS:{
            return {
                ...state,
                imagePaths: [...state.imagePaths, action.data],
            }
        }
        case UPLOAD_IMAGE_FAILURE:{
            return {
                ...state,
            }
        }
        case REMOVE_IMAGE:{
            return{
                ...state,
                imagePaths: state.imagePaths.filter((v,i)=> i !== action.data)
            }
        }
        case LIKE_POST_REQUEST:{
            return {
                ...state,
            }
        }
        case LIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v=>v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = [{id: action.data.userId}, ...post.Likers];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Likers};

            return {
                ...state,
                mainPosts,
            }
        }
        case LIKE_POST_FAILURE:{
            return {
                ...state,
            }
        }
        case UNLIKE_POST_REQUEST:{
            return {
                ...state,
            }
        }
        case UNLIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v=>v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = post.Likers.filter(v=>v.id !== action.data.userId);
            console.log('Likers', Likers);
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Likers};

            return {
                ...state,
                mainPosts,
            }
        }
        case UNLIKE_POST_FAILURE:{
            return {
                ...state,
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