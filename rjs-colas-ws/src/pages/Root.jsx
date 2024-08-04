import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UiContext } from "../context/UiContext";
const { Sider, Content } = Layout;

export const Root = () => {
  const { ocultarMenu } = useContext(UiContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsedWidth={0} breakpoint="md" hidden={ocultarMenu}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key={1} icon={<UserOutlined />}>
            <Link to={"/ingreso"}>Ingresar</Link>
          </Menu.Item>
          <Menu.Item key={2} icon={<VideoCameraOutlined />}>
            <Link to={"/colas"}>Cola</Link>
          </Menu.Item>
          <Menu.Item key={3} icon={<UploadOutlined />}>
            <Link to={"/crear-ticket"}>Crear Ticket</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* Vista */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
