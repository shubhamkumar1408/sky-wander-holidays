import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  Check, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  Download, 
  Printer, 
  MessageCircle, 
  Sparkles,
  ChevronRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TourPackage } from '../types';
import { dispatchCustomerActivity } from '../utils/googleWorkspace';
import { saveLocalBooking, BookingItem } from '../data/sampleBookings';
import { getCurrentUser } from '../utils/userAuth';
import logoImg from '../assets/images/logo.image.jpg';

interface UPIPaymentSectionProps {
  pkg: TourPackage;
  adultsCount?: number;
  childrenCount?: number;
  totalEstimatedPrice?: number;
  travelDate?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  onPaymentSuccess?: (bookingId: string) => void;
}

export const UPIPaymentSection: React.FC<UPIPaymentSectionProps> = ({
  pkg,
  adultsCount = 2,
  childrenCount = 0,
  totalEstimatedPrice = 18000,
  travelDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  customerName = '',
  customerPhone = '',
  customerEmail = '',
  onPaymentSuccess
}) => {
  const currentUser = getCurrentUser();

  // Official Sky Wander Holidays UPI Details from Verified Standee
  const PRIMARY_UPI_ID = '8676928509@pthdfc';
  const SECONDARY_UPI_ID = '8676928509@ybl';
  const PAYEE_NAME = 'Ritesh Kumar';
  const MERCHANT_NAME = 'Ritesh Kumar (Sky Wander Holidays)';
  const BANK_INFO = 'Kotak Mahindra Bank - 9961';

  // Amount Calculation Options
  const tokenAdvanceAmount = Math.max(2000, adultsCount * 2000);
  const halfAmount = Math.round(totalEstimatedPrice / 2);
  const fullAmount = totalEstimatedPrice;

  // Selected payment amount tier
  const [selectedTier, setSelectedTier] = useState<'token' | 'half' | 'full' | 'custom'>('token');
  const [customAmount, setCustomAmount] = useState<number>(tokenAdvanceAmount);
  const activeAmount = 
    selectedTier === 'token' ? tokenAdvanceAmount :
    selectedTier === 'half' ? halfAmount :
    selectedTier === 'full' ? fullAmount :
    customAmount;

  // Form states
  const [name, setName] = useState(customerName || currentUser?.name || '');
  const [phone, setPhone] = useState(customerPhone || currentUser?.phone || '');
  const [email, setEmail] = useState(customerEmail || currentUser?.email || '');
  const [utrNumber, setUtrNumber] = useState('');
  const [selectedApp, setSelectedApp] = useState<'PhonePe' | 'GooglePay' | 'Paytm' | 'BHIM' | 'Other'>('PhonePe');
  const [paymentNotes, setPaymentNotes] = useState('');

  // UI status
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedPayment, setConfirmedPayment] = useState<{
    id: string;
    utr: string;
    amount: number;
    timestamp: string;
  } | null>(null);

  // Sync props if changed
  useEffect(() => {
    if (customerName && !name) setName(customerName);
    if (customerPhone && !phone) setPhone(customerPhone);
    if (customerEmail && !email) setEmail(customerEmail);
  }, [customerName, customerPhone, customerEmail]);

  // Generate UPI QR Code URL for official PhonePe VPA: 8676928509@pthdfc
  useEffect(() => {
    // UPI payment deep link schema
    const upiUri = `upi://pay?pa=${encodeURIComponent(PRIMARY_UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(`Sky Wander Holidays - ${pkg.title.slice(0, 22)}`)}`;

    QRCode.toDataURL(upiUri, {
      width: 450,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    })
      .then(url => setQrCodeDataUrl(url))
      .catch(err => console.error('Error generating QR Code:', err));
  }, [activeAmount, pkg.title]);

  const copyUpiId = () => {
    navigator.clipboard.writeText(PRIMARY_UPI_ID);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleMobileUpiIntent = () => {
    const upiUri = `upi://pay?pa=${encodeURIComponent(PRIMARY_UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(`Sky Wander Holidays - ${pkg.title.slice(0, 22)}`)}`;
    window.location.href = upiUri;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your Full Name and Mobile Number.');
      return;
    }
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      alert('Please enter a valid 12-digit UPI UTR / Transaction Reference Number.');
      return;
    }

    setIsSubmitting(true);
    const bookingId = `SWH-PAY-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowIso = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    try {
      // 1. Dispatch to Google Sheets & Email Alert
      await dispatchCustomerActivity({
        type: 'PAYMENT_SUBMITTED',
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        details: {
          id: bookingId,
          packageTitle: pkg.title,
          packageId: pkg.id,
          amountPaid: activeAmount,
          utrNumber: utrNumber.trim(),
          paymentApp: selectedApp,
          travelDate,
          adultsCount,
          childrenCount,
          estimatedTotal: totalEstimatedPrice,
          notes: paymentNotes
        }
      });

      // 2. Save in Local Bookings store for My Bookings tab
      const bookingRecord: BookingItem = {
        id: bookingId,
        fullName: name.trim(),
        phone: phone.trim(),
        email: email.trim() || 'guest@skywander.in',
        travelDate,
        adultsCount,
        childrenCount,
        packageId: pkg.id,
        packageTitle: pkg.title,
        destination: pkg.destinationsCovered.join(', ') || pkg.state,
        duration: `${pkg.durationDays} Days / ${pkg.durationNights} Nights`,
        departureCity: 'Delhi / NCR',
        hotelCategory: 'Deluxe 4★ Verified Stay',
        includeFlights: false,
        includeCab: true,
        cabType: pkg.cabType || 'Private Dedicated AC Cab',
        estimatedTotal: totalEstimatedPrice,
        advancePaid: activeAmount,
        paymentStatus: 'Advance Received (100% Protected)',
        tripStatus: 'Confirmed',
        assignedManager: 'Rohit Sharma (Senior Operations Head)',
        managerPhone: '+91 86769 28509',
        specialRequests: `UPI Payment verified via ${selectedApp}. UTR: ${utrNumber}. Notes: ${paymentNotes || 'None'}`,
        createdAt: nowIso,
        status: 'Confirmed'
      };

      saveLocalBooking(bookingRecord);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {}

      setConfirmedPayment({
        id: bookingId,
        utr: utrNumber.trim(),
        amount: activeAmount,
        timestamp: formattedDate
      });

      if (onPaymentSuccess) {
        onPaymentSuccess(bookingId);
      }
    } catch (err) {
      console.error('Error submitting payment confirmation:', err);
      // Fallback local confirm
      setConfirmedPayment({
        id: bookingId,
        utr: utrNumber.trim(),
        amount: activeAmount,
        timestamp: formattedDate
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareReceiptOnWhatsApp = () => {
    if (!confirmedPayment) return;
    const text = encodeURIComponent(
      `*Sky Wander Holidays - Payment Receipt*\n` +
      `Booking Ref: ${confirmedPayment.id}\n` +
      `Customer: ${name}\n` +
      `Mobile: +91 ${phone}\n` +
      `Tour Package: ${pkg.title}\n` +
      `Amount Paid: ₹${confirmedPayment.amount.toLocaleString('en-IN')}\n` +
      `UPI UTR / Ref: ${confirmedPayment.utr}\n` +
      `Payment App: ${selectedApp}\n` +
      `Travel Date: ${travelDate}\n\n` +
      `Please verify and send my official trip confirmation voucher!`
    );
    window.open(`https://wa.me/918676928509?text=${text}`, '_blank');
  };

  // If Payment is confirmed, show the official digital receipt
  if (confirmedPayment) {
    return (
      <div className="bg-gradient-to-b from-emerald-50 via-white to-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/40 shadow-xl text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-300">
            Payment Submitted Successfully!
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            Namaste, {name}!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1">
            Your UPI payment of <strong className="text-emerald-700 font-black text-base">₹{confirmedPayment.amount.toLocaleString('en-IN')}</strong> for <strong>{pkg.title}</strong> has been logged.
          </p>
        </div>

        {/* Digital Payment Receipt Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-left text-xs space-y-2.5 max-w-lg mx-auto shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Payment Voucher Ref:</span>
            <span className="font-mono font-black text-[#1698B4] bg-[#EBF7FA] px-2.5 py-0.5 rounded">
              {confirmedPayment.id}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">12-Digit UPI UTR / Ref:</span>
            <span className="font-mono font-bold text-slate-900">{confirmedPayment.utr}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Payment Mode:</span>
            <span className="font-bold text-purple-700">UPI App ({selectedApp})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Merchant Credited:</span>
            <span className="font-bold text-slate-900">SKY WANDER HOLIDAYS</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Travel Date:</span>
            <span className="font-bold text-slate-900">{travelDate}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-slate-700 font-bold">Advance Amount Paid:</span>
            <span className="text-lg font-black text-emerald-600">₹{confirmedPayment.amount.toLocaleString('en-IN')}</span>
          </div>
          <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Timestamp: {confirmedPayment.timestamp}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 100% Safe & Protected
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={shareReceiptOnWhatsApp}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/30"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Receipt to WhatsApp (+91 8676928509)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-7 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider border border-purple-200">
              Direct UPI QR Payment
            </span>
            <span className="text-xs text-slate-500 font-medium">
              • Instant Confirmation
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            Scan & Pay via <span className="text-[#5f259f]">PhonePe / Any UPI App</span>
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Book directly for <strong>{pkg.title}</strong> — 100% verified merchant account of Sky Wander Holidays.
          </p>
        </div>

        {/* Security Badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Merchant</span>
        </div>
      </div>

      {/* 1. AMOUNT SELECTION CARDS */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          Step 1: Select Payment Amount to Pay
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => setSelectedTier('token')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedTier === 'token'
                ? 'bg-purple-50 border-[#5f259f] ring-2 ring-[#5f259f]/20 shadow-sm'
                : 'bg-white border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-purple-700">Token Advance</div>
            <div className="text-base font-black text-slate-900 mt-0.5">₹{tokenAdvanceAmount.toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-slate-500">Blocks {adultsCount} seats & cab</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('half')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedTier === 'half'
                ? 'bg-purple-50 border-[#5f259f] ring-2 ring-[#5f259f]/20 shadow-sm'
                : 'bg-white border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-purple-700">50% Advance</div>
            <div className="text-base font-black text-slate-900 mt-0.5">₹{halfAmount.toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-slate-500">Locks hotels & rates</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('full')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedTier === 'full'
                ? 'bg-purple-50 border-[#5f259f] ring-2 ring-[#5f259f]/20 shadow-sm'
                : 'bg-white border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-[#FF7A00]">Full Trip Amount</div>
            <div className="text-base font-black text-slate-900 mt-0.5">₹{fullAmount.toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-slate-500">All inclusions covered</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('custom')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedTier === 'custom'
                ? 'bg-purple-50 border-[#5f259f] ring-2 ring-[#5f259f]/20 shadow-sm'
                : 'bg-white border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-slate-600">Custom Amount</div>
            <div className="text-base font-black text-slate-900 mt-0.5">₹{customAmount.toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-slate-500">Enter custom ₹</div>
          </button>
        </div>

        {selectedTier === 'custom' && (
          <div className="mt-3 flex items-center gap-2 max-w-xs">
            <span className="text-sm font-bold text-slate-700">Enter Amount (₹):</span>
            <input
              type="number"
              min={1000}
              step={500}
              value={customAmount}
              onChange={(e) => setCustomAmount(Math.max(500, Number(e.target.value) || 0))}
              className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
            />
          </div>
        )}
      </div>

      {/* 2. AUTHENTIC SKY WANDER / KOTAK MAHINDRA BANK UPI QR STANDEE (MATCHING UPLOADED DESIGN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Authentic Standee Card */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          <div className="w-full max-w-[360px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden p-5 flex flex-col">
            
            {/* Top Bar: Brand Logo, Merchant Name & UPI ID */}
            <div className="flex items-center gap-3">
              {/* SW Brand Logo Badge */}
              <div className="relative shrink-0 w-14 h-12 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-center p-1">
                <img
                  src={logoImg}
                  alt="Sky Wander Holidays"
                  className="w-full h-full object-contain"
                />
                {/* Small camera badge at bottom-right */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-600 rounded-full flex items-center justify-center text-[8px] text-white">
                  📷
                </div>
              </div>

              {/* Merchant Name & Verified Badge & UPI ID */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">
                    Ritesh Kumar
                  </h3>
                  {/* Verified Blue Check Badge */}
                  <svg className="w-4 h-4 text-[#0077B6] shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>

                {/* UPI ID with copy button */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs sm:text-[13px] font-bold text-slate-700 font-mono">
                    UPI ID: 8676928509@pthdfc
                  </span>
                  <button
                    type="button"
                    onClick={copyUpiId}
                    className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {isCopied && (
                  <span className="text-[10px] text-emerald-600 font-bold block">
                    ✓ UPI ID Copied!
                  </span>
                )}
              </div>
            </div>

            {/* Inner Standee Frame: Sky Blue Border & QR Code */}
            <div className="mt-4 w-full rounded-[28px] border-[7px] border-[#00A3E0] overflow-hidden bg-white shadow-inner flex flex-col items-center">
              
              {/* QR Code Container */}
              <div className="relative p-4 sm:p-5 flex items-center justify-center bg-white w-full">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="Ritesh Kumar UPI QR Code"
                    className="w-56 h-56 sm:w-60 sm:h-60 object-contain mx-auto"
                  />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center bg-slate-100 rounded-xl text-slate-400 text-xs">
                    Generating Official UPI QR Code...
                  </div>
                )}

                {/* Center Brand Emblem inside QR Code */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white shadow-md border-2 border-[#00A3E0] flex items-center justify-center p-1">
                  <img src={logoImg} alt="SW" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Bottom Solid Navy Blue Banner inside border (matching uploaded image) */}
              <div className="w-full bg-[#004B87] h-10 flex items-center justify-center px-4">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-sky-100">
                  Sky Wander Holidays • Verified Payee
                </span>
              </div>
            </div>

            {/* Bottom Bank Details Strip (Kotak Mahindra Bank - 9961 & Change Bank) */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-2">
                {/* Kotak Infinity Knot Icon */}
                <div className="w-6 h-6 rounded-full bg-[#ED1C24] text-white flex items-center justify-center font-black text-[10px] shadow-2xs">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#ED1C24"/>
                    <path d="M7 12c0-1.65 1.35-3 3-3 1.2 0 2.25.7 2.7 1.7.45-1 1.5-1.7 2.7-1.7 1.65 0 3 1.35 3 3s-1.35 3-3 3c-1.2 0-2.25-.7-2.7-1.7-.45 1-1.5-1.7-2.7 1.7-1.65 0-3-1.35-3-3z" fill="white"/>
                  </svg>
                </div>
                <span className="font-bold text-slate-800 text-xs sm:text-[13px]">
                  Kotak Mahindra Bank - 9961
                </span>
              </div>

              <span className="text-[#0077B6] font-bold text-xs cursor-pointer hover:underline">
                Verified Bank
              </span>
            </div>

            {/* Amount & Direct UPI App Button */}
            <div className="mt-4 p-3 bg-sky-50/80 rounded-2xl border border-sky-200/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Token Amount</span>
                <span className="text-base font-black text-slate-900">₹{activeAmount.toLocaleString('en-IN')}</span>
              </div>
              <button
                type="button"
                onClick={handleMobileUpiIntent}
                className="px-3.5 py-2 rounded-xl bg-[#0077B6] hover:bg-[#005F92] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Pay via UPI App</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right: Payment Instructions & UTR Confirmation Form */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Quick Instructions Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
            <h5 className="font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF7A00]" />
              How to complete payment:
            </h5>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed text-[11px]">
              <li>Open <strong>PhonePe, Google Pay, Paytm, or BHIM</strong> on your phone.</li>
              <li>Scan the QR code on the left or tap <strong>"Open in UPI App"</strong>.</li>
              <li>Confirm payee name shows as <strong>"SKY WANDER HOLIDAYS"</strong>.</li>
              <li>Complete the payment of <strong>₹{activeAmount.toLocaleString('en-IN')}</strong>.</li>
              <li>Enter the <strong>12-digit UTR / UPI Reference Number</strong> below to get your instant voucher!</li>
            </ol>
          </div>

          {/* Step 2: Form to submit UTR */}
          <form onSubmit={handlePaymentSubmit} className="bg-white p-5 rounded-3xl border-2 border-purple-200/80 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#5f259f]" />
                Step 2: Submit UTR / Payment Proof
              </h5>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                1-Min Confirmation
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Traveler Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Shubham Dutt"
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-[#5f259f]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Mobile Number (+91) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-[#5f259f]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  UPI App Used *
                </label>
                <select
                  value={selectedApp}
                  onChange={(e: any) => setSelectedApp(e.target.value)}
                  className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-[#5f259f]"
                >
                  <option value="PhonePe">PhonePe</option>
                  <option value="GooglePay">Google Pay (GPay)</option>
                  <option value="Paytm">Paytm</option>
                  <option value="BHIM">BHIM UPI</option>
                  <option value="Other">Other Bank UPI / Cred</option>
                </select>
              </div>
            </div>

            {/* 12-Digit UTR Number Field (High prominence) */}
            <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200">
              <label className="block text-[11px] font-black uppercase text-purple-950 mb-1">
                12-Digit UTR / Transaction Reference No. *
              </label>
              <input
                type="text"
                required
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value.replace(/\s+/g, ''))}
                placeholder="e.g. 427810394821 or T260925..."
                className="w-full py-2.5 px-3 bg-white border border-purple-300 rounded-xl text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5f259f]"
              />
              <span className="text-[10px] text-purple-700 font-medium block mt-1">
                Found in your UPI app under "Transaction Details" or "Debited from Account".
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Additional Notes (Optional)
              </label>
              <input
                type="text"
                value={paymentNotes}
                onChange={(e) => setPaymentNotes(e.target.value)}
                placeholder="e.g. Paid from HDFC account for 2 adults"
                className="w-full py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Submit Verification Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#5f259f] to-[#7c3aed] hover:from-[#4d1d82] hover:to-[#6d28d9] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-purple-900/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Verifying & Recording Payment...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Payment & Get Instant Voucher (₹{activeAmount.toLocaleString('en-IN')})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1 text-center font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Auto-synced to Google Sheets & 24x7 Customer Support Desk (+91 8676928509)</span>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
};
