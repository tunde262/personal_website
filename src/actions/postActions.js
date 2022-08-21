import axios from 'axios';
import { setAlert  } from './alertActions';
import { createNotification } from './notificationActions';
import { db, auth, storage } from '../utils/firebase-config';
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, setDoc, deleteDoc, query, where, serverTimestamp, orderBy, increment } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';

import {
    GET_POSTS,
    SET_POSTS,
    GET_POST,
    UPDATE_POST_LIKES,
    ADD_POST,
    DELETE_POST,
    GET_COMMENTS,
    SET_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    COMMENTS_LOADING,
    POSTS_LOADING,
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
} from './types';

const postsCollectionRef = collection(db, "posts");

// Get posts
export const getPosts = () => async dispatch => {
    try {
        console.log('GETTING DOCS')
        const data = await getDocs(postsCollectionRef);

        const postList = data.docs.map((doc) => ({...doc.data(), _id: doc.id}));

        console.log('SHOW POST LIST')
        console.log(postList);

        dispatch({
            type: GET_POSTS,
            payload: postList
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_POSTS,
            payload: []
        })
    }
}

// Get single Post by id
export const getPostById = id => async dispatch => {
    dispatch(setPostsLoading());
    try {
        const docRef = doc(db, 'posts', id)

        const postDoc = await getDoc(docRef);

        console.log('GOT POST BY ID');
        console.log(postDoc.data())
  
        dispatch({
            type: GET_POST,
            payload: {
                ...postDoc.data(),
                _id: id
            }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: "something went wrong", status: 500 }
        });
        console.log(err);
    }
}

// Get Posts By User Id
export const getPostsByUserId = id => async dispatch => {
    dispatch(clearPosts());
    console.log('GETTING USER POSTS');
    try {
        console.log('QUERYING USER POSTS');
        const q = query(postsCollectionRef, where("user._id", "==", id), orderBy('createdAt', 'desc'));
        console.log('QUERY USER RESULTS');
        console.log(q);

        const querySnapshot = await getDocs(q);
        const userPosts = querySnapshot.docs.map((doc) => ({...doc.data(), _id: doc.id}));

        console.log('USER POSTS DATA');
        console.log(userPosts);

        dispatch({
            type: SET_POSTS,
            payload: userPosts
        });
    } catch (err) {
        console.log('ERROR!!!')
        console.log(err)
        dispatch({
            type: SET_POSTS,
            payload: []
        })
    }
};

// filter the posts by category
export const getUserPhotos = id => async dispatch => {
    dispatch(setPostsLoading());
    console.log('GETTING GALLERY POSTS');
    try {
        console.log('QUERYING GALLERY POSTS');
        const q = query(postsCollectionRef, where("user._id", "==", id), where("img_count", ">=", 1), orderBy('img_count'), orderBy('createdAt', 'desc'));
        console.log('QUERY GALLERY RESULTS');
        console.log(q);

        const querySnapshot = await getDocs(q);
        const galleryPosts = querySnapshot.docs.map((doc) => ({...doc.data(), _id: doc.id}));

        console.log('GALLERY POST DATA');
        console.log(galleryPosts);

        dispatch({
            type: GET_POSTS,
            payload: galleryPosts
        });
    } catch (err) {
        console.log('ERROR!!!')
        console.log(err)
        dispatch({
            type: SET_POSTS,
            payload: null
        })
    }
}

// filter the posts by category
export const getCategoryPosts = (category) => async dispatch => {
    dispatch(setPostsLoading());
    console.log('GETTING CATEGORY POSTS');
    try {
        console.log('QUERYING CAT POSTS');
        const q = query(postsCollectionRef, where("category", "==", category));
        console.log('QUERY CAT RESULTS');
        console.log(q);

        const querySnapshot = await getDocs(q);
        const categoryPosts = querySnapshot.docs.map((doc) => ({...doc.data(), _id: doc.id}));

        console.log('CAT POST DATA');
        console.log(categoryPosts);

        dispatch({
            type: GET_POSTS,
            payload: categoryPosts
        });
    } catch (err) {
        console.log('ERROR!!!')
        console.log(err)
        dispatch({
            type: SET_POSTS,
            payload: null
        })
    }
}

// Get posts user liked
export const getLikedPosts = userId => async dispatch => {
    dispatch(setPostsLoading());
    console.log('GETTING LIKED POSTS');
    try {
        console.log('QUERYING  POSTS');
        const q = query(postsCollectionRef, where("like_id_list", "array-contains", userId), orderBy('createdAt', 'desc'));
        console.log('QUERYING  RESULT');
        console.log(q);

        const querySnapshot = await getDocs(q);
        const likedPosts = querySnapshot.docs.map((doc) => ({...doc.data(), _id: doc.id}));

        console.log('LIKED POST DATA');
        console.log(likedPosts);

        dispatch({
            type: SET_POSTS,
            payload: likedPosts
        });
    } catch (err) {
        console.log('ERROR!!!')
        console.log(err)
        dispatch({
            type: SET_POSTS,
            payload: []
        })
    }
};

