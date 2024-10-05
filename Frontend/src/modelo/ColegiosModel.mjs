import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      colegios: [], // Lista de colegios
      requestHandler: new RequestHandler(),
      nuevoColegio: {
        nombre: "", // Nombre del colegio
        admin: 0, // ID del administrador (se obtendrá del usuario logueado)
        suscripcion: true, // Estado de suscripción (activo/inactivo)
        extension: "", // Extensión del colegio
      },
      colegioEditado: null, // Colegio que se está editando
      maxColegiosPermitidos: 2, // Máximo de colegios permitidos sin pago
      totalColegiosAdmin: 0, // Número total de colegios creados por el administrador actual
      advertenciaPago: false, // Bandera para mostrar la advertencia de pago
    };
  },
  created() {
    this.obtenerUsuarioLogueado(); // Obtener el usuario logueado
    this.fetchColegios(); // Obtener los colegios
  },
  methods: {
    // Obtener los datos del usuario logueado
    async obtenerUsuarioLogueado() {
      try {
        const response = await this.requestHandler.getRequest("/user/me/");
        this.nuevoColegio.admin = response.data.pk; // Asignar el ID del administrador logueado
        this.fetchColegios(); // Obtener los colegios después de obtener el admin
      } catch (error) {
        console.error("Error obteniendo el usuario logueado:", error);
      }
    },

    // Método para obtener los colegios del administrador actual
    async fetchColegios() {
      try {
        const response = await this.requestHandler.getRequest("/academico/colegios/");
        this.colegios = response.data.filter(colegio => colegio.admin === this.nuevoColegio.admin);
        this.totalColegiosAdmin = this.colegios.length;
        this.advertenciaPago = this.totalColegiosAdmin >= this.maxColegiosPermitidos; // Mostrar advertencia si se excede el límite
      } catch (error) {
        console.error("Error obteniendo los colegios:", error);
      }
    },

    // Método para agregar un nuevo colegio
    async agregarColegio() {
      if (this.totalColegiosAdmin >= this.maxColegiosPermitidos) {
        alert("Ya has creado el máximo permitido de colegios. Por favor, paga para agregar más.");
        return;
      }

      try {
        const response = await this.requestHandler.postRequest(
          "/academico/colegios/",
          this.nuevoColegio
        );

        if (response.status === 201) {
          this.fetchColegios(); // Refrescar la lista de colegios
          this.nuevoColegio = { nombre: "", admin: this.nuevoColegio.admin, suscripcion: true, extension: "" }; // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error agregando el colegio:", error);
      }
    },

    // Método para eliminar un colegio
    async deleteColegio(id) {
      const confirmation = confirm("¿Confirma eliminar el colegio?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/colegios/${id}`);
          this.fetchColegios(); // Refrescar la lista tras eliminar
          
        } catch (error) {
          console.error("Error eliminando el colegio:", error);
        }
      }
    },

    // Método para editar un colegio
    async editarColegio() {
      if (!this.colegioEditado) return;

      try {
        const response = await this.requestHandler.putRequest(
          `/academico/colegios/${this.colegioEditado.id}/`,
          {
            nombre: this.colegioEditado.nombre,
            admin: this.colegioEditado.admin,
            suscripcion: this.colegioEditado.suscripcion,
            extension: this.colegioEditado.extension,
          }
        );
        if (response.status === 200) {
          this.fetchColegios(); // Refrescar la lista de colegios
          
          this.colegioEditado = null; // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error editando el colegio:", error);
      }
    },

    // Método para cancelar la edición
    cancelarEdicion() {
      this.colegioEditado = null; // Restablecer el estado de edición
    },
  },
};
