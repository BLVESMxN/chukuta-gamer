from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import ( Grado, Asignatura,
)
from .serializers import (GradoSerializer
)


class GradoViewSet(viewsets.ModelViewSet):
    queryset = Grado.objects.all()
    serializer_class = GradoSerializer
    #permission_classes = [IsAuthenticated]

'''
class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    #permission_classes = [IsAuthenticated]

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
    #permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='por-asignatura-estudiante/(?P<asignatura_estudiante_id>\d+)')
    def por_asignatura_estudiante(self, request, asignatura_estudiante_id=None):
        try:
            asignatura_estudiante = AsignaturaEstudiante.objects.get(pk=asignatura_estudiante_id)
        except AsignaturaEstudiante.DoesNotExist:
            return Response({"error": "No se encontró la asignatura"}, status=404)

        tarea_estudiantes = TareaEstudiante.objects.filter(estudiante=asignatura_estudiante)
        serializer = TareaEstudianteSerializer(tarea_estudiantes, many=True)
        return Response(serializer.data)'''