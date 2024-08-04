import React from "react";
import { SocketProvider } from "./context";
import { BandPage } from "./pages";

const BandApp = () => {
  return (
    <SocketProvider>
      <BandPage />
    </SocketProvider>
  );
};

export default BandApp;
