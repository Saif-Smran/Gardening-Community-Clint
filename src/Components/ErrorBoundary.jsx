import React from 'react';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { FaBug, FaExclamationTriangle } from 'react-icons/fa';

const ErrorBoundary = () => {
    const error = useRouteError();
    console.error(error);

    // Get appropriate error message
    let errorMessage = "An unexpected error occurred. Our garden gnomes are working on it!";
    let errorCode = "Error";

    if (isRouteErrorResponse(error)) {
        errorCode = error.status;
        errorMessage = error.statusText || error.data?.message;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-base-100 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="relative">
                    <h1 className="text-9xl font-bold text-error opacity-20">{errorCode}</h1>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {errorCode === 404 ? (
                            <FaExclamationTriangle className="text-6xl text-error animate-bounce" />
                        ) : (
                            <FaBug className="text-6xl text-error animate-bounce" />
                        )}
                    </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-error mt-8 mb-4">
                    {errorCode === 404 ? "Page Not Found" : "Oops! Something went wrong"}
                </h2>
                
                <p className="text-base-content/70 mb-8 max-w-md mx-auto">
                    {errorMessage}
                </p>

                <div className="space-y-4">
                    <Link 
                        to="/" 
                        className="btn btn-error btn-wide"
                        replace={true}
                    >
                        Return to Home
                    </Link>
                    
                    <div className="flex justify-center items-center gap-2 text-sm text-base-content/50">
                        <span className="w-16 h-px bg-base-content/20"></span>
                        <span>or</span>
                        <span className="w-16 h-px bg-base-content/20"></span>
                    </div>
                    
                    <button 
                        onClick={() => window.location.reload()}
                        className="btn btn-outline btn-error btn-wide"
                    >
                        Try Again
                    </button>
                </div>

                <div className="mt-12 flex justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error/30"></span>
                    <span className="w-2 h-2 rounded-full bg-error/50"></span>
                    <span className="w-2 h-2 rounded-full bg-error/70"></span>
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundary; 