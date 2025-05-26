import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

class UserLogoutTest(unittest.TestCase):

    def setUp(self):
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service)
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


    def test_create_grade(self):
        self.login_as_admin()

        # 1. Localizar el formulario de "Agregar Grado"
        contenedor = self.driver.find_element(
            By.XPATH,
            "//div[contains(@class,'form-container') and .//h2[text()='Agregar Grado']]"
        )
        selects = contenedor.find_elements(By.CSS_SELECTOR, "select.input-field")
        select_nivel = Select(selects[0])
        select_grado = Select(selects[1])

        # 2. Elegir Nivel=Secundaria y Grado=3
        select_nivel.select_by_value("2")
        select_grado.select_by_value("3")

        # 3. Hacer clic en "Agregar Grado"
        add_btn = contenedor.find_element(By.CSS_SELECTOR, "button.add-button")
        add_btn.click()

        # 4. Esperar alerta y aceptarla
        WebDriverWait(self.driver, 5).until(EC.alert_is_present())
        alerta = self.driver.switch_to.alert
        # (Opcional) Comprobar texto de la alerta
        self.assertEqual(alerta.text, "¡Grado agregado exitosamente!")
        alerta.accept()

        # 5. Verificar que la tabla muestre Nivel "Secundaria" y Grado "3º"
        xpath_nuevo = "//table//tbody//tr[td[text()='Secundaria'] and td[text()='3º']]"
        WebDriverWait(self.driver, 5).until(
            EC.presence_of_element_located((By.XPATH, xpath_nuevo))
        )
        elemento = self.driver.find_element(By.XPATH, xpath_nuevo)
        self.assertIsNotNone(elemento)


if __name__ == "__main__":
    unittest.main()
