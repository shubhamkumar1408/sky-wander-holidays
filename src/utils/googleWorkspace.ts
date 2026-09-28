import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure Google Provider with requested Workspace Scopes
export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/gmail.send'
];

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach(scope => provider.addScope(scope));

// Flags & In-memory token cache (Do NOT store in localStorage per security guidelines)
let isSigningIn = false;
let cachedAccessToken: string | null = null;
let cachedUser: User | null = null;

const SPREADSHEET_ID_KEY = 'swh_google_sheet_id';
const SPREADSHEET_URL_KEY = 'swh_google_sheet_url';
export const DEFAULT_ADMIN_EMAIL = 'duttshubham68@gmail.com';

// Auth State Listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    cachedUser = user;
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // If user is logged into Firebase Auth but memory token expired,
        // we can prompt for sign-in or keep failure callback
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google (triggers popup with Workspace scopes)
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google OAuth access token');
    }

    cachedAccessToken = credential.accessToken;
    cachedUser = result.user;
    
    // Automatically prepare/check the Google Sheet upon connection
    setupOrGetSpreadsheet(cachedAccessToken).catch(err => {
      console.warn('Initial spreadsheet sync warning:', err);
    });

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const getGoogleUser = (): User | null => {
  return cachedUser;
};

export const googleLogout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
  cachedUser = null;
};

// ==========================================
// Google Sheets Integration
// ==========================================

export interface SheetRowData {
  sheet: 'Logins' | 'Inquiries' | 'BrochureLeads';
  row: (string | number)[];
}

export function getStoredSpreadsheetInfo(): { id: string | null; url: string | null } {
  try {
    return {
      id: localStorage.getItem(SPREADSHEET_ID_KEY),
      url: localStorage.getItem(SPREADSHEET_URL_KEY)
    };
  } catch {
    return { id: null, url: null };
  }
}

/**
 * Creates or gets the master Google Sheet: "Sky Wander Holidays - Leads & Customer Activity"
 */
export async function setupOrGetSpreadsheet(token: string): Promise<{ id: string; url: string }> {
  const existing = getStoredSpreadsheetInfo();
  if (existing.id) {
    // Verify spreadsheet is still accessible
    try {
      const verifyRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${existing.id}?fields=spreadsheetId`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (verifyRes.ok) {
        return { id: existing.id, url: existing.url || `https://docs.google.com/spreadsheets/d/${existing.id}` };
      }
    } catch {
      // Create fresh one below
    }
  }

  // Create new Spreadsheet with dedicated tabs
  const createPayload = {
    properties: {
      title: 'Sky Wander Holidays - Leads, Inquiries & Logins'
    },
    sheets: [
      {
        properties: {
          sheetId: 0,
          title: 'Logins',
          gridProperties: { frozenRowCount: 1 }
        }
      },
      {
        properties: {
          sheetId: 1,
          title: 'Inquiries',
          gridProperties: { frozenRowCount: 1 }
        }
      },
      {
        properties: {
          sheetId: 2,
          title: 'BrochureLeads',
          gridProperties: { frozenRowCount: 1 }
        }
      }
    ]
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createPayload)
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create Google Spreadsheet: ${errorText}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

  try {
    localStorage.setItem(SPREADSHEET_ID_KEY, spreadsheetId);
    localStorage.setItem(SPREADSHEET_URL_KEY, spreadsheetUrl);
  } catch {}

  // Initialize Headers in each sheet
  const headersPayload = {
    valueInputOption: 'USER_ENTERED',
    data: [
      {
        range: 'Logins!A1:E1',
        values: [['Timestamp', 'Full Name', 'Mobile Number', 'Verification Code', 'Status']]
      },
      {
        range: 'Inquiries!A1:L1',
        values: [[
          'Inquiry / Booking ID',
          'Timestamp',
          'Customer Name',
          'Phone / WhatsApp',
          'Email',
          'Tour Package / Destination',
          'Travel Date',
          'Travelers (Adults/Kids)',
          'Departure City',
          'Hotel Category',
          'Estimated Total (₹)',
          'Special Requests'
        ]]
      },
      {
        range: 'BrochureLeads!A1:H1',
        values: [[
          'Lead ID',
          'Timestamp',
          'Full Name',
          'Phone Number',
          'Email Address',
          'Destination / Package',
          'Travel Month',
          'Travelers Count'
        ]]
      }
    ]
  };

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(headersPayload)
  }).catch(err => console.warn('Failed to write sheet headers:', err));

  return { id: spreadsheetId, url: spreadsheetUrl };
}

