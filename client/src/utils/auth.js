import decode from 'jwt-decode';

class AuthService {
  // get user data from JWT by decoding it
  getUser() {
    return decode(this.getToken());
  }

  // return `true` or `false` if token exists and has not expired.
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  // Retrieve user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Save user token to localStorage and reloads the application for logged in status to take effect
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Clear user token and profile data from localStorage
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();