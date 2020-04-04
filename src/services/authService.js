export default {
  async login(authClient) {
    if (!authClient.isAuthenticated) {
      await authClient.loginWithPopup();
    }
  },

  logout(authClient) {
    authClient.logout({
      returnTo: window.location.origin
    });
  }
};
