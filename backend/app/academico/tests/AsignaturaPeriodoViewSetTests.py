from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from academico.models import Asignatura, Periodo, AsignaturaPeriodo
from django.contrib.auth import get_user_model
from academico.serializers import AsignaturaPeriodoSerializer

# Definir las URLs para los endpoints
ASIGNATURAPERIODO_URL = reverse('asignaturaperiodo-list')

def sample_user(email='test@example.com', password='Testpass123#Testpass123#'):
    """Crear un usuario de ejemplo"""
    return get_user_model().objects.create_user(email, password)

def sample_asignatura(nombre='Matemáticas'):
    """Crear una asignatura de ejemplo"""
    return Asignatura.objects.create(nombre=nombre)

def sample_periodo(anio=2024, trimestre=1):
    """Crear un periodo de ejemplo"""
    return Periodo.objects.create(anio=anio, trimestre=trimestre)

def sample_asignatura_periodo(user, asignatura=None, periodo=None):
    """Crear una AsignaturaPeriodo de ejemplo"""
    asignatura = asignatura or sample_asignatura()
    periodo = periodo or sample_periodo()
    return AsignaturaPeriodo.objects.create(asignatura=asignatura, periodo=periodo, usuario=user)

class AsignaturaPeriodoViewSetTests(TestCase):
    """Pruebas para el AsignaturaPeriodoViewSet"""

    def setUp(self):
        self.client = APIClient()
        self.user = sample_user()

    def test_list_asignatura_periodos(self):
        """Prueba para listar AsignaturaPeriodos"""
        sample_asignatura_periodo(user=self.user)
        sample_asignatura_periodo(user=self.user, asignatura=sample_asignatura(nombre="Historia"))

        res = self.client.get(ASIGNATURAPERIODO_URL)
        asignatura_periodos = AsignaturaPeriodo.objects.all()
        serializer = AsignaturaPeriodoSerializer(asignatura_periodos, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_asignatura_periodo(self):
        """Prueba para crear un nuevo AsignaturaPeriodo"""
        asignatura = sample_asignatura()
        periodo = sample_periodo()
        payload = {
            'asignatura': asignatura.id,
            'periodo': periodo.id,
            'usuario': self.user.id
        }
        res = self.client.post(ASIGNATURAPERIODO_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        asignatura_periodo = AsignaturaPeriodo.objects.get(id=res.data['id'])
        self.assertEqual(asignatura_periodo.asignatura, asignatura)
        self.assertEqual(asignatura_periodo.periodo, periodo)
        self.assertEqual(asignatura_periodo.usuario, self.user)

    def test_update_asignatura_periodo(self):
        """Prueba para actualizar un AsignaturaPeriodo"""
        asignatura_periodo = sample_asignatura_periodo(user=self.user)
        new_periodo = sample_periodo(anio=2025, trimestre=2)

        payload = {'periodo': new_periodo.id}
        url = reverse('asignaturaperiodo-detail', args=[asignatura_periodo.id])
        res = self.client.patch(url, payload)

        asignatura_periodo.refresh_from_db()
        self.assertEqual(asignatura_periodo.periodo, new_periodo)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_asignatura_periodo(self):
        """Prueba para eliminar un AsignaturaPeriodo"""
        asignatura_periodo = sample_asignatura_periodo(user=self.user)
        url = reverse('asignaturaperiodo-detail', args=[asignatura_periodo.id])

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(AsignaturaPeriodo.objects.filter(id=asignatura_periodo.id).exists())
