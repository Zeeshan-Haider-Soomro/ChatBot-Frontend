import React from 'react'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import ThinkingDrawer from './components/ThinkingDrawer'
import { useChat } from './hooks/useChat'
import { useAutoScroll } from './hooks/useAutoScroll'
import { INITIAL_MESSAGE } from './config/constants'

export default function App() {
  const { 
    messages, 
    isTyping, 
    sendMessage, 
    drawerOpen,
    setDrawerOpen,
    selectedThought,
    showThinkingDrawer
  } = useChat([INITIAL_MESSAGE])
  const bottomRef = useAutoScroll([messages, isTyping])

  return (
    <div className="app">
      <ChatHeader />
      <MessageList 
        messages={messages} 
        isTyping={isTyping} 
        bottomRef={bottomRef}
        onShowThinking={showThinkingDrawer}
      />
      <ChatInput onSend={sendMessage} disabled={isTyping} />
      
      {/* Thinking Drawer */}
      <ThinkingDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedThought={selectedThought}
      />
    </div>
  )
}