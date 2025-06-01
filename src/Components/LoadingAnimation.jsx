import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/plant-loading.json';

const LoadingAnimation = () => {
    return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-32 h-32">
                <Lottie
                    animationData={loadingAnimation}
                    loop={true}
                />
            </div>
        </div>
    );
};

export default LoadingAnimation; 