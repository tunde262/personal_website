import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Firebase
import { db } from '../utils/firebase-config';
import { collection, query, onSnapshot, orderBy, startAfter, limit } from 'firebase/firestore';

// Redux
import { connect } from 'react-redux';

//  Actions - imported
import { setPage, toggleSideNav } from '../actions/navActions';

// wrapper layout
import Layout from '../components/layout/Layout';

// Components
import Spinner from '../components/common/Spinner';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Post from '../components/Post/Post';
import About from '../components/AboutPage/AboutBody';
import Projects from '../components/ProjectsPage/ProjectsBody';

// Icons
import PostAddIcon from '@material-ui/icons/PostAdd';

const Profile = ({ 
    setPage,
    toggleSideNav,
    post
}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [posts, setPosts] = useState([]);
    const [gotPosts, setGotPosts] = useState(false);

    // Inifite scroll
    const [lastPageDoc, setLastPageDoc] = useState(null);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const [showBottomSpinner, setShowBottomSpinner] = useState(false)

    const url_filter = (window.location.href);
    const url = new URL(url_filter);
    const filter = url.searchParams.get("show");

    // Firebase collection ref
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
    
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    });

    useEffect(() => {
        if(filter) {
            // if(filter === 'photos') {
            //     getUserPhotos(modalUser._id)
            // }
            
        } else {
            const q = query(postsCollectionRef, orderBy('createdAt', 'desc'), limit(3));

            onSnapshot(q, (snapshot) => {
                console.log('UPDATING POSTS...');
                setPosts(snapshot.docs.map((doc) => ({...doc.data(), _id: doc.id})));
                setGotPosts(true);

                // Get the last visible document
                setLastPageDoc(snapshot.docs[snapshot.docs.length - 1]);
            })
        } 
        

    }, [filter]);

    useEffect(() => {
        setPage('profile');


    }, [])

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target

        if (offsetHeight + scrollTop >= scrollHeight - 1 && !showBottomSpinner && !noMorePosts && !filter) {
            console.log('scrolling');
            loadMore();
        }
    }

    const loadMore = () => {
        console.log("last", lastPageDoc);

        setShowBottomSpinner(true);
        
        // Construct a new query starting at this document,
        // get the next 25 cities.
        const nextQuery = query(postsCollectionRef, orderBy('createdAt', 'desc'), startAfter(lastPageDoc || 0), limit(3));

        onSnapshot(nextQuery, (snapshot) => {
            // If no more docs in db to load
            if(snapshot.docs.length < 2) {
                setNoMorePosts(true);
            } else {
                console.log('UPDATING CHAT POSTS...');
                setPosts(currentState => [...currentState, ...snapshot.docs.map((doc) => ({...doc.data(), _id: doc.id}))]);
    
                // Get the last visible document
                setLastPageDoc(snapshot.docs[snapshot.docs.length - 1]);
    
                // Hide loading spinner
                setShowBottomSpinner(false);
            }

        })
    }

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    let postList;

    // Choose where to get source of posts data
    let postListRef;

    if(filter && filter === 'calendar') {
        window.location.href = `https://calendly.com/foxytunde`;
    } else {
        postListRef = posts;
    }
  
    if(filter) {
        if(filter === 'about') {
            postList = (
                <About />
            )
        } else if(filter === 'projects') {
            postList = (
                <Projects />
            )
        }
    } else {
        postList = (
            <About />
        )
        // if(postListRef === null || !gotPosts) {
        //     postList = <Spinner />;
        // }
        // else {
        //     if(postListRef.length > 0) {
        //         postList = postListRef.map(post => {
        //             if(post) {
        //                 return (
        //                     <Post key={post._id} post={post} />
        //                 )
        //             }
        //         })
        //     }
        //     else {
        //         postList = (
        //             <div className="no-rides">
        //                 <h1>No Posts</h1>
        //             </div>
        //         );
        //     }
        // }
    }

    return (
        <Fragment>
            <Layout handleScroll={handleScroll} handleSlideMenu={toggleSideNav} page="profile">
                <ProfileHeader />
                {postList}

                {showBottomSpinner && !noMorePosts && <Spinner />}
                
                <div className="no-rides">{filter === 'about' && 'Wow! You made it this far 😊'}</div>
                
                {isTablet && (
                    <Link to='https://www.twitter.com' id="fixed-button" className="show"><PostAddIcon /></Link>
                )}

            </Layout>
        </Fragment>
    )
}

Profile.propTypes = {
    setPage: PropTypes.func.isRequired,
    toggleSideNav: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
});

export default connect(mapStateToProps, { 
    setPage,
    toggleSideNav
})(Profile);
