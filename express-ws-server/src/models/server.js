import cors from "cors";
import express from "express";
import { createServer } from "http";
import { join } from "path";
import { Server as IOServer } from "socket.io";
import { SocketServer } from "./socket";

export class Server {
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new IOServer(this.server, { cors: { origin: "*" } });
    this.ioGateway = new SocketServer(this.io);
  }

  setMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static(join(__dirname, "..", "..", "public")));
    this.app.use(cors());
    this.app.get("/ultimos", (req, res) => {
      res.json({ ok: true, tickets: this.ioGateway.ticketService.ultimos13 });
    });
  }

  listen() {
    this.setMiddleware();
    this.server.listen(3000, (a) =>
      console.log(`Corriendo en el puerto ${3000}`)
    );
  }
}
