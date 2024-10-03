# serializers.py

from rest_framework import serializers
from .models import (
    Grado, Colegio, Profesor, Padre, Estudiante,
    Asignatura, Periodo, Horario, Curso, Inscripcion,
    Tarea, Revision, Entrega, Asistencia, Administrativo
)
from django.contrib.auth import get_user_model

from core.models import Role

User = get_user_model()

class GradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = '__all__'

class ColegioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegio
        fields = '__all__'

class AdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrativo
        fields = ['name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only':True},
        }

    def create(self, validated_data):
        email = validated_data.get('email', None)
        name = validated_data.get('name', None)
        password = validated_data.get('password', None)

        return get_user_model().objects.create_user(email, password, **validated_data)  


class ProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesor
        fields = '__all__'

class PadreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Padre
        fields = '__all__'

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = '__all__'

class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = '__all__'

class PeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodo
        fields = '__all__'

class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscripcion
        fields = '__all__'

    def validate(self, data):
        estudiante = data['estudiante']
        curso = data['curso']
        if estudiante.get_colegio() != curso.get_colegio():
            raise serializers.ValidationError("El estudiante no pertenece al colegio del curso.")
        return data

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = '__all__'

    def create(self, validated_data):
        tarea = super().create(validated_data)
        estudiantes_inscritos = tarea.curso.estudiantes.all()
        for estudiante in estudiantes_inscritos:
            Revision.objects.create(estudiante=estudiante, tarea=tarea)
        return tarea

class RevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revision
        fields = '__all__'

    def validate(self, data):
        estudiante = data['estudiante']
        tarea = data['tarea']
        if estudiante not in tarea.curso.estudiantes.all():
            raise serializers.ValidationError("El estudiante no está inscrito en el curso de la tarea.")
        return data

class EntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrega
        fields = '__all__'

class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = '__all__'
