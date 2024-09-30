<template>
  <div class="admin-panel">
    <!-- Barra superior -->
    <header class="header">
      <h1>Admin</h1>
    </header>

    <!-- Contenedor principal -->
    <div class="main-content">
      <!-- Menú lateral -->

      <!-- Sección principal con los grados -->
      <section class="grades">
        <h2>Grados</h2>
        <div class="grades-container">
          <div class="grade-card" v-for="grado in grados" :key="grado.id">
            <p>{{ grado.nombre }}</p>
            <button @click="editarGrado(grado.id)" class="edit-button">
              ✏️
            </button>
            <button @click="eliminarGrado(grado.id)" class="delete-button">
              ❌
            </button>
          </div>
          <div class="add-grade">
            <button class="add-button" @click="agregarGrado">➕</button>
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
      grados: [],
      gradosService: new GradosService(),
    };
  },
  async created() {
    await this.cargarGrados();
  },
  methods: {
    async cargarGrados() {
      try {
        this.grados = await this.gradosService.obtenerGrados();
      } catch (error) {
        console.error("Error cargando grados:", error);
      }
    },
    agregarGrado() {
      this.$router.push("/Crear-Grado");
    },
    editarGrado(id) {
      this.$router.push(`/Editar-Grado/${id}`);
    },
    async eliminarGrado(id) {
      // Pregunta de confirmación
      const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este grado?"
      );
      if (confirmar) {
        try {
          await this.gradosService.eliminarGrado(id);
          alert("Grado eliminado exitosamente");
          this.cargarGrados(); // Recargar la lista de grados después de la eliminación
        } catch (error) {
          console.error("Error eliminando el grado:", error);
          alert("Ocurrió un error al eliminar el grado.");
        }
      }
    },
  },
};
</script>

<style scoped>
/* Añade los estilos necesarios para el diseño */
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

.grades {
  flex: 1;
  padding: 20px;
}

.grades h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.grades-container {
  display: flex;
  gap: 20px;
}

.grade-card,
.add-grade {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  text-align: center;
  width: 200px;
  position: relative;
}

.grade-card img {
  width: 100px;
  height: 100px;
}

.edit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.add-button {
  background-color: #6c757d;
  color: white;
  border: none;
  font-size: 24px;
  padding: 20px;
  border-radius: 50%;
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
