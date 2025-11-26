import React, { useEffect, useRef } from 'react'
import { marked } from 'marked'

// Configure marked for better rendering
marked.setOptions({
  breaks: true, // Convert \n to <br>
  gfm: true, // GitHub Flavored Markdown
  headerIds: true,
  mangle: false,
  silent: true // Don't throw on error
})

export default function MarkdownMessage({ content }) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current && content) {
      try {
        contentRef.current.innerHTML = marked(content)
      } catch (error) {
        console.error('Markdown parsing error:', error)
        contentRef.current.textContent = content
      }
    }
  }, [content])

  return (
    <div 
      ref={contentRef} 
      className="markdown-content"
    />
  )
}
