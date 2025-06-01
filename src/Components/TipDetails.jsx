import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaComment, FaShare, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const TipDetails = () => {
    const { tipId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchTipDetails();
    }, [tipId]);

    const fetchTipDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tips/${tipId}`);
            if (!response.ok) throw new Error('Failed to fetch tip details');
            
            const data = await response.json();
            setTip(data);
        } catch (error) {
            console.error('Error fetching tip details:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to load tip details',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
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
        const originalTip = { ...tip };
        const isCurrentlyLiked = tip?.likedBy?.includes(user.email);

        // Optimistically update UI
        setTip(prev => ({
            ...prev,
            likes: isCurrentlyLiked ? (prev?.likes - 1) : ((prev?.likes || 0) + 1),
            likedBy: isCurrentlyLiked
                ? prev.likedBy.filter(email => email !== user.email)
                : [...(prev?.likedBy || []), user.email]
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
            setTip(prev => ({ ...prev, likes: data.likes, likedBy: data.likedBy }));

        } catch (error) {
            console.error('Error liking tip:', error);
            // Revert to original state on error
            setTip(originalTip);
            
            Swal.fire({
                title: 'Error',
                text: 'Failed to update like status. Please try again.',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        
        if (!user) {
            Swal.fire({
                title: 'Please Login',
                text: 'You need to be logged in to comment',
                icon: 'info',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
            return;
        }

        if (!comment.trim()) {
            Swal.fire({
                title: 'Empty Comment',
                text: 'Please write something to comment',
                icon: 'warning',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(`http://localhost:3000/tips/${tipId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: user.email,
                    userName: user.displayName,
                    userPhoto: user.photoURL,
                    comment: comment.trim(),
                    date: new Date().toISOString()
                })
            });

            if (!response.ok) throw new Error('Failed to add comment');
            
            const data = await response.json();
            setTip(prev => ({ ...prev, comments: data.comments }));
            setComment('');

            Swal.fire({
                title: 'Success!',
                text: 'Comment added successfully',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
                background: '#DCEDC8'
            });
        } catch (error) {
            console.error('Error adding comment:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to add comment',
                icon: 'error',
                confirmButtonColor: '#4CAF50',
                background: '#DCEDC8'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const isLikedByUser = () => {
        return tip?.likedBy?.includes(user?.email);
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!tip) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Tip Not Found</h2>
                    <p className="text-base-content/70">The tip you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/browse-tips')}
                        className="btn btn-primary mt-4"
                    >
                        Browse Other Tips
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={() => navigate('/browse-tips')}
                    className="btn btn-ghost mb-6 gap-2"
                >
                    <FaArrowLeft /> Back to Tips
                </button>

                <div className="bg-base-300 rounded-xl shadow-xl border border-primary/10 overflow-hidden">
                    <img 
                        src={tip?.image} 
                        alt={tip?.title}
                        className="w-full h-[300px] object-cover"
                    />
                    
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <img 
                                src={tip?.authorPhoto || 'https://i.ibb.co/5GzXkwq/user.png'} 
                                alt={tip?.author}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h4 className="font-medium text-lg">{tip?.author}</h4>
                                <p className="text-sm text-base-content/70">
                                    {new Date(tip?.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-primary mb-4">{tip?.title}</h1>
                        
                        <div className="flex gap-3 mb-6">
                            <span className="badge badge-lg badge-primary">{tip?.category}</span>
                            <span className="badge badge-lg badge-secondary">{tip?.difficulty}</span>
                        </div>

                        <p className="text-lg mb-8 whitespace-pre-wrap">{tip?.description}</p>

                        <div className="flex justify-between items-center border-t border-base-content/10 pt-6">
                            <div className="flex gap-6">
                                <button 
                                    className={`btn btn-ghost gap-2 ${isLikedByUser() ? 'text-red-500' : 'hover:text-red-500'}`}
                                    onClick={handleLike}
                                >
                                    <FaHeart className={isLikedByUser() ? 'text-red-500' : 'text-gray-400'} />
                                    {tip?.likes || 0} Likes
                                </button>
                                <button className="btn btn-ghost gap-2">
                                    <FaComment className="text-primary" />
                                    {tip?.comments?.length || 0} Comments
                                </button>
                            </div>
                            <button className="btn btn-ghost">
                                <FaShare className="text-primary" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-6">Comments</h2>
                    
                    <form onSubmit={handleComment} className="mb-8">
                        <div className="form-control">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="textarea textarea-bordered focus:textarea-primary h-24"
                                placeholder="Share your thoughts..."
                                disabled={submitting}
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className={`btn btn-primary mt-4 ${submitting ? 'loading' : ''}`}
                            disabled={submitting}
                        >
                            {submitting ? 'Adding Comment...' : 'Add Comment'}
                        </button>
                    </form>

                    <div className="space-y-6">
                        {tip?.comments?.map((comment, index) => (
                            <div key={index} className="bg-base-200 p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <img 
                                        src={comment?.userPhoto || 'https://i.ibb.co/5GzXkwq/user.png'} 
                                        alt={comment?.userName}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-medium">{comment?.userName}</h4>
                                        <p className="text-xs text-base-content/70">
                                            {new Date(comment?.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-base-content/90">{comment?.comment}</p>
                            </div>
                        ))}

                        {tip?.comments?.length === 0 && (
                            <div className="text-center py-8 text-base-content/70">
                                No comments yet. Be the first to comment!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipDetails; 