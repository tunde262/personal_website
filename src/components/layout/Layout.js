import React, { Fragment, useEffect, useState } from 'react';

// Routing
import { useHistory } from 'react-router-dom';

// Icons - material UI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuIcon from '@material-ui/icons/Menu';

const Layout = ({ 
    children, 
    page, 
    sideNav, 
    handleSlideMenu,
    handleScroll 
}) => {
    // Screen Width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        if(sideNav) {
            if(document.getElementById('feed-header') !== null) {
                document.getElementById('feed-header').classList.remove("active");
                return "feed__header";
            }
        } else {
            if(document.getElementById('feed-header') !== null) {
                setTimeout(() => {
                    document.getElementById('feed-header').classList.add("active");
                }, 700)
            }
        }
    }, [sideNav])

    const history = useHistory();

    const goBack = () => {

        let previousURL = document.referrer;

        var pathArray = previousURL.split( '/' );
        var host = pathArray[2];

        console.log(pathArray);

        // Check if from this source or from chat box page
        if((typeof(host) !== 'undefined' && host.length) && (host.toLowerCase().includes("oubuysell") || host.toLowerCase().includes("localhost:3000") || host.toLowerCase().includes("mycontacts-9ba5a"))) {
            if(pathArray[4] && pathArray[4].toLowerCase().includes("set-up")) {
                window.location.href = '/home';
            } else if(pathArray[3] && pathArray[4] && pathArray[3].toLowerCase().includes("messages")) {
                window.location.href = `/${pathArray[3]}/${pathArray[4]}`;
            } else if(previousURL.toLowerCase().includes("?filter=welcome")) {
                window.location.href = '/home';
            } else {
                history.goBack();
            }
        } else {
            window.location.href = '/home';
        }

    }

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    return (
        <div className="feed__container">
            <div onScroll={handleScroll} className="feed">
                {/**Header */}
                <div className="feed__header" id="feed-header">

                    {page === 'profile' && (
                        <div className="layout__profileHeader">
                            <div onClick={isTablet ? handleSlideMenu : undefined} className="profile__btnContainer">

                                {isMobile && (
                                    <div>
                                        <MenuIcon />
                                    </div>
                                )}
                            </div>
                            <div className="profile__headerText">
                                <h3>
                                    Tunde Adepitan{' '}
                                    <VerifiedUserIcon className="profile__badge active"></VerifiedUserIcon>
                                </h3>
            
                                <p>Age: 21 (He/Him)</p>
                            </div>
                        </div>
                    )}

                    {page === 'post' && (
                        <div className="layout__profileHeader">
                            <div onClick={goBack} className="profile__btnContainer">
                                <ArrowBackIcon />
                            </div>
                            <div className="profile__headerText">
                                <h3>
                                    Tunde's post
                                </h3>
                            </div>
                        </div>
                    )}
                    
                </div>

                {children}
            </div>
        </div>
    )
}

export default Layout;
