import { Logger } from "../utils/logger";

export class Marcadores {
  constructor() {
    this.activos = {};
    this.logger = new Logger('Map App')
  }



  agregarMarcador(marcador) {
    this.logger.log(`Agregando ${JSON.stringify(marcador)}`)
    this.logger.log(`Cantidad ${Object.values(this.activos).length + 1}`)
    this.activos[marcador.id] = marcador;
    return marcador;
  }

  quitarMarcador(id) {
    this.logger.log(`Removiendo: ${id}`)
    delete this.activos[id];
  }

  actualizarMarcador(marcador) {
    this.logger.log(`moviendo: ${marcador.id}`)
    this.activos[marcador.id] = marcador;
  }
}
