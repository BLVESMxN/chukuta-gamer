import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

class LoginModalTest(unittest.TestCase):

    def setUp(self):
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service)
        self.driver.implicitly_wait(10)

    def tearDown(self):
        self.driver.quit()

    def test_login_sin_credenciales(self):
        # --- Preparación de la prueba ---
        self.driver.get("http://localhost:8081")
        # Abrir el modal
        login_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[2]/button')
        login_btn.click()
        time.sleep(1)

        # --- Lógica de la prueba ---
        # Hacer click en el botón Ingresar sin ingresar datos
        ingresar_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[3]/div/div/button')
        ingresar_btn.click()

        # --- Validación de la situación esperada ---
        # Esperar a que aparezca el alerta
        alert = WebDriverWait(self.driver, 5).until(EC.alert_is_present())

        # Verificar el texto del alerta
        self.assertEqual(alert.text, "Credenciales incorrectas")

        # Cerrar el alerta
        alert.accept()

if __name__ == "__main__":
    unittest.main()
