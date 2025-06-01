import React from 'react';
import { FaSeedling } from 'react-icons/fa';

const LoadingAnimation = () => {
    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
            <div className="relative">
                <FaSeedling className="text-5xl text-primary animate-bounce" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary/20 rounded-full animate-pulse"></div>
            </div>
            <h2 className="mt-8 text-xl font-semibold text-primary animate-pulse">Growing...</h2>
            <div className="mt-4 flex gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    );
};

export default LoadingAnimation; 