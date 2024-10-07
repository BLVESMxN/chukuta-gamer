<template>
  <div>
    <div class="banner">
      <h1>Bienvenido al Sistema del colegio x</h1>
    </div>

    <div class="lista-estudiantes">
      <button @click="paginaAnterior" :disabled="paginaActual === 0">
        Anterior
      </button>
      <div
        class="estudiante"
        v-for="(estudiante, index) in paginatedestudiantes"
        :key="index"
      >
        <div class="card">
          <div class="card-border-top"></div>
          <div class="img"></div>
          <span> {{ estudiante.nombre }}</span>
          <p class="job">{{ estudiante.edad }}</p>
          <router-link
            :to="{
              name: 'EstudiantesPadres',
              params: { nombre: estudiante.nombre },
            }"
            ><button>Ver</button></router-link
          >
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
import MenuPadres from "@/modelo/padres/MenuPadres.mjs";
export default {
  name: "MenuPadres",
  mixins: [MenuPadres],
  computed: {
    paginatedestudiantes() {
      const inicio = this.paginaActual * this.estudiantesPorPagina;
      const fin = inicio + this.estudiantesPorPagina;
      return this.estudiantes.slice(inicio, fin);
    },
    maxPaginas() {
      return Math.ceil(this.estudiantes.length / this.estudiantesPorPagina);
    },
  },
  methods: {
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

/* From Uiverse.io by alexmaracinaru */
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
