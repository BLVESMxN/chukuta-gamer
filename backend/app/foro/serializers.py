from rest_framework import serializers
from .models import Foro, Mensaje


class ForoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foro
        fields = ['id', 'nombre', 'fecha_creacion', 'usuario']


class MensajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensaje
        fields = ['id', 'fecha_hora', 'texto', 'usuario', 'foro']
