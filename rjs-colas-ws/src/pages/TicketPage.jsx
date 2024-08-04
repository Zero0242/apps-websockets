import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useMenuHandler } from "../hooks/useMenuHandler";
const { Title, Text } = Typography;

const colSpan = {
  span: 14,
  offset: 6,
};

export const TicketPage = () => {
  /** @type {{socket:import("socket.io-client").Socket}} */
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState({});

  useMenuHandler(false);

  const crearTicket = () => {
    // * Tiramos un callback al backend y lo ejecutan alla
    socket.emit("ticket:solicitar", null, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row justify={"center"} align={"middle"}>
        <Col>
          <Title>Presione el botón para crear un ticket</Title>
        </Col>
      </Row>
      <Row justify={"center"} align={"middle"}>
        <Button type="primary" shape="round" size="large" onClick={crearTicket}>
          <DownloadOutlined />
          Nuevo Ticket
        </Button>
      </Row>
      {ticket && (
        <Row style={{ marginTop: "100px" }} justify={"center"} align={"middle"}>
          <Col>
            <Text>Su numero</Text>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