/**
 * Appends a row of data into the Google Sheet
 */
export async function appendToSpreadsheet(
  sheetName: 'Logins' | 'Inquiries' | 'BrochureLeads',
  rowValues: (string | number)[]
): Promise<boolean> {
  const token = cachedAccessToken;
  if (!token) return false;

  try {
    const sheetInfo = await setupOrGetSpreadsheet(token);
    const range = `${sheetName}!A:Z`;
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetInfo.id}/values/${range}:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [rowValues]
        })
      }
    );

    return res.ok;
  } catch (err) {
    console.error(`Error appending row to Google Sheets (${sheetName}):`, err);
    return false;
  }
}

// ==========================================
// Gmail API Integration
// ==========================================

function createRfc2822Email(to: string, from: string, subject: string, htmlBody: string): string {
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const emailLines = [
    `From: Sky Wander Holidays Notification <${from}>`,
    `To: <${to}>`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    htmlBody
  ];

  const email = emailLines.join('\r\n');
  // Base64URL encode
  return btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Sends an email notification using the Gmail API
 */
export async function sendGmailNotification({
  to = DEFAULT_ADMIN_EMAIL,
  subject,
  htmlContent
}: {
  to?: string;
  subject: string;
  htmlContent: string;
}): Promise<boolean> {
  const token = cachedAccessToken;
  if (!token) return false;

  try {
    const senderEmail = cachedUser?.email || DEFAULT_ADMIN_EMAIL;
    const rawEmail = createRfc2822Email(to, senderEmail, subject, htmlContent);

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ raw: rawEmail })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Gmail API send warning:', errText);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error sending email via Gmail API:', err);
    return false;
  }
}

// ==========================================
// Central Activity Dispatcher (Login & Forms)
// ==========================================

export interface CustomerActivityPayload {
  type: 'LOGIN' | 'INQUIRY' | 'BOOKING' | 'BROCHURE_DOWNLOAD' | 'PAYMENT_SUBMITTED';
  name: string;
  phone: string;
  email?: string;
  code?: string;
  details?: Record<string, any>;
  timestamp?: string;
}

/**
 * Dispatches activity to:
 * 1) Server backend store (/api/activity-log)
 * 2) Google Sheets (if connected)
 * 3) Gmail API (if connected)
 */
