from selenium import webdriver
import time
from pprint import pprint
from selenium.webdriver.common.action_chains import ActionChains

def get_list_source(url):
    driver = webdriver.PhantomJS()
    driver.set_window_size(1120, 550)
    driver.get(url)

    linkSet = set([])
    elements = driver.find_elements_by_css_selector('.solution_info_tit a')
    for element in elements:
        linkSet.add(element.get_attribute('href'))

    pprint(linkSet)

    return "okay"


get_list_source("http://www.icbase.com/Solution.aspx");