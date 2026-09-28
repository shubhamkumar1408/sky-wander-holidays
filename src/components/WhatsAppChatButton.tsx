import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';

export const WhatsAppChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const WHATSAPP_NUMBER = '918676928509';

  const handleSend = (presetMsg?: string) => {
    const textToSend = presetMsg || msg || 'Namaste Sky Wander Holidays! I am planning a domestic India tour. Please share packages and best quotes.';
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setMsg('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-sm overflow-hidden">
                    <BrandLogo variant="icon-only" size="sm" />
                  </div>
                  <span className="w-3 h-3 bg-emerald-300 border-2 border-emerald-600 rounded-full absolute bottom-0 right-0"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight">Sky Wander Travel Desk</h4>
                  <p className="text-[10px] text-emerald-100 font-medium">Online • Noida Office (8676928509)</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-50 space-y-3 text-xs">
              <div className="p-3 bg-white rounded-2xl rounded-tl-none shadow-sm border border-slate-200 max-w-[90%]">
                <p className="font-bold text-slate-800">Namaste from Sky Wander Holidays! 🙏</p>
                <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                  Planning a vacation to Kashmir, Kerala, Goa, Himachal or Ladakh? Tell us your dates & budget for an instant quotation.
                </p>
              </div>

              {/* Quick Prompt Chips */}
              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => handleSend('Hi Sky Wander! Please share Kashmir 5N/6D package with houseboat stay & pricing.')}
                  className="w-full text-left p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-semibold text-[11px] border border-emerald-200 transition-colors cursor-pointer"
                >
                  🏔️ Kashmir Tour Package Quotation
                </button>
                <button
                  onClick={() => handleSend('Hi! I need Kerala 5N/6D package with Munnar tea hills & Alleppey houseboat.')}
                  className="w-full text-left p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-semibold text-[11px] border border-emerald-200 transition-colors cursor-pointer"
                >
                  🌴 Kerala Backwaters & Hill Station Quote
                </button>
                <button
                  onClick={() => handleSend('Hi! Please share Goa 3N/4D beach resort & watersports details.')}
                  className="w-full text-left p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-semibold text-[11px] border border-emerald-200 transition-colors cursor-pointer"
                >
                  🏖️ Goa Beach Holiday Package
                </button>
              </div>

              <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3 text-[#FF7A00]" />
                <span>Sector 49, Noida • Phone: 8676928509</span>
              </div>
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 p-2 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 relative group cursor-pointer"
        title="Chat on WhatsApp (8676928509)"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white animate-ping"></span>
      </button>
    </div>
  );
};
