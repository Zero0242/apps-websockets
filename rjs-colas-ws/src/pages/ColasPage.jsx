import { Card, Col, Divider, List, Row, Tag, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useMenuHandler } from "../hooks/useMenuHandler";
const { Title, Text } = Typography;

export const ColasPage = () => {
  useMenuHandler(true);
  /** @type {{socket:import("socket.io-client").Socket}} */
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    socket.on("ticket:listado", (data) => {
      setTickets(data);
    });

    return () => {
      socket.off("ticket:listado");
    };
  }, [socket]);

  useEffect(() => {
    cargarUltimosTickets();
  }, []);

  const cargarUltimosTickets = async () => {
    const resp = await fetch("http://localhost:3000/ultimos");
    const data = await resp.json();
    if (data.ok) {
      setTickets(data.tickets);
    }
  };

  return (
    <>
      <Title>Atendiendo al cliente</Title>
      <Row align={"top"}>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: "300px", marginTop: "16px" }}
                  actions={[
                    <Tag color="volcano">{item.agente}</Tag>,
                    <Tag color="magenta">Escritorio: {item.escritorio}</Tag>,
                  ]}
                >
                  <Title>No. {item.numero}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket no: ${item.numero}`}
                  description={
                    <>
                      <Text>En el escritorio: </Text>
                      <Tag color="magenta">{item.numero}</Tag>
                      <Text>Agente: </Text>
                      <Tag color="magenta">{item.agente}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
