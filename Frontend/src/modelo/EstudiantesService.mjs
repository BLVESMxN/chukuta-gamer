export class EstudiantesService {
  constructor() {
    this.dummyEstudiantes = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        is_active: true,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        is_active: false,
      },
    ];
  }

  // Método para obtener todos los estudiantes
  async obtenerEstudiantes() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.dummyEstudiantes);
      }, 500);
    });
  }

  // Método para obtener un estudiante por ID
  async obtenerEstudiantePorId(id) {
    return new Promise((resolve) => {
      const estudiante = this.dummyEstudiantes.find(
        (estudiante) => estudiante.id === id
      );
      setTimeout(() => {
        resolve(estudiante);
      }, 500);
    });
  }

  // Método para agregar un nuevo estudiante
  async agregarEstudiante(name, email, password, is_active) {
    const nuevoEstudiante = {
      id: this.dummyEstudiantes.length + 1,
      name,
      email,
      is_active,
    };
    this.dummyEstudiantes.push(nuevoEstudiante);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(nuevoEstudiante);
      }, 500);
    });
  }

  // Método para editar un estudiante
  async editarEstudiante(id, name, email, is_active) {
    const estudiante = this.dummyEstudiantes.find((est) => est.id === id);
    if (estudiante) {
      estudiante.name = name;
      estudiante.email = email;
      estudiante.is_active = is_active;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(estudiante);
      }, 500);
    });
  }

  // Método para eliminar un estudiante
  async eliminarEstudiante(id) {
    this.dummyEstudiantes = this.dummyEstudiantes.filter(
      (estudiante) => estudiante.id !== id
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
}
