import React from 'react'
import { useParams } from 'react-router-dom';

export const AdminDashboard = () => {
    const { username } = useParams();
    return (
        <div className='m-5'>
            <h1>Welcome back,{username}</h1>
        </div>
    )
}