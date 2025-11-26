export async function sendChatMessage(text, options = {}) {
  const { 
    onChunk, 
    onThought, 
    includeThoughts = false 
  } = options
  
  const response = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      message: text,
      includeThoughts 
    })
  })

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  
  let fullAnswer = ''
  let fullThoughts = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') {
          return { answer: fullAnswer, thoughts: fullThoughts }
        }

        try {
          const parsed = JSON.parse(data)
          
          if (parsed.type === 'thought' && parsed.isThought) {
            // Thinking chunk
            fullThoughts += parsed.text
            if (onThought) {
              onThought(fullThoughts)
            }
          } else if (parsed.type === 'answer') {
            // Answer chunk
            fullAnswer += parsed.text
            if (onChunk) {
              onChunk(fullAnswer)
            }
          } else if (parsed.chunk) {
            // Fallback for old format
            fullAnswer += parsed.chunk
            if (onChunk) {
              onChunk(fullAnswer)
            }
          }
        } catch (e) {
          console.error('Parse error:', e)
        }
      }
    }
  }

  return { answer: fullAnswer, thoughts: fullThoughts }
}
