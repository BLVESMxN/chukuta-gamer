export class Grado {
    constructor(data = {}) {
        this.id = data.id || null;
        this.nombre = data.nombre || '';
        this.asignaturas = data.asignaturas ? data.asignaturas.map(asignatura => new Asignatura(asignatura)) : []; // List of Asignaturas
    }

    static fromJson(json) {
        return new Grado({
            id: json.id,
            nombre: json.nombre,
            asignaturas: (json.asignaturas || []).map(asignatura => Asignatura.fromJson(asignatura)),
        });
    }

    toJson() {
        return {
            id: this.id,
            nombre: this.nombre,
            asignaturas: this.asignaturas.map(asignatura => asignatura.toJson()), 
        };
    }

    updateItem(newGrado) {
        this.nombre = newGrado.nombre;
        this.asignaturas = newGrado.asignaturas; 
    }
}

export class Asignatura {
    constructor(data = {}) {
        this.id = data.id || null;
        this.nombre = data.nombre || '';
        this.grado = data.grado ? new Grado(data.grado) : new Grado();
    }

    static fromJson(json) {
        return new Asignatura({
            id: json.id,
            nombre: json.nombre,
            grado: Grado.fromJson(json.grado),
        });
    }

    toJson() {
        return {
            id: this.id,
            nombre: this.nombre,
            grado: this.grado.toJson(),
        };
    }

    updateItem(newAsignatura) {
        this.nombre = newAsignatura.nombre;
        this.grado = newAsignatura.grado;
    }
}

export class Estudiante {
    constructor(data = {}) {
        this.id = data.id || null;
        this.nombres = data.nombres || '';
        this.apellidos = data.apellidos || '';
        this.fechaNacimiento = data.fecha_nacimiento || '';
        this.grado = data.grado ? new Grado(data.grado) : new Grado();
    }

    static fromJson(json) {
        return new Estudiante({
            id: json.id,
            nombres: json.nombres,
            apellidos: json.apellidos,
            fecha_nacimiento: json.fecha_nacimiento,
            grado: Grado.fromJson(json.grado), 
        });
    }

    toJson() {
        return {
            id: this.id,
            nombres: this.nombres,
            apellidos: this.apellidos,
            fecha_nacimiento: this.fechaNacimiento,
            grado: this.grado.toJson(), 
        };
    }

    updateItem(newEstudiante) {
        this.nombres = newEstudiante.nombres;
        this.apellidos = newEstudiante.apellidos;
        this.fechaNacimiento = newEstudiante.fechaNacimiento;
        this.grado = newEstudiante.grado;
    }
}