// Add Post
export const addPost = ( formData, imgData, imgDimensions, history ) => async dispatch => {
    
    try {

        // Create Post

        console.log('FRONTEND FORM DATA');
        console.log(formData);  

        const {
            text,
            username,
            user
        } = formData;

        let category = null;
        let avatar = null;

        if(formData.category) {
            category = formData.category;
        }

        if(formData.avatar) {
            avatar = formData.avatar;
        }

        const result = await addDoc(postsCollectionRef, {
            text,
            category,
            username,
            user,
            avatar,
            img_count: imgData.length,
            likes: [],
            comments: [],
            date: Date.now(),
            createdAt: serverTimestamp()
        });

        console.log('SENT TO FIREBASE')
        console.log(result.id);

        // const storageRef = ref(storage, "images/productId");

        // const res = await uploadBytesResumable(storageRef, files[0]);

        // console.log('Uploaded a blob or file!');
        // console.log(res);

        // const imgPath = await getDownloadURL(storageRef);


        // UPDATE USER TOTAL POST #

        const userRef = doc(db, 'users', user._id)

        console.log('GOT USER REFERENCE');

        await updateDoc(userRef, {
            totalPosts: increment(1)
        })
        // END

        

        // --- Add Images to post ---

        const docRef = doc(db, 'posts', result.id)
        const colRef = collection(docRef, "img_gallery")
    
        // ---- DEAD CODE ----- 

        // const postDoc = await getDoc(docRef);

        // console.log('LOAD NEW POST DATA');
        // console.log(postDoc.data())

        // ---- END DEAD CODE ----- 

        console.log('IMG DATA');
        console.log(imgData)
        
        imgData.map(async (img) => {
            
            const storageRef = ref(storage, `images/posts/${result.id}/${img.name}`);

            const res = await uploadBytesResumable(storageRef, img);

            console.log('Uploaded a blob or file!');
            console.log(res);

            const imgPath = await getDownloadURL(storageRef);

            const galleryData = await getDocs(colRef);
            console.log('IMG GALLERY LENGTH');
            console.log(galleryData.docs.length)

            console.log('IMG PATH');
            console.log(imgPath);

            console.log('IMG FILENAME');
            console.log(img.name);

            let orderNum = 1;
            
            if(galleryData.docs && galleryData.docs.length > 0) {
                orderNum = galleryData.docs.length + 1
            }
            console.log('ORDER NUM');
            console.log(orderNum);

            const imgInfo = imgDimensions.find(dimensionObj => dimensionObj.fileName === img.name);

            console.log('IMG INFO - DIMENSIONS');
            console.log(imgInfo);

            let newImg = {}; 

            if(imgInfo) {
                newImg = {
                    img_path: imgPath,
                    img_name: img.name,
                    img_order: orderNum,
                    img_width: imgInfo.width,
                    img_height: imgInfo.height
                };
            } else {
                newImg = {
                    img_path: imgPath,
                    img_name: img.name,
                    img_order: orderNum,
                    img_width: 0,
                    img_height: 0
                };
            }


            const gal = await addDoc(colRef, newImg);

            console.log('GAL:');
            console.log(gal);
            
            // await updateDoc(docRef, {
            //     img_gallery: tempArray
            // });
        });

        // --- END ADD IMGS ---



        // Get Post with Images

        // const postData = await axios.get(`/api/posts/${res.data._id}`);

        // dispatch({
        //     type: ADD_POST,
        //     payload: postData.data
        // });

        if(history) {
            window.location.href = "/home?filter=notify-posted";
        } else {
            dispatch(setAlert('Your post was sent', 'okay'));
        }
    } catch (err) {
        console.log('ERROR!!!')
        console.log(err);
    //   dispatch({
    //     type: POST_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    //   });
    }
};

