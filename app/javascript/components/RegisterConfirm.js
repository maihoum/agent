import React from "react";

class RegisterConfirm extends React.Component {
  render() {
    return (
      <div className="auth-page">
        <img
          className="fullwidthBackgroundImage"
          src="https://static.wixstatic.com/media/c555555df14347c3ad9aaf3625f4354e.jpg/v1/fill/w_1155,h_899,al_c,q_85/c555555df14347c3ad9aaf3625f4354e.webp"
        />
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12 mt-5">
              <h2 className="text-xs-center">Bara ett steg kvar</h2>
              <p className="text-xs-center">
                Vi har skickat ett mail till dig med en bekräftelselänk.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterConfirm;
