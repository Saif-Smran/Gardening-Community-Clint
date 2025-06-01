import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import EventSlider from '../Components/EventSlider';
import FeaturedGardeners from '../Components/FeaturedGardeners';
import TopTrendingTips from '../Components/TopTrendingTips';
import CommunityHighlights from '../Components/CommunityHighlights';
import GardeningFAQ from '../Components/GardeningFAQ';
import LoadingAnimation from '../Components/LoadingAnimation';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                // Simulate loading time for demonstration
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        loadHomeData();
    }, []);

    if (loading) {
        return <LoadingAnimation />;
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error mb-4">Oops! Something went wrong</h2>
                    <p className="text-base-content/70">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="btn btn-primary mt-4"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

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