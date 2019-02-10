import agent from "../agent";
import Header from "./Header";
import React from "react";
import { connect } from "react-redux";
import { APP_LOAD, REDIRECT } from "../constants/actionTypes";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import RegisterConfirm from "./RegisterConfirm";
import Settings from "./Settings";
import { store } from "../redux/createStore";
import { push } from "react-router-redux";
import { ToastContainer, toast } from "react-toastify";

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, accessToken) =>
    dispatch({ type: APP_LOAD, payload, accessToken, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const auth = {
      accessToken: window.localStorage.getItem("maihoum.accessToken"),
      client: window.localStorage.getItem("maihoum.client"),
      uid: window.localStorage.getItem("maihoum.uid"),
      expiry: window.localStorage.getItem("maihoum.expiry")
    };
    if (auth.accessToken && auth.client && auth.uid && auth.expiry) {
      agent.setAuth(auth);
    }

    this.props.onLoad(
      auth.accessToken ? agent.Auth.current() : null,
      auth.accessToken
    );
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/registerConfirm" component={RegisterConfirm} />
            <Route path="/settings" component={Settings} />
          </Switch>
          <ToastContainer />
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
