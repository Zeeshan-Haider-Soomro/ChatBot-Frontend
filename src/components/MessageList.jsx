import React from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'

export default function MessageList({ messages, isTyping, bottomRef, onShowThinking }) {
  return (
    <main className="chat">
      {messages.map(m => (
        <Message 
          key={m.id} 
          message={m} 
          onShowThinking={onShowThinking}
        />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </main>
  )
}
