import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux';

// Actions
import { setPage, toggleShareModal } from '../../actions/navActions';

// Components - imported
import { Button } from '@material-ui/core';

// Icons -imported
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import PostAddIcon from '@material-ui/icons/PostAdd';

import SidebarOption from './SidebarOption';

const Sidebar = ({
    toggleShareModal,
    nav: { 
        page
    },
    isMobile,
    isTablet
}) => {

    // Page
    const [navHighlight, setNavHighlight] = useState(null);

    useEffect(() => {
        if(page === 'home') {
            setNavHighlight('home');
        }
        // if(page === 'howitworks') {
        //     setNavHighlight('howitworks');
        // }
        if(page === 'notifications') {
            setNavHighlight('notifications');
        }

        if(page === 'messages') {
            setNavHighlight('messages');
        }

        if(page === 'saved') {
            setNavHighlight('saved');
        }

        if(page === 'profile') {
            setNavHighlight('profile');
        }

        if(page === 'settings') {
            setNavHighlight('settings');
        }

    }, [page]);

    return (
        <div className="sidebar">
            {/* <img className="sidebar__twitterIcon" src={logo} style={{maxHeight: '50px'}} alt="logo" /> */}
            <div style={{height:'50px', marginBottom:'20px'}} />

            <SidebarOption active={navHighlight === "profile"} Icon={navHighlight === "profile" ? PersonIcon : PersonOutlineIcon} text="Profile" link="/" />
            <SidebarOption active={navHighlight === "settings"} Icon={MoreHorizIcon} text="FAQs" link="/faqs" />

            {!isMobile && (
                <Button onClick={toggleShareModal} variant="outlined" className="sidebar__tweet ghost compose" fullWidth>
                    {!isTablet ? 'Contact Me' : <PostAddIcon />}
                </Button>
            )}

        </div>
    )
}

Sidebar.propTypes = {
    nav: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
    toggleShareModal: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    nav: state.nav
})

export default connect(mapStateToProps, { setPage, toggleShareModal })(Sidebar);
