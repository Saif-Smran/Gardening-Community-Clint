import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import LoadingAnimation from './LoadingAnimation';

const TopTrendingTips = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likeInProgress, setLikeInProgress] = useState(null);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const res = await fetch('https://gardening-community-server-theta.vercel.app/tips/top');
                if (!res.ok) {
                    throw new Error('Failed to fetch tips');
                }

                const data = await res.json();

                // Ensure data is an array before setting state
                if (Array.isArray(data)) {
                    setTips(data);
                } else {
                    setTips([]);
                    Swal.fire({
                        title: 'Data Error',
                        text: 'Unexpected data format from server',
                        icon: 'error',
                        confirmButtonColor: '#4CAF50',
                        background: '#DCEDC8'
                    });
                }
            } catch (error) {
                console.error('Error fetching tips:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to load tips',
                    icon: 'error',
                    confirmButtonColor: '#4CAF50',
                    background: '#DCEDC8'
                });
                setTips([]); // set empty array on failure
            } finally {
                setLoading(false);
            }
        };

        fetchTips();
    }, []);

    const handleLike = async (id) => {
        if (likeInProgress === id) return;

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

        try {
            setLikeInProgress(id);
            
            const res = await fetch(`https://gardening-community-server-theta.vercel.app/tips/${id}/like`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: user.email
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to like tip');
            }

            // Update tips state
            setTips((prevTips) =>
                prevTips.map((tip) =>
                    tip._id === id ? { ...tip, likes: (tip.likes ?? 0) + 1 } : tip
                )
            );

            // Show success message
            await Swal.fire({
                title: 'Success!',
                text: 'Tip liked successfully',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#DCEDC8',
                iconColor: '#4CAF50'
            });

        } catch (err) {
            console.error('Error liking tip:', err);
            Swal.fire({
                title: 'Error',
                text: err.message || 'Failed to like. Please try again.',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        } finally {
            setLikeInProgress(null);
        }
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

    if (loading) {
        return <LoadingAnimation />;
    }

    return (
        <section className="px-2 sm:px-6 py-8 sm:py-12 bg-base-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6 sm:mb-10">
                🌿 Top Trending Tips
            </h2>

            {tips.length === 0 ? (
                <p className="text-center text-base-content">No tips found.</p>
            ) : (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {tips.map((tip) => (
                        <div
                            key={tip._id}
                            className="card bg-base-300 shadow-md hover:shadow-xl transition duration-300 border border-primary/10"
                        >
                            {tip.image && (
                                <figure className="px-3 sm:px-4 pt-3 sm:pt-4">
                                    <img 
                                        src={tip.image} 
                                        alt={tip.title}
                                        className="rounded-xl h-40 sm:h-48 w-full object-cover"
                                    />
                                </figure>
                            )}
                            <div className="card-body p-4 sm:p-6">
                                <h3 className="card-title text-lg sm:text-xl text-primary">{tip.title}</h3>

                                <p className="text-xs sm:text-sm text-base-content/70 mb-1">
                                    by <span className="font-semibold">{tip.author}</span> | {tip.category}
                                </p>

                                <p className="text-sm sm:text-base text-base-content line-clamp-2">{tip.description || tip.content}</p>

                                <div className="flex items-center justify-between mt-3 sm:mt-4 flex-wrap gap-2">
                                    <span className="badge badge-base-300 text-base-content text-xs sm:text-sm">
                                        🗓️ {tip.date ? new Date(tip.date).toLocaleDateString() : 'N/A'}
                                    </span>

                                    <span className="text-xs sm:text-sm text-base-content/80">
                                        👍 {tip.likes ?? 0} likes
                                    </span>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleLike(tip._id)}
                                            disabled={likeInProgress === tip._id}
                                            className={`btn btn-xs sm:btn-sm ${
                                                likeInProgress === tip._id
                                                    ? 'btn-primary loading'
                                                    : 'btn-outline btn-primary'
                                            }`}
                                        >
                                            {likeInProgress === tip._id ? 'Liking...' : 'Like'}
                                        </button>
                                        <button
                                            onClick={() => handleSeeDetails(tip._id)}
                                            className="btn btn-xs sm:btn-sm btn-primary gap-1"
                                        >
                                            <FaEye /> Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default TopTrendingTips;
