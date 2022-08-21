import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {CopyToClipboard} from 'react-copy-to-clipboard';


// Redux
import { connect } from 'react-redux';

// Actions
import { setAlert } from '../../actions/alertActions';

// Light Box
import { SRLWrapper } from "simple-react-lightbox";

// Components - material UI
import { Avatar, Button } from '@material-ui/core';

// Icons - material UI
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { toggleProfileModal, toggleAuthModal } from '../../actions/navActions';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LinkIcon from '@material-ui/icons/Link';


const ProfileHeader = ({ 
    setAlert,
}) => {

    // Toggle Dropdwon
    const [dropdown, setDropdown] = useState(false);
    const [menuHeight, setMenuHeight] = useState(null);

    // Edit Modal toggles
    const [copied, setCopied] = useState(false);
    
    const url_filter = (window.location.href);
    const url = new URL(url_filter);
    const filter = url.searchParams.get("show");

    useEffect(() => {
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }, [copied]);


    // Copy Modal logic
    const toggleCopiedModal = () => {
        setDropdown(false);
        
        setAlert('Copied to clipboard', 'okay');
        
    }

    const options = {
        caption: {
            showCaption: false
          },
        thumbnails: {
            showThumbnails: false
        },
        buttons: {
            showAutoplayButton: false,
            showFullscreenButton: false,
            showNextButton: false,
            showPrevButton: false,
            showThumbnailsButton: false,
        }
    }
    
    return (
        <SRLWrapper options={options}>
            <div className="profile__header">
                <Button 
                    variant="outlined" 
                    className="sidebar__tweet ghost minWidth profile__moreBtn" 
                    onClick={() => window.location.href = `https://www.twitter.com`}
                >
                    Resume
                </Button>
                {/* <div onClick={() => setDropdown(!dropdown)} className="profile__moreBtn">
                    <MoreHorizIcon />  
                </div> */}
                <div className={dropdown ? "edit-dropdown active" : "edit-dropdown"} style={{height: menuHeight}}>
                    <div className="menu">

                        <CopyToClipboard 
                            text={`https://www.oubuysell.com/`}
                            onCopy={toggleCopiedModal}
                        >
                            <div className="menu-item">
                                <LinkIcon />
                                Copy link to website
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>
                <div
                    className={`hidden-overlay ${dropdown ? "show" : ""}`}
                    onClick={() => setDropdown(!dropdown)}
                />
                <div className="profile__image">
                    <a href="https://pbs.twimg.com/profile_images/1460707425409982468/OxajGyfM_400x400.jpg">
                        <Avatar src="https://pbs.twimg.com/profile_images/1460707425409982468/OxajGyfM_400x400.jpg" />
                    </a>
                </div>
                <div className="profile__headerBody">
                    <h3>
                        Tunde Adepitan
                        <span className="profile__headerSpecial">
                            <VerifiedUserIcon className="profile__badge active"></VerifiedUserIcon> {/*@{modalUser && modalUser.username}*/}
                        </span>
                    </h3>
                </div>
                <div className="profile__description">
                    <p>Currently building my own things</p>
                </div>
                
                <div className="profile__membership">
                    <DateRangeIcon />
                    <p>Norman, Oklahoma</p>
                </div>

                <div className="profile__stats">
                    <p><span className="profile__specialStat">12.1K</span> Tweets</p>
                    <p><span className="profile__specialStat">9</span> Projects</p>
                    <p><span className="profile__specialStat">115K</span> MAU</p>
                    <p><span className="profile__specialStat">$1,015</span> /yr {/*(+68%/y)*/}</p>
                </div>

                {/* <Button 
                    variant="outlined" 
                    className="sidebar__tweet ghost" 
                    fullWidth
                    onClick={() => window.location.href = `https://www.twitter.com`}
                >
                    Resume
                </Button> */}

                <div className="profile__headerTabs">
                    <a href="/">
                        <div className={`${(filter === null || filter === undefined || filter === 'home') && 'active'}`}>
                            <h3>Tweets</h3>
                            <div className="block__underline"></div>
                        </div>
                    </a>
                    <a href={`/?show=about`}>
                        <div className={`${(filter && filter === 'about') && 'active'}`}>
                            <h3>About</h3>
                            <div className="block__underline"></div>
                        </div>
                    </a>
                    <a href={`/?show=projects`}>
                        <div className={`${(filter && filter === 'projects') && 'active'}`}>
                            <h3>Projects</h3>
                            <div className="block__underline"></div>
                        </div>
                    </a>
                    <a href={`/?show=calendar`}>
                        <div className={`${(filter && filter === 'calendar') && 'active'}`}>
                            <h3>Calendar</h3>
                            <div className="block__underline"></div>
                        </div>
                    </a>
                </div>
            </div>
        </SRLWrapper>
    )
}

ProfileHeader.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(ProfileHeader);
