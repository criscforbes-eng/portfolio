//Clase sin herencia para la creacion de objetos Inscripcion

export class Inscripcion{
    constructor(id,corredorId,carreraId,montoPagado,numeroCorredor){
        this.id = id;
        this.corredorId = corredorId;
        this.carreraId = carreraId;
        this.montoPagado = montoPagado;
        this.numeroCorredor = numeroCorredor;
    }

    mostrarInfo() {
    return `id: ${this.id}, Nombre del corredor: ${this.corredorId}, Carrera ID =: ${this.carreraId}, Monto Pagado: ${this.montoPagado}, Numero de Corredorr: ${this.numeroCorredor}`;
  }
}