import React from 'react';

const GeneratorForm = ({ topicInput, setTopicInput, handleGenerate, isLoading }) => {
  return (
    <div className="generator-controls glass-panel">
      <input
        type="text"
        className="generator-input"
        value={topicInput}
        onChange={(e) => setTopicInput(e.target.value)}
        placeholder="Enter any topic to generate study materials..."
        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
      />
      <button
        className="generator-btn"
        onClick={handleGenerate}
        disabled={isLoading || !topicInput.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Magic'}
      </button>
    </div>
  );
};

export default GeneratorForm;
