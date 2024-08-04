import { SaveOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, InputNumber, Typography } from "antd";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { useMenuHandler } from "../hooks/useMenuHandler";

const { Title, Text } = Typography;

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 14 },
};

export const LoginPage = () => {
  useMenuHandler(false);
  const navigate = useNavigate();
  const [usuario] = useState(getUsuarioStorage());

  const onFinish = ({ agente, escritorio }) => {
    localStorage.setItem("agente", agente);
    localStorage.setItem("escritorio", escritorio);

    navigate("/escritorio");
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  if (usuario.agente && usuario.escritorio) {
    return <Navigate to={"/escritorio"} />;
  }

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y numero de escritorio</Text>
      <Divider />
      <Form
        {...formLayout}
        name="basic"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre Agente"
          name="agente"
          rules={[
            {
              required: true,
              message: "Ingrese su nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: "Ingrese el número de escritorio",
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
