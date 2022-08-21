import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { format, parseISO, fromUnixTime, formatDistanceToNow } from 'date-fns';
import {CopyToClipboard} from 'react-copy-to-clipboard';

// Redux
import { connect } from 'react-redux';

// Actions
import { setAlert } from '../../actions/alertActions';

// components - imported
import { Avatar, Button } from '@material-ui/core';
import ImageBlock from '../common/ImageBlock';

// Icons - imported
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LinkIcon from '@material-ui/icons/Link';
import CheckIcon from '@material-ui/icons/Check';

// Modal
import Modal from '../modal/Modal';
import ModalContainer from '../modal/ModalContainer';

const Post = ({ 
    post, 
    setAlert
}) => {
    const [liked, setLiked] = useState(false);

    // Check if post has image - for font size reasons
    const [hasImg, setHasImg] = useState(false);

    // Toggle Dropdwon
    const [dropdown, setDropdown] = useState(false);
    const [shareDropdown, setShareDropdown] = useState(false);
    const [menuHeight, setMenuHeight] = useState(null);

    // Edit Modal toggles
    const [copied, setCopied] = useState(false);
    const [copiedModal, setCopiedModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setCopiedModal(false);
        }, 2000);
    }, [copiedModal]);

    useEffect(() => {
        setTimeout(() => {
            setShareDropdown(false);
            setCopied(false);
        }, 1000);
    }, [copied]);

    // Copy Modal logic

    const toggleCopiedModal = () => {
        setDropdown(false)
        
        setAlert('Copied to clipboard', 'okay');
        
    }

    const handleShareCopy = () => {
        setShareDropdown(false)
        
        setAlert('Copied to clipboard', 'okay');
    }
    
    return (
        <Fragment>
            <div className="post">
                <div className="post__avatar">
                    <Avatar src="https://pbs.twimg.com/profile_images/1460707425409982468/OxajGyfM_400x400.jpg" />
                </div>
                <div className="post__body">
                    <div onClick={() => setDropdown(!dropdown)} className="post__moreBtn">
                        <MoreHorizIcon />
                    </div>
                    <div className={dropdown ? "edit-dropdown active" : "edit-dropdown"} style={{height: menuHeight}}>
                        <div className="menu">
                            <CopyToClipboard 
                                text={`https://www.oubuysell.com/`}
                                onCopy={toggleCopiedModal}
                            >
                                <div className="menu-item">
                                    {!copied ? (
                                        <Fragment>
                                            <LinkIcon />
                                            Copy link
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <CheckIcon />
                                            Copied!
                                        </Fragment>
                                    )}
                                </div>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div
                        className={`hidden-overlay ${dropdown ? "show" : ""}`}
                        onClick={() => setDropdown(!dropdown)}
                    />
                    <div className="post__header">
                        <div className="post__headerText">
                            <h3>
                                <span>
                                    <a href="#">
                                        <span>Tunde Adepitan {' '}</span>
                                        <VerifiedUserIcon className="post__badge"></VerifiedUserIcon> <span>{/*TODO: GET RID OF THIS SPAN*/}</span> 
                                    </a>
                                </span>
                                <span className="post__headerSpecial">
                                    <a href="1660693898880">
                                        {formatDistanceToNow(1660693898880)} ago
                                    </a>
                                </span>
                            </h3>
                        </div>
                        <div className={`post__headerDescription ${hasImg ? 'withImgs' : ''}`}>
                            <p>Lorem ipsum text</p>
                        </div>
                    </div>

                    {/* <ImageBlock detailPost={post} setHasImg={setHasImg} setCheckHasImg={setCheckHasImg} checkHasImg={checkHasImg} /> */}
                    
                    <div className="post__footer">
                        <div>
                            <button 
                                onClick={() => window.location.href = `https://www.twitter.com`}
                                className="secondaryBtn post"
                            >
                                <div>
                                    <ChatBubbleOutlineIcon fontSize="small" />
                                    <span>Comment</span>
                                </div>
                            </button>
                        </div>
                        <div className={liked ? "active" : "" } onClick={() => window.location.href = `https://www.twitter.com`}>
                            <button className={liked ? "secondaryBtn post active" : "secondaryBtn post" }>
                                <div>
                                    {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                                    <span>
                                        {liked ? 'Saved!' : 'Save'} 
                                        {/* {post.likes.length > 0 && (
                                            <span style={liked ? {display:'none'}: {fontSize:'11px'}}>({post.likes.length})</span>
                                        )} */}
                                    </span>
                                </div>
                            </button>
                        </div>
                    
                        
                        <div style={{position: 'relative'}}>
                            <button onClick={() => setShareDropdown(!shareDropdown)} className="secondaryBtn post">
                                <div>
                                    <ShareIcon fontSize="small" />
                                    <span>Share</span>
                                </div>
                            </button>
                            <div className={shareDropdown ? "edit-dropdown active" : "edit-dropdown"} style={{height: menuHeight}}>
                                <div className="menu">
                                    <CopyToClipboard 
                                        text={`https://www.oubuysell.com`}
                                        onCopy={handleShareCopy}
                                    >
                                        <div className="menu-item">
                                            {!copied ? (
                                                <Fragment>
                                                    <LinkIcon />
                                                    Copy link
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <CheckIcon />
                                                    Copied!
                                                </Fragment>
                                            )}
                                        </div>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div
                                className={`hidden-overlay ${shareDropdown ? "show" : ""}`}
                                onClick={() => setShareDropdown(!shareDropdown)}
                            />
                        </div>
                    </div>
                </div>
                <div 
                    className="post__overlay" 
                    onClick={() => window.location.href = `https://www.twitter.com`}
                ></div>
            </div>

            <ModalContainer show={copiedModal} onClose={toggleCopiedModal} white>
                <Modal border>
                    <div>
                        <h2>Link Copied!</h2>
                    </div>
                    <p>You can share this link with anyone.</p>
                    <Button 
                        onClick={toggleCopiedModal}
                        variant="outlined" 
                        className="sidebar__tweet ghost"
                        fullWidth
                    >
                        Close
                    </Button>
                </Modal>
            </ModalContainer>
        </Fragment>
    )
}

Post.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {  setAlert })(Post);
