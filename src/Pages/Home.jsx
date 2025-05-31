import React from 'react';
import EventSlider from '../Components/EventSlider';
import FeaturedGardeners from '../Components/FeaturedGardeners';
import TopTrendingTips from '../Components/TopTrendingTips';
import CommunityHighlights from '../Components/CommunityHighlights';
import GardeningFAQ from '../Components/GardeningFAQ';

const Home = () => {
    return (
        <div>
            <EventSlider></EventSlider>
            <FeaturedGardeners></FeaturedGardeners>
            <TopTrendingTips></TopTrendingTips>
            <CommunityHighlights></CommunityHighlights>
            <GardeningFAQ></GardeningFAQ>
        </div>
    );
};

export default Home;