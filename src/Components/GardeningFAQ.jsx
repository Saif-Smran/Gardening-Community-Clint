import React from 'react';

const GardeningFAQ = () => {
    return (
        <div>
            <section className="bg-base-100 py-12 px-6">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">
                    ❓ Gardening FAQ
                </h2>
                <div className="space-y-6 max-w-4xl mx-auto">
                    <div className="collapse collapse-arrow bg-base-300 border border-primary/10">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium text-primary">
                            What are the easiest vegetables to grow at home?
                        </div>
                        <div className="collapse-content text-base-content/80">
                            Tomatoes, spinach, radish, and green chilies are beginner-friendly and can thrive in containers.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-300 border border-primary/10">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium text-primary">
                            How often should I water my garden?
                        </div>
                        <div className="collapse-content text-base-content/80">
                            Water 2–3 times a week depending on the season. Early morning or late afternoon is ideal.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-300 border border-primary/10">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium text-primary">
                            What is composting and why is it important?
                        </div>
                        <div className="collapse-content text-base-content/80">
                            Composting recycles organic waste into nutrient-rich soil. It reduces landfill waste and supports healthy plant growth.
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default GardeningFAQ;