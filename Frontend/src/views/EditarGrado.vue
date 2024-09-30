<template>
  <div class="admin-panel">
    <!-- Barra superior -->
    <header class="header">
      <h1>Editar Grado</h1>
      <button class="logout" @click="salir">Salir</button>
    </header>

    <!-- Formulario de edición -->
    <div class="main-content">
      <section class="grade-edit">
        <h2>Editar el nombre del grado</h2>
        <div class="form-container">
          <!-- Campo de entrada para el nombre -->
          <label for="nombre">Nuevo Nombre</label>
          <input
            v-model="grado.nombre"
            placeholder="Nombre"
            class="input-field"
            id="nombre"
          />
          <button @click="actualizarGrado" class="edit-button">Guardar</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { GradosService } from "@/modelo/GradosService.mjs";

export default {
  data() {
    return {
      grado: {
        id: null,
        nombre: "",
      },
      gradosService: new GradosService(),
    };
  },
  async created() {
    // Obtener el ID desde los parámetros de la URL
    const id = this.$route.params.id;

    // Cargar el grado específico para edición
    await this.cargarGrado(id);
  },
  methods: {
    async cargarGrado(id) {
      try {
        // Llamada al servicio para obtener el grado por ID (si es necesario)
        const grados = await this.gradosService.obtenerGrados();
        const grado = grados.find((g) => g.id === parseInt(id));

        if (grado) {
          this.grado = { ...grado };
        } else {
          alert("Grado no encontrado");
        }
      } catch (error) {
        console.error("Error cargando el grado:", error);
      }
    },
    async actualizarGrado() {
      try {
        if (!this.grado.nombre) {
          alert("Por favor ingrese un nombre válido");
          return;
        }

        await this.gradosService.actualizarGrado(
          this.grado.id,
          this.grado.nombre
        );

        alert("Grado actualizado exitosamente");
        this.$router.push("/Grados-Crud"); // Redirige de nuevo a la lista de grados después de la edición
      } catch (error) {
        console.error("Error actualizando el grado:", error);
      }
    },
    salir() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Estilos similares a los que ya tienes */
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
  justify-content: center;
  align-items: center;
}

.grade-edit {
  background-color: #ddd;
  padding: 20px;
  border-radius: 8px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.edit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
