from django.db import models
from django.contrib.auth import get_user_model
from django.core import validators
from django.utils import timezone
from core.models import Session



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


class Administrativo(get_user_model()):

    def get_colegio(self):
        return self.colegio
    
    def __str__(self):
        return f'{self.name}: {self.colegio.__str__()}'
  

class Colegio(models.Model):
    admin = models.ForeignKey(
        Administrativo,
        on_delete=models.RESTRICT,
        related_name='colegios'
    )
    nombre = models.CharField(
        max_length=255,
        null=False,
        blank=False,
        unique=True
    )
    suscripcion = models.BooleanField(
        default=False,
        null=False,
        blank=False,
    )
    extension = models.CharField(
        max_length=5,
        default='edu',
        null=False,
        blank=True,
    )

    def __str__(self):
        return self.nombre
 

class Profesor(get_user_model()):
    colegio = models.ForeignKey(Colegio,
        blank=False,
        null=False,
        on_delete=models.RESTRICT,
        related_name='profesores'
    )

    def get_colegio(self):
        return self.colegio
    
    def __str__(self):
        return f'{self.name}: {self.colegio.__str__()}'

class Padre(get_user_model()):
    
    colegio = models.ForeignKey(Colegio,
        blank=False,
        null=False,
        on_delete=models.RESTRICT,
    )

    def get_colegio(self):
        return self.colegio
    
    def get_children(self):
        return self.padre_estudiante.all() | self.madre_estudiante.all()
    
    def __str__(self):
        return f'{self.name}: {self.colegio.__str__()}'


class Estudiante(get_user_model()): 
    colegio = models.ForeignKey(Colegio,
        blank=False,
        null=False,
        on_delete=models.RESTRICT
    )
    grado = models.ForeignKey(
        Grado,
        blank=False,
        null=False,
        on_delete=models.RESTRICT)
    
    user_padre = models.ForeignKey(
        Padre,
        blank=True,
        null=False,
        on_delete=models.RESTRICT,
        related_name='padre_estudiante',
    )

    user_madre = models.ForeignKey(
        Padre,
        blank=True,
        null=False,
        on_delete=models.RESTRICT,
        related_name='madre_estudiante',
    )
    
    def get_colegio(self):
        return self.colegio
    
    def __str__(self): 
        return f'{self.name}: {self.grado.__str__()} {self.colegio.__str__()}'

class Asignatura(models.Model):
    nombre = models.CharField(max_length=255, null=False, blank=False)
    grado = models.ForeignKey(Grado, null=False, blank=False, on_delete=models.RESTRICT)
    colegio = models.ForeignKey(
        Colegio, 
        blank=False,
        null=False,
        on_delete=models.RESTRICT)

    def get_colegio(self):
        return self.colegio
    
    def __str__(self):
        return f'{self.nombre}: {self.grado.__str__()} {self.colegio.__str__()}'

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
    fecha_inicio = models.DateField(
        null=False,
        blank=False,
    ),
    fecha_fin = models.DateField(),

class Horario(models.Model):
    
    DIAS = [
        ('LUN', 'Lunes'),
        ('MAR', 'Martes'),
        ('MIE', 'Miercoles'),
        ('JUE', 'Jueves'),
        ('VIE', 'Viernes')
    ]
    
    periodo = models.ForeignKey(
        Periodo,
        blank=False,
        null=False,
        on_delete=models.RESTRICT,
    )

    dia = models.IntegerField(
        blank=False,
        null=False,
        choices=DIAS
    )

    inicio = models.TimeField(
        blank=False,
        null=False
    )

    fin = models.TimeField(
        blank=False, 
        null=False,
    )

class Curso(models.Model):
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
        related_name="record",
        through="Inscripcion",
        through_fields=("curso", "estudiante"),
    )

    horarios = models.ManyToManyField(
        Horario,
        related_name='cursos_horario',
    )

    def get_profesor(self):
        return self.profesor
    
    def get_colegio(self):
        asignatura = self.asignatura
        return asignatura.colegio


class Inscripcion(models.Model):
    curso = models.ForeignKey(
        Curso,
        on_delete=models.CASCADE)
    estudiante = models.ForeignKey(
        Estudiante,
        blank=False,
        null=False,
        on_delete=models.CASCADE)
    promedio = models.IntegerField(
    validators=[
        validators.MinValueValidator(0),
        validators.MaxValueValidator(100),
    ])

    def get_curso(self):
        return self.curso

    def get_profesor(self):
        return self.curso.get_profesor()
    
    def get_colegio(self):
        return self.curso.get_colegio()
    
    def save(self):
        if self.estudiante.get_colegio() != self.curso.get_colegio():
            raise ValueError("El estudiante no pertenece al colegio")


