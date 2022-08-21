import React, { Fragment, useEffect } from 'react';

// Components - imported
import CartInfo from '../Checkout/CartInfo';

// Icons - material UI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Layout = ({ children, page, notificationsPage }) => {

    return (
        <div className="feed__container">
            <div className="feed">

                {/**Header */}
                <div className="feed__header">
                    <div className="layout__profileHeader">
                        <div className="profile__btnContainer">
                            <ArrowBackIcon />
                        </div>
                        <div className="profile__headerText">
                            <h3>
                                Checkout
                            </h3>
                        </div>
                    </div>
                    
                </div>

                {children}
            </div>

            <CartInfo
                displayName="Tunde Adepitan"
                username="foxytunde" 
                verified={true}
                text="People that say “I’ve always got anybody I’ve ever wanted” shoot they shot on somebody twice a year and think they doing something. Get them field goal attempts up then we can talk"
                image="https://media3.giphy.com/media/65ATdpi3clAdjomZ39/giphy.gif"
                avatar="https://pbs.twimg.com/profile_images/1257120322899398659/Jxe3zf98_x96.jpg"
            />
        </div>
    )
}

export default Layout
