#Bibliotecas
import unittest 
import time      
from selenium import webdriver                    
from selenium.webdriver.common.by import By       
from selenium.webdriver.chrome.service import Service  
from webdriver_manager.chrome import ChromeDriverManager  

class BuscarGoogleTest(unittest.TestCase):

    # Preparacion
    def setUp(self):
        # Configuracion del navegador  
        service = Service(ChromeDriverManager().install())
        # Inicio navegador chrome
        self.driver = webdriver.Chrome(service=service)
        # Tiempo maximo espera
        self.driver.implicitly_wait(10)

    # Método que se ejecuta después de cada prueba
    def tearDown(self):
        # Cierre del navegador
        self.driver.quit()

    # Prueba principal: verificar que el botón "Buscar con Google" está presente
    def test_boton_buscar_google(self):
        # Abre la página de Google
        self.driver.get("https://www.google.com")

        # Espera unos segundos
        time.sleep(3)

        # Busca el botón de búsqueda por su atributo "name"
        boton = self.driver.find_element(By.NAME, "btnK")

        # Obtiene el texto que aparece en el botón
        texto_boton = boton.get_attribute("value")
        print("Texto del botón:", texto_boton)

        # Verificacion
        self.assertEqual(texto_boton, "Buscar con Google")
if __name__ == "__main__":
    unittest.main()
