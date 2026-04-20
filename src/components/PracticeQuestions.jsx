import React, { useState } from 'react';
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';
import './PracticeQuestions.css';

const PracticeQuestions = ({ questions }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showExplanations, setShowExplanations] = useState({});

    if (!questions || questions.length === 0) return null;

    const handleSelectOption = (qId, optIdx) => {
        setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
        setShowExplanations(prev => ({ ...prev, [qId]: true }));
    };

    const handleToggleShortAnswer = (qId) => {
        setShowExplanations(prev => ({ ...prev, [qId]: !prev[qId] }));
    };

    return (
        <div className="practice-container">
            <header className="practice-header glass-panel">
                <BrainCircuit className="header-icon" size={40} />
                <h2>Conceptual Knowledge Check</h2>
                <p>Test your understanding of antigravity and quantum gravity.</p>
            </header>

            <div className="questions-list">
                {questions.map((q, index) => {
                    const isMCQ = q.type === 'mcq';
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const isCorrect = isAnswered && selectedAnswers[q.id] === q.answerIndex;
                    const isShowingExplanation = showExplanations[q.id];

                    return (
                        <div key={q.id} className="question-card glass-panel">
                            <h3 className="question-text">
                                <span className="q-number">Q{index + 1}.</span> {q.question}
                            </h3>

                            {isMCQ ? (
                                <div className="options-grid">
                                    {q.options.map((opt, idx) => {
                                        let optionClass = "mcq-option ";
                                        if (isAnswered) {
                                            if (idx === q.answerIndex) optionClass += "correct ";
                                            else if (idx === selectedAnswers[q.id]) optionClass += "incorrect ";
                                            else optionClass += "disabled ";
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                className={optionClass}
                                                onClick={() => !isAnswered && handleSelectOption(q.id, idx)}
                                                disabled={isAnswered}
                                            >
                                                {opt}
                                                {isAnswered && idx === q.answerIndex && <CheckCircle2 className="result-icon correct-icon" size={18} />}
                                                {isAnswered && idx === selectedAnswers[q.id] && idx !== q.answerIndex && <XCircle className="result-icon incorrect-icon" size={18} />}
                                            </button>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="short-answer-container">
                                    <textarea
                                        className="short-answer-input"
                                        placeholder="Type your explanation here..."
                                        rows={4}
                                    ></textarea>
                                    <button
                                        className="check-answer-btn"
                                        onClick={() => handleToggleShortAnswer(q.id)}
                                    >
                                        {isShowingExplanation ? "Hide Answer Key" : "Check Answer Key"}
                                    </button>
                                </div>
                            )}

                            {isShowingExplanation && (
                                <div className="explanation-box">
                                    <h4>{isMCQ ? "Explanation" : "Answer Key"}</h4>
                                    <p>{isMCQ ? q.explanation : q.answerText}</p>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default PracticeQuestions;
