// clase padre usuario
export class Usuario {

    static contadorUsuarios = 0;
    static dominiosPermitidos = ["gmail.com", "hotmail.com", "outlook.com"];

    constructor({ nombre, correo, password, telefono }) {
        this.id = Usuario.generarId();
        this.nombre = nombre;
        this.correo = Usuario.validarCorreo(correo) ? correo : null;
        this.telefono = telefono;
        this._password = password; 
    }

    static generarId() {
        return `U-${++Usuario.contadorUsuarios}`;
    }

    static validarCorreo(correo) {
        if (!correo || !correo.includes("@")) return false;
        const dominio = correo.split("@")[1];
        return Usuario.dominiosPermitidos.includes(dominio);
    }

    static validarPassword(password) {
        return password.trim().length <= 8;
    }

    get password() {
        return this._password;
    }

    set password(nuevoPassword) {
        this._password = nuevoPassword;
    }

    mostrarInfoUsuario() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Correo: ${this.correo}, Teléfono: ${this.telefono}`;
    }

    isPasswordCorrect(passwordInput) {
        return passwordInput === this._password;
    }

    // Clave para que el backend reciba todo correctamente***
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            correo: this.correo,
            telefono: this.telefono,
            password: this._password  
        };
    }
}

