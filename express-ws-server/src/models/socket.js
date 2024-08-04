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
      socket.on("disconnect", (r) => {
        this.logger.log(`Se desconectó: ${socket.id} - ${r}`);
      });
    });
  }

  /* Bandas App */
  /** @param {import("socket.io").Socket} socket*/
  bandEvents(socket) {
    // * Evento bandas actuales
    socket.emit(WSBandsEvents.listar, this.bandList.getBands());

    // * Recibiendo evento votos
    socket.on(WSBandsEvents.votar, (id) => {
      this.bandList.increaseVotes(id);
      this.io.emit(WSBandsEvents.listar, this.bandList.getBands());
    });
    // * Eliminar banda
    socket.on(WSBandsEvents.eliminar, (id) => {
      this.bandList.removeBand(id);
      this.io.emit(WSBandsEvents.listar, this.bandList.getBands());
    });
    // * Actualizar banda
    socket.on(WSBandsEvents.actualizar, ({ id, name }) => {
      this.bandList.changeBandName({ id, name });
      this.io.emit(WSBandsEvents.listar, this.bandList.getBands());
    });
    // * Crear banda
    socket.on(WSBandsEvents.crear, (nombre) => {
      this.bandList.addBand(nombre);
      this.io.emit(WSBandsEvents.listar, this.bandList.getBands());
    });
  }

  /* Colas App  */
  /** @param {import("socket.io").Socket} socket*/
  colasEvents(socket) {
    // * Solicitan un numero
    socket.on(WSColasEvent.solicitar, (payload, callback) => {
      const nuevoTicket = this.ticketService.crearTicket();
      // ? Ejecutamos un callback del frontend
      callback(nuevoTicket);
    });

    // * El agente pasa al siguiente numero
    socket.on(WSColasEvent.siguiente, (data, callback) => {
      const { agente, escritorio } = data;
      const suTicket = this.ticketService.asignarTicket(agente, +escritorio);
      // ? Ejecutamos un callback del frontend
      callback(suTicket);
      // * Notificar usuarios
      this.io.emit(WSColasEvent.listar, this.ticketService.ultimos13);
    });
  }

  /*  Mapas App */
  /** @param {import("socket.io").Socket} socket*/
  mapEvents(socket) {
    // * Recupera los marcadores para el cliente
    socket.emit(WSMapsEvent.listar, this.markerService.activos);

    // * Alguien crea el marker y avisa a los demas
    socket.on(WSMapsEvent.crear, (marker) => {
      const insert = this.markerService.agregarMarcador(marker);
      socket.broadcast.emit(WSMapsEvent.crear, insert);
    });

    // * Alguien mueve el marker y avisa a los demas
    socket.on(WSMapsEvent.mover, (marcador) => {
      this.markerService.actualizarMarcador(marcador);
      socket.broadcast.emit(WSMapsEvent.mover, marcador);
    });
  }
}



/* Bandas */
const WSBandsEvents = Object.freeze({
  votar: "vote-band",
  eliminar: "delete-band",
  crear: "add-band",
  actualizar: "update-band",
  listar: "current-bands",
});

/* Colas */
const WSColasEvent = Object.freeze({
  solicitar: "ticket:solicitar",
  siguiente: "ticket:siguiente",
  listar: "ticket:listado"
})

/* Mapas */
const WSMapsEvent = Object.freeze({
  listar: 'marker:get',
  crear: 'marker:create',
  mover: 'marker:update'
})