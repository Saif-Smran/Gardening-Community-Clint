import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { FaHeart, FaComment, FaShare, FaEye } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const BrowseTips = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
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
            let url = 'http://localhost:3000/tips';
            
            // Handle sorting
            if (filter.sort === 'newest') {
                url = 'http://localhost:3000/tips?sortBy=date&order=desc';
            } else if (filter.sort === 'mostLiked') {
                url = 'http://localhost:3000/tips?sortBy=likes&order=desc';
            }

            // Add category and difficulty filters if selected
            if (filter.category !== 'all') {
                url += `&category=${filter.category}`;
            }
            if (filter.difficulty !== 'all') {
                url += `&difficulty=${filter.difficulty}`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch tips');
            
            const data = await response.json();
            setTips(data);
        } catch (error) {
            console.error('Error fetching tips:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to load gardening tips',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (tipId) => {
        if (!user) {
            Swal.fire({
                title: 'Please Login',
                text: 'You need to be logged in to like tips',
                icon: 'info',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
            return;
        }

        // Store original state for rollback
        const originalTips = [...tips];
        const tipToUpdate = tips.find(tip => tip._id === tipId);
        const isCurrentlyLiked = tipToUpdate.likedBy?.includes(user.email);

        // Optimistically update UI
        setTips(tips.map(tip => {
            if (tip._id === tipId) {
                return {
                    ...tip,
                    likes: isCurrentlyLiked ? (tip.likes - 1) : (tip.likes + 1),
                    likedBy: isCurrentlyLiked 
                        ? tip.likedBy.filter(email => email !== user.email)
                        : [...(tip.likedBy || []), user.email]
                };
            }
            return tip;
        }));

        try {
            const response = await fetch(`http://localhost:3000/tips/${tipId}/like`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: user.email
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to update like');
            }
            
            const data = await response.json();
            
            // Update with actual server data
            setTips(tips.map(tip => 
                tip._id === tipId ? { ...tip, likes: data.likes, likedBy: data.likedBy } : tip
            ));

            await Swal.fire({
                title: 'Success!',
                text: 'Tip liked successfully',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#DCEDC8',
                iconColor: '#4CAF50'
            });

        } catch (error) {
            console.error('Error liking tip:', error);
            // Revert to original state on error
            setTips(originalTips);
            
            Swal.fire({
                title: 'Error',
                text: 'Failed to update like status. Please try again.',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        }
    };

    const isLikedByUser = (tip) => {
        return tip.likedBy?.includes(user?.email);
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
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-[calc(100vh-200px)] py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-primary mb-2">Browse Garden Tips 🌿</h2>
                <p className="text-center text-base-content/70 mb-8">Discover and learn from our community's gardening wisdom</p>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    <select 
                        className="select select-bordered select-primary"
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
                        className="select select-bordered select-primary"
                        value={filter.difficulty}
                        onChange={(e) => setFilter({...filter, difficulty: e.target.value})}
                    >
                        <option value="all">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    <select 
                        className="select select-bordered select-primary"
                        value={filter.sort}
                        onChange={(e) => setFilter({...filter, sort: e.target.value})}
                    >
                        <option value="newest">Newest First</option>
                        <option value="mostLiked">Most Liked</option>
                    </select>
                </div>

                {/* Filtering Controls */}
                <div className="flex justify-center mb-8">
                    <div className="join">
                        <button 
                            className={`join-item btn ${selectedDifficulty === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedDifficulty('all')}
                        >
                            All
                        </button>
                        <button 
                            className={`join-item btn ${selectedDifficulty === 'Easy' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedDifficulty('Easy')}
                        >
                            Easy
                        </button>
                        <button 
                            className={`join-item btn ${selectedDifficulty === 'Medium' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedDifficulty('Medium')}
                        >
                            Medium
                        </button>
                        <button 
                            className={`join-item btn ${selectedDifficulty === 'Hard' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedDifficulty('Hard')}
                        >
                            Hard
                        </button>
                    </div>
                </div>

                {/* Tips Grid */}
                {filteredTips.length === 0 ? (
                    <div className="text-center py-10">
                        <h3 className="text-xl font-semibold mb-2">No tips found</h3>
                        <p className="text-base-content/70">
                            {selectedDifficulty === 'all' 
                                ? "No tips have been shared yet." 
                                : `No ${selectedDifficulty} difficulty tips available.`}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                            tip.difficulty === 'Easy' ? 'badge-success' :
                                            tip.difficulty === 'Medium' ? 'badge-warning' :
                                            'badge-error'
                                        }`}>
                                            {tip.difficulty}
                                        </span>
                                    </div>

                                    <div className="card-actions flex-col gap-4 mt-4">
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex gap-4">
                                                <button 
                                                    className={`btn btn-ghost btn-sm gap-2 ${isLikedByUser(tip) ? 'text-red-500' : 'hover:text-red-500'}`}
                                                    onClick={() => handleLike(tip._id)}
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
