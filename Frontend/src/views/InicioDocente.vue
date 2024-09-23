<template>
  <div class="inicio-docente">
    <!-- Bienvenida personalizada con la fecha actual -->
    <h1 class="titulo">Bienvenido, {{ username }}!</h1>
    <p class="fecha-actual">Hoy es {{ fechaActual }}</p>

    <!-- Resumen de materias en formato de tarjetas -->
    <section class="materias">
      <h2 class="seccion-titulo">Tus Materias</h2>
      <div class="tarjetas-materias">
        <div v-for="materia in materias" :key="materia.id" class="tarjeta">
          <h3 class="materia-nombre">{{ materia.nombre }}</h3>
          <p class="materia-alumnos">
            Alumnos inscritos: {{ materia.alumnos }}
          </p>
        </div>
      </div>
    </section>

    <!-- Notificaciones -->
    <section class="notificaciones">
      <h2 class="seccion-titulo">Notificaciones</h2>
      <ul>
        <li
          v-for="notificacion in notificaciones"
          :key="notificacion.id"
          class="notificacion-item"
        >
          {{ notificacion.mensaje }} ({{ notificacion.fecha }})
        </li>
      </ul>
    </section>

    <!-- Estadísticas rápidas -->
    <section class="estadisticas">
      <h2 class="seccion-titulo">Estadísticas Rápidas</h2>
      <div class="estadisticas-detalle">
        <div class="estadistica">
          <p class="estadistica-valor">{{ progreso }}%</p>
          <p class="estadistica-label">Progreso del Curso</p>
        </div>
        <div class="estadistica">
          <p class="estadistica-valor">{{ asistencia }}%</p>
          <p class="estadistica-label">Asistencia Promedio</p>
        </div>
      </div>
    </section>

    <!-- Sección exclusiva para docentes -->
    <section class="exclusivo-docentes">
      <h2 class="seccion-titulo">Panel de Docente</h2>
      <p>Aquí puedes gestionar los alumnos y revisar su progreso.</p>
      <router-link to="/gestion-alumnos" class="docente-link"
        >Gestión de Alumnos</router-link
      >
    </section>
  </div>
</template>

<script>
export default {
  name: "InicioDocente",
  data() {
    return {
      username: "Nombre del Docente", // Se puede obtener desde el backend
      fechaActual: new Date().toLocaleDateString(), // Fecha actual
      materias: [
        { id: 1, nombre: "Matemáticas Avanzadas", alumnos: 25 },
        { id: 2, nombre: "Física Cuántica", alumnos: 30 },
        { id: 3, nombre: "Programación", alumnos: 20 },
      ],
      notificaciones: [
        {
          id: 1,
          mensaje: "Reunión con padres el 20 de Septiembre",
          fecha: "10/09/2024",
        },
        {
          id: 2,
          mensaje: "Evaluación pendiente de Física Cuántica",
          fecha: "12/09/2024",
        },
      ],
      progreso: 85, // Progreso del curso en porcentaje
      asistencia: 90, // Asistencia promedio
    };
  },
};
</script>

<style src="../views/styles/iniciodocente.css"></style>
