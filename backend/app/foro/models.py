from django.db import models
from django.contrib.auth import get_user_model

class Foro(models.Model):
    nombre = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class Mensaje(models.Model):
    fecha_hora = models.DateTimeField(auto_now_add=True)
    texto = models.CharField(max_length=1000)
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    foro = models.ForeignKey(Foro, on_delete=models.CASCADE)

    def __str__(self):
        return self.texto
