from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import (
    Estudiante, Grado, Asignatura, Periodo, AsignaturaPeriodo, 
    AsignaturaEstudiante, Asistencia, EstadoAsistencia, 
    Tarea, EstadoTarea, Licencia, TareaEstudiante
)
from .serializers import (
    EstudianteSerializer, GradoSerializer, AsignaturaSerializer, PeriodoSerializer, 
    AsignaturaPeriodoSerializer, AsignaturaEstudianteSerializer, AsistenciaSerializer,
    EstadoAsistenciaSerializer, TareaSerializer, EstadoTareaSerializer, LicenciaSerializer, TareaEstudianteSerializer
)


class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    #permission_classes = [IsAuthenticated]


class GradoViewSet(viewsets.ModelViewSet):
    queryset = Grado.objects.all()
    serializer_class = GradoSerializer
    permission_classes = [IsAuthenticated]


class AsignaturaViewSet(viewsets.ModelViewSet):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaSerializer
    permission_classes = [IsAuthenticated]


class PeriodoViewSet(viewsets.ModelViewSet):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoSerializer
    permission_classes = [IsAuthenticated]


class AsignaturaPeriodoViewSet(viewsets.ModelViewSet):
    queryset = AsignaturaPeriodo.objects.all()
    serializer_class = AsignaturaPeriodoSerializer
    permission_classes = [IsAuthenticated]


class AsignaturaEstudianteViewSet(viewsets.ModelViewSet):
    queryset = AsignaturaEstudiante.objects.all()
    serializer_class = AsignaturaEstudianteSerializer
    permission_classes = [IsAuthenticated]


class AsistenciaViewSet(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all()
    serializer_class = AsistenciaSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='por-asignatura-periodo/(?P<asignatura_periodo_id>\d+)')
    def por_asignatura_periodo(self, request, asignatura_periodo_id=None):
        try:
            asignatura_periodo = AsignaturaPeriodo.objects.get(pk=asignatura_periodo_id)
        except AsignaturaPeriodo.DoesNotExist:
            return Response({"error": "No se encontró la asignatura"}, status=404)

        # Get all AsignaturaEstudiante instances related to the given AsignaturaPeriodo
        asignatura_estudiantes = AsignaturaEstudiante.objects.filter(asignatura_periodo=asignatura_periodo)

        # Filter Asistencia based on the retrieved AsignaturaEstudiante instances
        asistencias = Asistencia.objects.filter(asignatura_estudiante__in=asignatura_estudiantes)

        serializer = AsistenciaSerializer(asistencias, many=True)
        return Response(serializer.data)
    
class EstadoAsistenciaViewSet(viewsets.ModelViewSet):
    queryset = EstadoAsistencia.objects.all()
    serializer_class = EstadoAsistenciaSerializer
    permission_classes = [IsAuthenticated]

class EstadoTareaViewSet(viewsets.ModelViewSet):
    queryset = EstadoTarea.objects.all()
    serializer_class = EstadoTareaSerializer
    permission_classes = [IsAuthenticated]


class LicenciaViewSet(viewsets.ModelViewSet):
    queryset = Licencia.objects.all()
    serializer_class = LicenciaSerializer
    permission_classes = [IsAuthenticated]


class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='por-asignatura-periodo/(?P<asignatura_periodo_id>\d+)')
    def por_asignatura_periodo(self, request, asignatura_periodo_id=None):

        try:
            asignatura_periodo = AsignaturaPeriodo.objects.get(pk=asignatura_periodo_id)
        except AsignaturaPeriodo.DoesNotExist:
            return Response({"error": "No se encontró la asignatura"}, status=404)

        tareas = Tarea.objects.filter(asignatura=asignatura_periodo)
        serializer = TareaSerializer(tareas, many=True)
        return Response(serializer.data)

class TareaEstudianteViewSet(viewsets.ModelViewSet):
    queryset = TareaEstudiante.objects.all()
    serializer_class = TareaEstudianteSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='por-asignatura-estudiante/(?P<asignatura_estudiante_id>\d+)')
    def por_asignatura_estudiante(self, request, asignatura_estudiante_id=None):
        try:
            asignatura_estudiante = AsignaturaEstudiante.objects.get(pk=asignatura_estudiante_id)
        except AsignaturaEstudiante.DoesNotExist:
            return Response({"error": "No se encontró la asignatura"}, status=404)

        tarea_estudiantes = TareaEstudiante.objects.filter(estudiante=asignatura_estudiante)
        serializer = TareaEstudianteSerializer(tarea_estudiantes, many=True)
        return Response(serializer.data)