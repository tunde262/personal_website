import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { use100vh } from 'react-div-100vh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTwitter, faSnapchat } from '@fortawesome/free-brands-svg-icons'


// Redux
import { connect } from 'react-redux';

// Routing
import Routes from './components/routes/Routes';

// Actions
import { setAlert } from './actions/alertActions';
import { toggleSideNav, toggleShareModal } from './actions/navActions';

// Components - imported
import SidebarMobile from './components/sidebar/SidebarMobile';
import Sidebar from './components/sidebar/Sidebar';
import Backdrop from './components/common/Backdrop';

// Modal
import Modal from './components/modal/Modal';
import ModalContainer from './components/modal/ModalContainer';
import CommentModal from './components/modal/CommentModal';


// Icons - material UI
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import MailIcon from '@material-ui/icons/Mail';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';


const Body = ({ 
    setAlert,
    toggleShareModal,
    toggleSideNav,
    nav: { 
        sideNav,
        shareModal,
    }
}) => {

    // window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // SideNav and Overlay should disappear if not isMobile
    const [resetSideNav, setResetSideNav] = useState(false);

    const url_filter = (window.location.href);
    const url = new URL(url_filter);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
    
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    // SideNav and Overlay should disappear if not isMobile
    useEffect(() => {
        if(resetSideNav) {
            toggleSideNav();
            setResetSideNav(false);
        }
    }, [resetSideNav]);
    
    
    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    library.add(fab, faTwitter)

    // Modal toggle logic

    const handleCopy = () => {
        /* Get the text field */
        var copyLink = document.getElementById("linkToCopy");

        /* Select the text field */
        copyLink.select();
        copyLink.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyLink.value);

        /*Close Modal & Alert */
        toggleShareModal();
        setAlert('Copied to clipboard', 'okay');
    }


    // Window Size
    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1170;

    const pageHeight = use100vh();

    let backdrop;

    if (sideNav ) {
        backdrop = <Backdrop click={toggleSideNav} />;
    }

    // SideNav and Overlay should disappear if not isMobile
    if (sideNav && !isMobile && !resetSideNav) {
        setResetSideNav(true);
    }

    if (sideNav && isMobile && resetSideNav) {
        setResetSideNav(false);
    }

    return (
        <Fragment>
            <div className={sideNav ? "app open": "app"} style={{ height: pageHeight }}>
                {!isMobile ? <Sidebar isMobile={isMobile} isTablet={isTablet} /> : <SidebarMobile slideMenu={sideNav} handleSlideMenu={toggleSideNav} /> }

                {backdrop}
                <Route component={Routes} />

            </div>

            {/* Share Group Modal */}
            <ModalContainer show={shareModal} onClose={toggleShareModal}>
                <CommentModal shareGroup>
                    <div className="closeBtn__container bothSides modalClose">
                        <div style={{fontSize: '16px', margin:'10px 0', display: 'flex', alignItems:  'center', padding: '7px 16px', fontWeight: '600', textAlign: 'center'}}>
                            Contact Me
                        </div>
                        <button onClick={toggleShareModal} className="secondaryBtn">
                            <CloseOutlinedIcon /> Close
                        </button>
                    </div>
                    <div style={{position:'relative', width:'100%', display:'flex', flexDirection:'row', flex:'1', flexBasis:'0.000000001px'}}>
                        <div style={{overflow:'hidden', whiteSpace:'nowrap'}}>
                            <a target="_blank" href="https://mail.google.com/mail/u/0/?fs=1&to=tunde262@gmail.com&su=Hey+Tunde!&body=Looking+forward+to+your+message...%0D%0DSend+me+something+nice+:)&tf=cm">
                                <div style={{display:'inline-block', marginRight:'8px'}}>
                                    <div style={{margin:'1px 0', border:'none', borderRadius:'3px', padding:'5px 1px 2px', outline:'none'}}>
                                        <div style={{background:'#f9f9f9', border:'1px solid rgba(0, 0, 0, 0.1)', borderRadius:'50%', marginLeft:'4px', marginRight:'4px', marginBottom:'3px', display:'inline-flex', alignItems:'center', justifyContent:'center', position:'relative', verticalAlign:'middle', width:'60px', height:'60px'}}>
                                            <MailIcon style={{color:'#333', width:'35px', height:'35px'}} />
                                        </div>
                                        <div style={{color:'#030303', margin:'auto', width:'68px', maxHeight:'42px', textAlign:'center', whiteSpace:'normal', overflow:'hidden', fontSize:'12px', lineHeight:'1.8rem', fontWeight:'400'}}>
                                        Email
                                        </div>
                                    </div>
                                </div>
                            </a>
                            
                            <a target="_blank" href="https://twitter.com/TipsByTunde">
                                <div style={{display:'inline-block', marginRight:'8px'}}>
                                    <div style={{margin:'1px 0', border:'none', borderRadius:'3px', padding:'5px 1px 2px', outline:'none'}}>
                                        <div style={{background:'#1DA1F2', border:'1px solid rgba(0, 0, 0, 0.1)', borderRadius:'50%', marginLeft:'4px', marginRight:'4px', marginBottom:'3px', display:'inline-flex', alignItems:'center', justifyContent:'center', position:'relative', verticalAlign:'middle', width:'60px', height:'60px'}}>
                                            <FontAwesomeIcon icon={faTwitter} style={{color:'#fff', width:'35px', height:'35px'}} />
                                            {/* <i class="fa-brands fa-twitter"></i> */}
                                        </div>
                                        <div style={{color:'#030303', margin:'auto', width:'68px', maxHeight:'42px', textAlign:'center', whiteSpace:'normal', overflow:'hidden', fontSize:'12px', lineHeight:'1.8rem', fontWeight:'400'}}>
                                        Twitter
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a target="_blank" href="https://www.instagram.com/foxytunde/?hl=en">
                                <div style={{display:'inline-block', marginRight:'8px'}}>
                                    <div style={{margin:'1px 0', border:'none', borderRadius:'3px', padding:'5px 1px 2px', outline:'none'}}>
                                        <div style={{background:'#bc2a8d', border:'1px solid rgba(0, 0, 0, 0.1)', borderRadius:'50%', marginLeft:'4px', marginRight:'4px', marginBottom:'3px', display:'inline-flex', alignItems:'center', justifyContent:'center', position:'relative', verticalAlign:'middle', width:'60px', height:'60px'}}>
                                            <InstagramIcon style={{color:'#fff', width:'35px', height:'35px'}} />
                                        </div>
                                        <div style={{color:'#030303', margin:'auto', width:'68px', maxHeight:'42px', textAlign:'center', whiteSpace:'normal', overflow:'hidden', fontSize:'12px', lineHeight:'1.8rem', fontWeight:'400'}}>
                                        Instagram
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a target="_blank" href="https://www.snapchat.com/add/foxytunde?sender_web_id=97d31af2-e177-4aaf-b31a-5ab768c332ad&device_type=desktop&is_copy_url=true">
                                <div style={{display:'inline-block', marginRight:'8px'}}>
                                    <div style={{margin:'1px 0', border:'none', borderRadius:'3px', padding:'5px 1px 2px', outline:'none'}}>
                                        <div style={{background:'#FFFC00', border:'1px solid rgba(0, 0, 0, 0.1)', borderRadius:'50%', marginLeft:'4px', marginRight:'4px', marginBottom:'3px', display:'inline-flex', alignItems:'center', justifyContent:'center', position:'relative', verticalAlign:'middle', width:'60px', height:'60px'}}>
                                            <FontAwesomeIcon icon={faSnapchat} style={{color:'#333', width:'35px', height:'35px'}} />
                                        </div>
                                        <div style={{color:'#030303', margin:'auto', width:'68px', maxHeight:'42px', textAlign:'center', whiteSpace:'normal', overflow:'hidden', fontSize:'12px', lineHeight:'1.8rem', fontWeight:'400'}}>
                                        Sanpchat
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div style={{marginTop:'8px', marginBottom:'24px', display:'inline-block', height:'42px', width:' 100%'}}>
                        <div onClick={handleCopy} style={{height:'100%', cursor:'pointer', justifyContent:'space-between', border:'1px solid rgba(0, 0, 0, 0.1)', backgroundColor:'#f9f9f9', borderRadius:'2px', display:'flex',alignItems:'center', paddingRight:'16px'}}>
                            <input 
                                readOnly
                                type="text"
                                placeholder="tundeadepitan@ou.edu"
                                name="linkToCopy"
                                id="linkToCopy"
                                value="tundeadepitan@ou.edu"
                                style={{width:'100%', cursor:'copy', marginLeft:'16px', border:'none', outline:'none', whiteSpace:'nowrap', backgroundColor:'rgba(0,0,0,0)', color:'#030303', fontSize:'14px'}} 
                            />
                            <div style={{padding:'0 8px', color:'#065fd4', borderRadius:'2px 3px', margin:'0 0 0', textTransform:'uppercase', fontSize:'14px', fontWeight:'500', letterSpacing:'0.5px'}}>
                                <a href="#" style={{textDecoration:'none', color:'#065fd4', fontWeight:'500'}}>
                                    Copy
                                </a>
                            </div>
                        </div>
                    </div>
                </CommentModal>
            </ModalContainer>
        </Fragment>
    )
}

Body.propTypes = {
    nav: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    toggleSideNav: PropTypes.func.isRequired,
    toggleShareModal: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    nav: state.nav,
})

export default connect(mapStateToProps, { 
    setAlert,
    toggleSideNav, 
    toggleShareModal,
})(Body);
