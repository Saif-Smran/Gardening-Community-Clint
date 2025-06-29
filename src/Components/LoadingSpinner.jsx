import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/plant-loading.json';

const LoadingSpinner = () => {
    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
            <div className="w-32 h-32">
                <Lottie
                    animationData={loadingAnimation}
                    loop={true}
                />
            </div>
            <p className="mt-4 text-base-content/70 animate-pulse">Loading...</p>
        </div>
    );
};

export default LoadingSpinner; 