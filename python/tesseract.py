#coding=utf-8

from PIL import Image
import pytesseract
from selenium import webdriver

url='http://weixin.sogou.com/antispider/util/seccode.php?tc=1508928602'
driver = webdriver.Chrome(executable_path='/Users/pascal/Software/chromedriver')
driver.maximize_window() #将浏览器最大化，以获取更清晰的校验码图片
driver.get(url)
driver.save_screenshot('./test.jpg') #截取当前网页，该网页有我们需要的验证码
imgelement = driver.find_element_by_xpath("./*//img") #通过id定位验证码
location = imgelement.location #获取验证码的x,y轴
size = imgelement.size  #获取验证码的长宽
rangle=(int(location['x']),\
         int(location['y']),\
         int(location['x']+size['width']),\
         int(location['y']+size['height'])) #写成我们需要截取的位置坐标
i=Image.open('./test.jpg') #打开截图
verifycodeimage=i.crop(rangle)   #使用Image的crop函数，从截图中再次截取我们需要的区域
verifycodeimage.save('/Users/pascal/Downloads/verifycodeimage.png')
image=Image.open('/Users/pascal/Downloads/verifycodeimage.png')
#print image
vcode=pytesseract.image_to_string(image).strip() #使用image_to_string识别验证码
print vcode