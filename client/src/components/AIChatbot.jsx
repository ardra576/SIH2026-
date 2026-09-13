import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  RotateCcw, 
  User, 
  Loader2, 
  ChevronDown
} from 'lucide-react';
import { api } from '../services/api';

const QUICK_SUGGESTIONS = [
  { label: '📊 How to close skill gaps?', prompt: 'How can I identify and close my critical competency gaps in SkillBridge AI?' },
  { label: '📝 How does AI Quiz work?', prompt: 'How does the SkillBridge AI Quiz Generator work from uploaded materials?' },
  { label: '🐍 Best way to learn Python?', prompt: 'What is the recommended roadmap and best practices to master Python for AI?' },
  { label: '🚀 AI Engineering Career Track?', prompt: 'What skills should I prioritize for the AI Engineering career track?' },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "👋 Hi! I'm your **SkillBridge AI Learning & Career Assistant**.\n\nAsk me anything about your competency gaps, learning pathways, AI Quiz generation, or career advice!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const historyPayload = messages
      .filter(m => m.id !== 'welcome' && !m.isError)
      .map(m => ({ role: m.role, text: m.text }));

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.sendChatMessage(query, historyPayload);
      
      let replyText = '';
      if (res && res.reply) {
        replyText = res.reply;
      } else {
        replyText = "I'm having trouble connecting to the AI right now. Please try again.";
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      if (!isOpen) setHasUnread(true);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          text: "I'm having trouble connecting to the AI right now. Please try again.",
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: "Conversation cleared! How else can I assist your learning journey today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div 
        className="skillbridge-chatbot-fab"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        {!isOpen && hasUnread && (
          <div style={{
            background: 'var(--grad-primary)',
            color: '#FFFFFF',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-glow)',
            animation: 'fadeIn 0.3s ease'
          }}>
            New AI message!
          </div>
        )}

        <button
          id="skillbridge-chat-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close AI Assistant" : "Open SkillBridge AI Assistant"}
          title="SkillBridge AI Assistant"
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'var(--grad-primary)',
            border: '2px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(139, 92, 246, 0.45)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isOpen ? 'rotate(90deg) scale(0.95)' : 'scale(1)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg) scale(1.05)' : 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg) scale(0.95)' : 'scale(1)'}
        >
          {isOpen ? <X size={26} /> : <Bot size={28} />}
        </button>
      </div>

      {/* Chat Drawer / Panel */}
      {isOpen && (
        <div
          id="skillbridge-chatbot-panel"
          className="glass-card animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '24px',
            width: '400px',
            maxWidth: 'calc(100vw - 32px)',
            height: '580px',
            maxHeight: 'calc(100vh - 120px)',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65), 0 0 30px rgba(139, 92, 246, 0.25)',
            background: 'rgba(10, 15, 29, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
              }}>
                <Sparkles size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                    SkillBridge AI Assistant
                  </h4>
                  <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 6px #10B981'
                  }} title="Active" />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                  Personalized Learning & Career Guidance
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                onClick={handleReset}
                title="Reset conversation"
                style={{
                  padding: '0.45rem',
                  borderRadius: '8px',
                  color: 'var(--text-secondary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize assistant"
                style={{
                  padding: '0.45rem',
                  borderRadius: '8px',
                  color: 'var(--text-secondary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: isUser ? 'rgba(255, 255, 255, 0.1)' : 'var(--grad-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0,
                    boxShadow: isUser ? 'none' : '0 0 10px rgba(139, 92, 246, 0.3)'
                  }}>
                    {isUser ? <User size={16} /> : <Bot size={16} />}
                  </div>

                  <div style={{
                    maxWidth: '82%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: isUser 
                        ? 'var(--grad-primary)' 
                        : msg.isError 
                          ? 'rgba(239, 68, 68, 0.15)' 
                          : 'rgba(30, 41, 59, 0.85)',
                      border: isUser 
                        ? 'none' 
                        : msg.isError 
                          ? '1px solid rgba(239, 68, 68, 0.3)' 
                          : '1px solid var(--border-subtle)',
                      color: isUser ? '#FFFFFF' : 'var(--text-main)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      boxShadow: isUser ? '0 4px 15px rgba(139, 92, 246, 0.3)' : 'var(--shadow-sm)'
                    }}>
                      {msg.text}
                    </div>
                    <span style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem',
                      padding: '0 0.25rem'
                    }}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--grad-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  flexShrink: 0
                }}>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                </div>
                <div style={{
                  padding: '0.65rem 1rem',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips (only if thread has 3 or fewer messages) */}
          {messages.length <= 3 && !isLoading && (
            <div style={{
              padding: '0.5rem 0.85rem',
              background: 'rgba(15, 23, 42, 0.5)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem'
            }}>
              {QUICK_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.prompt)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '9999px',
                    background: 'rgba(139, 92, 246, 0.12)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    color: 'var(--primary-light)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div style={{
            padding: '0.85rem 1rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(10, 15, 29, 0.95)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}>
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, quizzes, careers..."
              aria-label="Chat message input"
              style={{
                flex: 1,
                padding: '0.65rem 0.85rem',
                background: 'rgba(30, 41, 59, 0.65)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                resize: 'none',
                outline: 'none',
                maxHeight: '80px',
                lineHeight: 1.4,
                fontFamily: 'inherit'
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            />

            <button
              id="skillbridge-chat-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send chat message"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: input.trim() && !isLoading ? 'var(--grad-primary)' : 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                opacity: input.trim() && !isLoading ? 1 : 0.45,
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Global CSS for chatbot animations & mobile styling */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 500px) {
          #skillbridge-chatbot-panel {
            right: 12px !important;
            bottom: 84px !important;
            width: calc(100vw - 24px) !important;
            height: calc(100vh - 100px) !important;
            max-height: 520px !important;
          }
          .skillbridge-chatbot-fab {
            right: 16px !important;
            bottom: 16px !important;
          }
        }
      `}</style>
    </>
  );
}
