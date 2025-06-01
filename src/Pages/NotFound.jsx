import React from 'react';
import { Link } from 'react-router-dom';
import { FaSeedling } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="relative">
                    <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <FaSeedling className="text-6xl text-primary animate-bounce" />
                    </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8 mb-4">
                    Oops! Page Not Found
                </h2>
                
                <p className="text-base-content/70 mb-8 max-w-md mx-auto">
                    Looks like this garden patch is empty! The page you're looking for may have been moved, deleted, or never existed.
                </p>

                <div className="space-y-4">
                    <Link 
                        to="/" 
                        className="btn btn-primary btn-wide"
                        replace={true}
                    >
                        Return to Home Garden
                    </Link>
                    
                    <div className="flex justify-center items-center gap-2 text-sm text-base-content/50">
                        <span className="w-16 h-px bg-base-content/20"></span>
                        <span>or</span>
                        <span className="w-16 h-px bg-base-content/20"></span>
                    </div>
                    
                    <Link 
                        to="/browse-tips" 
                        className="btn btn-outline btn-primary btn-wide"
                    >
                        Browse Garden Tips
                    </Link>
                </div>

                <div className="mt-12 flex justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary/30"></span>
                    <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                    <span className="w-2 h-2 rounded-full bg-primary/70"></span>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 