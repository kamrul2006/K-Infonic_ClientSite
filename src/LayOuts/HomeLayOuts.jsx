import React from 'react'
import BannerSlider from '../Home/Banner'
import HomeStats from '../Home/HomeStats'
import AllPublishers from '../Home/Allpublisher'
import TrendingArticles from '../Home/TrendingArticles'
import Plans from '../Home/Plans'

export const HomeLayOuts = () => {
    return (
        <div>
            <BannerSlider />
            <div className='max-w-7xl mx-auto'>

                <TrendingArticles />


                <AllPublishers />


                <HomeStats />

                <Plans />


            </div>
        </div>
    )
}
