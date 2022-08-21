import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components - imported
import Widgets from '../Widgets/Widgets';

// Icons - material UI
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const ShopLayout = ({ children, page, notificationsPage }) => {

    return (
        <div className="shopFeed">
            {/**Header */}
            <div className="shopFeed__header">
                <div className="shopFeed__search">
                    <div className="widgets__input shop">
                        <SearchIcon className="widgets__searchIcon" />
                        <input placeholder="Search Twiiter" type="text" />
                    </div>
                    <div className="shopFeed__cog">
                        <div>
                            <AddShoppingCartIcon />
                        </div>
                    </div>
                </div>

                {/* <div className="shopFeed__headerTabs">
                    <Link to="/notifications">
                        <div className="active">
                            <h3>Trending</h3>
                            <div className="block__underline"></div>
                        </div>
                    </Link>
                    <Link to="/notifications/mentions">
                        <div>
                            <h3>Clothing</h3>
                            <div className="block__underline"></div>
                        </div>
                    </Link>
                    <Link to="/notifications">
                        <div className={page === 'notifications' && "active"}>
                            <h3>Shoes</h3>
                            <div className="block__underline"></div>
                        </div>
                    </Link>
                    <Link to="/notifications/mentions">
                        <div>
                            <h3>Household</h3>
                            <div className="block__underline"></div>
                        </div>
                    </Link>
                    <Link to="/notifications/mentions">
                        <div>
                            <h3>School</h3>
                            <div className="block__underline"></div>
                        </div>
                    </Link>
                    <Link to="/notifications/mentions">
                        <div>
                            <h3>Pets</h3>
                            <div className="block__underline"></div>
                        </div>
                    </Link>
                </div> */}
                
            </div>

            {children}
        </div>
    )
}

export default ShopLayout;
