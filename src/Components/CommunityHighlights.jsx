import React from 'react';

const CommunityHighlights = () => {
    return (
        <div>
            <section className="bg-base-100 py-12 px-6">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">
                    🌟 Community Highlights
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="card bg-base-300 shadow-md p-6 border border-primary/10">
                        <h3 className="text-xl font-semibold text-primary mb-2">Urban Garden of the Month</h3>
                        <p className="text-base-content/80">
                            The rooftop garden by <strong>Tanvir Hossain</strong> in Uttara has produced over 50kg of organic veggies this season!
                        </p>
                    </div>

                    <div className="card bg-base-300 shadow-md p-6 border border-primary/10">
                        <h3 className="text-xl font-semibold text-primary mb-2">Volunteer Shoutout</h3>
                        <p className="text-base-content/80">
                            Thanks to our amazing volunteer <strong>Rina Akter</strong> for organizing 3 free composting workshops this month!
                        </p>
                    </div>

                    <div className="card bg-base-300 shadow-md p-6 border border-primary/10">
                        <h3 className="text-xl font-semibold text-primary mb-2">Most Helpful Gardener</h3>
                        <p className="text-base-content/80">
                            <strong>Ayesha Siddiqua</strong> received the most community upvotes for sharing sustainable watering tips!
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CommunityHighlights;