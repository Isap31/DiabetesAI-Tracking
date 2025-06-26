import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { revenueCatService } from './revenueCatService';

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isPremium: boolean;
  createdAt: string;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

class AuthService {
  private currentUser: AuthUser | null = null;
  private session: Session | null = null;

  async signUp({ email, password, firstName, lastName }: SignUpData): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    if (!isSupabaseConfigured) {
      return { user: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        return { user: null, error };
      }

      if (data.user) {
        // Create user profile
        await this.createUserProfile(data.user, firstName, lastName);
        
        // Initialize RevenueCat with user ID
        try {
          await revenueCatService.setUserId(data.user.id);
        } catch (rcError) {
          console.warn('RevenueCat initialization failed:', rcError);
        }

        const authUser: AuthUser = {
          id: data.user.id,
          email: data.user.email!,
          firstName,
          lastName,
          isPremium: false,
          createdAt: data.user.created_at
        };

        this.currentUser = authUser;
        return { user: authUser, error: null };
      }

      return { user: null, error: null };
    } catch (err) {
      console.error('Sign up error:', err);
      return { user: null, error: err as AuthError };
    }
  }

  async signIn({ email, password }: SignInData): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    if (!isSupabaseConfigured) {
      return { user: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error };
      }

      if (data.user && data.session) {
        this.session = data.session;
        
        // Get user profile
        const profile = await this.getUserProfile(data.user.id);
        
        // Initialize RevenueCat
        try {
          await revenueCatService.setUserId(data.user.id);
          const customerInfo = await revenueCatService.getCustomerInfo();
          const isPremium = customerInfo ? revenueCatService.isUserPremium(customerInfo) : false;
          
          const authUser: AuthUser = {
            id: data.user.id,
            email: data.user.email!,
            firstName: profile?.first_name,
            lastName: profile?.last_name,
            isPremium,
            createdAt: data.user.created_at
          };

          this.currentUser = authUser;
          return { user: authUser, error: null };
        } catch (rcError) {
          console.warn('RevenueCat setup failed:', rcError);
          
          const authUser: AuthUser = {
            id: data.user.id,
            email: data.user.email!,
            firstName: profile?.first_name,
            lastName: profile?.last_name,
            isPremium: false,
            createdAt: data.user.created_at
          };

          this.currentUser = authUser;
          return { user: authUser, error: null };
        }
      }

      return { user: null, error: null };
    } catch (err) {
      console.error('Sign in error:', err);
      return { user: null, error: err as AuthError };
    }
  }

  async signOut(): Promise<{ error: AuthError | null }> {
    if (!isSupabaseConfigured) {
      return { error: null };
    }

    try {
      // Logout from RevenueCat
      await revenueCatService.logout();
      
      const { error } = await supabase.auth.signOut();
      
      this.currentUser = null;
      this.session = null;
      
      return { error };
    } catch (err) {
      console.error('Sign out error:', err);
      return { error: err as AuthError };
    }
  }

  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    if (!isSupabaseConfigured) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      return { error };
    } catch (err) {
      console.error('Reset password error:', err);
      return { error: err as AuthError };
    }
  }

  async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    if (!isSupabaseConfigured) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      return { error };
    } catch (err) {
      console.error('Update password error:', err);
      return { error: err as AuthError };
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    if (!isSupabaseConfigured) {
      return null;
    }

    if (this.currentUser) {
      return this.currentUser;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const profile = await this.getUserProfile(session.user.id);
        
        // Check premium status
        let isPremium = false;
        try {
          const customerInfo = await revenueCatService.getCustomerInfo();
          isPremium = customerInfo ? revenueCatService.isUserPremium(customerInfo) : false;
        } catch (error) {
          console.warn('Could not check premium status:', error);
        }

        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email!,
          firstName: profile?.first_name,
          lastName: profile?.last_name,
          isPremium,
          createdAt: session.user.created_at
        };

        this.currentUser = authUser;
        this.session = session;
        return authUser;
      }
    } catch (error) {
      console.error('Get current user error:', error);
    }

    return null;
  }

  async updateProfile(updates: { firstName?: string; lastName?: string }): Promise<{ error: Error | null }> {
    if (!this.currentUser) {
      return { error: new Error('No authenticated user') };
    }

    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase is not configured') };
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          first_name: updates.firstName,
          last_name: updates.lastName,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', this.currentUser.id);

      if (error) {
        return { error };
      }

      // Update local user data
      if (updates.firstName) this.currentUser.firstName = updates.firstName;
      if (updates.lastName) this.currentUser.lastName = updates.lastName;

      return { error: null };
    } catch (err) {
      console.error('Update profile error:', err);
      return { error: err as Error };
    }
  }

  private async createUserProfile(user: User, firstName: string, lastName: string): Promise<void> {
    if (!isSupabaseConfigured) {
      return;
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          email: user.email,
          first_name: firstName,
          last_name: lastName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating user profile:', error);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }

  private async getUserProfile(userId: string): Promise<any> {
    if (!isSupabaseConfigured) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    if (!isSupabaseConfigured) {
      return () => {};
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const user = await this.getCurrentUser();
        callback(user);
      } else if (event === 'SIGNED_OUT') {
        this.currentUser = null;
        this.session = null;
        callback(null);
      }
    });

    return () => subscription.unsubscribe();
  }

  getSession(): Session | null {
    return this.session;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authService = new AuthService();