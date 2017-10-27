from selenium import webdriver
import json

class Spider():
    def __init__(self, name, rules):
        self.name = name
        # rules
        self.rules = rules
    
    def parse(self):
        if self.rules['selector'] is 'css':
            self.css_spider()

    def css_spider():
        driver = webdriver.PhantomJS()
        driver.set_window_size(1120, 550)
        driver.get(rules.url)

        data = {}

    def xpath_spider():
        self.rules

    def json_spider():
        self.rules