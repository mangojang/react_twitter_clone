import produce from 'immer';

// const dummyMainPosts = {
//     id: 1,
//     User: {
//         id:1,
//         nickname:'mangojang',
//     },
//     content:'얄리얄리얄라리얄라',
//     img:'',
//     Comments:[],
//     createdAt: new Date()
// };
// const dummyPost = {
//     id:2,
//     User: {
//         id:1,
//         nickname:'mangojang',
//     },
//     content:'얄리얄리얄라리얄라',
//     img:'',
//     Comments:[],
//     createdAt: new Date(),
// }

// const dummyComment = {
//     id:1,
//     User:{
//         id:1,
//         nickname:'장망고',
//     },
//     createdAt: new Date(),
//     content: "더미 댓글입니다."
// }

export const initialState ={
    //load_post
    mainPosts: [], //화면에 보일 포스트들
    isLoadingPosts: false,
    loadPostErrorReason: '',
    hasMorePost: false,
    //upload_image
    imagePaths: [], // 미리보기 이미지 경로
    isUploadingImage:false,
    upLoadImagesErrorReason:'',
    //remove_image
    //add_post
    isAddingPost: false, //포스트 업로드 중
    addPostErrorReason: '', // 포스트 업로드 실패 사유
    postAdded: false, //포스트 추가하였나
    //remove_post
    isRemovingPost:false,
    removePostErrorReason:'',
    //like_post
    isLikingPost:false,
    likePostErrorReason:'',
    //unlike_post
    isUnlikingPost:false,
    unlikePostErrorReason:'',
    //load_comment
    isLoadingComment:false,
    loadCommentErrorReason: '',
    //add_comment
    isAddingComment: false, // 댓글 업로드 중
    addCommentErrorReason: '',
    commentAdded: false, //댓글 추가하였나
    //retweet
    isRetweet:false,
    retweetErrorReason:'',
    //singlePost
    singlePost:null,
}

export const LOAD_MAIN_POSTS_REQUEST ='LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS ='LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE ='LOAD_MAIN_POSTS_FAILURE';

export const LOAD_POST_REQUEST ='LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS ='LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE ='LOAD_POST_FAILURE';

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

export const REMOVE_POST_REQUEST ='REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS ='REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE ='REMOVE_POST_FAILURE';

export const LIKE_POST_REQUEST ='LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS ='LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE ='LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST ='UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS ='UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE ='UNLIKE_POST_FAILURE';

export const LOAD_COMMENT_REQUEST ='LOAD_COMMENT_REQUEST';
export const LOAD_COMMENT_SUCCESS ='LOAD_COMMENT_SUCCESS';
export const LOAD_COMMENT_FAILURE ='LOAD_COMMENT_FAILURE';

export const ADD_COMMENT_REQUEST ='ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS ='ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE ='ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST ='RETWEET_REQUEST';
export const RETWEET_SUCCESS ='RETWEET_SUCCESS';
export const RETWEET_FAILURE ='RETWEET_FAILURE';

