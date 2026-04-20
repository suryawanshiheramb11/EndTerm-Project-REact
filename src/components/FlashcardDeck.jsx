import React, { useState } from 'react';
import { Layers, Lightbulb, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';
import './FlashcardDeck.css';

const FlashcardDeck = ({ flashcards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    if (!flashcards || flashcards.length === 0) return null;

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % flashcards.length);
        }, 150);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
        }, 150);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flashcards-container">
            <header className="flashcards-header glass-panel">
                <Layers className="header-icon" size={40} />
                <h2>Study Flashcards</h2>
                <p>Master key terminology generated via JSON structured data.</p>
            </header>

            <div className="deck-controls glass-panel">
                <span className="card-counter">
                    Card {currentIndex + 1} of {flashcards.length}
                </span>
            </div>

            <div className="flashcard-wrapper">
                <button className="nav-arrow left" onClick={handlePrev}>
                    <ChevronLeft size={32} />
                </button>

                <div className={`scene scene--card`} onClick={handleFlip}>
                    <div className={`card ${isFlipped ? 'is-flipped' : ''}`}>

                        <div className="card__face card__face--front glass-panel">
                            <Lightbulb className="card-icon glow-cyan" size={32} />
                            <h3 className="card-term">{flashcards[currentIndex].front}</h3>
                            <p className="flip-hint">
                                <RefreshCw size={16} /> Click to flip
                            </p>
                        </div>

                        <div className="card__face card__face--back glass-panel">
                            <h3 className="definition-header">Definition</h3>
                            <p className="card-definition">{flashcards[currentIndex].back}</p>
                        </div>

                    </div>
                </div>

                <button className="nav-arrow right" onClick={handleNext}>
                    <ChevronRight size={32} />
                </button>
            </div>

            <div className="deck-progress">
                <div
                    className="progress-bar"
                    style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default FlashcardDeck;
