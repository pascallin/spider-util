from flask import Flask, request, jsonify
app = Flask(__name__)
import json
from pprint import pprint
from spiders import sougouInfo, pageInfo

@app.route('/gzh/info', methods=['POST'])
def gzh():
    data = request.get_data()
    j_data =  json.loads(data)
    pprint(j_data)
    result = sougouInfo.get_gzh_stuff(j_data['url'])
    return jsonify(result)

@app.route('/page/info', methods=['POST'])
def page():
    data = request.get_data()
    j_data =  json.loads(data)
    pprint(j_data)
    result = pageInfo.get_page_html(j_data['url'])
    return jsonify(result)