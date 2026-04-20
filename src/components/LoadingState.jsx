import React from 'react';

const LoadingState = () => {
    return (
        <div className="loading-state">
            <div className="spinner"></div>
            <p className="loading-title">Generating comprehensive materials...</p>
            <p className="loading-subtitle">This may take 10-15 seconds.</p>
        </div>
    );
};

export default LoadingState;
