import { Layout, Typography } from "antd";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

function Footer() {
  return (
    <AntFooter
      style={{
        backgroundColor: "#61abff",
        textAlign: "center",
        padding: "10px 0",
      }}
    >
      <Text style={{ color: "#fff", fontSize: "14px" }}>
        © 2021 Joto Education Center. All rights reserved.
      </Text>
    </AntFooter>
  );
}

export default Footer;
