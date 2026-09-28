export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
  isLoggedIn: boolean;
  loggedInAt: string;
}

const USER_STORAGE_KEY = 'swh_current_user_profile';
const AUTH_CHANGE_EVENT = 'swh_auth_change';

export function getCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.isLoggedIn && parsed.phone) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: { name: string; phone: string; email?: string }): UserProfile {
  const profile: UserProfile = {
    name: user.name.trim() || 'Valued Traveler',
    phone: user.phone.trim(),
    email: user.email?.trim() || '',
    isLoggedIn: true,
    loggedInAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: profile }));
  } catch (err) {
    console.warn('Failed to save user session:', err);
  }

  return profile;
}

export function logoutUser(): void {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: null }));
  } catch (err) {
    console.warn('Failed to clear user session:', err);
  }
}

export function onAuthChange(callback: (user: UserProfile | null) => void): () => void {
  const handler = (e: Event) => {
    const custom = e as CustomEvent<UserProfile | null>;
    callback(custom.detail);
  };

  window.addEventListener(AUTH_CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, handler);
  };
}
