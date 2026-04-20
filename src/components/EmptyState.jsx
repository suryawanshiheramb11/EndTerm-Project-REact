import React from 'react';
import { Sparkles } from 'lucide-react';

const EmptyState = () => {
    return (
        <div className="empty-state glass-panel">
            <Sparkles size={48} color="var(--accent-cyan)" className="empty-icon" />
            <h2>Ready to Learn?</h2>
            <p>
                Enter a topic above, like "Photosynthesis", "The French Revolution", or "Quantum Computing", and I'll generate a comprehensive study guide, practice test, and flashcards instantly!
            </p>
        </div>
    );
};

export default EmptyState;
