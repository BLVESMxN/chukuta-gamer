from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from academico.models import EstadoTarea
from academico.serializers import EstadoTareaSerializer

# Definir la URL para listar los estados de tarea
ESTADOTAREA_URL = reverse('estadotarea-list')  # Asegúrate de que este nombre coincide con el que definiste en tu urls.py

def sample_estado_tarea(nombre='Pendiente'):
    """Crea un estado de tarea de ejemplo"""
    return EstadoTarea.objects.create(nombre=nombre)

class EstadoTareaViewSetTests(TestCase):
    """Pruebas para el EstadoTareaViewSet"""

    def setUp(self):
        self.client = APIClient()

    def test_list_estadotareas(self):
        """Prueba listar estados de tareas"""
        sample_estado_tarea()
        sample_estado_tarea(nombre='Completada')

        res = self.client.get(ESTADOTAREA_URL)
        estadotareas = EstadoTarea.objects.all()
        serializer = EstadoTareaSerializer(estadotareas, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_estado_tarea(self):
        """Prueba crear un estado de tarea"""
        payload = {
            'nombre': 'En Proceso'
        }
        res = self.client.post(ESTADOTAREA_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        estadotarea = EstadoTarea.objects.get(id=res.data['id'])
        self.assertEqual(payload['nombre'], estadotarea.nombre)

    def test_update_estado_tarea(self):
        """Prueba actualizar un estado de tarea"""
        estadotarea = sample_estado_tarea()

        payload = {'nombre': 'Actualizado'}
        url = reverse('estadotarea-detail', args=[estadotarea.id])
        res = self.client.patch(url, payload)

        estadotarea.refresh_from_db()
        self.assertEqual(estadotarea.nombre, payload['nombre'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_estado_tarea(self):
        """Prueba eliminar un estado de tarea"""
        estadotarea = sample_estado_tarea()
        url = reverse('estadotarea-detail', args=[estadotarea.id])

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(EstadoTarea.objects.filter(id=estadotarea.id).exists())