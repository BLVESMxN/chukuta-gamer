// Importar las dependencias
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import App from '../../App.vue'; // Ajusta la ruta si App.vue está en un subdirectorio

// Importar dependencias adicionales
import axios from 'axios';
import Swal from 'sweetalert2';

// Configurar Vuetify
const vuetify = createVuetify();

// URL base de la API
const url = 'http://localhost:8080/academico/estudiantes/';

// Crear la instancia de Vue
const app = createApp(App);

// Usar Vuetify en la instancia de Vue
app.use(vuetify);

// Configurar propiedades globales
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$swal = Swal;

// Definir el componente principal

console.log("Verga");

app.component('PruebaComponent', {
  data() {
    return {
      ordenes: [],
      dialog: false,
      operacion: '',
      users: {
        id: null,
        nombre: '',
        apellidos: '',
        fecha_nacimiento: ''
      }
    };
  },
  created() {
    this.mostrar();
  },
  methods: {
    mostrar() {
      this.$axios.get(url)
        .then(response => {
            console.log("El bolas");
          this.ordenes = response.data;
          console.log(this.ordenes);
        })
        .catch(error => {
          this.$swal.fire('Error', 'Error al obtener los datos', 'error');
        });
    }
  }
});
