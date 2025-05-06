import React from 'react'
import BannerSlider from '../Home/Banner'
import AllArticles from '../AllArticles/AllArticles'
import Login from '../Auth/Users/Login'
import LoginPage from '../Auth/Users/Loginpage'
import HomeStats from '../Home/HomeStats'
import AllPublishers from '../Home/Allpublisher'

export const HomeLayOuts = () => {
    return (
        <div>
            <BannerSlider />
            <div className='max-w-7xl mx-auto'>


                <AllPublishers />


                <HomeStats />




            </div>
        </div>
    )
}
