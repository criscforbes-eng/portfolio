import { Usuario } from './usuario.js';

export class Organizador extends Usuario {

    constructor({
        nombre,
        correo,
        password,
        telefono,
        cedulaJuridica,
        direccion,
        carrerasCreadas = []
    }) {
        super({ nombre, correo, password, telefono });
        this.cedulaJuridica = cedulaJuridica;
        this.direccion = direccion;
        this.carrerasCreadas = carrerasCreadas;
    }

    agregarCarrera(carrera) {
        this.carrerasCreadas.push(carrera);
    }

    mostrarInfoOrganizador() {
        return `${super.mostrarInfoUsuario()} - Cédula Jurídica: ${this.cedulaJuridica} - Dirección: ${this.direccion} - Carreras creadas: ${this.carrerasCreadas.length}`;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            cedulaJuridica: this.cedulaJuridica,
            direccion: this.direccion,
            carrerasCreadas: this.carrerasCreadas
        };
    }
}
