import React from 'react'

export default function Message({ message, onShowThinking }) {
  const isBot = message.role === 'bot'
  
  // Show button only when response is complete and has thoughts
  const hasThoughts = isBot && 
                      message.thoughts && 
                      message.thoughts.length > 10 && 
                      message.text && 
                      message.text.length > 5

  return (
    <div className={`message ${isBot ? 'bot' : 'user'}`}>
      <div className="message-content">
        {/* Avatar */}
        <div className="avatar">
          {isBot ? '🤖' : '👤'}
        </div>

        {/* Message Bubble */}
        <div className="bubble">
          {message.text || (
            <span style={{ color: '#8e8ea0', fontStyle: 'italic' }}>
              Thinking...
            </span>
          )}
          
          {/* Thinking Button - Only show when response is complete */}
          {hasThoughts && (
            <button 
              className="thinking-badge"
              onClick={() => onShowThinking(message)}
              title="View thinking process"
            >
              🧠 Thought for {message.thinkingTime || 0}s
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
