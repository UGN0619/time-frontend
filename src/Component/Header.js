import "../Style/Header.css";
import logo from "../Images/logo.png"; // Specify the image file name with extension

function Header() {
  return (
    <div className="header">
      <img
        src={logo}
        alt="logo"
        width={"80px"}
        style={{ marginLeft: "20px" }}
      />
      <h1 style={{ marginRight: "20px" }}>Миний таск зохицуулагч</h1>
    </div>
  );
}

export default Header;
