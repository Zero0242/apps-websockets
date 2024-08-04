import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

/**
 * Genera un socket
 * @param {string} path
 * @returns
 */
export const useSocket = (path) => {
  const socket = useMemo(() => io(path), [path]);

  const [online, setOnline] = useState(false);

  useEffect(() => {
    socket.on("connected", () => {
      console.log("Estamos conectado");
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnected", () => {
      console.log("Estamos desconectados");
      setOnline(false);
    });
  }, [socket]);

  return { socket, online };
};
