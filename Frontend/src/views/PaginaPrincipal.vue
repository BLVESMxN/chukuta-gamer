<template>
  <div>
    <!-- Navbar (No se toca según tu pedido) -->
  
    <!-- Contenido Principal -->
    <div class="container">
      <!-- Carrusel -->
      <CarouselComponent :images="carouselImages" />
      
      <!-- Sección de bienvenida -->
      <section class="welcome-section">
        <h2 class="subtitle">Bienvenido al Sistema de Gestión de Estudiantes</h2>
        <p class="intro-text">
          Aquí puedes gestionar estudiantes, materias y consultar información académica.  
        </p>
      </section>

      <!-- Sección de Información General -->
      <section class="info-section">
        <h3 class="section-title">Funciones Principales</h3>
        <div class="cards">
          <div class="card">
            <h4 class="card-title">Registro de Estudiantes</h4>
            <p>Agrega, edita o elimina información de los estudiantes matriculados en la institución.</p>
          </div>
          <div class="card">
            <h4 class="card-title">Gestión de Materias</h4>
            <p>Asigna materias a los estudiantes y gestiona los horarios de clases.</p>
          </div>
          <div class="card">
            <h4 class="card-title">Calificaciones</h4>
            <p>Consulta y actualiza las calificaciones de los estudiantes.</p>
          </div>
        </div>
      </section>

      <!-- Sección de contacto o ayuda -->
      <section class="contact-section">
        <h3 class="section-title">Soporte Técnico</h3>
        <p>¿Necesitas ayuda? Contacta al soporte técnico para cualquier consulta o inconveniente.</p>
        <button class="contact-btn">Contactar Soporte</button>
      </section>
    </div>
  </div>
</template>

<script>
import CarouselComponent from '../components/CarouselComponent.vue'; // Importar el componente del carrusel

export default {
  name: 'PaginaPrincipal',
  components: {
    CarouselComponent
  },
  data() {
    return {
      carouselImages: [
      require('@/assets/logo.jpg'),
      require('@/assets/logo.jpg'),
      require('@/assets/logo.jpg')
      ]
    };
  }
};
</script>

<!-- Importar el archivo de estilos -->
<style src="../views/styles/paginaprincipal.css"></style>
  