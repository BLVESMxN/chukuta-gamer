<template>
  <div>
    <h1>Materias - Estudiante</h1>
    <div class="materias-grid">
      <tarjetas-materia
        v-for="materia in materias"
        :key="materia.id"
        :subjectName="materia.nombre"
        :studentCount="materia.cantidadEstudiantes"
      />
    </div>
  </div>
</template>

<script>
import TarjetasMateria from '../components/tarjeta_materias.vue'; // Importamos el componente

export default {
  name: 'MateriasEstudiante',
  components: {
    'tarjetas-materia': TarjetasMateria, // Registramos el componente
  },
  data() {
    return {
      materias: [
        { id: 1, nombre: 'Materia 1', cantidadEstudiantes: 25 },
        { id: 2, nombre: 'Materia 2', cantidadEstudiantes: 30 },
        { id: 3, nombre: 'Materia 3', cantidadEstudiantes: 20 },
      ],
    };
  },
};
</script>

<style scoped>
.materias-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; 
}

h1 {
  text-align: center;
}

</style>
