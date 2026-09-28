import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Mail, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  Send, 
  AlertCircle, 
  ShieldCheck, 
  Database,
  Users,
  Clock,
  Sparkles,
  LogOut
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  initAuth, 
  googleSignIn, 
  googleLogout, 
  getStoredSpreadsheetInfo, 
  setupOrGetSpreadsheet, 
  sendGmailNotification,
  DEFAULT_ADMIN_EMAIL 
} from '../utils/googleWorkspace';

interface GoogleWorkspacePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleWorkspacePanel: React.FC<GoogleWorkspacePanelProps> = ({
  isOpen,
  onClose
}) => {
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [activityRecords, setActivityRecords] = useState<any[]>([]);

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, tok) => {
        setGoogleUser(user);
        setToken(tok);
        const stored = getStoredSpreadsheetInfo();
        if (stored.url) setSheetUrl(stored.url);
      },
      () => {
        setGoogleUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch logged activities from server
  const loadActivities = async () => {
    try {
      const res = await fetch('/api/activity-log');
      if (res.ok) {
        const data = await res.json();
        setActivityRecords(data.activities || []);
      }
    } catch (err) {
      console.warn('Failed to load activity logs:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadActivities();
      const stored = getStoredSpreadsheetInfo();
      if (stored.url) setSheetUrl(stored.url);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Google Sign In
  const handleConnectGoogle = async () => {
    setIsSigningIn(true);
    setSyncStatusMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setToken(result.accessToken);
        setSyncStatusMsg({
          type: 'success',
          text: `Connected to Google as ${result.user.email}! Google Sheets and Gmail permissions active.`
        });
        const sheetInfo = await setupOrGetSpreadsheet(result.accessToken);
        setSheetUrl(sheetInfo.url);
      }
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setSyncStatusMsg({
        type: 'error',
        text: err.message || 'Failed to authenticate with Google. Please try again.'
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  // Handle Logout
  const handleDisconnect = async () => {
    await googleLogout();
    setGoogleUser(null);
    setToken(null);
    setSyncStatusMsg({
      type: 'info',
      text: 'Disconnected Google account.'
    });
  };

  // Test Gmail Send
  const handleSendTestEmail = async () => {
    if (!token) return;
    setIsSyncing(true);
    setSyncStatusMsg(null);
    try {
      const target = googleUser?.email || DEFAULT_ADMIN_EMAIL;
      const success = await sendGmailNotification({
        to: target,
        subject: '🧪 Sky Wander Holidays - Gmail & Sheets Integration Test',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #1698B4; border-radius: 8px;">
            <h2 style="color: #0B2530;">Sky Wander Holidays Live Integration Test</h2>
            <p>Congratulations! Your Gmail API and Google Sheets connection is working properly.</p>
            <p>All future logins and form inquiries will be automatically sent to: <strong>${target}</strong> and appended to your Google Sheet.</p>
            <p style="color: #64748b; font-size: 12px; margin-top: 20px;">Sent at: ${new Date().toLocaleString('en-IN')}</p>
          </div>
        `
      });

      if (success) {
        setSyncStatusMsg({
          type: 'success',
          text: `Test email sent successfully to ${target} via Gmail API!`
        });
      } else {
        setSyncStatusMsg({
          type: 'error',
          text: 'Unable to send email. Please ensure Gmail permissions are accepted.'
        });
      }
    } catch (err: any) {
      setSyncStatusMsg({ type: 'error', text: err.message || 'Test email failed.' });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-slate-900 animate-in zoom-in-95">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1698B4] to-[#0B2530] text-white flex items-center justify-center shadow-md">
              <Database className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Google Sheets & Gmail Integration</h2>
              <p className="text-xs text-slate-500">
                Automated customer lead alerts & live Google Sheet recording
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status notification */}
        {syncStatusMsg && (
          <div className={`mt-4 p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
            syncStatusMsg.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : syncStatusMsg.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            {syncStatusMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            {syncStatusMsg.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{syncStatusMsg.text}</span>
          </div>
        )}

        {/* Integration State Section */}
        <div className="mt-5 space-y-4">
          {!googleUser ? (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 text-center space-y-4">
              <div className="max-w-md mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1698B4]/10 text-[#1698B4] font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Connect Google Workspace
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Connect Your Google Account for Live Alerts & Sheets
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sign in with your Google account (e.g. <strong>{DEFAULT_ADMIN_EMAIL}</strong>) to automatically receive email notifications for every login and form submission, and save them instantly into your personal Google Sheet.
                </p>
              </div>

              {/* Official GSI Styled Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleConnectGoogle}
                  disabled={isSigningIn}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span>{isSigningIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Google Sheets Read/Write
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Gmail Send Notification
                </span>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {googleUser.photoURL ? (
                    <img 
                      src={googleUser.photoURL} 
                      alt={googleUser.displayName || 'Google User'} 
                      className="w-11 h-11 rounded-full border-2 border-emerald-400"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                      {googleUser.displayName?.[0] || 'G'}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{googleUser.displayName || 'Authorized User'}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold text-[10px] uppercase">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{googleUser.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleDisconnect}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>

              {/* Action Buttons: Open Sheet & Test Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {sheetUrl ? (
                  <a
                    href={sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-emerald-300 hover:border-emerald-500 shadow-xs hover:shadow transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-900">Connected Google Sheet</div>
                        <div className="text-[10px] text-slate-500">Live Leads & Logins Sheet</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <button
                    onClick={async () => {
                      if (!token) return;
                      const res = await setupOrGetSpreadsheet(token);
                      setSheetUrl(res.url);
                    }}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Create / Open Google Sheet</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  disabled={isSyncing}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-r from-[#0B2530] to-[#1698B4] hover:opacity-95 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Send Test Alert to Gmail</span>
                </button>
              </div>
            </div>
          )}

          {/* Activity Log preview */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#1698B4]" />
                <span>Recent Customer Logins & Form Submissions ({activityRecords.length})</span>
              </h4>
              <button
                onClick={loadActivities}
                className="text-[11px] text-[#1698B4] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 border border-slate-200 rounded-2xl p-2 bg-slate-50/50">
              {activityRecords.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">
                  No activity recorded yet. Submit a login or inquiry to test!
                </div>
              ) : (
                activityRecords.slice(0, 10).map((act, i) => (
                  <div key={act.id || i} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        act.type === 'LOGIN' 
                          ? 'bg-blue-100 text-blue-800' 
                          : act.type === 'BOOKING'
                          ? 'bg-emerald-100 text-emerald-800'
                          : act.type === 'BROCHURE_DOWNLOAD'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {act.type}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900">{act.name}</div>
                        <div className="text-[11px] text-slate-500">+91 {act.phone} {act.email ? `• ${act.email}` : ''}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-mono">{act.timestamp}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Logged & Synced</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Close */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
