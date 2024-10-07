<template>
  <div>
    <div class="banner">
      <h1>Bienvenido al Sistema del colegio</h1>
    </div>

    <div class="lista-estudiantes">
      <button @click="paginaAnterior" :disabled="paginaActual === 0">
        Anterior
      </button>
      <div
        class="estudiante"
        v-for="(estudiante, index) in paginatedEstudiantes"
        :key="index"
      >
        <div class="card">
          <div class="card-border-top"></div>
          <div class="img"></div>
          <span>{{ estudiante.name }}</span>
          <p class="job">{{ estudiante.grado }}</p>
          <router-link
            :to="{
              name: 'EstudiantesPadres',
              params: { nombre: estudiante.name },
            }"
          >
            <button>Ver</button>
          </router-link>
        </div>
      </div>
      <button
        @click="paginaSiguiente"
        :disabled="paginaActual >= maxPaginas - 1"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
import PadresEstudiantes from "@/modelo/padres/PadresEstudiante.mjs";

export default {
  data() {
    return {
      estudiantes: [], // Lista de estudiantes asociados al padre/madre
      paginaActual: 0,
      estudiantesPorPagina: 3,
      modeloPadresEstudiantes: new PadresEstudiantes(), // Instancia del modelo
      userId: null, // ID del usuario logeado
    };
  },
  computed: {
    paginatedEstudiantes() {
      const inicio = this.paginaActual * this.estudiantesPorPagina;
      const fin = inicio + this.estudiantesPorPagina;
      return this.estudiantes.slice(inicio, fin);
    },
    maxPaginas() {
      return Math.ceil(this.estudiantes.length / this.estudiantesPorPagina);
    },
  },
  async mounted() {
    await this.obtenerUsuarioLogeado();
    await this.obtenerEstudiantesAsociados();
  },
  methods: {
    // Obtener el ID del usuario logeado
    async obtenerUsuarioLogeado() {
      try {
        const response =
          await this.modeloPadresEstudiantes.obtenerUsuarioLogeado();
        this.userId = response.pk;
      } catch (error) {
        console.error("Error al obtener el usuario logeado:", error);
      }
    },
    // Obtener los estudiantes asociados al padre o madre logeado
    async obtenerEstudiantesAsociados() {
      if (!this.userId) return; // Esperar a obtener el ID del usuario

      try {
        this.estudiantes =
          await this.modeloPadresEstudiantes.obtenerEstudiantesPorPadreOMadre(
            this.userId
          );
        console.log("Estudiantes asociados:", this.estudiantes);
      } catch (error) {
        console.error("Error al obtener los estudiantes asociados:", error);
      }
    },
    paginaSiguiente() {
      if (this.paginaActual < this.maxPaginas - 1) {
        this.paginaActual++;
      }
    },
    paginaAnterior() {
      if (this.paginaActual > 0) {
        this.paginaActual--;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para las tarjetas y botones */
.banner {
  background-color: #4caf50;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 20px;
}

.lista-estudiantes {
  display: flex;
  gap: 20px;
  justify-content: space-around;
}

.card {
  width: 190px;
  height: 254px;
  background: #3405a3;
  border-radius: 15px;
  box-shadow: 1px 5px 60px 0px #100a886b;
}

.card .card-border-top {
  width: 60%;
  height: 3%;
  background: #6b64f3;
  margin: auto;
  border-radius: 0px 0px 15px 15px;
}

.card span {
  font-weight: 600;
  color: white;
  text-align: center;
  display: block;
  padding-top: 10px;
  font-size: 16px;
}

.card .job {
  font-weight: 400;
  color: white;
  display: block;
  text-align: center;
  padding-top: 3px;
  font-size: 12px;
}

.card .img {
  width: 70px;
  height: 80px;
  background: #6b64f3;
  border-radius: 15px;
  margin: auto;
  margin-top: 25px;
}

.card button {
  padding: 8px 25px;
  display: block;
  margin: auto;
  border-radius: 8px;
  border: none;
  margin-top: 30px;
  background: #6b64f3;
  color: white;
  font-weight: 600;
}

.card button:hover {
  background: #534bf3;
}

button {
  padding: 10px;
  cursor: pointer;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: default;
}

button:not(:disabled):hover {
  background-color: #45a049;
}
</style>
