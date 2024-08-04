import { CloseCircleFilled, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { useMenuHandler } from "../hooks/useMenuHandler";
const { Title, Text } = Typography;

export const EscritorioPage = () => {
  useMenuHandler(false);
  /** @type {{socket:import("socket.io-client").Socket}} */
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [usuario] = useState(getUsuarioStorage());
  const [ticketATrabajar, setTicketATrabajar] = useState(null);

  const salir = () => {
    localStorage.clear();
    navigate("/ingreso", { replace: true });
  };

  const siguienteTicket = () => {
    socket.emit("ticket:siguiente", usuario, (ticket) => {
      setTicketATrabajar(ticket);
    });
  };

  if (!usuario.agente || !usuario.escritorio) {
    return <Navigate to={"/ingreso"} />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted esta trabajando en el escritorio </Text>
          <Text type="success">{usuario.escritorio}</Text>
        </Col>
        <Col span={4} flex={"auto"}>
          <Button shape="round" type="primary" danger onClick={salir}>
            <CloseCircleFilled />
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticketATrabajar && (
        <Row>
          <Col>
            <Text>Esta atendiendo al ticket </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticketATrabajar.numero}
            </Text>
          </Col>
        </Row>
      )}
      <Row>
        <Col span={20}></Col>
        <Col>
          <Button onClick={siguienteTicket} shape="round" type="primary">
            Siguiente Ticket
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};
