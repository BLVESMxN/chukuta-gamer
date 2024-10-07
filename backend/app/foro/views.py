from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Foro, Mensaje
from .serializers import ForoSerializer, MensajeSerializer


class ForoViewSet(viewsets.ModelViewSet):
    queryset = Foro.objects.all()
    serializer_class = ForoSerializer
    permission_classes = [IsAuthenticated]


class MensajeViewSet(viewsets.ModelViewSet):
    queryset = Mensaje.objects.all()
    serializer_class = MensajeSerializer
    permission_classes = [IsAuthenticated]
