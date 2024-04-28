import React from 'react'
import { BiLibrary } from 'react-icons/bi'
import { FaHome, FaSearch, FaSpotify } from 'react-icons/fa'
import { RiPlayListFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export const SideNavbar = () => {
    return (
        <>
            <div className="nav1">
                <div className="d-flex align-items-center mb-4 ">
                    <FaSpotify className='me-2' style={{ fontSize: "30px" }} />
                    <h3 className='text-light mb-0'>Spotify</h3>
                </div>
                <nav>
                    <Link to="/" className="nav-link"><FaHome className='fs-3' /> <b>Home</b></Link>
                    <Link to="search" className="nav-link"><FaSearch className='fs-3' /> Search</Link>
                </nav>
            </div>
            <div className="nav2">
                <Link to="/library" className="nav-link "><BiLibrary className='fs-3' />Library</Link>
                <Link to="/playlist" className="nav-link"><RiPlayListFill className='fs-3' />Play List</Link>
            </div>
        </>
    )
}
