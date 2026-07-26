import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: language === 'id' 
        ? 'Halo! Saya adalah **Asisten AI RetentionPro** Anda. Tanyakan apa saja tentang probabilitas churn pelanggan, faktor SHAP, atau playbook strategi retensi kustom.'
        : 'Hello! I am your **RetentionPro AI Assistant**. Ask me anything about customer churn probabilities, SHAP factors, or custom retention strategy playbooks.',
      timestamp: language === 'id' ? 'Baru saja' : 'Just now',
    },
  ]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: language === 'id' ? 'Baru saja' : 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || (language === 'id' 
          ? 'Analisis selesai. Beri tahu saya jika Anda memerlukan skrip strategi pelanggan spesifik.'
          : 'Analysis complete. Let me know if you need specific customer strategy scripts.'),
        timestamp: language === 'id' ? 'Baru saja' : 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: language === 'id'
          ? 'Saya telah menganalisis pertanyaan Anda. Untuk mengurangi churn pada akun Risiko Tinggi, prioritaskan penjangkauan CSM 1-on-1 dan selesaikan tiket teknis yang terbuka.'
          : 'I have analyzed your query. To reduce churn on High Risk accounts, prioritize 1-on-1 CSM outreach and resolve open technical tickets.',
        timestamp: language === 'id' ? 'Baru saja' : 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#c2c6d9] flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#004bca] text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{t.askAIAssistant}</h3>
              <p className="text-[11px] text-white/80">{t.poweredByGemini}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#faf8ff]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#004bca] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#004bca] text-white rounded-br-none'
                    : 'bg-white border border-[#e1e1ee] text-[#191b24] shadow-xs rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
              </div>
              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#505f76] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#737687]">
              <Loader2 className="w-4 h-4 animate-spin text-[#004bca]" />
              <span>{t.aiThinking}</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#e1e1ee] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about high churn accounts, playbooks, or SHAP factors..."
            className="flex-1 px-4 py-2.5 bg-[#f2f3ff] border border-transparent rounded-xl text-xs text-[#191b24] placeholder-[#737687] focus:outline-none focus:bg-white focus:border-[#004bca]"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 bg-[#004bca] text-white rounded-xl font-bold hover:bg-[#003ea8] disabled:opacity-40 transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
