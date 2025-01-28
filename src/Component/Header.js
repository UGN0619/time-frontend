import "../Style/Header.css";
import logo from "../Images/logo.png";

function Header() {
  return (
    <div className="header">
      <a href="/">
        <img
          src={logo}
          alt="logo"
          width={"80px"}
          style={{ marginLeft: "20px" }}
        />
      </a>
      <div className="links" style={{}}>
        <div style={{ padding: "10px" }}>
          <a href="/addworker" className="btn">
            {" "}
            Шинэ ажилтан нэмэх
          </a>
        </div>

        <div style={{ padding: "10px" }}>
          <a href="/time-tracker" className="btn">
            {" "}
            Цагийн хүснэгт
          </a>
        </div>

        <div style={{ padding: "10px" }}>
          <a href="/info" className="btn">
            {" "}
            Мэдээлэл
          </a>
        </div>

        <div style={{ padding: "10px" }}>
          <a href="/about" className="btn">
            {" "}
            Бидний тухай
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
