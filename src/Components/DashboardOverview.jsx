import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { FaSeedling, FaHeart, FaUser, FaListUl } from 'react-icons/fa';
import LoadingAnimation from './LoadingAnimation';

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalTips: 0,
    myTips: 0,
    myLikes: 0,
    userProfile: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch total tips
        const tipsRes = await fetch('https://gardening-community-server-theta.vercel.app/tips/count');
        const totalTips = (await tipsRes.json()).count || 0;
        // Fetch user profile
        const userRes = await fetch(`https://gardening-community-server-theta.vercel.app/users/${user.email}`);
        const userProfile = await userRes.json();
        // Fetch user's tips
        const myTipsRes = await fetch(`https://gardening-community-server-theta.vercel.app/tips/my-tips/${user.email}`);
        const myTipsArr = await myTipsRes.json();
        const myTips = myTipsArr.length;
        // Calculate user's total likes
        const myLikes = myTipsArr.reduce((sum, tip) => sum + (tip.likes || 0), 0);
        setStats({
          totalTips,
          myTips,
          myLikes,
          userProfile,
        });
      } catch (err) {
        setError('Failed to load dashboard stats.');
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchStats();
  }, [user]);

  if (loading) return <LoadingAnimation />;
  if (error) return <div className="text-center text-error py-10">{error}</div>;

  return (
    <div className="min-h-[calc(100vh-200px)] py-10 px-2 sm:px-4">
      <Helmet>
        <title>Dashboard Overview - GardenGlow</title>
      </Helmet>
      <div className="w-full sm:w-11/12 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">Dashboard Overview</h2>
        <p className="text-center text-base-content/70 mb-8">Welcome back, {stats.userProfile?.name || user.displayName || 'Gardener'}!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="card bg-base-300 shadow-md border border-primary/10 p-6 flex flex-col items-center">
            <FaListUl className="text-3xl text-primary mb-2" />
            <div className="text-2xl font-bold">{stats.totalTips}</div>
            <div className="text-base-content/70">Total Community Tips</div>
          </div>
          <div className="card bg-base-300 shadow-md border border-primary/10 p-6 flex flex-col items-center">
            <FaSeedling className="text-3xl text-success mb-2" />
            <div className="text-2xl font-bold">{stats.myTips}</div>
            <div className="text-base-content/70">My Tips</div>
          </div>
          <div className="card bg-base-300 shadow-md border border-primary/10 p-6 flex flex-col items-center">
            <FaHeart className="text-3xl text-error mb-2" />
            <div className="text-2xl font-bold">{stats.myLikes}</div>
            <div className="text-base-content/70">Total Likes Received</div>
          </div>
          <div className="card bg-base-300 shadow-md border border-primary/10 p-6 flex flex-col items-center">
            <FaUser className="text-3xl text-secondary mb-2" />
            <img src={stats.userProfile?.photoURL || user.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'} alt="User" className="w-12 h-12 rounded-full mb-2" />
            <div className="font-semibold">{stats.userProfile?.name || user.displayName}</div>
            <div className="text-xs text-base-content/70">{user.email}</div>
          </div>
        </div>
        <div className="bg-base-200 rounded-xl p-6 text-base-content/80">
          <h3 className="text-lg font-bold mb-2 text-primary">Profile Information</h3>
          <ul className="space-y-1">
            <li><strong>Name:</strong> {stats.userProfile?.name || user.displayName}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Joined:</strong> {stats.userProfile?.creationTime ? new Date(stats.userProfile.creationTime).toLocaleDateString() : 'N/A'}</li>
            <li><strong>Last Activity:</strong> {stats.userProfile?.lastActivity || 'N/A'}</li>
            <li><strong>Tip Count:</strong> {stats.userProfile?.tipCount ?? stats.myTips}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 