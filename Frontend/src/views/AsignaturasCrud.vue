<template>
  <div class="app-container">
    <header id="header">
      <h1>Listado de Asignaturas</h1>
    </header>

    <!-- Sección para mostrar tarjetas de asignaturas -->
    <div class="cards-container">
      <div v-for="asignatura in asignaturas" :key="asignatura.id" class="card">
        <!-- Botones de editar y eliminar -->
        <div class="card-actions">
          <button @click="editarAsignatura(asignatura.id)" class="edit-button">
            📝
          </button>
          <button
            @click="eliminarAsignatura(asignatura.id)"
            class="delete-button"
          >
            ❌
          </button>
        </div>

        <!-- Contenido de la tarjeta -->
        <h2>{{ asignatura.nombre }}</h2>
        <p><strong>ID de la Asignatura:</strong> {{ asignatura.id }}</p>
        <p><strong>Grado:</strong> {{ asignatura.grado }}</p>
        <p><strong>Colegio:</strong> {{ asignatura.colegioNombre }}</p>
      </div>

      <!-- Tarjeta para agregar una nueva asignatura -->
      <div class="card agregar-asignatura-card" @click="irAgregarAsignatura">
        <div class="add-icon">➕</div>
        <h2>Agregar Asignatura</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { AsignaturaModel } from "@/modelo/AsignaturaModel"; // Importa el modelo
import { RequestHandler } from "@/controlador/RequestHandler"; // Importa el manejador de solicitudes

export default {
  data() {
    return {
      asignaturas: [], // Lista para almacenar las asignaturas obtenidas
      usuarioLogueado: null, // Datos del usuario logueado
    };
  },
  async mounted() {
    // Forzar el inicio de sesión
    const ojo = new RequestHandler();
    const loginResponse = await ojo.postRequest("user/token/", {
      email: "ojo@amdin.com",
      password: "123",
    });
    this.usuarioLogueado = loginResponse.data;

    // Cargar las asignaturas al montar el componente
    await this.cargarAsignaturas();
  },
  methods: {
    // Cargar todas las asignaturas
    async cargarAsignaturas() {
      try {
        const asignaturaModel = new AsignaturaModel();
        const asignaturas = await asignaturaModel.obtenerTodasAsignaturas();

        // Iterar sobre todas las asignaturas para obtener los nombres del colegio y grado
        for (const asignatura of asignaturas) {
          const colegio = await asignaturaModel.obtenerColegioPorId(
            asignatura.colegio
          );
          const grado = await asignaturaModel.obtenerGradoPorId(
            asignatura.grado
          );

          // Agregar los nombres del colegio y grado a cada asignatura
          asignatura.colegioNombre = colegio.nombre;
          asignatura.gradoNombre = grado.nombre;
        }

        this.asignaturas = asignaturas;
      } catch (error) {
        console.error("Error al cargar las asignaturas:", error);
      }
    },

    // Redirigir al formulario de edición de una asignatura
    editarAsignatura(id) {
      this.$router.push({ name: "EditarAsignatura", params: { id: id } });
    },

    // Eliminar una asignatura por ID
    async eliminarAsignatura(id) {
      const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar esta asignatura?"
      );
      if (confirmar) {
        try {
          const asignaturaModel = new AsignaturaModel();
          await asignaturaModel.eliminarAsignatura(id);
          // Recargar la lista de asignaturas
          await this.cargarAsignaturas();
        } catch (error) {
          console.error("Error al eliminar la asignatura:", error);
        }
      }
    },

    // Redirigir al formulario para agregar una nueva asignatura
    irAgregarAsignatura() {
      this.$router.push({ name: "AgregarAsignatura" });
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f4f7f6;
  min-height: 45vh;
}

#header {
  background-color: #0073e6;
  color: white;
  padding: 10px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: center;
  position: relative;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.agregar-asignatura-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  color: #0073e6;
  cursor: pointer;
}

.add-icon {
  font-size: 50px;
}

.card-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.edit-button {
  color: #0073e6;
}

.delete-button {
  color: #ff4d4d;
}
</style>
