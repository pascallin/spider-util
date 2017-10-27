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

    infoList = []

    desc = driver.find_elements_by_class_name('profile_desc_value')
    summary = desc[0].text
    company = desc[1].text
    nickname = driver.find_element_by_class_name('profile_nickname').text
    account = driver.find_element_by_class_name('profile_account').text.split(": ")[1]

    elements = driver.find_elements_by_css_selector('.weui_media_box')
    for element in elements:
        topline_id = element.get_attribute('id')
        if topline_id.strip():
            is_top = True
        else:
            is_top = False
        img = element.find_element_by_class_name('weui_media_hd').value_of_css_property('background-image')
        title = element.find_element_by_class_name('weui_media_title').text
        link = "https://mp.weixin.qq.com" + element.find_element_by_class_name('weui_media_title').get_attribute('hrefs')
        desc = element.find_element_by_class_name('weui_media_desc').text
        date = element.find_element_by_class_name('weui_media_extra_info').text
        # get article page info
        # html = pageInfo.get_page_html(link)
        # time.sleep(3)
        data = {
            'img': img[4:-1],
            'title': title.encode('utf-8'),
            'link': link,
            'desc': desc.encode('utf-8'),
            'date': date.encode('utf-8'),
            'isTop': is_top,
            # 'html': html,
            'gzhNickname': nickname,
            'gzhAccount': account
        }
        # for (k,v) in  data.items():
        #     print v
        infoList.append(data)
        
    result = {
        'company': company,
        'summary': summary,
        'infoList': infoList
    }

    return result