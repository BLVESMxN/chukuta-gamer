<template>
    <div class="inicio-estudiante">
      <!-- Bienvenida personalizada con la fecha actual -->
      <h1 class="titulo">Bienvenido, {{ username }}!</h1>
      <p class="fecha-actual">Hoy es {{ fechaActual }}</p>
  
      <!-- Resumen de materias en formato de tarjetas -->
      <section class="materias">
        <h2 class="seccion-titulo">Tus Materias</h2>
        <div class="tarjetas-materias">
          <div v-for="materia in materias" :key="materia.id" class="tarjeta">
            <h3 class="materia-nombre">{{ materia.nombre }}</h3>
            <p class="materia-profesor">Profesor: {{ materia.profesor }}</p>
          </div>
        </div>
      </section>
  
      <!-- Notificaciones -->
      <section class="notificaciones">
        <h2 class="seccion-titulo">Notificaciones</h2>
        <ul>
          <li v-for="notificacion in notificaciones" :key="notificacion.id" class="notificacion-item">
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
            <p class="estadistica-label">Asistencia</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InicioEstudiante',
    data() {
      return {
        username: 'Nombre del Estudiante', // Se puede obtener desde el backend
        fechaActual: new Date().toLocaleDateString(), // Fecha actual
        materias: [
          { id: 1, nombre: 'Matemáticas', profesor: 'Prof. García' },
          { id: 2, nombre: 'Historia', profesor: 'Prof. Pérez' },
          { id: 3, nombre: 'Física', profesor: 'Prof. Sánchez' }
        ],
        notificaciones: [
          { id: 1, mensaje: 'Examen de Matemáticas el 20 de Septiembre', fecha: '10/09/2024' },
          { id: 2, mensaje: 'Entrega de tarea de Historia', fecha: '12/09/2024' }
        ],
        progreso: 80, // Progreso del curso en porcentaje
        asistencia: 95 // Asistencia en porcentaje
      };
    }
  };
  </script>
  
  <style src="../views/styles/inicioestudiante.css"></style>
  