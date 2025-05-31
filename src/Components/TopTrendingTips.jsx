import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const TopTrendingTips = () => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likeInProgress, setLikeInProgress] = useState(null);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const res = await fetch('http://localhost:3000/tips/top');
                if (!res.ok) {
                    throw new Error('Failed to fetch tips');
                }

                const data = await res.json();

                // Ensure data is an array before setting state
                if (Array.isArray(data)) {
                    setTips(data);
                } else {
                    setTips([]);
                    toast.error('Unexpected data format from server');
                }
            } catch (error) {
                console.error('Error fetching tips:', error);
                toast.error('Failed to load tips.');
                setTips([]); // set empty array on failure
            } finally {
                setLoading(false);
            }
        };

        fetchTips();
    }, []);

    const handleLike = async (id) => {
        if (likeInProgress === id) return;

        try {
            setLikeInProgress(id);
            console.log(`Liking tip with ID: ${id}`);
            
            const res = await fetch(`http://localhost:3000/tips/${id}/like`, {
                method: 'PATCH',
            });

            if (!res.ok) {
                throw new Error('Failed to like tip');
            }

            const data = await res.json();
            if (data?.message === 'Like added') {
                setTips((prevTips) =>
                    prevTips.map((tip) =>
                        tip._id === id ? { ...tip, likes: (tip.likes ?? 0) + 1 } : tip
                    )
                );
                toast.success('Liked successfully!');
            } else {
                toast.error(data?.message || 'Something went wrong.');
            }
        } catch (err) {
            console.error('Error liking tip:', err);
            toast.error('Failed to like. Please try again.');
        } finally {
            setLikeInProgress(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <section className="px-6 py-12 bg-base-100">
            <h2 className="text-3xl font-bold text-center text-primary mb-10">
                🌿 Top Trending Tips
            </h2>

            {tips.length === 0 ? (
                <p className="text-center text-base-content">No tips found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tips.map((tip) => (
                        <div
                            key={tip._id}
                            className="card bg-base-300 shadow-md hover:shadow-xl transition duration-300 border border-primary/10"
                        >
                            <div className="card-body">
                                <h3 className="card-title text-primary">{tip.title}</h3>

                                <p className="text-sm text-base-content/70 mb-1">
                                    by <span className="font-semibold">{tip.author}</span> | {tip.category}
                                </p>

                                <p className="text-base-content">{tip.content}</p>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="badge badge-base-300 text-base-content text-sm">
                                        🗓️ {tip.date ? new Date(tip.date).toLocaleDateString() : 'N/A'}
                                    </span>

                                    <span className="text-sm text-base-content/80">
                                        👍 {tip.likes ?? 0} likes
                                    </span>

                                    <button
                                        onClick={() => handleLike(tip._id)}
                                        disabled={likeInProgress === tip._id}
                                        className={`btn btn-sm ${likeInProgress === tip._id
                                                ? 'btn-primary loading'
                                                : 'btn-outline btn-primary'
                                            }`}
                                    >
                                        {likeInProgress === tip._id ? 'Liking...' : 'Like'}
                                    </button>
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
