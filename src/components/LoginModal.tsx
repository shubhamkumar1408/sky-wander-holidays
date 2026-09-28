import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  User, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Zap,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BrandLogo } from './BrandLogo';
import { saveCurrentUser, getCurrentUser, UserProfile } from '../utils/userAuth';
import { dispatchCustomerActivity } from '../utils/googleWorkspace';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onOpenMyBookings?: (phone?: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string>('8492');
  const [codeCopiedNotice, setCodeCopiedNotice] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Pre-fill existing user info if available
  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) {
      setName(existing.name || '');
      setPhone(existing.phone || '');
    }
  }, []);

  // Format 10-digit mobile number
  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 10);
    setPhone(cleaned);
    if (errorMsg) setErrorMsg('');
  };

  // Auto-fill verification code with 1 click
  const handleAutoFillCode = () => {
    setCode(generatedCode);
    setCodeCopiedNotice(true);
    if (errorMsg) setErrorMsg('');
    setTimeout(() => setCodeCopiedNotice(false), 2500);
  };

  // Handle Login submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (phone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!code || code !== generatedCode) {
      setErrorMsg(`Please enter the verification code (${generatedCode}) or click Auto-Fill.`);
      return;
    }

    // Save user profile session
    const profile = saveCurrentUser({
      name: name.trim(),
      phone: phone.trim()
    });

    // Automatically send login information to Email and Google Sheet
    dispatchCustomerActivity({
      type: 'LOGIN',
      name: name.trim(),
      phone: phone.trim(),
      code: code.trim()
    }).catch(err => console.warn('Activity dispatch warning:', err));

    setIsSuccess(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}

    setTimeout(() => {
      onLoginSuccess(profile);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        // Close if clicked on the outer backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative text-slate-900 animate-in zoom-in-95 duration-200">
        
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1698B4] via-[#FF7A00] to-[#1698B4] rounded-t-3xl" />

        {/* Top Header Row with Clear "Cut / Skip" Option */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BrandLogo variant="horizontal" size="sm" />
          </div>

          {/* Prominent Cut / Skip button for users who don't want to log in */}
          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-all cursor-pointer shadow-2xs font-semibold text-xs"
            title="Skip / Close"
          >
            <span>Skip</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Login Successful!</h3>
              <p className="text-xs text-slate-600 mt-1">
                Welcome, <strong className="text-[#1698B4]">{name}</strong>!
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Synced to Travel Desk Email & Google Sheets
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <h2 className="text-xl font-black text-slate-900">Sign In / Login</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your name, mobile number, and code to continue.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Simple Form: ONLY Name, Number & Code */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* 1. Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  1. Full Name <span className="text-[#FF7A00]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] text-sm text-slate-900 font-medium transition-all"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* 2. Mobile Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  2. Mobile Number <span className="text-[#FF7A00]">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center gap-1 text-xs font-bold text-slate-600 border-r border-slate-200 pr-2">
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={10}
                    className="w-full pl-16 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] text-sm font-bold text-slate-900 tracking-wider transition-all"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                </div>
              </div>

              {/* 3. Verification Code */}
              <div className="p-3.5 rounded-2xl bg-[#EBF7FA]/60 border border-[#1698B4]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#1698B4]" />
                    <span>3. Verification Code <span className="text-[#FF7A00]">*</span></span>
                  </label>
                  
                  {/* Auto fill 1-click button */}
                  <button
                    type="button"
                    onClick={handleAutoFillCode}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF7A00] hover:bg-[#E56E00] text-white text-[11px] font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Auto-Fill Code</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900 text-[#FF7A00] font-mono font-bold text-sm tracking-widest">
                    {generatedCode}
                  </div>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.trim().slice(0, 6))}
                    placeholder={`Enter code: ${generatedCode}`}
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1698B4] text-sm font-bold text-slate-900 tracking-widest text-center"
                    maxLength={6}
                  />
                </div>

                {codeCopiedNotice && (
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 pt-0.5 animate-in fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Code auto-filled successfully!
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0B2530] via-[#1698B4] to-[#0B2530] hover:opacity-95 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#1698B4]/20 active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Submit & Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Skip / Cut Option for users who do not want to log in */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-800 underline decoration-slate-300 transition-colors cursor-pointer"
                >
                  Don't want to login right now? Skip and explore website
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
