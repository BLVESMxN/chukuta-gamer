from rest_framework import serializers
from .models import (Grado, Asignatura,
)

class GradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = ['id', 'nivel', 'grado']
