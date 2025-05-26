
import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

class LoginModalTest(unittest.TestCase):

    def setUp(self):
        # Preparación del WebDriver
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service)
        self.driver.implicitly_wait(10)

    def tearDown(self):
        # Cierre del navegador
        self.driver.quit()

    def test_abrir_modal_login(self):
        # --- Preparación de la prueba ---
        url = "http://localhost:8081"
        self.driver.get(url)

        # --- Lógica de la prueba ---
        # Localiza el botón de login por su XPath y hace click
        login_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[2]/button')
        login_btn.click()

        # Espera breve para que el modal aparezca
        time.sleep(1)

        # Localiza el modal por su id
        modal = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[3]/div')

        # --- Validación de la situación esperada ---
        # Verifica que el modal sea visible
        self.assertTrue(modal.is_displayed())

if __name__ == "__main__":
    unittest.main()
