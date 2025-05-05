import React from 'react'
import Navbar from '../Components/Fixed/Navbar'
import Footer from '../Components/Fixed/Footer'
import { Outlet } from 'react-router-dom'

const RootLayOut = () => {
    return (
        <div>
            <Navbar />

            <Outlet />

            <Footer />
        </div>
    )
}

export default RootLayOut