class Tarea(models.Model):
    descripcion = models.TextField()
    fecha_inicio = models.DateTimeField(blank=True, null=False, default=timezone.now)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    curso = models.ForeignKey(
        Curso,
        blank=False,
        null=False,
        on_delete=models.CASCADE, 
        related_name="evaluaciones"
    )
    sesion = models.ForeignKey(
        Session,
        blank=True,
        null=False,
        on_delete=models.RESTRICT,
    )
    estudiantes = models.ManyToManyField(
        Estudiante,
        blank=True,
        related_name="tareas",
        through='Revision',
        through_fields=("tarea", "estudiante")
    )

    def get_curso(self):
        return self.curso

    def get_profesor(self):
        return self.curso.get_profesor()
    
    def get_colegio(self):
        return self.curso.get_colegio()
    
    def save(self, *args, **kwargs):
        if not self.fecha_inicio: self.fecha_inicio = timezone.now()
        super().save(*args, **kwargs)
        
        estudiantes_inscritos = set(self.curso.estudiantes.values_list('id', flat=True))
        estudiantes_con_tarea = set(self.estudiantes.values_list('id', flat=True))

        estudiantes_pks = estudiantes_inscritos.difference(estudiantes_con_tarea)
        estudiantes_to_add = Estudiante.objects.filter(id__in=estudiantes_pks)
        for estudiante in estudiantes_to_add:
            revision = Revision(estudiante=estudiante, tarea=self)
            revision.save(student_validated=True)


class Revision(models.Model):
    
    ESTADOS = [
        ('ENT', "Entregado"),
        ('PEN', "Pendiante"),
        ('VEN', "Vencido"),
    ]
    
    estudiante = models.ForeignKey(
        Estudiante, 
        blank=False,
        null=False,
        on_delete=models.PROTECT)
    tarea = models.ForeignKey(
        Tarea,
        blank=False,
        null=False,   
        on_delete=models.RESTRICT
    )
    estado = models.CharField(
        max_length=10,
        null=False,
        blank=True,
        default=ESTADOS[1][0],
        choices=ESTADOS)
    calificacion = models.IntegerField(
        default=0,
        validators=[
            validators.MinValueValidator(0, message="Elija una nota de 0 a 100"),
            validators.MaxValueValidator(100, message="Elija una nota de 0 a 100")
        ]
    )

    def get_curso(self):
        return self.tarea.get_curso()
    
    def get_profesor(self): 
        return self.tarea.get_profesor()
    
    def get_colegio(self):
        return self.tarea.get_colegio()
    
    def save(self, *arg, **kwargs):
        if(kwargs.get('student_validated', False)): 
            super().save(*arg, **kwargs)
            return
        
        estudiantes_inscritos = self.tarea.curso.estudiantes.all()
        if self.estudiante not in estudiantes_inscritos:
            raise ValueError("El estudiante no esta inscrito")
        super().save(*arg, **kwargs)


class Entrega(models.Model):
    revision = models.ForeignKey(
        Revision,
        blank=False,
        null=False,
        related_name='entregas',
        on_delete=models.CASCADE
    )
    comentario = models.TextField(
        max_length=2000,
    )

    def get_curso(self):
        return self.revision.get_curso()
    
    def get_profesor(self): 
        return self.revision.get_profesor()
    
    def get_colegio(self):
        return self.revision.get_colegio()


class Asistencia(models.Model):
    
    ESTADOS = [
        ('PEN', 'Pendiente'),
        ('ASI', 'Asistio'),
        ('FAL', 'Falta'), 
        ('ATR', 'Atraso'),
    ]
    fecha=models.DateField(
        blank=False,
        null=False,
    )    
    estado = models.CharField(
        max_length=3,
        blank=True,
        null=False,
        default=ESTADOS[2][0], 
        choices=ESTADOS)
    inscripcion= models.ForeignKey(
        Inscripcion,
        blank=False,
        null=False,
        related_name='asistencias',
        on_delete= models.CASCADE
    )

    def get_curso(self):
        return self.inscripcion.get_curso()
    
    def get_profesor(self): 
        return self.inscripcion.get_profesor()
    
    def get_colegio(self):
        return self.inscripcion.get_colegio()


