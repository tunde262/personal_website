import { 
    SET_PAGE, 
    SET_MAIN_NAV,
    TOGGLE_SIDE_NAV,
    TOGGLE_USER_MODAL,
    TOGGLE_PROFILE_MODAL,
    TOGGLE_AUTH_MODAL,
    SET_PROFILE_MODAL,
    TOGGLE_POST_MODAL,
    TOGGLE_SHARE_MODAL,
    SET_POST_MODAL,
    TOGGLE_COMMENT_MODAL,
    SET_COMMENT_MODAL,
} from './types';

export const setPage = (page) => dispatch => {
    dispatch({
        type: SET_PAGE,
        payload: page
    });
}

export const toggleProfileModal = () => dispatch => {
    dispatch({
        type: TOGGLE_PROFILE_MODAL,
    });
}

export const togglePostModal = () => dispatch => {
    dispatch({
        type: TOGGLE_POST_MODAL,
    });
}

export const setPostModal = (value) => dispatch => {
    dispatch({
        type: SET_POST_MODAL,
        payload: value
    });
}

export const toggleCommentModal = () => dispatch => {
    dispatch({
        type: TOGGLE_COMMENT_MODAL,
    });
}

export const setCommentModal = (value) => dispatch => {
    dispatch({
        type: SET_COMMENT_MODAL,
        payload: value
    });
}

export const toggleAuthModal = (type) => dispatch => {
    dispatch({
        type: TOGGLE_AUTH_MODAL,
        payload: type
    });
}

export const setProfileModal = (value) => dispatch => {
    dispatch({
        type: SET_PROFILE_MODAL,
        payload: value
    });
}

export const toggleShareModal = () => dispatch => {
    dispatch({
        type: TOGGLE_SHARE_MODAL,
    });
}

// Set Admin Nav
export const setMainNav = (value) => {
    return {
        type: SET_MAIN_NAV,
        payload: value
    }
}

// Toggle Main Side Nav
export const toggleSideNav = () => dispatch => {
    dispatch({
        type: TOGGLE_SIDE_NAV,
    });
}