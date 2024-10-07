<template>
  <div class="lista-materias">
    <h1>Asignaturas del Estudiante</h1>
    <div class="materias-grid">
      <div class="flip-card" v-for="(materia, index) in materias" :key="index">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <p class="title">{{ materia.nombre }}</p>
            <p>{{ obtenerProfesor(materia.profesor) }}</p>
          </div>
          <div class="flip-card-back">
            <router-link
              :to="{
                name: 'TareasPadres',
                params: { asignaturaId: materia.id },
              }"
              class="router-link"
            >
              <p class="title">Más...</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/EstudiantesPadres"
      >Volver a la lista de estudiantes</router-link
    >
  </div>
</template>

<script>
import VerAsignaturasModel from "@/modelo/VerAsignaturasModel.mjs"; // Modelo para obtener asignaturas

export default {
  name: "AsignaturasPadres",
  props: ["estudianteId"], // Recibe el ID del estudiante (opcional si es necesario)
  data() {
    return {
      materias: [], // Asignaturas del estudiante
      modeloVerAsignaturas: new VerAsignaturasModel(), // Instancia del modelo
    };
  },
  async created() {
    await this.obtenerAsignaturas();
  },
  methods: {
    async obtenerAsignaturas() {
      try {
        // Obtener el ID del usuario logueado (padre o madre)
        const userId = await this.modeloVerAsignaturas.obtenerUsuarioActual();

        // Obtener estudiantes asociados a este padre o madre
        const estudiantes =
          await this.modeloVerAsignaturas.obtenerEstudiantesPorPadreOMadre(
            userId
          );

        if (estudiantes.length > 0) {
          const estudiante = estudiantes[0]; // Tomamos el primer estudiante encontrado
          const gradoId = estudiante.grado; // Obtenemos el grado del estudiante

          // Obtener las asignaturas del estudiante basado en el grado
          this.materias =
            await this.modeloVerAsignaturas.obtenerAsignaturasPorGrado(gradoId);
        } else {
          console.error(
            "No se encontraron estudiantes para este padre o madre."
          );
        }
      } catch (error) {
        console.error("Error al obtener las asignaturas:", error);
      }
    },
    obtenerProfesor(profesorId) {
      // Lógica para obtener el nombre del profesor (en este caso solo mostramos el ID)
      return `Profesor ID: ${profesorId}`;
    },
  },
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: inherit;
}

.lista-materias {
  padding: 20px;
  max-width: 100%;
  margin: auto;
}

.materias-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
}

.flip-card {
  background-color: transparent;
  width: 190px;
  height: 254px;
  perspective: 1000px;
  font-family: sans-serif;
}

.title {
  font-size: 1.5em;
  font-weight: 900;
  text-align: center;
  margin: 0;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid coral;
  border-radius: 1rem;
}

.flip-card-front {
  background: linear-gradient(
    120deg,
    bisque 60%,
    rgb(255, 231, 222) 88%,
    rgb(255, 211, 195) 40%,
    rgba(255, 127, 80, 0.603) 48%
  );
  color: coral;
}

.flip-card-back {
  background: linear-gradient(
    120deg,
    rgb(255, 174, 145) 30%,
    coral 88%,
    bisque 40%,
    rgb(255, 185, 160) 78%
  );
  color: white;
  transform: rotateY(180deg);
}
</style>
