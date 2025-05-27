

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
        
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service)
        self.driver.implicitly_wait(10)

    def tearDown(self):
        self.driver.quit()

    def test_user_logout(self):
        
        self.driver.get("http://localhost:8081")

        
        login_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[2]/button')
        login_btn.click()
        time.sleep(1)

        
        inputs = self.driver.find_elements(By.XPATH, '//*[@id="app"]/nav/div[3]/div//input')
        inputs[0].send_keys("admin@example.com")
        inputs[1].send_keys("admin")

        
        ingresar_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[3]/div/div/button')
        ingresar_btn.click()

        
        WebDriverWait(self.driver, 5).until(
            EC.url_contains("/grados-admin")
        )

        
        menu = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[2]/div')
        menu.click()
        time.sleep(1)

        logout_btn = self.driver.find_element(By.XPATH, '//*[@id="app"]/nav/div[2]/div/div/button')
        logout_btn.click()

        WebDriverWait(self.driver, 5).until(
            EC.url_to_be("http://localhost:8081/")
        )

        
        self.assertEqual(self.driver.current_url, "http://localhost:8081/")

if __name__ == "__main__":
    unittest.main()
