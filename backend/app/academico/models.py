from django.db import models
from django.contrib.auth import get_user_model
from django.core import validators

class Colegio(models.Model):
    nombre = models.CharField(max_length=255, null=False, blank=False, unique=True)
    admin = models.ForeignKey(get_user_model(), null=False, blank=False, on_delete=models.RESTRICT)

    def __str__(self):
        return self.nombre

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