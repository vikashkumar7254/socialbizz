import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hi! I'm your Socialbizz assistant. How can I help you grow your business today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      const data = await response.json().catch(() => ({}));
      const botText =
        data.message ||
        data.error ||
        "I'm sorry, I couldn't process that. Please try again or contact us directly.";
      setMessages(prev => [...prev, { role: "model", text: botText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "model", text: "Sorry, I'm having some trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative"
        >
          {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
              1
            </span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-brand-primary p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Socialbizz Assistant</h3>
                  <p className="text-[10px] opacity-80">Online | AI Powered</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 h-[400px] overflow-y-auto p-4 space-y-4 bg-brand-section">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                    msg.role === "user" 
                      ? "bg-brand-primary text-white rounded-tr-none" 
                      : "bg-white text-brand-text-primary border border-brand-border rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-brand-border p-3 rounded-2xl rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-brand-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-brand-border">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-brand-section border border-brand-border rounded-full px-4 py-2 text-xs focus:outline-none focus:border-brand-primary/50"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-opacity"
                >
                  <Send size={14} />
                </button>
              </form>
              <div className="flex justify-center gap-4 mt-3">
                <a 
                  href="https://wa.me/918901509290" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-brand-primary font-bold hover:underline"
                >
                  Chat on WhatsApp
                </a>
                <a 
                  href="tel:+918901509290" 
                  className="text-[10px] text-brand-primary font-bold hover:underline"
                >
                  Call Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
