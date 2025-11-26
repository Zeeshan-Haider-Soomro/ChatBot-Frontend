import { useState, useRef } from 'react'
import { sendChatMessage } from '../services/chatService'

export function useChat(initialMessages = []) {
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedThought, setSelectedThought] = useState(null)
  const idRef = useRef(initialMessages.length + 1)

  const addUserMessage = (text) => {
    const userMsg = { id: idRef.current++, role: 'user', text }
    setMessages(prev => [...prev, userMsg])
  }

  const updateBotMessage = (id, text, thoughts = '', thinkingTime = 0, isComplete = false) => {
    setMessages(prev => {
      const filtered = prev.filter(m => m.id !== id)
      return [...filtered, { 
        id, 
        role: 'bot', 
        text,
        thoughts,
        thinkingTime,
        isComplete
      }]
    })
  }

  const addBotMessage = (text) => {
    const botMsg = { id: idRef.current++, role: 'bot', text }
    setMessages(prev => [...prev, botMsg])
  }

  const sendMessage = async (text, includeThoughts = false) => {
    if (!text.trim()) return

    addUserMessage(text)
    setIsTyping(true)

    const botMsgId = idRef.current++
    let currentThoughts = ''
    let thinkingStartTime = null

    try {
      await sendChatMessage(text, {
        includeThoughts,
        onThought: (thoughts) => {
          if (!thinkingStartTime) {
            thinkingStartTime = Date.now()
          }
          currentThoughts = thoughts
          const elapsed = Math.floor((Date.now() - thinkingStartTime) / 1000)
          
          updateBotMessage(botMsgId, '', thoughts, elapsed, false)
          
          // Auto open drawer for new thinking
          if (includeThoughts) {
            setSelectedThought({ 
              thoughts, 
              thinkingTime: elapsed,
              isActive: true 
            })
            setDrawerOpen(true)
          }
        },
        onChunk: (partialText) => {
          const finalTime = thinkingStartTime 
            ? Math.floor((Date.now() - thinkingStartTime) / 1000)
            : 0
          
          updateBotMessage(botMsgId, partialText, currentThoughts, finalTime, false)
          
          // Update drawer with final time
          if (includeThoughts && drawerOpen) {
            setSelectedThought({ 
              thoughts: currentThoughts, 
              thinkingTime: finalTime,
              isActive: false 
            })
          }
        }
      })
      
      // Mark as complete
      setMessages(prev => 
        prev.map(m => 
          m.id === botMsgId 
            ? { ...m, isComplete: true }
            : m
        )
      )
      
      setIsTyping(false)
    } catch (error) {
      console.error('Error:', error)
      updateBotMessage(botMsgId, 'Sorry, kuch galat ho gaya. Phir se try karein.', '', 0, true)
      setIsTyping(false)
    }
  }

  const showThinkingDrawer = (message) => {
    setSelectedThought({
      thoughts: message.thoughts,
      thinkingTime: message.thinkingTime,
      isActive: false
    })
    setDrawerOpen(true)
  }

  return { 
    messages, 
    isTyping, 
    sendMessage, 
    drawerOpen,
    setDrawerOpen,
    selectedThought,
    showThinkingDrawer
  }
}
