# serializers.py

from rest_framework import serializers
from .models import (
    Grado, Colegio, Profesor, Padre, Estudiante,
    Asignatura, Periodo, Horario, Curso, Inscripcion,
    Tarea, Revision, Entrega, Asistencia, Administrativo
)
from django.contrib.auth import get_user_model, password_validation

from core.models import Role, UserManager

User = get_user_model()

class GradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = '__all__'

class ColegioSerializer(serializers.ModelSerializer):
    admin = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Administrativo.objects.all(),
        required=False,
        allow_null=True,
    )
    class Meta:
        model = Colegio
        fields = ['id', 'nombre', 'admin', 'suscripcion', 'extension']

class AdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrativo
        fields = ['name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only':True},
        }

    def create(self, validated_data):
        admin = super().create(validated_data)
        user = admin.user_ptr
        password = validated_data['password']
        password_validation.validate_password(password)
        user.set_password(password)
        user.role = Role.get_admin()
        user.save()

        return admin
    
    def update(self, instance, validated_data):
        user = instance.user 
        password = validated_data['password']
        password_validation.validate_password(password)
        user.set_password(password)
        user.save()
        return instance


class ProfesorSerializer(serializers.ModelSerializer):
    colegio = serializers.PrimaryKeyRelatedField(queryset=Colegio.objects.all(), many=False, required=True)
    class Meta:
        model = Profesor
        fields = ['id', 'name', 'colegio', 'email']
        extra_kwargs = {
            'email':{'read_only':True}
        }

    def create(self, validated_data):
        profesor = super().create(validated_data)
        user = profesor.user_ptr
        password = validated_data['password']
        password_validation.validate_password(password)
        user.set_password(password)
        user.role = Role.get_teacher()
        user.save()

        return profesor
    

class PadreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Padre
        fields = ['id', 'name', 'colegio', 'email']
        extra_kwargs = {
            'colegio': {'required': False},
            'email':{'read_only':True}
        }

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        request = self.context.get('request')
        user = request.user

        colegio = validated_data.get('colegio')
        if not colegio:
            if hasattr(user, 'administrativo'):
                colegios = user.administrativo.colegios.all()
                if colegios.count() == 1:
                    colegio = colegios.first()
                    validated_data['colegio'] = colegio
                else:
                    raise serializers.ValidationError("Debe especificar el colegio.")
            else:
                raise serializers.ValidationError("No tiene permiso para crear padres.")

        if user.role == Role.get_admin() and colegio in user.administrativo.colegios.all():
            padre = Padre(**validated_data)
            padre.set_password(password)
            padre.role = Role.get_parent()
            padre.save()
            return padre
        else:
            raise serializers.ValidationError("No tiene permiso para agregar padres a este colegio.")

