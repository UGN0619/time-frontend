import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const ContentSection = ({ children, background, borderRadius }) => {
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background,
          borderRadius,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default ContentSection;