const reducer = (state=initialState,action) => {
    return produce(state, (draft)=>{
        switch (action.type) {
            case LOAD_MAIN_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
            case LOAD_USER_POSTS_REQUEST:{
                draft.mainPosts = action.lastId===0? [] : draft.mainPosts;
                draft.isLoadingPosts = true;
                draft.loadPostErrorReason='';
                draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
                break;
            }
            case LOAD_MAIN_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_USER_POSTS_SUCCESS:{
                action.data.forEach(el => {
                    draft.mainPosts.push(el);
                });
                draft.isLoadingPosts = false;
                draft.hasMorePosts = action.data.length === 10;
                break;
            }
            case LOAD_MAIN_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE:{
                draft.isLoadingPosts = false;
                draft.loadPostErrorReason = action.error;
                break;
            }
            case UPLOAD_IMAGE_REQUEST:{
                draft.isUploadingImage = true;
                draft.upLoadImagesErrorReason='';
                break;
            }
            case UPLOAD_IMAGE_SUCCESS:{
                action.data.forEach(el => {
                    draft.imagePaths.push(el);
                });
                draft.isUploadingImage = false;
                break;
            }
            case UPLOAD_IMAGE_FAILURE:{
                draft.isUploadingImage = false;
                draft.upLoadImagesErrorReason=action.error;
                break;
            }
            case REMOVE_IMAGE:{
                const index = draft.imagePaths.findIndex((v,i)=> i==action.data);
                draft.imagePaths.splice(index, 1);
                break;
            }
            case ADD_POST_REQUEST:{
                draft.isAddingPost= true;
                draft.postAdded= false;
                draft.addPostErrorReason='';
                break;
            }
            case ADD_POST_SUCCESS:{
                draft.isAddingPost = false;
                draft.postAdded = true;
                draft.mainPosts.unshift(action.data);
                draft.imagePaths=[];
                break;
            }
            case ADD_POST_FAILURE:{
                draft.isAddingPost = false;
                draft.postAdded = false;
                draft.addPostErrorReason = action.error;
                break;
            }
            case REMOVE_POST_REQUEST:{
                draft.isRemovingPost = true;
                draft.removePostErrorReason='';
                break;
            }
            case REMOVE_POST_SUCCESS:{
                const postIndex = draft.mainPosts.findIndex(v=> v.id == action.data);
                draft.mainPosts.splice(postIndex, 1);
                draft.isRemovingPost = false;
                break;
            }
            case REMOVE_POST_FAILURE:{
                draft.isRemovingPost = false;
                draft.removePostErrorReason= action.error;
                break;
            }
            case LIKE_POST_REQUEST:{
                draft.isLikingPost = true;
                draft.likePostErrorReason='';
                break;
            }
            case LIKE_POST_SUCCESS:{
                const postIndex = draft.mainPosts.findIndex(v=>v.id === action.data.postId);
                draft.mainPosts[postIndex].Likers.unshift({id: action.data.userId});
                draft.isLikingPost= false;
                break;
            }
            case LIKE_POST_FAILURE:{
                draft.isLikingPost= false;
                draft.likePostErrorReason= action.error;
                break;
            }
            case UNLIKE_POST_REQUEST:{
                draft.isUnlikingPost= true;
                draft.unlikePostErrorReason='';
                break;
            }
            case UNLIKE_POST_SUCCESS:{
                const postIndex = draft.mainPosts.findIndex(v=>v.id === action.data.postId);
                const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(v=>v.id == action.data.userId);
                draft.mainPosts[postIndex].Likers.splice(likeIndex,1);
                draft.isUnlikingPost=false;
                break;
            }
            case UNLIKE_POST_FAILURE:{
                draft.isUnlikingPost=false;
                draft.unlikePostErrorReason=action.error;
                break;
            }
            case LOAD_COMMENT_REQUEST:{
                draft.isLoadingComment=true;
                draft.loadCommentErrorReason='';
                break;
            }
            case LOAD_COMMENT_SUCCESS:{
                const postIndex = state.mainPosts.findIndex(v=>v.id === parseInt(action.data.postId, 10));
                draft.mainPosts[postIndex].Comments = action.data.comments;
                draft.isLoadingComment=false;
                break;
            }
            case LOAD_COMMENT_FAILURE:{
                draft.isLoadingComment=false;
                draft.loadCommentErrorReason=action.error;
                break;
            }
            case ADD_COMMENT_REQUEST:{
                draft.isAddingComment = true;
                draft.addCommentErrorReason='';
                break;
            }
            case ADD_COMMENT_SUCCESS:{
                const postIndex = draft.mainPosts.findIndex(v=>v.id === parseInt(action.data.PostId,10));
                draft.mainPosts[postIndex].Comments.push(action.data);
                draft.isAddingComment = false;
                draft.commentAdded= true;
                break;
            }
            case ADD_COMMENT_FAILURE:{
                draft.isAddingComment = false;
                draft.commentAdded = false;
                draft.addCommentErrorReason = action.error;
                break;
            }
            case RETWEET_REQUEST:{
                draft.isRetweet=true;
                draft.retweetErrorReason= '';
                break;
            }
            case RETWEET_SUCCESS:{
                draft.mainPosts.unshift(action.data);
                draft.isRetweet=false;
                break;
            }
            case RETWEET_FAILURE:{
                draft.isRetweet=false;
                draft.retweetErrorReason= action.error;
                break;
            }
            case LOAD_POST_REQUEST:{
                break;
            }
            case LOAD_POST_SUCCESS:{
                draft.singlePost = action.data;
                break;
            }
            case LOAD_POST_FAILURE:{
                break;
            }
            default: {
                break;
            }
        }
    });
}

export default reducer;