# -*- coding:utf-8 -*-
from selenium import webdriver
import time
from pprint import pprint
from selenium.webdriver.common.action_chains import ActionChains
import sys
reload(sys)
sys.setdefaultencoding('utf8')
from spiders import pageInfo
import time

def get_gzh_stuff(url):
    driver = webdriver.PhantomJS()
    driver.set_window_size(1120, 550)
    driver.get(url)

    gzhList = []

    body = driver.find_element_by_css_selector('body').get_attribute('innerHTML')
    pprint(body.encode('utf-8'))
    elements = driver.find_elements_by_css_selector('.weui_media_box')
    for element in elements:
        name = driver.find_elements_by_css_selector('.gzh-box2 .txt-box .tit a').text
        gzhList.append({'name':name})
    pprint(gzhList)
    return gzhList

get_gzh_stuff("http://weixin.sogou.com/weixin?type=1&s_from=input&query=Silicon+Labs&ie=utf8&_sug_=n&_sug_type_=")