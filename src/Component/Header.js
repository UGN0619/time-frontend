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
      <div className="links">
        <div style={{ padding: "10px", display: "flex" }}>
          <a href="/addworker" className="btn">
            {" "}
            Шинэ ажилтан нэмэх
          </a>
        </div>

        <div style={{ padding: "10px", display: "flex" }}>
          <a href="/time-tracker" className="btn">
            {" "}
            Цагийн хүснэгт
          </a>
        </div>

        <div style={{ padding: "10px", display: "flex" }}>
          <a href="/info" className="btn">
            {" "}
            Бидний тухай
          </a>
        </div>

        <div style={{ padding: "10px", display: "flex" }}>
          <a href="/task" className="btn">
            {" "}
            Таск
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