class EstudianteSerializer(serializers.ModelSerializer):
    user_padre = serializers.PrimaryKeyRelatedField(queryset=Padre.objects.all(), required=False, allow_null=True)
    user_madre = serializers.PrimaryKeyRelatedField(queryset=Padre.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Estudiante
        fields = ['id', 'name','colegio', 'grado', 'user_padre', 'user_madre','email']
        extra_kwargs = {
            'colegio': {'required': False},
            'grado': {'required': True},
            'email':{'read_only':True}
        }

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        request = self.context.get('request')
        user = request.user

        # If colegio is not provided, infer it from the admin's colegios
        colegio = validated_data.get('colegio')
        if not colegio:
            if hasattr(user, 'administrativo'):
                colegios = user.administrativo.colegios.all()
                if colegios.count() == 1:
                    colegio = colegios.first()
                    validated_data['colegio'] = colegio
                else:
                    raise serializers.ValidationError("Debe especificar el colegio.")
            else:
                raise serializers.ValidationError("No tiene permiso para crear estudiantes.")

        # Check if the admin has permission to add a student to this colegio
        if user.role == Role.get_admin() and colegio in user.administrativo.colegios.all():
            estudiante = Estudiante(**validated_data)
            estudiante.set_password(password)
            estudiante.role = Role.get_student()
            estudiante.save()
            return estudiante
        else:
            raise serializers.ValidationError("No tiene permiso para agregar estudiantes a este colegio.")

class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = ['id', 'nombre', 'grado', 'colegio']

    def create(self, validated_data):
        user = self.context['request'].user
        colegio = validated_data.get('colegio')

        if not colegio:
            if hasattr(user, 'administrativo'):
                colegios = user.administrativo.colegios.all()
                if colegios.count() == 1:
                    colegio = colegios.first()
                    validated_data['colegio'] = colegio
                else:
                    raise serializers.ValidationError("Debe especificar el colegio.")
            else:
                raise serializers.ValidationError("No tiene permiso para crear asignaturas.")

        if hasattr(user, 'administrativo') and colegio in user.administrativo.colegios.all():
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No tiene permiso para crear asignaturas en este colegio.")

class PeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodo
        fields = ['id', 'anio', 'trimestre', 'fecha_inicio', 'fecha_fin']

    def validate(self, data):
        if data.get('fecha_fin') and data['fecha_inicio'] > data['fecha_fin']:
            raise serializers.ValidationError("La fecha de inicio debe ser anterior a la fecha fin.")
        return data

class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields = ['id', 'periodo', 'dia', 'inicio', 'fin']

    def validate(self, data):
        if data['inicio'] >= data['fin']:
            raise serializers.ValidationError("La hora de inicio debe ser anterior a la hora de fin.")
        return data

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ['id', 'asignatura', 'periodo', 'profesor', 'horarios']

    def create(self, validated_data):
        user = self.context['request'].user
        asignatura = validated_data['asignatura']
        profesor = validated_data['profesor']
        colegio = asignatura.colegio

        # Check permissions
        if hasattr(user, 'administrativo') and colegio in user.administrativo.colegios.all():
            if profesor.colegio != colegio:
                raise serializers.ValidationError("El profesor debe pertenecer al mismo colegio que la asignatura.")
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No tiene permiso para crear cursos en este colegio.")

class InscripcionSerializer(serializers.ModelSerializer):

    curso = serializers.PrimaryKeyRelatedField(queryset=Curso.objects.all())
    estudiante = serializers.PrimaryKeyRelatedField(queryset=Estudiante.objects.all())
    class Meta:
        model = Inscripcion
        fields = ['id', 'curso', 'estudiante', 'promedio']

    def create(self, validated_data):
        user = self.context['request'].user
        curso = validated_data['curso']
        estudiante = validated_data['estudiante']
        colegio = curso.get_colegio()

        # Permissions
        if user.role == Role.get_admin() and colegio in user.administrativo.colegios.all():
            if estudiante.get_colegio() != colegio:
                raise serializers.ValidationError("El estudiante no pertenece al mismo colegio que el curso.")
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No tiene permiso para inscribir estudiantes en este curso.")

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ['id', 'descripcion', 'fecha_inicio', 'fecha_fin', 'curso']

    def create(self, validated_data):
        user = self.context['request'].user
        curso = validated_data['curso']

        if user.role == Role.get_teacher() and curso.profesor == user.profesor:
            # for a,b in validated_data.items():
            #     print(a, ":", b)
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No tiene permiso para crear tareas para este curso.")


class RevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revision
        fields = ['id', 'estudiante', 'tarea', 'estado', 'calificacion']

    def create(self, validated_data):
        user = self.context['request'].user
        tarea = validated_data['tarea']
        estudiante = validated_data['estudiante']

        if user.role == Role.get_teacher() and tarea.curso.profesor == user.profesor:
            return super().create(validated_data)
        elif user.role == Role.get_student() and estudiante == user.estudiante and tarea in user.estudiante.tareas.all():
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No tiene permiso para crear esta revisión.")

class EntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrega
        fields = ['id', 'revision', 'comentario']

    def create(self, validated_data):
        user = self.context['request'].user
        revision = validated_data['revision']

        if user.role == Role.get_student() and revision.estudiante == user.estudiante:
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No tiene permiso para crear esta entrega.")


class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = ['id', 'fecha', 'estado', 'inscripcion']

    def create(self, validated_data):
        user = self.context['request'].user
        inscripcion = validated_data['inscripcion']

        if user.role == Role.get_teacher() and inscripcion.curso.profesor == user.profesor:
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No tiene permiso para registrar asistencia para este curso.")

