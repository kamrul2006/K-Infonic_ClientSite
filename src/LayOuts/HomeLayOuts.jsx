import React from 'react'
import BannerSlider from '../Home/Banner'
import HomeStats from '../Home/HomeStats'
import AllPublishers from '../Home/Allpublisher'
import TrendingArticles from '../Home/TrendingArticles'
import Plans from '../Home/Plans'
import NewsSidebar from '../Home/NewsSidebar'
import ReaderReview from '../Home/ReaderReview'

export const HomeLayOuts = () => {
    return (
        <div>

            <div className='block lg:grid lg:grid-cols-12'>

                <div className='col-span-3'>
                    <NewsSidebar />
                </div>
                <div className='col-span-9 lg:p-4'>
                    <BannerSlider />
                </div>


            </div>

            <div className='max-w-7xl mx-auto'>

                <TrendingArticles />


                <AllPublishers />


                <HomeStats />


                <Plans />


                <ReaderReview />

            </div>
        </div>
    )
}
