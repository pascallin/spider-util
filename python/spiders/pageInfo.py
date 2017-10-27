from selenium import webdriver
import time
from pprint import pprint
from selenium.webdriver.common.action_chains import ActionChains

def get_page_html(url):
    driver = webdriver.PhantomJS()
    driver.set_window_size(1120, 550)
    driver.get(url)

    # elements = driver.find_elements_by_class_name('img_loading')
    # for element in elements:
    #     action.move_to_element(element).perform()
    #     time.sleep(5)

    # images = driver.find_elements_by_xpath("./*//img")
    # for image in images:
    #     pprint(image.get_attribute('src'))

    # return "okay"

    html = driver.find_element_by_id('js_content').get_attribute('innerHTML')
    return { 
        'html': html
    }


# get_page_source("https://mp.weixin.qq.com/s?__biz=MzA5MDE1MzYxNw==&mid=2649981819&idx=1&sn=cfbb1222c8c2b6f936ba52c5eaf4982b&chksm=8808d485bf7f5d930982999f2ade4fa600cc9e46c042d34f5438cb2ead0817fbfc3c8995dadc#rd");