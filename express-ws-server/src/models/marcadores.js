export class Marcadores {
  constructor() {
    this.activos = {};
  }

  agregarMarcador(marcador) {
    this.activos[marcador.id] = marcador;

    return marcador;
  }

  quitarMarcador(id) {
    delete this.activos[id];
  }

  actualizarMarcador(marcador) {
    this.activos[marcador.id] = marcador;
  }
}
