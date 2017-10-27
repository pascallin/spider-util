const Spider  = require('../BaseSpider');
const rules   = require('../rules/sougou');
const cheerio = require('cheerio');
const rp      = require('request-promise');
const db      = require('../db');
const util    = require('../util');

class NewSpider extends Spider{
    
    constructor(){
        super('sougou');
    }

    *parse(){
        let manufatoryName = ["Silicon Labs","德州仪器","亚德诺","意法半导体","恩智浦","Qualcomm","美信半导体","凌力尔特","英飞凌","瑞萨电子"];
        let techName = ["FPGA","传感器","ARM","RFID"];
        let elenTechName = [ 
            "可编程逻辑", 
            "电源/新能源", 
            "MEMS/传感技术", 
            "测量仪表", 
            "嵌入式技术", 
            "制造/封装", 
            "模拟技术", 
            "连接器", 
            "EMC/EMI设计", 
            "光电显示", 
            "存储技术", 
            "EDA/IC设计", 
            "处理器/DSP", 
            "接口/总线/驱动", 
            "控制/MCU", 
            "RF/无线"
        ];
        let applicationName = [ 
            "音视频及家电", 
            "LEDs", 
            "汽车电子", 
            "通信网络", 
            "医疗电子", 
            "智能电网", 
            "机器人", 
            "人工智能", 
            "vr|ar|虚拟现实", 
            "可穿戴设备", 
            "安全设备/系统", 
            "军用/航空电子", 
            "移动通信", 
            "便携设备", 
            "触控感测", 
            "物联网", 
            "工业控制"
        ];
        let topic1 = [
            "物联网", 
            "LED驱动", 
            "LTE测试", 
            "智能电表", 
            "处理器", 
            "信号完整性", 
            "FPGA", 
            "802.11ac", 
            "IGBT", 
            "MOSFET", 
            "OGS", 
            "触控技术", 
            "电源管理", 
            "SoC FPGA", 
            "工业控制", 
            "马达控制", 
            "Altera", 
            "All Programmable", 
            "FinFET", 
            "赛灵思", 
            "高清视频", 
            "28nm", 
            "嵌入式视觉", 
            "时序设计", 
            "VHDL", 
            "Verilog HDL", 
        ];
        let topic2 = [
            "无线充电", 
            "LED驱动", 
            "电源管理", 
            "电池充电", 
            "低功耗", 
            "开关电源", 
            "数字电源", 
            "智能电网", 
            "智能电表", 
            "逆变器", 
            "IGBT", 
            "电动车", 
            "MOSFET",
        ];
        let topic3 = [
            "无线传感器", 
            "传感器", 
            "WSN", 
            "体感控制", 
            "图像传感器", 
            "传感器技术", 
            "指纹识别", 
            "指纹传感器", 
            "人体传感网络", 
            "MEMS", 
            "物联网", 
            "测试测量", 
            "传感器网络",
        ];
        let topic4 = [
            "无线", 
            "3G", 
            "GPS", 
            "WCDMA", 
            "TD-SCDMA", 
            "RFID", 
            "CDMA", 
            "天线", 
            "监控系统", 
            "GPRS", 
            "物联网", 
            "LTE", 
            "GSM",
        ];
        let topic5 = [
            "汽车", 
            "变换器", 
            "雷达", 
            "电动汽车", 
            "燃料电池", 
            "CCD", 
            "车载", 
            "热敏电阻", 
            "报警系统", 
            "智能车", 
            "Molex", 
            "通信技术", 
            "分布式",
        ];
        let topics = [
            "物联网", 
            "LED驱动", 
            "LTE测试", 
            "智能电表", 
            "处理器", 
            "信号完整性", 
            "FPGA", 
            "802.11ac", 
            "IGBT", 
            "MOSFET", 
            "OGS", 
            "触控技术", 
            "电源管理", 
            "SoC FPGA", 
            "工业控制", 
            "马达控制", 
            "Altera", 
            "All Programmable", 
            "FinFET", 
            "赛灵思", 
            "高清视频", 
            "28nm", 
            "嵌入式视觉", 
            "时序设计", 
            "VHDL", 
            "Verilog HDL", 
            "IP", 
            "无线充电", 
            "LED驱动", 
            "电源管理", 
            "电池充电", 
            "低功耗", 
            "开关电源", 
            "数字电源", 
            "智能电网", 
            "智能电表", 
            "逆变器", 
            "IGBT", 
            "电动车", 
            "MOSFET", 
            "PMIC", 
            "功率器件", 
            "无线传感器", 
            "传感器", 
            "WSN", 
            "体感控制", 
            "图像传感器", 
            "传感器技术", 
            "指纹识别", 
            "指纹传感器", 
            "人体传感网络", 
            "MEMS", 
            "物联网", 
            "测试测量", 
            "传感器网络", 
            "LTE测试", 
            "电子测量", 
            "LitePoint", 
            "LabVIEW", 
            "产线测试", 
            "无线测试", 
            "示波器", 
            "信号发生器", 
            "虚拟仪器", 
            "基站测试", 
            "802.11ac", 
            "频谱分析仪", 
            "信号完整性", 
            "信号采集", 
            "通信测试", 
            "32位MCU", 
            "马达控制", 
            "电机控制", 
            "智能系统", 
            "MCU", 
            "中断系统", 
            "联网技术", 
            "微控制器", 
            "RTOS", 
            "MSP430", 
            "操作系统", 
            "指针", 
            "嵌入式系统", 
            "STM32", 
            "C", 
            "PIC单片机", 
            "keil", 
            "FinFET", 
            "SoC", 
            "台积电", 
            "三星", 
            "英特尔", 
            "联电", 
            "28nm", 
            "SIP", 
            "半导体技术", 
            "晶圆", 
            "封装技术", 
            "3D IC", 
            "集成电路", 
            "EUV", 
            "TSV", 
            "武汉光谷", 
            "摩尔定律", 
            "3D打印", 
            "PLL", 
            "转换器", 
            "放大器", 
            "仿真", 
            "ADC", 
            "模拟", 
            "脉冲", 
            "DAC", 
            "时钟", 
            "AFE", 
            "高通", 
            "振荡电路", 
            "滤波器", 
            "模数转换器", 
            "ADS", 
            "锁相环", 
            "DDS", 
            "混合信号", 
            "凌力尔特", 
            "EDA", 
            "IC设计", 
            "Synopsys", 
            "建模", 
            "仿真", 
            "Altium", 
            "PCB", 
            "Mentor", 
            "FinFET", 
            "14nm", 
            "TSMC", 
            "20nm", 
            "芯片验证", 
            "布线", 
            "MATLAB", 
            "Allegro", 
            "失效分析", 
            "Protel", 
            "USB", 
            "CAN总线", 
            "接口", 
            "恩智浦", 
            "电机驱动", 
            "I2C总线", 
            "Type-C", 
            "大联大", 
            "RS-485", 
            "LC", 
            "USB 3.0", 
            "vc", 
            "Se", 
            "SSD", 
            "云储存", 
            "大数据", 
            "Micron", 
            "SATA", 
            "Marvell", 
            "FRAM", 
            "混合存储", 
            "存储器", 
            "闪存技术", 
            "NAND", 
            "FlaSh", 
            "DRAM", 
            "华为存储", 
            "闪存", 
            "SRAM", 
            "HDMI", 
            "AMOLED", 
            "On-cell", 
            "OGS", 
            "TFT", 
            "光源", 
            "OLED", 
            "4K电视", 
            "智能电视", 
            "3D电视", 
            "UHD", 
            "显示技术", 
            "液晶", 
            "大屏", 
            "平板", 
            "柔性显示", 
            "In cell", 
            "触摸屏", 
            "开关电源", 
            "PCB", 
            "ESD", 
            "防护器件", 
            "电路保护", 
            "通信", 
            "射频", 
            "RF", 
            "CMOS", 
            "PWM", 
            "电路", 
            "测量", 
            "静电放电", 
            "静电防护", 
            "电磁干扰", 
            "射频", 
            "电磁兼容", 
            "EMC", 
            "混合信号", 
            "信号干扰", 
            "Littelfuse", 
            "LED", 
            "传感器", 
            "PLC", 
            "LED照明", 
            "无线", 
            "汽车", 
            "3g", 
            "GPS", 
            "TD-SCDMA", 
            "WCDMA", 
            "RFID", 
            "CPLD", 
            "变换器", 
            "LED", 
            "LED照明", 
            "驱动器", 
            "照明", 
            "封装", 
            "led灯", 
            "电子制作", 
            "LED显示屏", 
            "LG", 
            "LED芯片", 
            "DIY", 
            "温度计", 
            "标准", 
            "功放电路", 
            "模拟电子", 
            "光电", 
            "电子工程师", 
            "数字音频", 
            "高清", 
            "点阵", 
            "电路分析", 
            "耳机放大器", 
            "无线话筒", 
            "扫描仪", 
            "Arduino", 
            "家庭影院", 
            "汽车", 
            "变换器", 
            "雷达", 
            "电动汽车", 
            "燃料电池", 
            "CCD", 
            "车载", 
            "热敏电阻", 
            "报警系统", 
            "智能车", 
            "Molex", 
            "通信技术", 
            "分布式", 
            "CPLD", 
            "测试", 
            "无线通信", 
            "通信", 
            "虚拟仪器", 
            "控制", 
            "ZigBee", 
            "路由器", 
            "intel", 
            "AD", 
            "云计算", 
            "pci", 
            "操作系统", 
            "传感器", 
            "LCD", 
            "MSP430", 
            "超声波", 
            "检测", 
            "摩托罗拉", 
            "红外", 
            "光电耦合器", 
            "信号处理", 
            "监测系统", 
            "编码器", 
            "NEC", 
            "压力传感器", 
            "PLC", 
            "继电器", 
            "步进电机", 
            "CAN总线", 
            "PC", 
            "电机", 
            "CAN", 
            "报警器", 
            "西门子", 
            "压缩机", 
            "控制电路", 
            "交换机", 
            "微波", 
            "无线", 
            "3G", 
            "GPS", 
            "WCDMA", 
            "TD-SCDMA", 
            "RFID", 
            "CDMA", 
            "天线", 
            "监控系统", 
            "GPRS", 
            "物联网", 
            "LTE", 
            "GSM", 
            "汽车", 
            "安全系统", 
            "北斗导航", 
            "可穿戴设备", 
            "st", 
            "医疗电子", 
            "可穿戴", 
            "消费电子", 
            "智能手表", 
            "移动设备", 
            "智能眼镜", 
            "iOS", 
            "智慧城市", 
            "智能医疗", 
            "苹果", 
            "智能手环", 
            "vr", 
            "AR", 
            "虚拟现实", 
            "谷歌", 
            "Oculus", 
            "微软", 
            "HTC", 
            "苹果", 
            "三星", 
            "VR游戏", 
            "VR眼镜", 
            "索尼", 
            "HTC Vive", 
            "人工智能", 
            "AI", 
            "机器人", 
            "谷歌", 
            "机器学习", 
            "深度学习", 
            "大数据", 
            "英特尔", 
            "语音识别", 
            "百度", 
            "微软", 
            "苹果", 
            "智能家居", 
            "机器人", 
            "工业机器人", 
            "人工智能", 
            "服务机器人", 
            "智能机器人", 
            "智能制造", 
            "扫地机器人", 
            "传感器", 
            "智能硬件", 
            "无人机", 
            "医疗机器人", 
            "工业4.0", 
            "自动化"
        ];

        let urls = this.getUrls(["Silicon Labs"]);
        
        urls = urls.sort(function(){ return 0.5 - Math.random(); });
        
        for (let item of urls) {
            console.log('-------------> item', item);
            // let check = yield db.get('spider-done-keyword').findOne({keyword: item.keyword});
            // if (check && check.finished) continue; //爬完了
            // 获取链接和搜索关键字
            let url = item.url;
            let keyword = item.keyword;
            let $ = yield this.loadPage(url);
            // 多页数据
            if($('#pagebar_container a').length > 3){
                let page = parseInt($('#sogou_next').prev().text());
                // 检查是否已经进行过关键字的搜索
                let check = yield db.get('spider-done-keyword').findOne({keyword: item.keyword});
                if (check && check.page === page) continue; //爬完全部页数了
                for (let i = 1; i <= page; i++){
                    let pageUrl = `${url}&page=${i}`;
                    if (check && i < check.page) continue;  //跳过爬过的页数
                    let data = yield this.grab(pageUrl, rules.gzhList);
                    console.log('-------------> multi page data', data);
                    let gzh = data.gzh.map(value => { 
                        value.search_keyword = keyword;
                        value.created = Date.now();
                        return value;
                    });
                    let res = yield this.insertData(gzh);
                    yield db.get('spider-done-keyword').update(item, {$set: {page:i}}, {upsert:true});
                    yield util.sleep(5000);
                }
            // 单页数据
            } else {
                // 检查是否已经进行过关键字的搜索
                // let check = yield db.get('spider-done-keyword').findOne({keyword: item.keyword});
                // if (check && check.page === 1) continue;
                let data = yield this.grab(url, rules.gzhList);
                console.log('-------------> single page data', data);
                let gzh = data.gzh.map(value => { 
                    value.search_keyword = keyword;
                    value.created = Date.now();
                    return value;
                });
                let res = yield this.insertData(gzh);
                yield db.get('spider-done-keyword').update(item, {$set: {page:1}}, {upsert:true});
                yield util.sleep(5000);
            }
            // yield db.get('spider-done-keyword').update(item, {$set: {finished:true}}, {upsert:true});
        }
        // for (let i in gzhList){
        //     yield util.sleep(3000);
        //     let gzh = gzhList[i];
        //     let res = yield this.getGzhProfile(gzh.link);
        //     gzh.company = res.company;
        //     gzh.summary = res.summary;
        //     res = yield db.get('spider-wechat-news').insert(res.infoList);
        // }
        return "okay";
    }

    *insertData(gzhList){
        for (let gzh of gzhList){
            let check = yield db.get('spider-wechat-gzh-profile').findOne({name: gzh.name});
            if (check) continue;
            let profile = yield db.get('spider-wechat-gzh-profile').insert(gzhList);
        }
        return "okay";
    }

    getUrls(nameArr){
        return nameArr.map( value =>{
            return {
                keyword: value,
                url: `http://weixin.sogou.com/weixin?type=1&s_from=input&query=${encodeURIComponent(value.replace(" ",""))}&ie=utf8&_sug_=n&_sug_type_=`
            };
        });
    }

    *getGzhProfile(url){
        let options = {
            method: 'POST',
            uri: 'http://localhost:5000/gzh/info',
            body: {
                url: url
            },
            json: true // Automatically stringifies the body to JSON
        };
        let res = yield rp(options);
        return res;
    }
}

module.exports = NewSpider;