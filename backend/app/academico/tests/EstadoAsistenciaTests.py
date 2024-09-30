from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from academico.models import EstadoAsistencia
from academico.serializers import EstadoAsistenciaSerializer

# URL de la vista del EstadoAsistencia
ESTADO_ASISTENCIA_URL = reverse('estadoasistencia-list')

def sample_estado_asistencia(**params):
    """Crea un EstadoAsistencia de ejemplo"""
    defaults = {
        'nombre': 'Presente'
    }
    defaults.update(params)
    return EstadoAsistencia.objects.create(**defaults)

class EstadoAsistenciaViewSetTests(TestCase):
    """Pruebas para el EstadoAsistenciaViewSet"""

    def setUp(self):
        self.client = APIClient()

    def test_list_estado_asistencia(self):
        """Prueba listar los estados de asistencia"""
        sample_estado_asistencia()
        sample_estado_asistencia(nombre='Ausente')

        res = self.client.get(ESTADO_ASISTENCIA_URL)
        estados = EstadoAsistencia.objects.all()
        serializer = EstadoAsistenciaSerializer(estados, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_estado_asistencia(self):
        """Prueba crear un estado de asistencia"""
        payload = {
            'nombre': 'Tarde'
        }
        res = self.client.post(ESTADO_ASISTENCIA_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        estado = EstadoAsistencia.objects.get(id=res.data['id'])
        self.assertEqual(estado.nombre, payload['nombre'])

    def test_update_estado_asistencia(self):
        """Prueba actualizar un estado de asistencia"""
        estado = sample_estado_asistencia()

        payload = {'nombre': 'Justificado'}
        url = reverse('estadoasistencia-detail', args=[estado.id])
        res = self.client.patch(url, payload)

        estado.refresh_from_db()
        self.assertEqual(estado.nombre, payload['nombre'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_estado_asistencia(self):
        """Prueba eliminar un estado de asistencia"""
        estado = sample_estado_asistencia()
        url = reverse('estadoasistencia-detail', args=[estado.id])

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(EstadoAsistencia.objects.filter(id=estado.id).exists())
