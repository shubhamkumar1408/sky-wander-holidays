import { jsPDF } from 'jspdf';
import { BookingItem } from '../data/sampleBookings';

export function generateBookingVoucherPdf(booking: BookingItem) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const darkTeal = [11, 37, 48]; // #0B2530
  const teal = [22, 152, 180]; // #1698B4
  const orange = [255, 122, 0]; // #FF7A00
  const textDark = [30, 41, 59]; // slate-800
  const textMuted = [100, 116, 139]; // slate-500
  const bgLight = [248, 250, 252]; // slate-50
  const emerald = [16, 149, 119];

  // Header background
  doc.setFillColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Orange accent bar
  doc.setFillColor(orange[0], orange[1], orange[2]);
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('SKY WANDER HOLIDAYS', margin, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(56, 189, 248);
  doc.text('OFFICIAL TRIP CONFIRMATION & TRAVEL SERVICE VOUCHER', margin, 20);

  // Helpline
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('24x7 Helpline: +91 86769 28509', pageWidth - margin, 13, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 122, 0);
  doc.text('Support: Skywander6@gmail.com', pageWidth - margin, 20, { align: 'right' });

  let y = 36;

  // Status Banner
  doc.setFillColor(235, 247, 250);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.text(`BOOKING REF: ${booking.id}`, margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Generated On: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`, margin + 5, y + 10.5);

  // Status Badge Pill
  doc.setFillColor(emerald[0], emerald[1], emerald[2]);
  doc.roundedRect(pageWidth - margin - 42, y + 3.5, 38, 7, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(`CONFIRMED`, pageWidth - margin - 23, y + 8, { align: 'center' });

  y += 20;

  // 1. Traveler & Booking Overview
  const drawSectionTitle = (title: string, currentY: number) => {
    doc.setFillColor(darkTeal[0], darkTeal[1], darkTeal[2]);
    doc.rect(margin, currentY, 3, 6, 'F');
    doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(title, margin + 6, currentY + 5);
    return currentY + 8;
  };

  y = drawSectionTitle('1. PRIMARY TRAVELER & RESERVATION DETAILS', y);

  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'D');

  const col1 = margin + 4;
  const col2 = margin + contentWidth / 2 + 2;

  doc.setFontSize(8);
  // Row 1
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Lead Guest Name:', col1, y + 6);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.fullName, col1 + 32, y + 6);

  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('Registered Mobile:', col2, y + 6);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(`+91 ${booking.phone}`, col2 + 30, y + 6);

  // Row 2
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('Travelers Count:', col1, y + 13);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(`${booking.adultsCount} Adults${booking.childrenCount > 0 ? ` + ${booking.childrenCount} Child` : ''}`, col1 + 32, y + 13);

  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('Departure City:', col2, y + 13);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.departureCity || 'Delhi / NCR', col2 + 30, y + 13);

  // Row 3
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('Email Address:', col1, y + 20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.email || 'Registered in Guest Profile', col1 + 32, y + 20);

  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('Payment Status:', col2, y + 20);
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.paymentStatus || 'Advance Received (100% Protected)', col2 + 30, y + 20);

  y += 30;

  // 2. Package & Itinerary Details
  y = drawSectionTitle('2. TOUR PACKAGE & TRAVEL SCHEDULE', y);

  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'D');

  doc.setFontSize(8.5);
  doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.packageTitle, col1, y + 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Sectors Covered:', col1, y + 12);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(booking.destination, col1 + 32, y + 12);

  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Journey Start Date:', col1, y + 18);
  doc.setTextColor(orange[0], orange[1], orange[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(new Date(booking.travelDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }), col1 + 32, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Trip Duration:', col2, y + 18);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.duration || '5 Days / 4 Nights', col2 + 30, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Hotel Category:', col1, y + 23);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(booking.hotelCategory || 'Deluxe 4★', col1 + 32, y + 23);

  y += 32;

  // 3. Hotel & Transport Services
  y = drawSectionTitle('3. ALLOTTED ACCOMMODATION & CHAUFFEUR DETAILS', y);

  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, y, contentWidth, 25, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 25, 2, 2, 'D');

  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Allotted Resort/Stay:', col1, y + 6);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.hotelAssigned || 'Premium 4★ Hotel / Resort Voucher Provided at Check-In', col1 + 32, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Cab & Vehicle:', col1, y + 12);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.cabType || 'Private Dedicated AC Tourist Cab with Commercial Permit', col1 + 32, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Chauffeur / Driver:', col1, y + 18);
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(`${booking.driverName || 'Bashir Ahmed / Verified Local Chauffeur'} (${booking.driverPhone || '+91 86769 28509'})`, col1 + 32, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Vehicle Number:', col2, y + 18);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.cabVehicleNumber || 'Dispatched 6 hrs before pickup', col2 + 25, y + 18);

  y += 31;

  // 4. Inclusions & Financial Summary
  y = drawSectionTitle('4. TOUR INCLUSIONS & FINANCIAL RECEIPT', y);

  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'D');

  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Meal Plan:', col1, y + 6);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Daily Buffet Breakfast & Dinner at All Listed Hotels', col1 + 25, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Total Package Value:', col1, y + 13);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`₹${Number(booking.estimatedTotal || 25000).toLocaleString('en-IN')}`, col1 + 32, y + 13);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Advance Amount Paid:', col2, y + 13);
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`₹${Number(booking.advancePaid || 12000).toLocaleString('en-IN')}`, col2 + 34, y + 13);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Balance Mode:', col1, y + 20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Payable upon Arrival / Hotel Check-in via UPI or Bank Transfer', col1 + 25, y + 20);

  y += 32;

  // 5. Important Instructions & Emergency Contact
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'D');

  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('IMPORTANT GUEST INSTRUCTIONS & VERIFICATION:', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('1. Please carry a valid original Govt Photo ID (Aadhaar / Voter ID / Passport) for all travelers.', margin + 4, y + 9.5);
  doc.text('2. Standard hotel check-in time is 12:00 PM / 02:00 PM and check-out is 11:00 AM.', margin + 4, y + 13.5);

  y += 24;

  // Assigned Manager Strip
  doc.setFillColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`ASSIGNED TRAVEL COORDINATOR: ${booking.assignedManager || 'Mr. Shubham Dutt (Tour Desk Head)'}`, margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(56, 189, 248);
  doc.text(`Direct Call / WhatsApp: +91 86769 28509 | 24x7 On-Trip Assistance Guaranteed`, margin + 5, y + 10.5);

  // Footer bar
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(0, 285, pageWidth, 12, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(0, 285, pageWidth, 285);

  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Sky Wander Holidays • Noida Corporate Office • Registered Domestic Tour Operator', margin, 291);
  doc.text('Authorized Voucher', pageWidth - margin, 291, { align: 'right' });

  doc.save(`SkyWander_Voucher_${booking.id}.pdf`);
}
