import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      estudiantes: [],
      paginaActual: 0,
      estudiantesPorPagina: 3,
      requestHandler: new RequestHandler(),
      idPadre: null,
    };
  },
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
    async fetchPadreYEstudiantes() {
      try {
        // Obtener información del usuario actual
        const responseUsuario = await this.requestHandler.getRequest(
          "/user/me/"
        );
        this.idPadre = responseUsuario.data.pk;

        // Obtener lista de estudiantes del padre
        const responseEstudiantes = await this.requestHandler.getRequest(
          "/academico/estudiantes/",
          { user_padre: this.idPadre }
        );
        this.estudiantes = responseEstudiantes.data;
      } catch (error) {
        console.error("Error obteniendo estudiantes o usuario:", error);
      }
    },
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
