import "../Style/Header.css";
import logo from "../Images/logo.png"; // Specify the image file name with extension

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          marginLeft: "150px",
          height: "100%",
          alignItems: "center",
        }}
      >
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
