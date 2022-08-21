import {
    POSTS_LOADING,
    GET_POSTS,
    SET_POSTS,
    GET_POST,
    UPDATE_POST_LIKES,
    ADD_POST,
    DELETE_POST,
    COMMENTS_LOADING,
    GET_COMMENTS,
    SET_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    CLEAR_POSTS,
    CLEAR_POST,
    POST_ERROR,
    UPDATE_EDITOR_TEXT,
    CLEAR_EDITOR_TEXT,
    UPDATE_EDITOR_CATEGORY,
    CLEAR_EDITOR_CATEGORY,
    UPDATE_EDITOR_FILES,
    REMOVE_EDITOR_FILE,
    CLEAR_EDITOR_FILES,
    UPDATE_URLS,
    REMOVE_URL,
    CLEAR_URLS
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    urls: [],
    editorFiles: [],
    editorText: null,
    editorCategory: null,
    loading: true,
    comments: [],
    loadingComments: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case CLEAR_POSTS:
            return {
                ...state,
                posts: []
            };
        case CLEAR_POST:
            return {
                ...state,
                post: null
            };
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case SET_POSTS: {
            const posts = action.payload;
            let tempPosts = posts; 
            
            if(state.posts.length > 0) {
                tempPosts= [...state.posts, ...tempPosts ];
            }

            return {
                ...state,
                posts: tempPosts,
                loading: false
            };
        }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case UPDATE_POST_LIKES:
            let tempPost = state.post;

            if(tempPost) {
                if(tempPost._id === action.payload.id) { 
                    tempPost = {...tempPost, likes: action.payload.likes }
                }
            }

            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === action.payload.id ? { ...post, likes: action.payload.likes } : post
                ),
                post: tempPost
            };
        case GET_COMMENTS:
            return {
                ...state,
                comments: payload,
                loadingComments: false
            };
        case SET_COMMENTS: {
            const comments = action.payload;
            let tempComments = comments; 
            
            if(state.comments.length > 0) {
                tempComments= [...tempComments, ...state.comments ];
            }

            return {
                ...state,
                comments: tempComments,
                loadingComments: false
            };
        }
        case ADD_COMMENT: 
            return {
                ...state,
                post: { ...state.post, comments: payload }
            }
        case REMOVE_COMMENT: 
            return {
                ...state,
                post: { 
                    ...state.post, 
                    comments: state.post.comments.filter(
                        comment => comment._id !== payload
                    ) 
                },
                comments: state.comments.filter(comment => comment._id !== payload),
                loadingComments: false
            };
        case COMMENTS_LOADING:
            return {
                ...state,
                loadingComments: true
            };
        case UPDATE_EDITOR_TEXT:
            // console.log('HOLD UP HOLD UP URL');
            // console.log(payload)

            const editorData = payload;

            return {
                ...state,
                editorText: editorData
            };
        case CLEAR_EDITOR_TEXT:
            return {
                ...state,
                editorText: null
            };
        case UPDATE_EDITOR_CATEGORY:
            // console.log('HOLD UP HOLD UP URL');
            // console.log(payload)

            const categoryData = payload;

            return {
                ...state,
                editorCategory: categoryData
            };
        case CLEAR_EDITOR_CATEGORY:
            return {
                ...state,
                editorCategory: null
            };
        case UPDATE_EDITOR_FILES:

            const fileData = payload;

            return {
                ...state,
                editorFiles: fileData
            };
        // case REMOVE_EDITOR_FILE:
        //     console.log('REMOVE INDEX');
        //     console.log(payload)

        //     const removeFileIndex = payload;
        //     // let featuredProducts = tempProd.filter(product => product.featured === true);
            
        //     let tempFiles = [...state.editorFiles ];

        //     tempFiles.splice(removeFileIndex, 1);

        //     return {
        //         ...state,
        //         editorFiles: tempFiles
        //     };
        case CLEAR_EDITOR_FILES:
            return {
                ...state,
                editorFiles: []
            };
        case UPDATE_URLS:
            // console.log('HOLD UP HOLD UP URL');
            // console.log(payload)

            const urlData = payload;
            let tempUrl = urlData; 
            // let featuredProducts = tempProd.filter(product => product.featured === true);
            
            tempUrl = [...state.urls, tempUrl ];

            return {
                ...state,
                urls: tempUrl,
                loading: false
            };
        case REMOVE_URL:
            console.log('REMOVE INDEX');
            console.log(payload)

            const removeIndex = payload;
            // let featuredProducts = tempProd.filter(product => product.featured === true);
            
            let tempUrls = [...state.urls ];

            tempUrls.splice(removeIndex, 1);

            return {
                ...state,
                urls: tempUrls,
                loading: false
            };
        case CLEAR_URLS:
            return {
                ...state,
                urls: []
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}