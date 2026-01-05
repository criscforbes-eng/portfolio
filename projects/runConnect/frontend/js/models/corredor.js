import { Usuario } from './usuario.js';

export class Corredor extends Usuario {

    constructor({
        nombre,
        correo,
        password,
        telefono,
        cedulaIdentidad,
        fechaNacimiento,
        carrerasInscritas = []
    }) {
        super({ nombre, correo, password, telefono });
        this.cedulaIdentidad = cedulaIdentidad;
        this.fechaNacimiento = fechaNacimiento;
        this.carrerasInscritas = carrerasInscritas;
        this.edad = this.calcularEdad();
    }

    calcularEdad() {
        const nacimiento = new Date(this.fechaNacimiento);
        const hoy = new Date();
        return hoy.getFullYear() - nacimiento.getFullYear();
    }

    inscribirACarrera(carrera) {
        this.carrerasInscritas.push(carrera);
    }

    mostrarInfoCorredor() {
        return `${super.mostrarInfoUsuario()} - Cédula: ${this.cedulaIdentidad} - Edad: ${this.edad} - Carreras inscritas: ${this.carrerasInscritas.length}`;
    }

    // NECESARIO PARA QUE MONGO RECIBA la cedulaIdentidad**
    toJSON() {
        return {
            ...super.toJSON(),
            cedulaIdentidad: this.cedulaIdentidad,
            fechaNacimiento: this.fechaNacimiento,
            carrerasInscritas: this.carrerasInscritas
        };
    }
}

