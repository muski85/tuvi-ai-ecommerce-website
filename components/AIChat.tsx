"use client"

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
  products?: Array<{
    name: string
    price: number
    discount?: number
    slug: string
    image?: any
  }>
}

const CHAT_STORAGE_KEY = 'tuvi-chat-history'

const quickReplies = [
  "🔥 Show products on sale",
  "💰 Products under $50",
  "✨ New arrivals",
  "🎁 Gift ideas"
]

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY)
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          return [{
            role: 'assistant',
            content: "👋 Hi! I'm your Tuvi shopping assistant. How can I help you find the perfect product today?"
          }]
        }
      }
    }
    return [{
      role: 'assistant',
      content: "👋 Hi! I'm your Tuvi shopping assistant. How can I help you find the perfect product today?"
    }]
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  const playNotification = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS56+mjUBELTKXh8bllHgU2jdTx0YBBCRVbsc3nyYxKCxBUqOPwtWMcBjiP1fPOey4GI3PA8eCRQgsRXLLp7KlUFApFnuDywm0gBSuAzvLZiTUIFmS56+mjUBEKS6Xh8bllHgU1jNTx0YBBCRRasM3nyYxKCw9UqOPwtWMcBjiP1fPOey4GJHLBn')
      audio.volume = 0.2
      audio.play().catch(() => {})
    } catch {}
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.reply,
        products: data.products
      }])
      
      playNotification()
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble right now. Please try again!" 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "👋 Hi! I'm your Tuvi shopping assistant. How can I help you find the perfect product today?"
    }])
    localStorage.removeItem(CHAT_STORAGE_KEY)
  }

  const handleQuickReply = (reply: string) => {
    const cleanReply = reply.replace(/[🔥💰✨🎁]/g, '').trim()
    setInput(cleanReply)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-darkColor text-white p-4 rounded-full shadow-lg hover:bg-darkColor/90 transition-all ${
          isOpen ? 'hidden' : 'block'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[380px] max-w-[380px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all ${
              isMinimized ? 'h-[60px]' : 'h-[85vh] sm:h-[600px]'
            }`}
          >
            {/* Header */}
            <div className="bg-darkColor text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Tuvi Assistant</h3>
                  <p className="text-xs text-white/70">Online • AI Powered</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 1 && !isMinimized && (
                  <button 
                    onClick={handleClearChat}
                    className="hover:bg-white/20 px-2 py-1 rounded-lg transition-colors text-xs"
                    title="Clear chat"
                  >
                    Clear
                  </button>
                )}
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-darkColor text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 max-w-[75%]">
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-darkColor text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        {/* Product Cards */}
                        {message.products && message.products.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.products.map((product) => (
                              <Link 
                                key={product.slug}
                                href={`/product/${product.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="block p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-900 truncate">
                                      {product.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-sm font-bold text-darkColor">
                                        ${product.price}
                                      </span>
                                      {product.discount && (
                                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                          {product.discount}% off
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-xs text-blue-600 whitespace-nowrap">View →</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-gray-700" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && !isLoading && (
                  <div className="px-4 pb-3 flex flex-wrap gap-2 bg-gray-50">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs px-3 py-2 bg-white hover:bg-gray-100 rounded-full text-gray-700 transition-colors border border-gray-200"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-darkColor text-sm"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="bg-darkColor text-white p-3 rounded-xl hover:bg-darkColor/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by Tuvi AI
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}