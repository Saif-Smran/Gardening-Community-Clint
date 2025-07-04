import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { FaHeart, FaComment, FaShare, FaEye } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from './LoadingAnimation';

const BrowseTips = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        category: 'all',
        difficulty: 'all',
        sort: 'newest'
    });
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');

    useEffect(() => {
        fetchTips();
    }, [filter]);

    const fetchTips = async () => {
        try {
            setLoading(true);
            setError(null);
            let url = 'https://gardening-community-server-theta.vercel.app/tips';
            
            // Handle sorting
            if (filter.sort === 'newest') {
                url = 'https://gardening-community-server-theta.vercel.app/tips?sortBy=date&order=desc';
            } else if (filter.sort === 'mostLiked') {
                url = 'https://gardening-community-server-theta.vercel.app/tips?sortBy=likes&order=desc';
            }

            // Add category and difficulty filters if selected
            if (filter.category !== 'all') {
                url += `&category=${filter.category}`;
            }
            if (filter.difficulty !== 'all') {
                url += `&difficulty=${filter.difficulty}`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch gardening tips');
            
            const data = await response.json();
            setTips(data);
        } catch (error) {
            console.error('Error fetching tips:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (tipId) => {
        if (!user) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please login to like tips',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        try {
            const response = await fetch(`https://gardening-community-server-theta.vercel.app/tips/${tipId}/like`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: user.email })
            });

            if (!response.ok) throw new Error('Failed to update like');
            
            const data = await response.json();
            
            // Update tips state with new likes count
            setTips(tips.map(tip => 
                tip._id === tipId 
                    ? { ...tip, likes: data.likes, likedBy: data.likedBy }
                    : tip
            ));

            // Show success message
            const message = data.message === 'Like added' ? 'Tip liked!' : 'Like removed';
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error updating like:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update like'
            });
        }
    };

    const isLikedByUser = (tip) => {
        return user && tip.likedBy?.includes(user.email);
    };

    const handleSeeDetails = (tipId) => {
        if (!user) {
            Swal.fire({
                title: 'Please Login',
                text: 'You need to be logged in to view tip details',
                icon: 'info',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Store the intended destination
                    localStorage.setItem('redirectAfterLogin', `/tip-details/${tipId}`);
                    navigate('/auth/login');
                }
            });
            return;
        }
        navigate(`/tip-details/${tipId}`);
    };

    const filteredTips = selectedDifficulty === 'all' 
        ? tips 
        : tips.filter(tip => tip.difficulty === selectedDifficulty);

    if (loading) {
        return <LoadingAnimation />;
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error mb-4">Failed to Load Tips</h2>
                    <p className="text-base-content/70 mb-4">{error}</p>
                    <button 
                        onClick={() => fetchTips()} 
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] py-10 px-2 sm:px-4">
            <Helmet>
                <title>Browse Tips - GardenGlow</title>
                <meta name="description" content="Explore gardening tips and tricks shared by our community. Find advice on plant care, composting, pest control, and more." />
                <meta name="keywords" content="gardening tips, plant care, garden advice, community tips, gardening help" />
            </Helmet>
            <div className="w-full sm:w-11/12 max-w-7xl mx-auto">
                
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">Browse Garden Tips 🌿</h2>
                <p className="text-center text-base-content/70 mb-6 sm:mb-8">Discover and learn from our community's gardening wisdom</p>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center">
                    <select 
                        className="select select-bordered select-primary select-sm sm:select-md"
                        value={filter.category}
                        onChange={(e) => setFilter({...filter, category: e.target.value})}
                    >
                        <option value="all">All Categories</option>
                        <option value="Plant Care">Plant Care</option>
                        <option value="Composting">Composting</option>
                        <option value="Vertical Gardening">Vertical Gardening</option>
                        <option value="Indoor Plants">Indoor Plants</option>
                        <option value="Soil Health">Soil Health</option>
                        <option value="Pest Control">Pest Control</option>
                        <option value="Seasonal Tips">Seasonal Tips</option>
                        <option value="Water Management">Water Management</option>
                    </select>

                    <select 
                        className="select select-bordered select-primary select-sm sm:select-md"
                        value={filter.difficulty}
                        onChange={(e) => setFilter({...filter, difficulty: e.target.value})}
                    >
                        <option value="all">All Difficulties</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    <select 
                        className="select select-bordered select-primary select-sm sm:select-md"
                        value={filter.sort}
                        onChange={(e) => setFilter({...filter, sort: e.target.value})}
                    >
                        <option value="newest">Newest First</option>
                        <option value="mostLiked">Most Liked</option>
                    </select>
                </div>

                {/* Filtering Controls */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="join">
                        <button 
                            className={`join-item btn btn-sm sm:btn-md ${selectedDifficulty === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedDifficulty('all')}
                        >
                            All
                        </button>
                        <button 
                            className={`join-item btn btn-sm sm:btn-md ${selectedDifficulty === 'Beginner' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedDifficulty('Beginner')}
                        >
                            Beginner
                        </button>
                        <button 
                            className={`join-item btn btn-sm sm:btn-md ${selectedDifficulty === 'Intermediate' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedDifficulty('Intermediate')}
                        >
                            Intermediate
                        </button>
                        <button 
                            className={`join-item btn btn-sm sm:btn-md ${selectedDifficulty === 'Advanced' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedDifficulty('Advanced')}
                        >
                            Advanced
                        </button>
                    </div>
                </div>

                {/* Tips Grid */}
                {filteredTips.length === 0 ? (
                    <div className="text-center py-10">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">No tips found</h3>
                        <p className="text-base-content/70">
                            {selectedDifficulty === 'all' 
                                ? "No tips have been shared yet." 
                                : `No ${selectedDifficulty} difficulty tips available.`}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredTips.map((tip) => (
                            <div key={tip._id} className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-primary/10">
                                <figure className="px-4 pt-4">
                                    <img 
                                        src={tip.image} 
                                        alt={tip.title}
                                        className="rounded-xl h-48 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <div className="flex items-center gap-2 mb-2">
                                        <img 
                                            src={tip.authorPhoto || 'https://i.ibb.co/5GzXkwq/user.png'} 
                                            alt={tip.author}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <h4 className="font-medium">{tip.author}</h4>
                                            <p className="text-xs text-base-content/70">
                                                {new Date(tip.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="card-title text-primary">{tip.title}</h3>
                                    <p className="text-sm line-clamp-3">{tip.description}</p>
                                    
                                    <div className="flex gap-2 mt-2">
                                        <span className="badge badge-primary">{tip.category}</span>
                                        <span className={`badge ${
                                            tip.difficulty === 'Beginner' ? 'badge-success' :
                                            tip.difficulty === 'Intermediate' ? 'badge-warning' :
                                            'badge-error'
                                        }`}>
                                            {tip.difficulty}
                                        </span>
                                    </div>

                                    <div className="card-actions flex-col gap-4 mt-4">
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex gap-4">
                                                <button 
                                                    className={`btn btn-ghost btn-sm gap-2 ${!user ? 'btn-disabled' : ''} ${isLikedByUser(tip) ? 'text-red-500' : 'hover:text-red-500'}`}
                                                    onClick={() => handleLike(tip._id)}
                                                    disabled={!user}
                                                    title={!user ? 'Login to like tips' : ''}
                                                >
                                                    <FaHeart className={isLikedByUser(tip) ? 'text-red-500' : 'text-gray-400'} />
                                                    {tip.likes || 0}
                                                </button>
                                                <button className="btn btn-ghost btn-sm gap-2">
                                                    <FaComment className="text-primary" />
                                                    {tip.comments?.length || 0}
                                                </button>
                                            </div>
                                            <button className="btn btn-ghost btn-sm">
                                                <FaShare className="text-primary" />
                                            </button>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleSeeDetails(tip._id)}
                                            className="btn btn-primary btn-sm w-full gap-2"
                                        >
                                            <FaEye /> See Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseTips;
