import React from 'react';
import {  Outlet } from 'react-router-dom';
import './style.css';
import { TopNavbar } from './TopNavbar';
import { SideNavbar } from './SideNavbar';

export const UserDashboard = () => {
  return (
    <div className='userdash '>
      <div className='row g-0'>
        <div className='col-sm-2 col sidebar poistion-fixed'>
         <SideNavbar />
        </div>

        {/* pages */}
        <div className='col col-sm-10 ps-3'>
         <TopNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
