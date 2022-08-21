import React, { useState, useEffect } from 'react';

const SidebarOption = ({ 
    active, 
    toggle, 
    handleSlideMenu, 
    text, 
    Icon, 
    link
}) => {

    return (
        <a href={link} onClick={toggle && handleSlideMenu} style={{textDecoration:'none'}}>
            <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
                <div className="sidebarOption__icon">
                    {Icon && <Icon />}
                </div>
                <h2>{text}</h2>
                
            </div>
        </a>
    )
}

export default SidebarOption;
