from django.db import models
from django.contrib.auth import get_user_model


class Estudiante(models.Model):
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class Grado(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Asignatura(models.Model):
    nombre = models.CharField(max_length=100)
    grado = models.ForeignKey(Grado, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class Periodo(models.Model):
    anio = models.IntegerField()
    trimestre = models.IntegerField()

    def __str__(self):
        return f"{self.anio} - Trimestre {self.trimestre}"


class AsignaturaPeriodo(models.Model):
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
    periodo = models.ForeignKey(Periodo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.asignatura} - {self.periodo}"


class AsignaturaEstudiante(models.Model):
    promedio = models.DecimalField(max_digits=5, decimal_places=2)
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    asignatura_periodo = models.ForeignKey(AsignaturaPeriodo, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.estudiante} - {self.asignatura_periodo}"


class Asistencia(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    asignatura_estudiante = models.ForeignKey(AsignaturaEstudiante, on_delete=models.CASCADE)
    estado_asisten = models.IntegerField()

    def __str__(self):
        return f"Asistencia {self.fecha} - {self.asignatura_estudiante}"


class EstadoAsistencia(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Tarea(models.Model):
    descripcion = models.CharField(max_length=100)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    asignatura = models.ForeignKey(AsignaturaPeriodo, on_delete=models.CASCADE)


    def __str__(self):
        return self.descripcion
    
class TareaEstudiante(models.Model):
    tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE)
    estudiante = models.ForeignKey(AsignaturaEstudiante, on_delete=models.CASCADE)
    calificacion = models.DecimalField(max_digits=5, decimal_places=2)
    estado_tarea = models.ForeignKey('EstadoTarea', on_delete=models.CASCADE)

    def __str__(self):
        return self.descripcion

class EstadoTarea(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Licencia(models.Model):
    texto = models.CharField(max_length=100)
    asistencia = models.ForeignKey(Asistencia, on_delete=models.CASCADE)
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return self.texto