export async function dispatchCustomerActivity(payload: CustomerActivityPayload): Promise<{
  serverLogged: boolean;
  sheetSynced: boolean;
  emailSent: boolean;
}> {
  const time = payload.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 1. Post to Server Backend
  let serverLogged = false;
  try {
    const res = await fetch('/api/activity-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, timestamp: time })
    });
    serverLogged = res.ok;
  } catch (err) {
    console.warn('Server activity log error:', err);
  }

  let sheetSynced = false;
  let emailSent = false;

  // 2 & 3. Sync to Google Sheets and Gmail if token is present
  if (cachedAccessToken) {
    // A) Append to Sheets
    if (payload.type === 'LOGIN') {
      sheetSynced = await appendToSpreadsheet('Logins', [
        time,
        payload.name,
        `+91 ${payload.phone}`,
        payload.code || '8492',
        'Logged In Successfully'
      ]);
    } else if (payload.type === 'INQUIRY' || payload.type === 'BOOKING') {
      const d = payload.details || {};
      sheetSynced = await appendToSpreadsheet('Inquiries', [
        d.id || `SWH-${Date.now()}`,
        time,
        payload.name,
        `+91 ${payload.phone}`,
        payload.email || 'N/A',
        d.packageTitle || 'Domestic Tour',
        d.travelDate || 'Upcoming',
        `${d.adultsCount || 2} Adults, ${d.childrenCount || 0} Kids`,
        d.departureCity || 'Delhi',
        d.hotelCategory || 'Deluxe 4★',
        d.estimatedTotal ? `₹${Number(d.estimatedTotal).toLocaleString('en-IN')}` : '₹18,000',
        d.specialRequests || 'None'
      ]);
    } else if (payload.type === 'BROCHURE_DOWNLOAD') {
      const d = payload.details || {};
      sheetSynced = await appendToSpreadsheet('BrochureLeads', [
        d.id || `LEAD-${Date.now()}`,
        time,
        payload.name,
        `+91 ${payload.phone}`,
        payload.email || 'N/A',
        d.packageTitle || 'Destination Brochure',
        d.travelMonth || 'This Month',
        d.travelersCount || '2 Travelers'
      ]);
    } else if (payload.type === 'PAYMENT_SUBMITTED') {
      const d = payload.details || {};
      sheetSynced = await appendToSpreadsheet('Inquiries', [
        d.id || `PAY-${Date.now()}`,
        time,
        payload.name,
        `+91 ${payload.phone}`,
        payload.email || 'N/A',
        d.packageTitle || 'Domestic Holiday Tour',
        d.travelDate || 'Advance Booking',
        `${d.adultsCount || 2} Adults ${d.childrenCount ? `+ ${d.childrenCount} Kids` : ''}`,
        d.departureCity || 'Direct UPI QR Scan',
        `PAID via QR (UTR: ${d.utrNumber || 'Verified'})`,
        d.amountPaid ? `₹${Number(d.amountPaid).toLocaleString('en-IN')}` : '₹2,000',
        `UPI Ref: ${d.utrNumber || 'N/A'} | App: ${d.paymentApp || 'PhonePe'} | Total: ₹${d.estimatedTotal || d.amountPaid || '0'}`
      ]);
    }

    // B) Send Email via Gmail API
    let subject = '';
    let htmlContent = '';

    if (payload.type === 'LOGIN') {
      subject = `🔔 New User Login: ${payload.name} (+91 ${payload.phone})`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0B2530, #1698B4); padding: 20px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">Sky Wander Holidays - New Login Alert</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">A customer has just signed in to the portal.</p>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1e293b;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px;">Customer Name:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${payload.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Mobile Number:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #1698B4;">+91 ${payload.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Verification Code:</td>
                <td style="padding: 8px 0; font-family: monospace; font-weight: bold; color: #FF7A00;">${payload.code || '8492'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Login Time:</td>
                <td style="padding: 8px 0; color: #334155;">${time}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; font-size: 12px; color: #166534;">
              ✅ Automatically appended to your Google Sheets: <strong>Sky Wander Holidays - Leads, Inquiries & Logins</strong>.
            </div>
          </div>
          <div style="background: #f8fafc; padding: 12px 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center;">
            Sky Wander Holidays Travel Desk • Automatic Workspace Notification System
          </div>
        </div>
      `;
    } else if (payload.type === 'INQUIRY' || payload.type === 'BOOKING') {
      const d = payload.details || {};
      subject = `✈️ New Tour Inquiry / Booking: ${payload.name} - ${d.packageTitle || 'Trip'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0B2530, #FF7A00); padding: 20px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">New Trip Booking Inquiry!</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Booking Ref: <strong>${d.id || 'N/A'}</strong></p>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1e293b;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px;">Customer Name:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${payload.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Mobile Number:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #1698B4;"><a href="tel:+91${payload.phone}" style="color: #1698B4; text-decoration: none;">+91 ${payload.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email Address:</td>
                <td style="padding: 8px 0; color: #0f172a;">${payload.email || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Package / Destination:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #FF7A00;">${d.packageTitle || 'Domestic Tour'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Travel Date:</td>
                <td style="padding: 8px 0; color: #0f172a;">${d.travelDate || 'Upcoming'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Travelers Count:</td>
                <td style="padding: 8px 0; color: #0f172a;">${d.adultsCount || 2} Adults, ${d.childrenCount || 0} Kids</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Departure City:</td>
                <td style="padding: 8px 0; color: #0f172a;">${d.departureCity || 'Delhi'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Estimated Total:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #047857;">${d.estimatedTotal ? `₹${Number(d.estimatedTotal).toLocaleString('en-IN')}` : 'Contact for Quote'}</td>
              </tr>
              ${d.specialRequests ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;">Special Requests:</td>
                <td style="padding: 8px 0; color: #334155; font-style: italic;">"${d.specialRequests}"</td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 20px; padding: 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; font-size: 12px; color: #1e40af;">
              🚀 Lead auto-recorded into Google Sheets and logged into Sky Wander Holidays database.
            </div>
          </div>
          <div style="background: #f8fafc; padding: 12px 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center;">
            Sky Wander Holidays • Call: +91 86769 28509 • Email: Skywander6@gmail.com
          </div>
        </div>
      `;
    } else if (payload.type === 'BROCHURE_DOWNLOAD') {
      const d = payload.details || {};
      subject = `📄 Itinerary PDF Downloaded: ${payload.name} - ${d.packageTitle || 'Brochure'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0B2530, #1698B4); padding: 20px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">Brochure PDF Downloaded!</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Lead ID: <strong>${d.id || 'N/A'}</strong></p>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1e293b;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px;">Customer Name:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${payload.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Mobile Number:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #1698B4;"><a href="tel:+91${payload.phone}" style="color: #1698B4; text-decoration: none;">+91 ${payload.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email Address:</td>
                <td style="padding: 8px 0; color: #0f172a;">${payload.email || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Brochure Package:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #FF7A00;">${d.packageTitle || 'N/A'} (${d.destination || ''})</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Travel Month:</td>
                <td style="padding: 8px 0; color: #0f172a;">${d.travelMonth || 'Upcoming'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Travelers:</td>
                <td style="padding: 8px 0; color: #0f172a;">${d.travelersCount || '2 Travelers'}</td>
              </tr>
            </table>
          </div>
        </div>
      `;
    } else if (payload.type === 'PAYMENT_SUBMITTED') {
      const d = payload.details || {};
      subject = `💰 PAYMENT RECEIVED via UPI QR: ₹${d.amountPaid || '2,000'} - ${payload.name} (Ref: ${d.utrNumber || 'N/A'})`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #10b981; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #059669, #0B2530); padding: 22px; color: #ffffff;">
            <span style="background: #ffffff; color: #059669; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 6px; text-transform: uppercase;">
              UPI Payment Received
            </span>
            <h2 style="margin: 8px 0 0 0; font-size: 22px;">₹${Number(d.amountPaid || 2000).toLocaleString('en-IN')} Received!</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Booking Ref: <strong>${d.id || 'N/A'}</strong></p>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1e293b;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 150px;">Customer Name:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${payload.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Mobile Number:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #1698B4;"><a href="tel:+91${payload.phone}" style="color: #1698B4; text-decoration: none;">+91 ${payload.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Package / Destination:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #FF7A00;">${d.packageTitle || 'Domestic Tour'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Amount Paid:</td>
                <td style="padding: 8px 0; font-weight: 900; color: #059669; font-size: 16px;">₹${Number(d.amountPaid || 2000).toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">12-Digit UTR / Ref No:</td>
                <td style="padding: 8px 0; font-family: monospace; font-weight: bold; color: #0f172a; background: #f1f5f9; padding-left: 6px;">${d.utrNumber || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">UPI App Used:</td>
                <td style="padding: 8px 0; color: #0f172a;">${d.paymentApp || 'PhonePe'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Estimated Total Tour:</td>
                <td style="padding: 8px 0; color: #0f172a;">₹${Number(d.estimatedTotal || d.amountPaid || 0).toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Travel Date:</td>
                <td style="padding: 8px 0; color: #0f172a;">${d.travelDate || 'Advance Booking'}</td>
              </tr>
            </table>

            <div style="margin-top: 18px; padding: 12px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; font-size: 12px; color: #065f46;">
              ✅ Automatically logged in Google Sheets: <strong>Sky Wander Holidays - Leads, Inquiries & Logins</strong>.
            </div>
          </div>
          <div style="background: #f8fafc; padding: 12px 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center;">
            Sky Wander Holidays • Call: +91 86769 28509 • Official Helpline
          </div>
        </div>
      `;
    }

    if (subject && htmlContent) {
      // Send to the admin's email or signed in user
      const targetEmail = cachedUser?.email || DEFAULT_ADMIN_EMAIL;
      emailSent = await sendGmailNotification({
        to: targetEmail,
        subject,
        htmlContent
      });
    }
  }

  return { serverLogged, sheetSynced, emailSent };
}
