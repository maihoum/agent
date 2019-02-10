import React from "react";

class MainView extends React.Component {
  render() {
    const loggedIn = !!this.props.currentUser;
    return (
      <div className="text-center m-auto" style={{ maxWidth: "700px" }}>
        <img
          className="fullwidthBackgroundImage"
          src="https://static.wixstatic.com/media/c555555df14347c3ad9aaf3625f4354e.jpg/v1/fill/w_1155,h_899,al_c,q_85/c555555df14347c3ad9aaf3625f4354e.webp"
        />
        {loggedIn ? (
          <div />
        ) : (
          <div>
            <h1
              style={{
                margin: "165px auto 50px auto",
                textTransform: "uppercase",
                fontWeight: 700,
                letterSpacing: "4px"
              }}
            >
              Prisvärda mäklare till din bostadsförsäljning
            </h1>
            <hr style={{ margin: "60px auto 40px auto", width: "100px" }} />
            <span style={{ fontSize: "22px" }}>
              Maihoum ger dig en smidig och transparent säljprocess med
              kompetenta och oberoende mäklare, så att du slipper stressen!
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default MainView;
