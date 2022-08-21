import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux';

// Actions
import { toggleShareModal } from '../../actions/navActions';

// Icons -imported
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';

// Components - imported
import { Button } from '@material-ui/core';
import SidebarOption from './SidebarOption';

import logo from '../../utils/imgs/hugLogo.png';

const SidebarMobile = ({ 
    slideMenu, 
    handleSlideMenu, 
    toggleShareModal,
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

    const handleShareModal = () => {
        handleSlideMenu()

        toggleShareModal();
    }

    return (
        <div className={slideMenu ? "nav open": "nav"}>
            <div className="sidebar-mobile" style={{}}>
                {/* <TwitterIcon className="sidebar__twitterIcon" /> */}
                <img className="sidebar__twitterIcon" src={logo} style={{maxHeight: '50px'}} alt="logo" />

                <SidebarOption active={navHighlight === "profile"} Icon={navHighlight === "profile" ? PersonIcon : PersonOutlineIcon} text="Profile" link="/" />
                <SidebarOption active={navHighlight === "settings"} Icon={MoreHorizIcon} text="FAQs" link="/faqs" />

                <div style={{width:'100%', display:'flex', justifyContent:'center', padding:'0 10px', boxSizing:'border-box'}}>
                    <Button onClick={handleShareModal} variant="outlined" className="sidebar__tweet ghost compose" fullWidth>
                        Contact Me
                    </Button>
                </div>
                
            </div>
            <a href="#" className="close" onClick={handleSlideMenu}>
                <CloseIcon />
            </a>
        </div>
    )
}

SidebarMobile.propTypes = {
    toggleShareModal: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    nav: state.nav
})

export default connect(mapStateToProps, { toggleShareModal })(SidebarMobile);
