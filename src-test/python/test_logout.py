"""
/****************************************/
// Historia de Usuario: Como usuario administrador quiero cerrar sesión para volver a la página principal
// Prueba de Aceptacion: Verificar que tras cerrar sesión se redirija a la ruta http://localhost:8081/
// Pasos a realizar:
// 1. Navegar a la página principal: http://localhost:8081
// 2. Abrir el modal de inicio de sesión y autenticar con credenciales válidas:
//    - Usuario: admin@example.com
//    - Contraseña: admin
// 3. Hacer click en el menú desplegable usando XPath //*[@id="app"]/nav/div[2]/div
// 4. Hacer click en el botón “Cerrar Sesión” usando XPath //*[@id="app"]/nav/div[2]/div/div/button
// Resultado Esperado: El navegador se redirige a http://localhost:8081/
/****************************************/
"""

import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

class UserLogoutTest(unittest.TestCase):

    def setUp(self):
        # Preparación: configurar ChromeDriver
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service)
        self.driver.implicitly_wait(10)

    def tearDown(self):
        # Cierra el navegador
        self.driver.quit()

    def test_user_logout(self):
        # 1. Navegar a la página principal
        self.driver.get("http://localhost:8081")

        # 2. Abrir el modal de inicio de sesión
        login_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[2]/button')
        login_btn.click()
        time.sleep(1)

        # 2b. Rellenar usuario y contraseña
        inputs = self.driver.find_elements(By.XPATH, '//*[@id="app"]/nav/div[3]/div//input')
        inputs[0].send_keys("admin@example.com")
        inputs[1].send_keys("admin")

        # 2c. Hacer click en “Ingresar”
        ingresar_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[3]/div/div/button')
        ingresar_btn.click()

        # Esperar a que se redirija al inicio de estudiante
        WebDriverWait(self.driver, 5).until(
            EC.url_contains("/inicio-estudiante")
        )

        # 3. Hacer click en el menú desplegable
        menu = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[2]/div')
        menu.click()
        time.sleep(1)

        # 4. Hacer click en “Cerrar Sesión”
        logout_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[2]/div/div/button')
        logout_btn.click()

        # Esperar a que la URL vuelva a la página principal
        WebDriverWait(self.driver, 5).until(
            EC.url_to_be("http://localhost:8081/")
        )

        # Validación: comprobar que estamos en la ruta raíz
        self.assertEqual(self.driver.current_url, "http://localhost:8081/")

if __name__ == "__main__":
    unittest.main()
