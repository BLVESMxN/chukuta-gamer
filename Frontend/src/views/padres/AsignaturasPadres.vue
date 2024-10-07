<template>
  <div class="lista-materias">
    <div class="materias-grid">
      <div class="flip-card" v-for="(clase, index) in clases" :key="index">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <p class="title">{{ clase.nombre }}</p>
            <p>{{ clase.profesor }}</p>
          </div>
          <div class="flip-card-back">
            <router-link to="/TareasPadres" class="router-link">
              <p class="title">Más...</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-link to="/EstudiantesPadres"
    >Volver a la lista de personas</router-link
  >
</template>

<script>
import Asignaturaspadres from "@/modelo/padres/Asignaturaspadres.mjs";

export default {
  name: "ListaMaterias",
  mixins: [Asignaturaspadres],
  data() {
    return {
      materias: [],
    };
  },
};
</script>

<style scoped>
.router-link {
  text-decoration: none; /* Quita el subrayado */
  color: inherit; /* Mantiene el color del texto como el color de su padre */
}

.lista-materias {
  padding: 20px;
  max-width: 100%;
  margin: auto;
}

.lista-materias h1 {
  text-align: center;
  margin-bottom: 20px;
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
.materias-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
}
</style>