// Delete Post
export const deletePost = (postId) => async dispatch => {
    console.log('DELETING POST!!!!!')
    console.log(postId);

    // TODO: Delete comment from post
    const postRef = doc(db, 'posts', postId)
    const colRef = collection(postRef, "img_gallery")

    try {
        // --- Delete IMGS from post ---
        let galleryData;

        if(colRef) {
            galleryData = await getDocs(colRef);
        }

        console.log('GALLERY DATA')
        console.log(galleryData);

        if(galleryData?.docs && galleryData.docs.length > 0) {
            console.log('DELETING GALLERY')
            console.log(galleryData.docs[0].data().img_name);

            galleryData.docs.map(async (imgData) => {
                try {
                    // Get reference to post img_gallery
                    const imgRef = doc(db, `posts/${postId}/img_gallery`, imgData.id);
                
                    console.log('DELETING IMGS PROCESS')
                    
                    const storageRef = ref(storage, `images/posts/${postId}/${imgData.data().img_name}`);
                    await deleteObject(storageRef);

                    // Delete IMG from img_gallery
                    await deleteDoc(imgRef);

                } catch (err) {
                    console.log('ERROR');
                    console.log(err);

                    dispatch(setAlert('Couldn\'t delete post images', 'danger'));
                }
            })
        }

        // --- END ---

        // --- UPDATE USER TOTAL POST # ---

        const postDoc = await getDoc(postRef);

        const userRef = doc(db, 'users', postDoc.data().user._id);

        console.log('GOT USER REFERENCE');
        
        await updateDoc(userRef, {
            totalPosts: increment(-1)
        })
        
        // --- END ---

        // --- DELETE POST ---
        
        await deleteDoc(postRef);
        
        dispatch({
            type: DELETE_POST,
            payload: postId
        });

        dispatch(clearPost());
        dispatch(setAlert('Your post was deleted', 'okay'));

    } catch (err) {
        console.log('ERROR');
        console.log(err);

        dispatch(setAlert('Something went wrong', 'danger'));
    //     dispatch({
    //         type: POST_ERROR,
    //         payload: { msg: err.response.statusText, status: err.response.status }
    //     });
    }
}

// Add like
export const addLike = (postId, fromUserData, postData) => async dispatch => {
    const likeList = postData.likes;
    
    try {
        console.log('ADDING LIKE!!!!!')
        console.log(postId);

        // Get Firebase Post & Likes of post collection ref
        const postRef = doc(db, 'posts', postId)
        const colRef = collection(postRef, "likes")


        console.log('FROM USER DATA:');
        console.log(fromUserData);

        console.log('Like List DATA:');
        console.log(likeList);
        
        const newLike = {
            user: {
                _id: fromUserData._id,
                username: fromUserData.username,
                first_name: fromUserData.first_name,
                last_name: fromUserData.last_name,
                img: fromUserData.img
            }
        };

        // Check if post already liked by same user
        if(likeList.filter(like => like.user._id.toString() === fromUserData._id).length > 0) {
            // Get remove index
            const removeIndex = likeList.map(like => like.user._id.toString()).indexOf(fromUserData._id);

            const likeID = likeList[removeIndex]._id;

            // Remove like from post
            likeList.splice(removeIndex, 1);

            console.log('Removed Like Data:');
            console.log(likeList);

            const id_array = [];

            likeList.map((like) => {
                id_array.push(like.user._id);
            })

            console.log('Removed Like ID LIST Data:');
            console.log(id_array);

            await updateDoc(postRef, {
                likes: likeList,
                like_id_list: id_array
            })
        } else {
            // const likeData = await addDoc(colRef, newLike);

            likeList.push(newLike);

            console.log('NEW Like DATA:');
            console.log(likeList);

            const id_array = [];

            likeList.map((like) => {
                id_array.push(like.user._id);
            })

            console.log('Removed Like ID LIST Data:');
            console.log(id_array);

            await updateDoc(postRef, {
                likes: likeList,
                like_id_list: id_array
            })

            console.log('SUCCESSFULLY LIKED');
            

            dispatch(setAlert('Post saved.', 'okay'));

            // --- Create Notification ---- >

            dispatch(createNotification(
                {                       // formData
                    type: 'like',
                    postId: postId,
                    message: postData.text
                }, 
                postData.user._id,   // toId
                fromUserData.first_name,  // first_name
                fromUserData.last_name,     // last_name
                fromUserData.img     // avatar
            ));
        }
  
    //   dispatch({
    //     type: UPDATE_POST_LIKES,
    //     payload: { id, likes: res.data }
    //   });

      
    } catch (err) {
      console.log(err)
    }
};

// Get Post Comment
export const getComments = (postId) => async dispatch => {
    dispatch(setCommentsLoading());
    console.log('GETTING COMMENTS')
    try {
        console.log('GETTING COMMENTS 2')
        const postRef = doc(db, 'posts', postId);
        const commentsCollectionRef = collection(postRef, "comments")

        const q = query(commentsCollectionRef, orderBy('createdAt', 'desc'));

        const commentData = await getDocs(q);
        const commentList = commentData.docs.map((doc) => ({...doc.data(), _id: doc.id}));

        console.log('SHOW POST COMMENTS ListN ACTIONS');
        console.log(commentList)
    

        dispatch({
            type: GET_COMMENTS,
            payload: commentList
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_COMMENTS,
            payload: []
        })
    }
}

