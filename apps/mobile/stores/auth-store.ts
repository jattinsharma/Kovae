import { create } from 'zustand';
import { AuthService } from '../services/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null; // In a real app this would be typed with Supabase User
  session: any | null;
  isLoading: boolean;
  
  // Actions
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  setSession: (session: any | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  session: null,
  isLoading: true,
  
  login: async (email, pass) => {
    const data = await AuthService.login(email, pass);
    set({ 
      isAuthenticated: !!data.session, 
      user: data.user,
      session: data.session 
    });
  },
  
  register: async (email, pass, name) => {
    const data = await AuthService.register(email, pass, name);
    set({ 
      isAuthenticated: !!data.session, 
      user: data.user,
      session: data.session 
    });
  },
  
  logout: async () => {
    await AuthService.logout();
    set({ isAuthenticated: false, user: null, session: null });
  },
  
  checkSession: async () => {
    try {
      const { data } = await AuthService.getSession();
      set({ 
        isAuthenticated: !!data.session, 
        user: data.session?.user || null,
        session: data.session,
        isLoading: false
      });
    } catch (e) {
      set({ isAuthenticated: false, user: null, session: null, isLoading: false });
    }
  },
  
  setSession: (session) => {
    set({ 
      isAuthenticated: !!session, 
      user: session?.user || null,
      session: session 
    });
  }
}));
