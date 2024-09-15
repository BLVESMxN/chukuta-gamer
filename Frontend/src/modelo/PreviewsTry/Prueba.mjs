// Importar las dependencias
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Estilos de Vuetify
import axios from 'axios';
import Swal from 'sweetalert2';

// Configurar Vuetify
Vue.use(Vuetify);

// URL base de la API
const url = 'http://localhost:8080/academico/estudiantes/';

// Crear la instancia de Vue
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
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
      axios.get(url)
        .then(response => {
          this.ordenes = response.data;
          console.log(this.ordenes);
        });
    },
    openDialog(user) {
      this.operacion = 'editar';
      this.users = Object.assign({}, user);
      this.dialog = true;
    },
    openDialog2() {
      this.operacion = 'crear';
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    saveUser() {
      if (this.operacion === 'editar') {
        this.editar();
      } else {
        this.crear();
      }
      this.closeDialog();
      this.users = {
        id: '',
        nombre: '',
        correo: '',
        contrasena: '',
        tipo: ''
      };
    },
    crear() {
      let idtip;
      if (this.users.tipo === 'cliente') {
        idtip = 1;
      } else if (this.users.tipo === 'admin') {
        idtip = 2;
      } else if (this.users.tipo === 'trabajador') {
        idtip = 3;
      }
      let parametros = {
        nombre: this.users.nombre,
        correo: this.users.correo,
        contrasena: this.users.contrasena,
        tipo: idtip,
        contador: 0
      };
      axios.post(url, parametros)
        .then(() => {
          this.mostrar();
        });
    },
    editar() {
      let idtip;
      if (this.users.tipo === 'cliente') {
        idtip = 1;
      } else if (this.users.tipo === 'admin') {
        idtip = 2;
      } else if (this.users.tipo === 'trabajador') {
        idtip = 3;
      }
      let parametros = {
        nombre: this.users.nombre,
        correo: this.users.correo,
        contrasena: this.users.contrasena,
        tipo: idtip,
        contador: 0
      };
      axios.put(`${url}/${this.users.id}`, parametros)
        .then(() => {
          this.mostrar();
        })
        .catch(error => {
          console.log(error);
        });
    },
    borrar(id) {
      Swal.fire({
        title: '¿Confirma eliminar el registro?',
        confirmButtonText: 'Confirmar',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${url}/${id}`)
            .then(() => {
              this.mostrar();
            });
          Swal.fire('¡Eliminado!', '', 'success');
        }
      });
    }
  }
});
