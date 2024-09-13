from rest_framework import serializers
from .models import (
    Estudiante, Grado, Asignatura, Periodo, AsignaturaPeriodo,
    AsignaturaEstudiante, Asistencia, EstadoAsistencia,
    Tarea, TareaEstudiante, EstadoTarea, Licencia
)

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = ['id', 'nombres', 'apellidos', 'fecha_nacimiento']
        extra_kwargs = {'id':{'read_only':True}}


class GradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = ['id', 'nombre']


class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = ['id', 'nombre', 'grado']


class PeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodo
        fields = ['id', 'anio', 'trimestre']


class AsignaturaPeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignaturaPeriodo
        fields = ['id', 'asignatura', 'periodo', 'usuario']


class AsignaturaEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignaturaEstudiante
        fields = ['id', 'promedio', 'estudiante', 'asignatura_periodo']


class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = ['id', 'fecha', 'asignatura_estudiante', 'estado_asisten']


class EstadoAsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoAsistencia
        fields = ['id', 'nombre']


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ['id', 'descripcion', 'fecha_inicio', 'fecha_fin', 'asignatura']


class TareaEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TareaEstudiante
        fields = ['id', 'tarea', 'estudiante', 'calificacion', 'estado_tarea']


class EstadoTareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoTarea
        fields = ['id', 'nombre']


class LicenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licencia
        fields = ['id', 'texto', 'asistencia', 'usuario']
