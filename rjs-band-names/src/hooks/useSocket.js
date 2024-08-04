import { useEffect, useMemo, useState } from "react";
import { connect } from "socket.io-client";

export const useSocket = (server) => {
  const socket = useMemo(
    () => connect(server, { transports: ["websocket"] }),
    [server]
  );
  const [online, setOnline] = useState(false);

  useEffect(() => {
    socket.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => setOnline(false));
  }, [socket]);

  return { socket, online };
};
