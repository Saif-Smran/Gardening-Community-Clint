import React from 'react';
import EventSlider from '../Components/EventSlider';
import FeaturedGardeners from '../Components/FeaturedGardeners';
import TopTrendingTips from '../Components/TopTrendingTips';

const Home = () => {
    return (
        <div>
            <EventSlider></EventSlider>
            <FeaturedGardeners></FeaturedGardeners>
            <TopTrendingTips></TopTrendingTips>
        </div>
    );
};

export default Home;