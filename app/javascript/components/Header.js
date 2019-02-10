import image from "images/avatar_square.jpg";

import React from "react";
import { Link } from "react-router-dom";

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="navbar-nav flex-row">
        <li className="nav-item mx-2">
          <Link to="/login" className="nav-link">
            Logga in
          </Link>
        </li>

        <li className="nav-item mx-2">
          <Link to="/register" className="nav-link">
            Skapa ett konto
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="navbar-nav flex-row">
        <li className="nav-item mx-2">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a" />
            &nbsp;Inställningar
          </Link>
        </li>

        <li className="nav-item mx-2">
          <Link to={`/${props.currentUser.username}`} className="nav-link">
            <img
              className="avatar"
              src={props.currentUser.image || image}
              alt={props.currentUser.username}
            />
            <div className="username">{props.currentUser.username}</div>
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar justify-content-between navbar-light bg-secondary">
        <div className="container">
          <Link id="home" className="navbar-brand" to="/">
            MAIHOUM
          </Link>
          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

export default Header;
