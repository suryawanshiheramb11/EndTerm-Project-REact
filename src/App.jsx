import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './App.css';
import TopicSummary from './components/TopicSummary';
import PracticeQuestions from './components/PracticeQuestions';
import FlashcardDeck from './components/FlashcardDeck';
import Navbar from './components/Navbar';
import GeneratorForm from './components/GeneratorForm';
import LoadingState from './components/LoadingState';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';
import LandingPage from './components/LandingPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('summary');
  const [topicInput, setTopicInput] = useState('');
  const [currentData, setCurrentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!topicInput.trim()) return;
    setIsLoading(true);
    setError(null);

    const maxRetries = 5; // Increased from 3 to 5
    let retryCount = 0;

    const attemptGenerate = async () => {
      try {
        // Check if API key exists
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
          throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to .env.local');
        }

        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        // Use gemini-2.5-flash which is fast and efficient
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Generate comprehensive study materials for the topic: "${topicInput}".
      Return ONLY a valid JSON object with no markdown formatting. The JSON must exactly match this structure:
      {
        "summary": {
          "title": "Main Title",
          "subtitle": "A catchy subtitle",
          "sections": [
            { "title": "Section 1", "content": "Paragraph" },
            { "title": "Section 2", "content": "Paragraph" }
          ],
          "coreTheories": [
            { "title": "Theory 1", "content": "Explanation" },
            { "title": "Theory 2", "content": "Explanation" },
            { "title": "Theory 3", "content": "Explanation" }
          ],
          "keyTakeaway": "Conclusion."
        },
        "practice": [
          {
            "id": "q1",
            "type": "mcq",
            "question": "Question text?",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "answerIndex": 0,
            "explanation": "Why Option 1 is correct..."
          },
          {
            "id": "q4",
            "type": "short",
            "question": "Short answer question text?",
            "answerText": "Expected answer..."
          }
        ],
        "flashcards": [
          { "front": "Term 1", "back": "Definition 1" },
          { "front": "Term 2", "back": "Definition 2" }
        ]
      }
      
      Generate at least 2 sections, 3 core theories, 5 practice questions (mix of mcq and short, use double quotes for strings inside JSON), and 10 flashcards. DO NOT wrap the output in markdown code blocks like \`\`\`json. Just return raw JSON text.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        let jsonString = responseText.trim();
        if (jsonString.startsWith('\`\`\`json')) {
          jsonString = jsonString.slice(7, -3);
        } else if (jsonString.startsWith('\`\`\`')) {
          jsonString = jsonString.slice(3, -3);
        }

        const parsedData = JSON.parse(jsonString.trim());
        setCurrentData(parsedData);
        setActiveTab('summary');
        setIsLoading(false);
      } catch (err) {
        console.error('Error details:', err);
        
        // Check if it's a 503 error or overload error - retry with longer delays
        const isOverloadError = err.message?.includes('503') || 
                               err.message?.includes('overloaded') ||
                               err.message?.includes('RESOURCE_EXHAUSTED') ||
                               err.message?.includes('429');
        
        if (isOverloadError && retryCount < maxRetries) {
          retryCount++;
          // More aggressive backoff: 3s, 6s, 12s, 24s, 48s
          const delayMs = Math.pow(2, retryCount + 1) * 1500;
          console.log(`API Overloaded. Retrying in ${delayMs / 1000}s... (Attempt ${retryCount}/${maxRetries})`);
          setError(`⏳ API is busy. Retrying in ${Math.ceil(delayMs / 1000)}s... (Attempt ${retryCount}/${maxRetries})`);
          
          setTimeout(attemptGenerate, delayMs);
          return;
        }

        let errorMessage = "Failed to generate materials. ";
        
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
          errorMessage = "⚠️ Gemini API key missing. Add VITE_GEMINI_API_KEY to .env.local";
        } else if (err.message?.includes('API_KEY_INVALID')) {
          errorMessage = "❌ Invalid Gemini API key. Check your .env.local file.";
        } else if (err.message?.includes('429')) {
          errorMessage = "⏱️ API rate limit exceeded. The app retries automatically. Please wait...";
        } else if (err.message?.includes('503') || err.message?.includes('overloaded')) {
          errorMessage = "🔧 Gemini API is currently overloaded. Retrying automatically...";
        } else if (err.message?.includes('401') || err.message?.includes('403')) {
          errorMessage = "🔐 Authentication failed. Check your Gemini API key.";
        } else if (err.message?.includes('RESOURCE_EXHAUSTED')) {
          errorMessage = "💰 Gemini API quota exceeded. Please check your billing.";
        } else if (err.message?.includes('invalid JSON')) {
          errorMessage = "📝 Failed to parse response. Try a different topic.";
        } else {
          errorMessage += err.message || "Please check your API key and try again.";
        }
        
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    attemptGenerate();
  };

  const renderContent = () => {
    if (!currentData) return null;
    switch (activeTab) {
      case 'summary':
        return <TopicSummary data={currentData.summary} />;
      case 'practice':
        return <PracticeQuestions questions={currentData.practice} />;
      case 'flashcards':
        return <FlashcardDeck flashcards={currentData.flashcards} />;
      default:
        return <TopicSummary data={currentData.summary} />;
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return <LoadingState />;
  }

  // Show landing page with Google Sign-In if user is not authenticated
  if (!user) {
    return <LandingPage />;
  }

  // Show study app if user is authenticated

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <GeneratorForm
          topicInput={topicInput}
          setTopicInput={setTopicInput}
          handleGenerate={handleGenerate}
          isLoading={isLoading}
        />

        <ErrorMessage message={error} />

        {isLoading ? (
          <LoadingState />
        ) : currentData ? (
          renderContent()
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default App;
