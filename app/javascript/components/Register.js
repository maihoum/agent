import { Link } from "react-router-dom";
import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from "../constants/actionTypes";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangePasswordConfirmation: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "passwordConfirmation", value }),
  onSubmit: (email, password, passwordConfirmation) => {
    const payload = agent.Auth.register(email, password, passwordConfirmation);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changePasswordConfirmation = ev =>
      this.props.onChangePasswordConfirmation(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (email, password, passwordConfirmation) => ev => {
      ev.preventDefault();

      this.props.onSubmit(email, password, passwordConfirmation);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const passwordConfirmation = this.props.passwordConfirmation;

    return (
      <div className="auth-page">
        <img
          className="fullwidthBackgroundImage"
          src="https://static.wixstatic.com/media/c555555df14347c3ad9aaf3625f4354e.jpg/v1/fill/w_1155,h_899,al_c,q_85/c555555df14347c3ad9aaf3625f4354e.webp"
        />
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12 mt-5">
              <h2 className="text-xs-center">Skapa ett konto</h2>
              <p className="text-xs-center">
                <Link to="/login">Har du redan ett konto?</Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form
                onSubmit={this.submitForm(
                  email,
                  password,
                  passwordConfirmation
                )}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.changeEmail}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Lösenord"
                      value={this.props.password}
                      onChange={this.changePassword}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Bekräfta lösenord"
                      value={this.props.passwordConfirmation}
                      onChange={this.changePasswordConfirmation}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Skapa konto
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
