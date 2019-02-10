import MainView from "./MainView";
import React from "react";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from "../../constants/actionTypes";

const mapStateToProps = state => ({
  ...state.home,
  accessToken: state.common.accessToken,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillUnmount() {
    this.props.onUnload();
  }

  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="home-page">
        <div className="container page">
          <div className="row">
            <MainView currentUser={currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
