// Session Manager for Chatbot
export class SessionManager {
  private static readonly SESSION_KEY = 'chatbot_session_id';
  private static readonly USER_ID_KEY = 'chatbot_user_id';

  /**
   * Generate a unique session ID
   */
  static generateSessionId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `session_${timestamp}_${random}`;
  }

  /**
   * Get or create a session ID
   */
  static getSessionId(): string {
    if (typeof window === 'undefined') return '';
    
    let sessionId = localStorage.getItem(this.SESSION_KEY);
    
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem(this.SESSION_KEY, sessionId);
    }
    
    return sessionId;
  }

  /**
   * Get user ID if available (from auth state)
   */
  static getUserId(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    
    return localStorage.getItem(this.USER_ID_KEY) || undefined;
  }

  /**
   * Set user ID (call this when user logs in)
   */
  static setUserId(userId: string): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(this.USER_ID_KEY, userId);
  }

  /**
   * Clear user ID (call this when user logs out)
   */
  static clearUserId(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.USER_ID_KEY);
  }

  /**
   * Reset session (creates new session ID)
   */
  static resetSession(): string {
    if (typeof window === 'undefined') return '';
    
    const newSessionId = this.generateSessionId();
    localStorage.setItem(this.SESSION_KEY, newSessionId);
    return newSessionId;
  }

  /**
   * Get session info for debugging
   */
  static getSessionInfo() {
    return {
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      timestamp: new Date().toISOString()
    };
  }
} 