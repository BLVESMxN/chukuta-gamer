<template>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="container">
    <!-- Slideshow -->
    <div class="slideshow">
      <img :src="images[currentImageIndex]" alt="Slideshow Image" />
    </div>
  </div>
  <div class="w3-padding-large" id="main">
  <!-- Header/Home -->
  <header class="w3-container w3-padding-32 w3-center w3-teal" id="home">
    <h1 class="w3-jumbo"><span class="w3-hide-small">UNIDAD</span> EDUCATIVA</h1>
    <p>PRIMARIA Y SECUNDARIA</p>
    <img  alt="UNIDAD EDUCATIVA"  width="992" height="1108">
  </header>

  <!-- About Section -->
  <div class="w3-content w3-justify w3-text-grey w3-padding-64" id="about">
    <h2 class="w3-text-light-grey">My Name</h2>
    <hr style="width:200px" class="w3-opacity">
    <p>En nuestra institución, nos comprometemos a ofrecer una educación de calidad, 
      acompañada de una gestión eficiente y transparente. Por eso, hemos implementado un 
      Sistema de Gestión Escolar que facilita el acceso a información clave sobre los cursos, 
      los estudiantes y sus calificaciones. Este sistema es un pilar fundamental de nuestra 
      infraestructura educativa, permitiéndonos organizar y monitorear el proceso académico de manera clara y efectiva.
    </p>
    <br>
    <div class="w3-row w3-center w3-padding-16 w3-section w3-light-grey">
      <div class="w3-quarter w3-section">
        <span class="w3-xlarge">11+</span><br>
        ESTUDIANTES
      </div>
      <div class="w3-quarter w3-section">
        <span class="w3-xlarge">55+</span><br>
        PREMIOS ACADEMICOS
      </div>
      <div class="w3-quarter w3-section">
        <span class="w3-xlarge">89+</span><br>
        DOCENTES
      </div>
    </div>
  </div>
  <!-- Contact Section -->
  <div class="w3-padding-64 w3-content w3-text-grey" id="contact">

    <div class="w3-section">
      <p><i class="fa fa-map-marker fa-fw w3-text-white w3-xxlarge w3-margin-right"></i> LA PAZ BOLIVIA</p>
      <p><i class="fa fa-phone fa-fw w3-text-white w3-xxlarge w3-margin-right"></i> CELULAR: 777777777</p>
      <p><i class="fa fa-envelope fa-fw w3-text-white w3-xxlarge w3-margin-right"> </i> Email: mail@mail.com</p>
    </div><br>

    <form action="/action_page.php" target="_blank">
      <p><input class="w3-input w3-padding-16" type="text" placeholder="Name" required name="Name"></p>
      <p><input class="w3-input w3-padding-16" type="text" placeholder="Email" required name="Email"></p>
      <p><input class="w3-input w3-padding-16" type="text" placeholder="Subject" required name="Subject"></p>
      <p><input class="w3-input w3-padding-16" type="text" placeholder="Message" required name="Message"></p>
      <p>
        <button class="w3-button w3-light-grey w3-padding-large" type="submit">
          <i class="fa fa-paper-plane"></i> MANDAR MENSAJE
        </button>
      </p>
    </form>
  <!-- End Contact Section -->
  </div>
  
    <!-- Footer -->
  <footer class="w3-content w3-padding-64 w3-text-grey w3-xlarge">
    <i class="fa fa-facebook-official w3-hover-opacity"></i>
    <i class="fa fa-instagram w3-hover-opacity"></i>
    <i class="fa fa-snapchat w3-hover-opacity"></i>
    <i class="fa fa-pinterest-p w3-hover-opacity"></i>
    <i class="fa fa-twitter w3-hover-opacity"></i>
    <i class="fa fa-linkedin w3-hover-opacity"></i>
    <p class="w3-medium">Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank" class="w3-hover-text-green">w3.css</a></p>
  <!-- End footer -->
  </footer>
<!-- END PAGE CONTENT -->
</div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('@/assets/imagen6.jpeg'),
        require('@/assets/imagen5.jpeg'),
        require('@/assets/imagen3.jpg'),
      ], // Las imágenes locales
      currentImageIndex: 0,
      intervalId: null,
    };
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      // Cambia la imagen cada 3 segundos
      this.intervalId = setInterval(() => {
        this.nextImage();
      }, 3000);
    },
    nextImage() {
      // Cambia la imagen actual al siguiente índice
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
    },
  },
  beforeUnmount() {
    // Limpia el intervalo al desmontar el componente
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
/* Estilos para alinear el slideshow */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 50px;
  background-color: #f0f0f0;
}

/* Estilos de la imagen del slideshow */
.slideshow img {
  width: 800px;
  height: 600px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
body, h1,h2,h3,h4,h5,h6 {font-family: "Montserrat", sans-serif}
.w3-row-padding img {margin-bottom: 12px}
/* Set the width of the sidebar to 120px */
.w3-sidebar {width: 120px;background: #222;}
/* Add a left margin to the "page content" that matches the width of the sidebar (120px) */
#main {margin-left: 120px}
/* Remove margins from "page content" on small screens */
@media only screen and (max-width: 600px) {#main {margin-left: 0}}
</style>

