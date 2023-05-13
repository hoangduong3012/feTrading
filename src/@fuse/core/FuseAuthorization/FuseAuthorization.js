import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import settingsConfig from 'app/fuse-configs/settingsConfig';
import { setFirstAccess } from 'app/auth/store/loginSlice';
import history from '@history';

class FuseAuthorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes, isFirstAccess } = context;
    this.state = {
      accessGranted: true,
      routes,
    };
    this.defaultLoginRedirectUrl = settingsConfig.loginRedirectUrl || '/';
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location, userRole, isFirstAccess, setFirstAccess } = props;
    const { pathname } = location;

    if (isFirstAccess) 
      setFirstAccess(false);
    const matchedRoutes = matchRoutes(state.routes, pathname);

    const matched = matchedRoutes ? matchedRoutes[0] : false;

    return {
      accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, userRole) : true,
    };
  }

  redirectRoute() {
    const { location, userRole, navigate } = this.props;
    const { pathname } = location;
    const loginRedirectUrl = settingsConfig.loginRedirectUrl
      ? settingsConfig.loginRedirectUrl
      : this.defaultLoginRedirectUrl;

    /*
        User is guest
        Redirect to Login Page
        */
    if (!userRole) {
      navigate({
        pathname: '/login',
      });
      settingsConfig.loginRedirectUrl = pathname;
    } else {
      /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or loginRedirectUrl
        */

        navigate({
          pathname: loginRedirectUrl,
        });
      settingsConfig.loginRedirectUrl = this.defaultLoginRedirectUrl;
    }
  }

  render() {
    // console.info('Fuse Authorization rendered', this.state.accessGranted);
    return this.state.accessGranted || this.props.isFirstAccess ? <>{this.props.children}</> : null;
  }
}

function mapStateToProps({ auth }) {
  return {
    userRole: auth.user.role,
    isFirstAccess: auth.login.isFirstAccess
  };
}

const mapDispatchToProps = dispatch => ({
  setFirstAccess: source => {
  dispatch(setFirstAccess(source));
  },
});

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseAuthorization));
