import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ChatMessage } from '../../types';

const STORAGE_KEY = 'mlf_chat_v2_restricted';
const LOGO_URL = 'https://raw.githubusercontent.com/adrien-tello/Magnum-Lima-Fish/main/project/src/logo/MOCK1.png';

function nowId() {
  return Date.now().toString();
}

function timeOfDayGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

// Strict allowed questions (exact match, case-insensitive)
const allowedQA = [
  {
    q: 'What products do you offer?',
    a: 'We offer Fish Feed, Dog Food, Groundnut Meal, and Soybean Meal. Visit the Products page to browse all.'
  },
  {
    q: 'How can I pay (Orange / MTN)?',
    a: 'You can pay with Orange Money and MTN Mobile Money during checkout on the Payment page.'
  },
  {
    q: 'Where do you ship?',
    a: 'We ship locally and can coordinate regional deliveries. Contact us for details about your location.'
  },
  {
    q: 'How do I contact support?',
    a: 'Use the Contact page to reach our team. We will get back to you promptly.'
  },
  {
    q: 'Show me your products',
    a: 'Head to the Products page to see all items and filter by category.'
  }
] as const;

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function seedMessage(pathname: string): ChatMessage[] {
  const greeting = `${timeOfDayGreeting()}! I'm Magnum Assistant.`;
  const intro =
    pathname.startsWith('/products')
      ? 'You are on the Products page.'
      : pathname.startsWith('/solutions')
      ? 'You are on the Solutions page.'
      : pathname.startsWith('/contact')
      ? 'You are on the Contact page.'
      : 'Welcome to Magnum‑Lima Fish.';

  const list = allowedQA.map((x, i) => `${i + 1}. ${x.q}`).join('\n');
  const text = `${greeting} ${intro}\n\nYou can ask me exactly one of these questions:\n${list}`;

  return [
    { id: nowId(), text, isBot: true, timestamp: new Date() },
  ];
}

const ChatBot: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
      }
    } catch {}
    return seedMessage(window.location.pathname);
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (isOpen) setUnread(0);
  }, [isOpen]);

  const quickReplies = useMemo(() => allowedQA.map(({ q }) => ({ label: q, text: q })), []);

  const pushMessage = (text: string, isBot = false) => {
    const msg: ChatMessage = { id: nowId(), text, isBot, timestamp: new Date() };
    setMessages((prev) => [...prev, msg]);
    if (!isOpen && isBot) setUnread((c) => Math.min(99, c + 1));
  };

  const answerFor = (input: string): string | null => {
    const qn = normalize(input);
    for (const item of allowedQA) {
      if (normalize(item.q) === qn) return item.a;
    }
    return null;
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;

    setInputValue('');
    pushMessage(text, false);
    setIsTyping(true);

    setTimeout(() => {
      const ans = answerFor(text);
      if (ans) {
        pushMessage(ans, true);
      } else {
        const list = allowedQA.map((x) => `• ${x.q}`).join('\n');
        pushMessage(
          `Sorry, I can only answer predefined questions right now.\nPlease choose from:\n${list}`,
          true,
        );
      }
      setIsTyping(false);
    }, 600 + Math.random() * 700);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button with unread badge */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow z-50"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {unread > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white rounded-full text-xs font-bold flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Magnum Assistant chat"
            initial={{ opacity: 0, y: 100, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.92 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={LOGO_URL} alt="Magnum-Lima Fish logo" className="w-5 h-5 rounded" />
                  <span className="font-medium">Magnum Assistant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" aria-hidden />
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" role="log" aria-live="polite" aria-relevant="additions">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex items-start space-x-2 max-w-[70%] ${m.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.isBot ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`} aria-hidden>
                      {m.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${m.isBot ? 'bg-gray-100 text-gray-800' : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{m.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                    </div>
                    <div className="bg-gray-100 px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies: allowed questions */}
            <div className="px-4 pt-2 flex flex-wrap gap-2">
              {quickReplies.map((qr) => (
                <button
                  key={qr.label}
                  onClick={() => {
                    setInputValue(qr.text);
                    setTimeout(handleSend, 10);
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type one of the suggested questions..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  aria-label="Message"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
