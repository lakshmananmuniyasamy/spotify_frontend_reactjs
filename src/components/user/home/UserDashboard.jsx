import React from 'react';
import {  Outlet } from 'react-router-dom';
import './style.css';
// import { TopNavbar } from './TopNavbar';
import { SideNavbar } from '../navbars/SideNavbar';

export const UserDashboard = () => {
  return (
    <>
     <div className='userdash'>
        <div className='sidebar' >
         <SideNavbar />
        </div>

        {/* pages */}
        <div className=' main-content text-light'>
         
          <Outlet />
        </div>
     </div>

    </>
  );
};
