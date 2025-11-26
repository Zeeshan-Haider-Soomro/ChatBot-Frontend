import React from 'react'

export default function ThinkingDrawer({ 
  isOpen, 
  onClose, 
  selectedThought
}) {
  if (!isOpen) return null

  const { thoughts, thinkingTime, isActive } = selectedThought || {}

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />
      
      {/* Drawer */}
      <div className="thinking-drawer">
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <span className="thinking-icon">🧠</span>
            <h3>AI Thinking Process</h3>
          </div>
          <button className="drawer-close" onClick={onClose} title="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Timer */}
        {thinkingTime > 0 && (
          <div className="thinking-timer">
            {isActive ? (
              <span className="timer-active">
                ⏱️ Thinking for {thinkingTime}s...
              </span>
            ) : (
              <span className="timer-complete">
                ✓ Thought for {thinkingTime}s
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="drawer-content">
          {thoughts ? (
            <div className="thinking-content">
              <pre>{thoughts}</pre>
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">💭</span>
              <p>No thinking process available</p>
              <p className="empty-hint">Enable "Show AI Thinking" to see reasoning</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
