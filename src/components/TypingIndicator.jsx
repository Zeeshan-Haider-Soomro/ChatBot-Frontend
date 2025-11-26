import React from 'react'

export default function TypingIndicator() {
  return (
    <div className="message bot">
      <div className="message-content">
        <div className="avatar">
          🤖
        </div>
        <div className="bubble">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
