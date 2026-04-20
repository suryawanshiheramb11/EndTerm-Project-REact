import React from 'react';
import { Atom, DivideSquare, Zap, Target } from 'lucide-react';
import './TopicSummary.css';

const TopicSummary = ({ data }) => {
    if (!data) return null;

    return (
        <div className="summary-container glass-panel">
            <header className="summary-header">
                <Atom className="header-icon" size={40} />
                <h1 className="gradient-text">{data.title}</h1>
                <p className="subtitle">{data.subtitle}</p>
            </header>

            <div className="summary-content">
                {data.sections.map((section, idx) => (
                    <section key={idx} className="topic-section">
                        <h2>
                            {idx === 0 && <DivideSquare size={20} />}
                            {idx === 1 && <Zap size={20} />}
                            {idx > 1 && <Atom size={20} />} {section.title}
                        </h2>
                        <p>{section.content}</p>
                    </section>
                ))}

                <section className="topic-section">
                    <h2>Core Theories & Breakdowns</h2>
                    <div className="bullet-cards">
                        {data.coreTheories.map((theory, idx) => {
                            const colors = ['glow-blue', 'glow-violet', 'glow-cyan'];
                            const colorClass = colors[idx % colors.length];

                            return (
                                <div key={idx} className={`bullet-card ${colorClass}`}>
                                    <h3>{theory.title}</h3>
                                    <p>{theory.content}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <div className="key-takeaway glass-panel">
                    <h3><Target size={24} color="var(--accent-cyan)" /> Key Takeaway</h3>
                    <p>{data.keyTakeaway}</p>
                </div>
            </div>
        </div>
    );
};

export default TopicSummary;
