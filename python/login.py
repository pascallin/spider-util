from selenium import webdriver
import time
import json
from pprint import pprint
from io import open

post = {}

driver = webdriver.Chrome(executable_path='/Users/pascal/Software/chromedriver')
driver.get('https://mp.weixin.qq.com/')
time.sleep(2)
driver.find_element_by_xpath("./*//input[@name='account']").clear()
driver.find_element_by_xpath("./*//input[@name='account']").send_keys('pengpengkeng@gmail.com')
driver.find_element_by_xpath("./*//input[@name='password']").clear()
driver.find_element_by_xpath("./*//input[@name='password']").send_keys('pengpengkeng2016')
time.sleep(5)
# click remember me
driver.find_element_by_xpath("./*//a[@class='btn_login']").click()
time.sleep(15)
# scan qrcode to login
driver.get('https://mp.weixin.qq.com/')
cookie_items = driver.get_cookies()
for cookie_item in cookie_items:
    post[cookie_item['name']] = cookie_item['value']
cookie_str = json.dumps(post)
with open('cookie.txt', 'w+', encoding='utf-8') as f:
    f.write(unicode(cookie_str))