// Add Comment
export const addComment = (postId, formData, postData, history) => async dispatch => {

    if(!formData.avatar) formData.avatar = "";
    
    try {
        
        console.log('IN COMMENT!!!!!')
        console.log(postId);

        // Add comment to post

        const docRef = doc(db, 'posts', postId)
        const colRef = collection(docRef, "comments")

        console.log('FORM DATA');
        console.log(formData)
        
        const newComment = {
            text: formData.text,
            username: formData.username,
            avatar: formData.avatar,
            user: formData.user,
            date: Date.now(),
            createdAt: serverTimestamp()
        };

        const commentRef = await addDoc(colRef, newComment);

        const commentDoc = await getDoc(commentRef);

        const fullComment = {
            ...commentDoc.data(),
            _id: commentDoc.id
        }

        console.log('---- Comment Data:');
        console.log(fullComment);
        

        dispatch({
            type: SET_COMMENTS,
            payload: [fullComment]
        });

        dispatch(setAlert('Your reply was sent', 'okay'));

        // --- TODO : Create Notification ---- >

        dispatch(createNotification(
            {                       // formData
                type: 'comment',
                postId: postId,
                message: formData.text
            }, 
            postData.user._id,   // toId
            formData.user.first_name,  // first_name
            formData.user.last_name,     // last_name
            formData.avatar     // avatar
        ));

        if(history) {
            window.location.href = `/post/${postId}`;
            // history.push(`/post/${postId}`);
        }

    } catch (err) {
        console.log('ERRORS')
        console.log(err);
        
        if(err.response) {
            const errors = err.response.data.errors;

            if(errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        } else {
            dispatch(setAlert('Something went wrong', 'danger'));
        }
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: err.response.statusText, status: err.response.status }
        // });
        // console.log({msg: err.response.statusText, status: err.response.status})
    }
}

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    console.log('DELETING COMMENT!!!!!')
    console.log(postId);

    // Delete comment from post
    const docRef = doc(db, `posts/${postId}/comments`, commentId)

    try {
        console.log('COMMENT ID');
        console.log(commentId)

        await deleteDoc(docRef);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {

        console.log('ERROR');
        console.log(err);

        dispatch(setAlert('Something went wrong', 'danger'));

        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: err.response.statusText, status: err.response.status }
        // });
    }
}   

// Set State of Text Editor
export const setEditorText = editorData => dispatch => {

    dispatch({
        type: UPDATE_EDITOR_TEXT,
        payload: editorData
    });
};

// Clear Editor Text
export const clearEditorText = () => dispatch => {
    dispatch({
        type: CLEAR_EDITOR_TEXT
    });

}

// Set State of Editor Category
export const setEditorCategory = categoryData => dispatch => {

    dispatch({
        type: UPDATE_EDITOR_CATEGORY,
        payload: categoryData
    });
};

// Clear Editor Category
export const clearEditorCategory = () => dispatch => {
    dispatch({
        type: CLEAR_EDITOR_CATEGORY
    });

}

// Set State of Editor Files
export const setEditorFiles = fileData => dispatch => {

    dispatch({
        type: UPDATE_EDITOR_FILES,
        payload: fileData
    });
};

// Remove single file from state of Editor Files
// export const removeEditorFile = index => dispatch => {
//     console.log('LOOK FOR REMOVE INDEX HERE');
//     console.log(index);
//     dispatch({
//         type: REMOVE_EDITOR_FILE,
//         payload: index
//     });
// };

// Clear Editor File State
export const clearEditorFiles = () => dispatch => {
    dispatch({
        type: CLEAR_EDITOR_FILES
    });

}

// Add 1 Temporary Image url to urls
export const setTemporaryUrls = urlData => dispatch => {
    // console.log('LLOK FOR URL HERE');
    // console.log(urlData);
    dispatch({
        type: UPDATE_URLS,
        payload: urlData
    });
};

// Remove 1 url from urls
export const removeTempUrl = index => dispatch => {
    console.log('LOOK FOR REMOVE INDEX HERE');
    console.log(index);
    dispatch({
        type: REMOVE_URL,
        payload: index
    });
};

// Clear temp urls
export const clearUrls = () => dispatch => {
    dispatch({
        type: CLEAR_URLS
    });

}

// Posts loading
export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    }
}

// Comments loading
export const setCommentsLoading = () => {
    return {
        type: COMMENTS_LOADING
    }
}

// Remove all posts
export const clearPosts = () => dispatch => {
    dispatch(setPostsLoading());

    dispatch({
        type: CLEAR_POSTS
    });

}

// Remove all posts
export const clearPost = () => dispatch => {
    dispatch({
        type: CLEAR_POST
    });

}