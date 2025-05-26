import unittest
import time
from selenium.common.exceptions import TimeoutException 
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import UnexpectedAlertPresentException
from webdriver_manager.chrome import ChromeDriverManager

class AdminTests(unittest.TestCase):

    def setUp(self):
        options = webdriver.ChromeOptions()

        # 1. Desactivar servicio de credenciales y gestor de contraseñas
        prefs = {
            "credentials_enable_service": False,
            "profile.password_manager_enabled": False,
            "password_manager_enabled": False,
            "profile.password_manager_leak_detection_enabled": False
        }
        options.add_experimental_option("prefs", prefs)

        # 2. Desactivar la característica de detección de brechas
        options.add_argument("--disable-features=PasswordLeakDetection")
        options.add_argument("--disable-blink-features=PasswordLeakDetection")

        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=options)
        self.driver.implicitly_wait(10)

    def tearDown(self):
        self.driver.quit()

    def login_as_admin(self):
        # 1) Navegar y autenticar
        self.driver.get("http://localhost:8081")
        login_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[2]/button')
        login_btn.click()
        time.sleep(1)
        inputs = self.driver.find_elements(By.XPATH, '//*[@id="app"]/nav/div[3]/div//input')
        inputs[0].send_keys("admini@example.com")
        inputs[1].send_keys("safe?admini?123")
        ingresar_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[3]/div/div/button')
        ingresar_btn.click()

        # 2) Esperar a la página de administración de grados
        WebDriverWait(self.driver, 5).until(
            EC.url_contains("/grados-admin")
        )


    def test_create_colegio(self):
        # 1) Login (ya desecha la alerta)
        self.login_as_admin()

        # 2) Ir al panel de Colegios
        colegio_nav = self.driver.find_element(
            By.XPATH,
            "//li[contains(@class,'navbar-item') and contains(normalize-space(.),'Colegios')]"
        )
        colegio_nav.click()

   
        # 3) Esperar el formulario…
        WebDriverWait(self.driver, 5).until(
            EC.visibility_of_element_located((By.XPATH, "//h2[text()='Agregar Colegio']"))
        )

        # 4) Rellenar y enviar…
        nombre_input = self.driver.find_element(By.CSS_SELECTOR, ".form-container input[placeholder='Nombre del colegio']")
        extension_input = self.driver.find_element(By.CSS_SELECTOR, ".form-container input[placeholder='Extensión del colegio']")
        nombre_input.send_keys("Colegio Selenium")
        extension_input.send_keys("lpz")
        add_btn = self.driver.find_element(By.ID, "add-school-button")
        add_btn.click()

        # 6) Verificar la fila nueva en la tabla
        xpath_nuevo = ("//table//tbody//tr"
                       "[td[text()='Colegio Selenium'] and td[text()='lpz']]")
        WebDriverWait(self.driver, 5).until(
            EC.presence_of_element_located((By.XPATH, xpath_nuevo))
        )
        elemento = self.driver.find_element(By.XPATH, xpath_nuevo)
        self.assertIsNotNone(elemento)

if __name__ == "__main__":
    unittest.main()
