import React from 'react';
import { Helmet } from 'react-helmet-async';
import EventSlider from '../Components/EventSlider';
import FeaturedGardeners from '../Components/FeaturedGardeners';
import TopTrendingTips from '../Components/TopTrendingTips';
import CommunityHighlights from '../Components/CommunityHighlights';
import GardeningFAQ from '../Components/GardeningFAQ';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>GardenGlow - Your Gardening Community</title>
                <meta name="description" content="Join GardenGlow, your ultimate gardening community. Share tips, learn from experts, and grow together." />
                <meta name="keywords" content="gardening, community, plants, tips, garden care, urban gardening" />
            </Helmet>
            <EventSlider />
            <FeaturedGardeners />
            <TopTrendingTips />
            <CommunityHighlights />
            <GardeningFAQ />
        </div>
    );
};

export default Home;