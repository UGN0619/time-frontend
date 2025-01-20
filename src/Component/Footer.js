import "../Style/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div style={{ padding: "40px" }}>
        <a href="/time-tracker" className="btn">
          {" "}
          Time Sheet
        </a>
      </div>
      <div style={{ padding: "40px" }}>
        <a href="/info" className="btn">
          {" "}
          Information
        </a>
      </div><div style={{ padding: "40px" }}>
        <a href="/about" className="btn">
          {" "}
          About Us
        </a>
      </div>
    </div>
  );
}

export default Footer;
