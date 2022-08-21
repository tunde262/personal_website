import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux';

// Icons -imported
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';

import SidebarOption from './SidebarOption';

// Icons - material UI
import CloseIcon from '@material-ui/icons/Close';

import logo from '../../utils/imgs/hugLogo.png';

const SidebarMobile = ({ 
    slideMenu, 
    handleSlideMenu, 
    nav: { 
        page
    }
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
        <div className={slideMenu ? "nav open": "nav"}>
            <div className="sidebar-mobile">
                {/* <TwitterIcon className="sidebar__twitterIcon" /> */}
                <img className="sidebar__twitterIcon" src={logo} style={{maxHeight: '50px'}} alt="logo" />

                <SidebarOption active={navHighlight === "profile"} Icon={navHighlight === "profile" ? PersonIcon : PersonOutlineIcon} text="Profile" link="/" />
                <SidebarOption active={navHighlight === "settings"} Icon={MoreHorizIcon} text="FAQs" link="/faqs" />
            </div>
            <a href="#" className="close" onClick={handleSlideMenu}>
                <CloseIcon />
            </a>
        </div>
    )
}

SidebarMobile.propTypes = {
    auth: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    nav: state.nav
})

export default connect(mapStateToProps, null)(SidebarMobile);
