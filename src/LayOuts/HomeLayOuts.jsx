import React from 'react'
import BannerSlider from '../Home/Banner'
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
