# -*- coding:utf-8 -*-
import requests
import redis
import json
import re
import random
import time
from pprint import pprint
from io import open

gzlist = ['大联大']
 
url = 'https://mp.weixin.qq.com'
header = {
    "HOST": "mp.weixin.qq.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0"
    }
 
with open('cookie.txt', 'r', encoding='utf-8') as f:
    cookie = f.read()
cookies = json.loads(cookie)
response = requests.get(url=url, cookies=cookies)
token = re.findall(r'token=(\d+)', str(response.url))[0]
for query in gzlist:
    query_id = {
        'action': 'search_biz',
        'token' : token,
        'lang': 'zh_CN',
        'f': 'json',
        'ajax': '1',
        'random': random.random(),
        'query': query,
        'begin': '0',
        'count': '5',
    }
    search_url = 'https://mp.weixin.qq.com/cgi-bin/searchbiz?'
    search_response = requests.get(search_url, cookies=cookies, headers=header, params=query_id)
    lists = search_response.json().get('list')[0]
    fakeid = lists.get('fakeid')
    query_id_data = {
        'token': token,
        'lang': 'zh_CN',
        'f': 'json',
        'ajax': '1',
        'random': random.random(),
        'action': 'list_ex',
        'begin': '0',
        'count': '5',
        'query': '',
        'fakeid': fakeid,
        'type': '9'
    }
    appmsg_url = 'https://mp.weixin.qq.com/cgi-bin/appmsg?'
    appmsg_response = requests.get(appmsg_url, cookies=cookies, headers=header, params=query_id_data)
    max_num = appmsg_response.json().get('app_msg_cnt')
    pprint(appmsg_response.json().get('app_msg_list'))
    # num = int(int(max_num) / 5)
    # begin = 0
    # while num + 1 > 0 :
    #     query_id_data = {
    #         'token': token,
    #         'lang': 'zh_CN',
    #         'f': 'json',
    #         'ajax': '1',
    #         'random': random.random(),
    #         'action': 'list_ex',
    #         'begin': '{}'.format(str(begin)),
    #         'count': '5',
    #         'query': '',
    #         'fakeid': fakeid,
    #         'type': '9'
    #     }
    #     print('next page###################',begin)
    #     query_fakeid_response = requests.get(appmsg_url, cookies=cookies, headers=header, params=query_id_data)
    #     fakeid_list = query_fakeid_response.json().get('app_msg_list')
    #     for item in fakeid_list:
    #         print(item.get('link'))
    #     num -= 1
    #     begin = int(begin)
    #     begin+=5
    #     time.sleep(2)