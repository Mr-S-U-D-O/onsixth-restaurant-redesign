'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, Bot, X, Send, Command, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { processInput, ChatState } from '@/lib/chatbot/engine';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
};

// Extremely simple inline markdown parser
function renderMarkdown(text: string) {
  // Replace links: [text](url)
  let html = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="text-decoration:underline;color:inherit" target="_blank">$1</a>');
  // Replace bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Replace newlines with <br/>
  html = html.replace(/\n/g, '<br/>');
  return { __html: html };
}

export default function FloatingWidget() {
  const pathname = usePathname();
  
  const [chatOpen, setChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [chatState, setChatState] = useState<ChatState>({
    userName: null,
    flowState: 'IDLE',
    booking: { partySize: null, date: null, time: null }
  });

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      text: 'Welcome to On Sixth. I am your digital concierge. How may I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ["Book a table", "View menu highlights", "Operating hours"]
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, chatOpen, isExpanded]);

  // Focus input and keyboard shortcuts
  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }

    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && chatOpen) {
        setChatOpen(false);
      }
      if (e.key === '/' && !chatOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setChatOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [chatOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // 1. Remove previous suggestions from the UI so it looks clean
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1].suggestions = [];
      }
      return newMessages;
    });

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Engine processing
    const result = processInput(text.trim(), chatState, pathname);
    setChatState(result.newState);

    // Smart typing delay (longer text = longer delay, max 2s)
    const baseDelay = 600;
    const charDelay = result.text.length * 10;
    const totalDelay = Math.min(baseDelay + charDelay, 2000);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: result.suggestions
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, totalDelay);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(inputValue);
    }
  };

  const clearChat = () => {
    setChatState({ userName: null, flowState: 'IDLE', booking: { partySize: null, date: null, time: null } });
    setMessages([{ 
      id: Date.now().toString(), 
      role: 'assistant', 
      text: 'Conversation reset. How may I assist you?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ["Book a table", "View menu highlights", "Operating hours"]
    }]);
  };

  return (
    <div style={{ position: 'fixed', bottom: 'var(--space-6)', left: 'var(--space-6)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
      
      {/* Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            style={{
              width: '380px',
              height: isExpanded ? '650px' : '500px',
              maxHeight: '85vh',
              background: 'var(--bg-primary)',
              borderRadius: '12px',
              boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 0 0 1px var(--border)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: 'var(--font-body)',
              transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Header - Editorial Minimalist */}
            <div style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--obsidian)', borderRadius: '50%' }} />
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--obsidian)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>
                  Digital Concierge
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button onClick={clearChat} aria-label="Reset chat" style={{ color: 'var(--slate-mid)', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <RefreshCw size={14} />
                </button>
                <button onClick={() => setIsExpanded(!isExpanded)} aria-label="Expand chat" style={{ color: 'var(--slate-mid)', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={() => setChatOpen(false)} aria-label="Close chat" style={{ color: 'var(--slate-mid)', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, padding: 'var(--space-5)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', background: 'var(--bg-primary)' }}>
              {messages.map((msg, idx) => (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div 
                    style={{
                      maxWidth: '85%',
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: msg.role === 'user' ? '8px 8px 0 8px' : '0 8px 8px 8px',
                      background: msg.role === 'user' ? 'var(--obsidian)' : 'var(--bg-secondary)',
                      color: msg.role === 'user' ? 'var(--cream)' : 'var(--obsidian)',
                      border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                      fontSize: 'var(--text-sm)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                    dangerouslySetInnerHTML={renderMarkdown(msg.text)}
                  />
                  <span style={{ fontSize: '10px', color: 'var(--slate-mid)', marginTop: '6px', letterSpacing: '0.05em' }}>
                    {msg.timestamp}
                  </span>
                  
                  {/* Render Suggestions if they exist on the LAST message */}
                  {idx === messages.length - 1 && msg.suggestions && msg.suggestions.length > 0 && !isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}
                    >
                      {msg.suggestions.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleSend(opt)}
                          style={{
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            color: 'var(--obsidian)',
                            padding: 'var(--space-2) var(--space-4)',
                            borderRadius: '24px',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 500,
                            textAlign: 'left',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--obsidian)';
                            e.currentTarget.style.color = 'var(--cream)';
                            e.currentTarget.style.borderColor = 'var(--obsidian)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--obsidian)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: 'var(--space-4)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '0 8px 8px 8px', width: 'fit-content' }}>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} style={{ width: '6px', height: '6px', background: 'var(--obsidian)', borderRadius: '0' }} />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} style={{ width: '6px', height: '6px', background: 'var(--obsidian)', borderRadius: '0' }} />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} style={{ width: '6px', height: '6px', background: 'var(--obsidian)', borderRadius: '0' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} style={{ height: '1px' }} />
            </div>

            {/* Input Area */}
            <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
              <div style={{ 
                display: 'flex', 
                gap: 'var(--space-2)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '4px',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--obsidian)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    padding: 'var(--space-2) var(--space-3)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--obsidian)',
                    outline: 'none'
                  }}
                />
                <button 
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()} 
                  style={{ 
                    background: inputValue.trim() ? 'var(--obsidian)' : 'transparent',
                    color: inputValue.trim() ? 'var(--cream)' : 'var(--slate-mid)', 
                    border: 'none', 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '6px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    transition: 'all 0.2s ease',
                    cursor: inputValue.trim() ? 'pointer' : 'default'
                  }}
                >
                  <Send size={14} />
                </button>
              </div>
              <div style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
                <span style={{ fontSize: '9px', color: 'var(--slate-mid)', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <Command size={10} /> PREFERRED: TYPE &quot;/&quot; TO OPEN
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Structured Trigger Container */}
      <div
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: 'var(--space-2)',
          display: 'flex',
          gap: 'var(--space-2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}
      >
        <button
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Open Concierge"
          aria-expanded={chatOpen}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '6px',
            background: chatOpen ? 'var(--obsidian)' : 'var(--bg-secondary)',
            color: chatOpen ? 'var(--cream)' : 'var(--obsidian)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={e => {
            if (!chatOpen) {
              e.currentTarget.style.background = 'var(--obsidian)';
              e.currentTarget.style.color = 'var(--cream)';
              e.currentTarget.style.borderColor = 'var(--obsidian)';
            }
          }}
          onMouseLeave={e => {
            if (!chatOpen) {
              e.currentTarget.style.background = 'var(--bg-secondary)';
              e.currentTarget.style.color = 'var(--obsidian)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }
          }}
        >
          {chatOpen ? <X size={20} /> : <Bot size={20} />}
        </button>

        <a
          href="https://wa.me/27114251668?text=Hi%20On%20Sixth%2C%20I%20would%20like%20to%20make%20a%20reservation"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '6px',
            background: 'var(--bg-secondary)',
            color: 'var(--obsidian)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--obsidian)';
            e.currentTarget.style.color = 'var(--cream)';
            e.currentTarget.style.borderColor = 'var(--obsidian)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--bg-secondary)';
            e.currentTarget.style.color = 'var(--obsidian)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </div>
  );
}
