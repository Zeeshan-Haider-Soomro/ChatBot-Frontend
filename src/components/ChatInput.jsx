import React, { useState, useRef, useEffect } from 'react'

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('')
  const [includeThoughts, setIncludeThoughts] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [text])

  function handleSend() {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed, includeThoughts)
    setText('')
    setShowOptions(false)
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="input-wrapper">
      {/* Options Menu */}
      {showOptions && (
        <div className="options-menu">
          <label className="option-item">
            <input 
              type="checkbox"
              checked={includeThoughts}
              onChange={(e) => setIncludeThoughts(e.target.checked)}
            />
            <span>🧠 Show AI Thinking Process (Sidebar)</span>
          </label>
        </div>
      )}

      {/* Input Container */}
      <div className="input-container">
        {/* Plus Button */}
        <button 
          className="plus-button"
          onClick={() => setShowOptions(!showOptions)}
          disabled={disabled}
          title="Options"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Message ChatGPT..."
          rows={1}
          disabled={disabled}
          className="message-input"
        />

        {/* Send Button */}
        <button 
          className="send-button"
          onClick={handleSend} 
          disabled={disabled || !text.trim()}
          title="Send message"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Thinking Indicator */}
      {includeThoughts && (
        <div className="thinking-indicator">
          🧠 Thinking sidebar will open automatically
        </div>
      )}
    </div>
  )
}
