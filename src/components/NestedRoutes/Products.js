import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Products() {
  return (
    <>
    <div>Products</div>
   
    <nav>
        <Link to="featured">Featured</Link>
        <Link to="view">View</Link>

    </nav>
    <Outlet/>
    
    </>
  )
}

export default Products