import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-base-content/70 animate-pulse">Loading...</p>
        </div>
    );
};

export default LoadingSpinner; 