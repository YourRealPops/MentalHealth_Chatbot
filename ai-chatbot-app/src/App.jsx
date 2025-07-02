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
    const currentInputText = inputText; // Store the input text before clearing
    setInputText('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInputText }),
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { text: data.message, isBot: true }
      ]);

      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
          isBot: true
        }
      ]);
      setIsTyping(false);
    }
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Your Friendly Chatbot</h1>
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