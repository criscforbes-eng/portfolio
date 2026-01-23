//Clase sin herencia para la creacion de objetos Carrera

export class Carrera {

  static estadosPermitidos = ["disponible", "sin_cupo", "finalizada"];

  constructor({
    _id,
    nombre,
    fechaCreacion,
    fechaHoraInicio,
    lugar,
    cuposDisponibles = 0,
    precio,
    imagen = null,            
    estado = ["disponible"],  
    organizador = null,
    inscripciones = []        
  }) {

    // ID que viene de Mongo (si se crea desde frontend será null)
    this.id = _id ?? null;

    this.nombre = nombre;

    // evita "Invalid Date" cuando fechaCreacion es undefined
    this.fechaCreacion = fechaCreacion
      ? new Date(fechaCreacion)
      : new Date(); // fecha actual si se crea en frontend

    this.fechaHoraInicio = new Date(fechaHoraInicio);

    this.lugar = lugar;

    // Backend maneja cupos disponibles
    this.cuposDisponibles = Number(cuposDisponibles);

    // Cantidad de inscritos según array del backend
    this.inscritos = Array.isArray(inscripciones) ? inscripciones.length : 0;

    // Normalizar estado (backend envía array)
    this.estado = Array.isArray(estado) ? (estado[0] || "disponible") : estado;

    this.precio = Number(precio);

    this.imagen = imagen;

    this.organizador = organizador;
  }

  // Getter que calcula cupo restante
  get cupoRestante() {
    return Math.max(0, this.cuposDisponibles - this.inscritos);
  }

  mostrarInfoCarrera() {
    return `
      Id: ${this.id}
      - Nombre: ${this.nombre}
      - Fecha de creación: ${this.fechaCreacion}
      - Fecha inicio: ${this.fechaHoraInicio}
      - Lugar: ${this.lugar}
      - Precio: ${this.precio}
      - Cupos disponibles (backend): ${this.cuposDisponibles}
      - Inscritos (backend): ${this.inscritos}
      - Cupo restante (calculado): ${this.cupoRestante}
      - Estado: ${this.estado}
      - Imagen: ${this.imagen}
    `;
  }

  puedeInscribirse() {
    return (
      this.estado === "disponible" &&
      this.cupoRestante > 0 &&
      new Date() < this.fechaHoraInicio
    );
  }

  registrarInscripcion() {
    if (!this.puedeInscribirse()) {
      throw new Error("No se puede inscribir: carrera no disponible, sin cupo o ya iniciada.");
    }

    this.inscritos += 1;
    this.actualizarEstadoSegunCupo();

    return true;
  }

  cancelarInscripcion() {
    if (this.inscritos <= 0) return false;

    this.inscritos -= 1;
    this.actualizarEstadoSegunCupo();
    return true;
  }

  finalizarCarrera() {
    this.estado = "finalizada";
  }

  setEstado(nuevoEstado) {
    if (!Carrera.estadosPermitidos.includes(nuevoEstado)) {
      throw new Error(`Estado inválido. Permitidos: ${Carrera.estadosPermitidos.join(", ")}`);
    }
    this.estado = nuevoEstado;
  }

  actualizarEstadoSegunCupo() {
    if (this.cuposDisponibles > 0 && this.inscritos >= this.cuposDisponibles) {
      this.estado = "sin_cupo";
    } else if (this.estado !== "finalizada") {
      this.estado = "disponible";
    }
  }
}

