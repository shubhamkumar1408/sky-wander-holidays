import { jsPDF } from 'jspdf';
import { DestinationBrochure } from '../data/destinationBrochures';

export function generateBrochurePdf(brochure: DestinationBrochure, leadName?: string) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const teal = [22, 152, 180]; // #1698B4
  const darkTeal = [11, 37, 48]; // #0B2530
  const orange = [255, 122, 0]; // #FF7A00
  const textDark = [30, 41, 59]; // slate-800
  const textMuted = [100, 116, 139]; // slate-500
  const bgLight = [248, 250, 252]; // slate-50

  const drawHeader = (pageTitle: string) => {
    // Top banner
    doc.setFillColor(darkTeal[0], darkTeal[1], darkTeal[2]);
    doc.rect(0, 0, pageWidth, 24, 'F');

    // Accent line
    doc.setFillColor(orange[0], orange[1], orange[2]);
    doc.rect(0, 24, pageWidth, 1.5, 'F');

    // Brand Name
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('SKY WANDER HOLIDAYS', margin, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(56, 189, 248);
    doc.text('OFFICIAL ITINERARY & EXPEDITION DOSSIER', margin, 18);

    // Helpline
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('📞 +91 86769 28509', pageWidth - margin, 12, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 122, 0);
    doc.text('Skywander6@gmail.com', pageWidth - margin, 18, { align: 'right' });

    // Page title sub-strip
    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    doc.rect(margin, 28, contentWidth, 8, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, 28, contentWidth, 8, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text(pageTitle.toUpperCase(), margin + 3, 33.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`CODE: ${brochure.code}  |  ${brochure.duration}`, pageWidth - margin - 3, 33.5, { align: 'right' });
  };

  const drawFooter = (pageNum: number, totalPages: number) => {
    const y = pageHeight - 10;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y - 2, pageWidth - margin, y - 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('Sky Wander Holidays • Corporate: Sector 62, Noida (UP) • Head Office: New Delhi', margin, y + 2);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, y + 2, { align: 'right' });
  };

  // ================= PAGE 1: COVER & OVERVIEW =================
  drawHeader('Destination Overview & Highlights');

  let cursorY = 42;

  // Title Box
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, cursorY, contentWidth, 30, 2, 2, 'F');
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, cursorY, contentWidth, 30, 2, 2, 'D');

  doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(brochure.title, margin + 4, cursorY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(brochure.subtitle, margin + 4, cursorY + 14);

  // Badges: Price, Duration, Pickup
  const badgeY = cursorY + 20;
  
  // Starting Price
  doc.setFillColor(orange[0], orange[1], orange[2]);
  doc.roundedRect(margin + 4, badgeY, 44, 6.5, 1, 1, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(`Price: ${brochure.startingPrice}`, margin + 6, badgeY + 4.5);

  // Duration
  doc.setFillColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.roundedRect(margin + 51, badgeY, 36, 6.5, 1, 1, 'F');
  doc.text(`⏱️ ${brochure.duration}`, margin + 53, badgeY + 4.5);

  // Pickups
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin + 90, badgeY, contentWidth - 94, 6.5, 1, 1, 'FD');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(`Pickup: ${brochure.pickupPoints.join(' • ')}`, margin + 93, badgeY + 4.5);

  cursorY += 36;

  // Personalized Traveler Box if name provided
  if (leadName) {
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(margin, cursorY, contentWidth, 9, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(146, 64, 14);
    doc.text(`Specially Prepared For: ${leadName}  |  Generated on ${new Date().toLocaleDateString('en-IN')}`, margin + 4, cursorY + 6);
    cursorY += 13;
  }

  // Key Highlights Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.text('🌟 EXPEDITION HIGHLIGHTS', margin, cursorY);
  cursorY += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  
  brochure.highlights.forEach((hl) => {
    doc.setTextColor(orange[0], orange[1], orange[2]);
    doc.text('✦', margin + 2, cursorY + 3.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const lines = doc.splitTextToSize(hl, contentWidth - 10);
    doc.text(lines, margin + 8, cursorY + 3.5);
    cursorY += lines.length * 4.2 + 2;
  });

  cursorY += 4;

  // Route at a Glance
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.text('🗺️ ROUTE & DAY-WISE SUMMARY', margin, cursorY);
  cursorY += 4;

  brochure.routeSummary.forEach((r, idx) => {
    doc.setFillColor(idx % 2 === 0 ? bgLight[0] : 255, idx % 2 === 0 ? bgLight[1] : 255, idx % 2 === 0 ? bgLight[2] : 255);
    doc.roundedRect(margin, cursorY, contentWidth, 7, 1, 1, 'F');
    doc.setDrawColor(241, 245, 249);
    doc.roundedRect(margin, cursorY, contentWidth, 7, 1, 1, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text(`●`, margin + 3, cursorY + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(r, margin + 8, cursorY + 4.8);

    cursorY += 8.2;
  });

  // Sharing Pricing Table if available
  if (brochure.sharingPrices) {
    cursorY += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
    doc.text('🏷️ ROOM SHARING COST PER PERSON', margin, cursorY);
    cursorY += 4;

    const prices = brochure.sharingPrices;
    const items = [
      { label: 'Quad Sharing', cost: prices.quad || 'On Request' },
      { label: 'Triple Sharing', cost: prices.triple || 'On Request' },
      { label: 'Double Sharing', cost: prices.double || 'On Request' }
    ];

    const colW = contentWidth / 3;
    items.forEach((item, i) => {
      const x = margin + i * colW;
      doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
      doc.roundedRect(x, cursorY, colW - 2, 12, 1, 1, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(x, cursorY, colW - 2, 12, 1, 1, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text(item.label.toUpperCase(), x + 3, cursorY + 4.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(orange[0], orange[1], orange[2]);
      doc.text(item.cost, x + 3, cursorY + 9.5);
    });
  }

  drawFooter(1, 3);

  // ================= PAGE 2: DETAILED DAY-WISE ITINERARY =================
  doc.addPage();
  drawHeader('Detailed Day-by-Day Expedition Schedule');

  cursorY = 40;

  brochure.itinerary.forEach((plan) => {
    // Check if we need to wrap to next page if too long
    if (cursorY > pageHeight - 40) {
      drawFooter(2, 3);
      doc.addPage();
      drawHeader('Detailed Day-by-Day Expedition Schedule (Contd.)');
      cursorY = 40;
    }

    // Day Header Strip
    doc.setFillColor(darkTeal[0], darkTeal[1], darkTeal[2]);
    doc.roundedRect(margin, cursorY, 20, 6.5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(plan.dayNumber, margin + 2.5, cursorY + 4.5);

    // Title
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(plan.title, margin + 24, cursorY + 4.8);

    cursorY += 8.5;

    // Description text box
    const lines = doc.splitTextToSize(plan.description, contentWidth - 6);
    const boxHeight = lines.length * 4.2 + 6;

    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    doc.roundedRect(margin, cursorY, contentWidth, boxHeight, 1, 1, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, cursorY, contentWidth, boxHeight, 1, 1, 'D');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(lines, margin + 3, cursorY + 4.5);

    cursorY += boxHeight + 4;
  });

  drawFooter(2, 3);

  // ================= PAGE 3: INCLUSIONS, EXCLUSIONS & BOOKING =================
  doc.addPage();
  drawHeader('Inclusions, Exclusions, Packing & Booking Policy');

  cursorY = 40;

  // Inclusions & Exclusions 2 Columns
  const halfCol = (contentWidth - 6) / 2;

  // Inclusions Column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(16, 185, 129); // emerald
  doc.text('✅ INCLUSIONS', margin, cursorY);

  // Exclusions Column
  doc.setTextColor(239, 68, 68); // red
  doc.text('❌ EXCLUSIONS', margin + halfCol + 6, cursorY);

  cursorY += 4;
  const startY = cursorY;

  // Render Inclusions
  let incY = startY;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  brochure.inclusions.slice(0, 7).forEach((inc) => {
    doc.setTextColor(16, 185, 129);
    doc.text('✔', margin, incY + 3);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const l = doc.splitTextToSize(inc, halfCol - 5);
    doc.text(l, margin + 5, incY + 3);
    incY += l.length * 3.6 + 2;
  });

  // Render Exclusions
  let excY = startY;
  brochure.exclusions.slice(0, 7).forEach((exc) => {
    doc.setTextColor(239, 68, 68);
    doc.text('✖', margin + halfCol + 6, excY + 3);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const l = doc.splitTextToSize(exc, halfCol - 5);
    doc.text(l, margin + halfCol + 11, excY + 3);
    excY += l.length * 3.6 + 2;
  });

  cursorY = Math.max(incY, excY) + 6;

  // Things to pack
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.text('🎒 ESSENTIAL THINGS TO PACK', margin, cursorY);
  cursorY += 4;

  const packText = brochure.thingsToPack.join('  •  ');
  const packLines = doc.splitTextToSize(packText, contentWidth - 6);
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(margin, cursorY, contentWidth, packLines.length * 4 + 6, 1, 1, 'FD');
  doc.setDrawColor(226, 232, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(packLines, margin + 3, cursorY + 4.5);

  cursorY += packLines.length * 4 + 10;

  // Payment Details & Bank Box
  doc.setFillColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.roundedRect(margin, cursorY, contentWidth, 38, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(orange[0], orange[1], orange[2]);
  doc.text('💳 OFFICIAL BOOKING & PAYMENT DETAILS', margin + 5, cursorY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(`Account Name:  ${brochure.paymentDetails.accountName}`, margin + 5, cursorY + 14);
  doc.text(`Account Holder: ${brochure.paymentDetails.accountHolder}`, margin + 5, cursorY + 19);
  doc.text(`Bank Name:      ${brochure.paymentDetails.bankName}`, margin + 5, cursorY + 24);
  doc.text(`UPI ID / VPA:    ${brochure.paymentDetails.upiId} (GPay / PhonePe / Paytm / BHIM)`, margin + 5, cursorY + 29);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(56, 189, 248);
  doc.text(`Seat Advance: ${brochure.advanceBookingAmount}`, margin + 5, cursorY + 34);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(orange[0], orange[1], orange[2]);
  doc.text('24x7 DESK: +91 8676928509', pageWidth - margin - 5, cursorY + 20, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.text('Share payment screenshot on WhatsApp', pageWidth - margin - 5, cursorY + 26, { align: 'right' });
  doc.text('to receive instant booking confirmation', pageWidth - margin - 5, cursorY + 31, { align: 'right' });

  cursorY += 43;

  // Terms & Cancellation Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
  doc.text('IMPORTANT TERMS & CONDITIONS', margin, cursorY);
  cursorY += 3.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  brochure.termsAndConditions.slice(0, 3).forEach((tc) => {
    doc.text(`• ${tc}`, margin + 2, cursorY);
    cursorY += 3.5;
  });

  drawFooter(3, 3);

  // Save the PDF
  const filename = `Sky_Wander_Holidays_${brochure.id.replace(/[^a-zA-Z0-9_-]/g, '_')}_Itinerary.pdf`;
  doc.save(filename);
}
