import React from 'react'
import Navbar from '../Components/Fixed/Navbar'
import Footer from '../Components/Fixed/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../Components/InUse/Heading'

const RootLayOut = () => {
    return (
        <div>
            <Header />

            <Navbar />

            <Outlet />

            <Footer />
        </div>
    )
}

export default RootLayOut