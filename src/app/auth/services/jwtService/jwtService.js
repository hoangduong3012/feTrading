import FuseUtils from '@fuse/utils/FuseUtils';
// eslint-disable-next-line import/no-cycle
import api from 'app/service/authentication';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.handleAuthentication();
  }

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  // eslint-disable-next-line class-methods-use-this
  // createUser = async (data) => {
  //   await api.signIn(data.identifier, data.password);
  // };

  // eslint-disable-next-line class-methods-use-this
  signInWithEmailAndPassword = async (identifier, password) => {
    try {
      const response = await api.signIn(identifier, password);
      if (response.data?.login) {
        const { jwt } = response.data.login;
        this.setSession(jwt);
        return await this.signInWithToken();
      }
      throw new Error('Failed to login');
    } catch (err) {
      throw new Error('Failed to login');
    }
  };

  signInWithToken = async () => {
    try {
      const response = await api.reAccessWithToken();
      const { me } = response.data;
      const { role, ...newMe } = me;
      if (me) {
        this.emit('onLogin', { ...newMe, role: [role.name] });
        return { ...newMe, role: [role.name] };
      }
      this.logout();
      return new Error('Failed to login with token.');
    } catch (err) {
      this.logout();
      return new Error('Failed to login');
    }
  };

  // eslint-disable-next-line class-methods-use-this
  // updateUserData = (user) => {
  //   return axios.post(jwtServiceConfig.updateUser, {
  //     user,
  //   });
  // };

  // eslint-disable-next-line class-methods-use-this
  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
    } else {
      localStorage.removeItem('jwt_access_token');
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  // eslint-disable-next-line class-methods-use-this
  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  // eslint-disable-next-line class-methods-use-this
  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
