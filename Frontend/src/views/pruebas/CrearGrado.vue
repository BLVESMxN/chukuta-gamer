<template>
  <div class="admin-panel">
    <!-- Barra superior -->
    <header class="header">
      <h1>Admin</h1>
    </header>

    <!-- Contenedor principal -->
    <div class="main-content">
      <!-- Menú lateral -->
      <aside class="sidebar">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Tareas</a></li>
          <li><a href="#">Asistencia</a></li>
        </ul>
      </aside>

      <!-- Formulario de Creación de Grados -->
      <section class="grade-creation">
        <h2>Creación de Grados</h2>
        <div class="form-container">
          <!-- Simulación de una imagen de grados -->
          <div class="grade-image"></div>

          <!-- Campos de entrada -->
          <div class="form-fields">
            <label for="nombre">Nombre</label>
            <input
              v-model="nuevoGrado.nombre"
              placeholder="Nombre"
              class="input-field"
              id="nombre"
            />
          </div>

          <!-- Botones de Acción -->
          <div class="action-buttons">
            <button @click="cancelar" class="cancel-button">Cancelar</button>
            <button @click="agregarGrado" class="add-button">Agregar</button>
          </div>
        </div>
      </section>
    </div>

    <!-- Pie de página -->
    <footer class="footer">
      <p>StudentGest | StudentGest@gmail.com</p>
      <div class="social-media">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-linkedin"></i></a>
      </div>
    </footer>
  </div>
</template>

<script>
import { GradosService } from "@/modelo/GradosService.mjs";

export default {
  data() {
    return {
      nuevoGrado: {
        nombre: "",
        grado: 0,
      },
      gradosService: new GradosService(),
    };
  },
  methods: {
    async agregarGrado() {
      try {
        // Validación simple
        if (!this.nuevoGrado.nombre) {
          alert("Por favor, complete todos los campos.");
          return;
        }

        await this.gradosService.agregarGrado(this.nuevoGrado.nombre);

        alert("¡Grado agregado exitosamente!");
        this.resetFormulario();
      } catch (error) {
        console.error("Error al agregar el grado:", error);
      }
    },
    cancelar() {
      this.resetFormulario();
    },
    resetFormulario() {
      this.nuevoGrado = {
        nombre: "",
        grado: 0,
      };
    },
  },
};
</script>

<style scoped>
/* Estilos generales del panel */
.admin-panel {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #d6cac1;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 24px;
}

.logout {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 200px;
  background-color: #f3f3f3;
  padding: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 20px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.grade-creation {
  flex: 1;
  padding: 20px;
}

.grade-creation h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ddd;
  padding: 20px;
  border-radius: 8px;
}

.grade-image img {
  width: 150px;
  height: 150px;
  background-color: #ccc;
  margin-bottom: 20px;
}

.form-fields {
  display: flex;
  flex-direction: column;
}

.form-fields label {
  margin-bottom: 5px;
  font-size: 16px;
}

.input-field {
  display: block;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.action-buttons {
  display: flex;
  gap: 20px;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.add-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
}

.social-media a {
  color: white;
  margin: 0 10px;
  font-size: 24px;
}
</style>
