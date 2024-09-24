from django.db import models
from django.contrib.auth import get_user_model
from django.core import validators
from core.models import Session
class Colegio(models.Model):
    nombre = models.CharField(max_length=255, null=False, blank=False, unique=True)
    admin = models.ForeignKey(get_user_model(), null=False, blank=False, on_delete=models.RESTRICT)

    def __str__(self):
        return self.nombre


class Profesor(models.Model):
    user = models.ForeignKey(get_user_model(), blank=False, null=False, unique=True, on_delete=models.RESTRICT)
    colegio = models.ForeignKey(Colegio, blank=False, null=False, on_delete=models.RESTRICT)

class Estudiante(): 
    user = models.ForeignKey(get_user_model(), blank=False, null=False, unique=True, on_delete=models.RESTRICT)
    colegio = models.ForeignKey(Colegio, blank=False, null=False, on_delete=models.RESTRICT)
   
class Grado(models.Model):  
    NIVELES = [
        (1, "Primaria"),
        (2, "Secundaria"),
    ]
    AVR = {
        1: "1ro",
        2: "2do",
        3: "3ro",
        4: "4to",
        5: "5to",
        6: "6to",
    }
    nivel = models.IntegerField(choices=NIVELES, blank=False, null=False)
    grado = models.IntegerField(validators=[
        validators.MinValueValidator(1, message="Ingrese un grado de 1ro a 6to"), 
        validators.MinValueValidator(6, message="Ingrese un grado de 1ro a 6to"),
    ])

    def __str__(self):
        return f'{self.AVR[self.grado]} de {self.NIVELES[self.nivel]}'

class Asignatura(models.Model):
    nombre = models.CharField(max_length=255, null=False, blank=False)
    grado = models.ForeignKey(Grado, null=False, blank=False, on_delete=models.RESTRICT)

class Periodo(models.Model):
    anio = models.IntegerField(
        validators=[
            validators.MinValueValidator(2000),
        ],
        null=False,
        blank=False,
    )
    trimestre = models.IntegerField(
        validators=[
            validators.MinValueValidator(1),
        ],
        null=False,
        blank=False,
    )
    fecha_inicio = models.DateField(),
    fecha_fin = models.DateField(),

class Curso(models.Models):
    asignatura = models.ForeignKey(
        Asignatura,
        blank=False,
        null=False,
        on_delete=models.RESTRICT
    )

    periodo = models.ForeignKey(
        Periodo,
        blank=False,
        null=False,
        on_delete=models.RESTRICT
    )

    profesor = models.ForeignKey(
        Profesor,
        blank=False,
        null=False,
        on_delete=models.RESTRICT,
        related_name='cursos'
    )
    
    estudiantes = models.ManyToManyField(
        Estudiante,
        related_name="cursos"
        through="Inscripsion",
        through_fields=("cursos, estudiantes"),
    )

class Inscripsion(models.Model):
    cursos = models.ForeignKey(Curso, on_delete=models.CASCADE)
    estudiantes = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    promedio = models.IntegerField(validators=[
        validators.MinValueValidator(0),
        validators.MaxValueValidator(100),
    ])

class Tarea(models.Model):
    descripcion = models.TextField()
    fecha_inicio = models.DateTimeField(blank=True, null=False)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    curso = models.ForeignKey(Curso,
                            blank=False,
                            null=False,
                            on_delete=models.CASCADE, 
                            related_name="tareas")
    
    sesion = models.ForeignKey(
        Session,
        blank=True,
        null=False,
        on_delete=models.RESTRICT
    )

    estudiantes = models.ManyToManyField(
        Estudiante,
        blank=False,
        null=False,
        related_name="tareas",
        through='Entrega'
    )

class Entrega(models.Model):
    estudiante = models.ForeignKey(Estudiante)
    tarea = models.ForeignKey(Tarea)
    calificacion=models.IntegerField()