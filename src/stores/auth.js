import { defineStore } from 'pinia';
import { authService } from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false
  }),

  actions: {
    async login(email, password) {
      this.loading = true;
      try {
        const response = await authService.login(email, password);
        if (response.success) {
          this.user = response.user;
          this.isAuthenticated = true;
        }
        return response;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(email, password, displayName) {
      this.loading = true;
      try {
        const response = await authService.register(email, password, displayName);
        if (response.success) {
          this.user = response.user;
          this.isAuthenticated = true;
        }
        return response;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      authService.logout();
      this.user = null;
      this.isAuthenticated = false;
    },

    initAuth() {
      const user = authService.getCurrentUser();
      if (user && authService.isAuthenticated()) {
        this.user = user;
        this.isAuthenticated = true;
      }
    }
  }
});