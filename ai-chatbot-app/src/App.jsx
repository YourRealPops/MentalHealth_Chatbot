import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm here to support you. How are you feeling today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: inputText, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // In a real app, this would be a fetch call to your backend API
      // For now, we'll simulate a response
      setTimeout(() => {
        const botResponse = generateResponse(inputText);
        setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
        setIsTyping(false);
      }, 1000);
      
      // Example of what a real API call would look like:
      /*
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.message, isBot: true }]);
      setIsTyping(false);
      */
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.", 
        isBot: true 
      }]);
      setIsTyping(false);
    }
  };
  
  // Simple response generation function (to be replaced with actual backend)
  const generateResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('sad') || lowerMsg.includes('depressed') || lowerMsg.includes('unhappy')) {
      return "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to talk about what's making you feel this way?";
    } else if (lowerMsg.includes('anxious') || lowerMsg.includes('worried') || lowerMsg.includes('stress')) {
      return "Anxiety can be really challenging. Taking slow, deep breaths might help in the moment. Would you like to try a simple breathing exercise together?";
    } else if (lowerMsg.includes('happy') || lowerMsg.includes('good') || lowerMsg.includes('great')) {
      return "I'm glad to hear you're doing well! What's been going right for you lately?";
    } else if (lowerMsg.includes('help') || lowerMsg.includes('crisis') || lowerMsg.includes('suicide')) {
      return "If you're in crisis, please reach out to a professional immediately. The National Suicide Prevention Lifeline is available 24/7 at 988 in the US. Would you like me to provide more resources?";
    } else {
      return "Thank you for sharing. How else have you been feeling lately?";
    }
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Mental Health Support Chat</h1>
        <p>A safe space to talk about how you're feeling</p>
      </header>
      
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
            >
              <div className="message-bubble">
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot-message">
              <div className="message-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
      
      <footer className="app-footer">
        <p>
          This is not a substitute for professional mental health support. 
          If you're in crisis, please call 988 (US) or your local emergency number.
        </p>
      </footer>
    </div>
  );
}

export default App;