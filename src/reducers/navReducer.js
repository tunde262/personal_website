import { 
    SET_PAGE, 
    TOGGLE_USER_MODAL,
    TOGGLE_PROFILE_MODAL,
    TOGGLE_AUTH_MODAL,
    SET_PROFILE_MODAL,
    TOGGLE_POST_MODAL,
    SET_POST_MODAL,
    TOGGLE_COMMENT_MODAL,
    SET_COMMENT_MODAL,
    TOGGLE_SHARE_MODAL,
    SET_MAIN_NAV,
    TOGGLE_SIDE_NAV,
} from '../actions/types';

const initialState = {
    page: '',
    main: '',
    userModal: false,
    profileModal: false,
    postModal: false,
    commentModal: false,
    sideNav: false,
    loading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_PAGE: {
            return {
                ...state,
                page: payload,
                loading: false
            };
        }
        case TOGGLE_USER_MODAL: 
            return {
                ...state,
                userModal: !state.userModal
            }
        case TOGGLE_PROFILE_MODAL: 
            return {
                ...state,
                profileModal: !state.profileModal
            }
        case TOGGLE_POST_MODAL: 
            return {
                ...state,
                postModal: !state.postModal
            }
        case SET_POST_MODAL: 
            return {
                ...state,
                postModal: payload
            }
        case TOGGLE_COMMENT_MODAL: 
            return {
                ...state,
                commentModal: !state.commentModal
            }
        case SET_COMMENT_MODAL: 
            return {
                ...state,
                commentModal: payload
            }
        case TOGGLE_AUTH_MODAL: 
            return {
                ...state,
                authModal: !state.authModal,
                authModalType: payload
            }
        case SET_PROFILE_MODAL: 
            return {
                ...state,
                profileModal: payload
            }
        case TOGGLE_SHARE_MODAL: 
            return {
                ...state,
                shareModal: !state.shareModal
            }
        case SET_MAIN_NAV: {
            return {
                ...state,
                main: payload,
                loading: false
            };
        }
        case TOGGLE_SIDE_NAV: 
            return {
                ...state,
                sideNav: !state.sideNav
            }
        default:
            return state;
    }
}