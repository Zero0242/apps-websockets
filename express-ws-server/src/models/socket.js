import { Logger } from "../utils/logger";
import BandList from "./band-list";
import { Marcadores } from "./marcadores";
import { TicketList } from "./ticket-list";

export class SocketServer {
  /**
   * Inyecta el socket aca
   * @param {import("socket.io").Server} io
   */
  constructor(io) {
    this.io = io;
    this.logger = new Logger('Socket');
    this.bandList = new BandList();
    this.markerService = new Marcadores();
    this.ticketService = new TicketList();
    this.checkConnections();
  }

  checkConnections() {
    this.io.on("connection", (socket) => {
      this.logger.log(`Conectado usuario ${socket.id}`);
      this.bandEvents(socket)
      this.mapEvents(socket)
      this.colasEvents(socket)
    });
  }

  /* Bandas App */
  bandEvents(socket) {
    // * Evento bandas actuales
    socket.emit(IOEvent.bands, this.bandList.getBands());

    // * Recibiendo evento votos
    socket.on(IOEvent.vote, (id) => {
      this.bandList.increaseVotes(id);
      this.emitBandList();
    });
    // * Eliminar banda
    socket.on(IOEvent.delete, (id) => {
      this.bandList.removeBand(id);
      this.emitBandList();
    });
    // * Actualizar banda
    socket.on(IOEvent.update, ({ id, name }) => {
      this.bandList.changeBandName({ id, name });
      this.emitBandList();
    });
    // * Crear banda
    socket.on(IOEvent.add, (nombre) => {
      this.bandList.addBand(nombre);
      this.emitBandList();
    });

    socket.on(IOEvent.disconnect, (reason) => {
      this.logger.log(`Usuario desconectado: ${reason}`);
    });
  }


  emitBandList() {
    this.io.emit(IOEvent.bands, this.bandList.getBands());
  }

  /* Colas App  */
  colasEvents(socket) {

    socket.on("ticket:solicitar", (payload, callback) => {
      const nuevoTicket = this.ticketService.crearTicket();
      // * Recibimos un callback desde el frontend y lo ejecutamos aca
      callback(nuevoTicket);
    });

    socket.on("ticket:siguiente", (data, callback) => {
      const { agente, escritorio } = data;
      const suTicket = this.ticketService.asignarTicket(
        agente,
        Number(escritorio)
      );

      callback(suTicket);

      // * Notificar usuarios
      this.io.emit("ticket:listado", this.ticketService.ultimos13);
    });

    socket.on("disconnect", (r) => {
      this.logger.log(`Se desconectó: ${socket.id} - ${r}`);
    });
  }

  /*  Mapas App */
  mapEvents(socket) {

    // * Recupera los marcadores para el cliente
    socket.emit(MapEvent.listar, this.markerService.activos);

    socket.on(MapEvent.crear, (marker) => {
      const insert = this.markerService.agregarMarcador(marker);
      console.log(JSON.stringify(this.markerService.activos, null, 4));


      socket.broadcast.emit(MapEvent.crear, insert);
    });

    socket.on(MapEvent.mover, (marcador) => {
      this.markerService.actualizarMarcador(marcador);
      socket.broadcast.emit(MapEvent.mover, marcador);
    });
  }
}



/* Bandas */
const IOEvent = Object.freeze({
  connect: "connection",
  disconnect: "disconnect",
  vote: "vote-band",
  delete: "delete-band",
  add: "add-band",
  update: "update-band",
  bands: "current-bands",
});


/* Mapas */
const MapEvent = Object.freeze({
  listar: 'marker:get',
  crear: 'marker:create',
  mover: 'marker:update'
})