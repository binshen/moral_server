/**
 * Created by bin.shen on 6/4/16.
 */

var config = {

    HOST: "121.40.92.176",
    PORT: 6789,
    URL: "mongodb://127.0.0.1:27017/moral_db",
    COLLECTION: "documents",

    OUTPUT_1: [
        0x6A, 0x00, 0x0A, 0x01, 0x00, 0x01, 0xA1, 0x1A, 0xC7, 0x6B
    ],

    OUTPUT_2: [
        0x6A, 0x00, 0x51, 0x01, 0x00, 0x02, //包头(0-5)
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, //Mac(6-11)
        0xA2, 0x2A, //数据H/L(12-13)
        0x00, 0x00, 0x00, 0x01, //MD1-4(14-17)
        0x00, 0x01, //版本H/L(18-19)
        0x00, 0x00, //参数设置H/L(20-21)
        0x02, 0x00, 0x04, 0x07, 0x10, 0x03, 0x17, 0x10, 0x10, 0x00, //数据1-10(22-31)
        0x01, //协议(32)
        0x01, //服务(33)
        0x1A, 0x85, //端口H/L(34-35)
        0x79, 0x28, 0x5C, 0xB0, //IP(36-39)
        0x00, 0x05, //预留H/L(40-41)
        0x01, //秒(42)
        0x01, //分钟(43)
        0x01, //小时(44)
        0x01, //日(45)
        0x01, //月(46)
        0x06, //星期(47)
        0x10, //年(48)
        0x00, 0x00, //预留H/L(49-50)
        0x0A, //上传数据间隔秒(51)
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, //(52-78)
        0xF3, //校验和(79)
        0x6B //包尾(80)
    ],

    OUTPUT_4: [
        0x6A, 0x00, 0x0E, 0x01, 0x00, 0x04,
        0x02, //秒
        0x03, //分
        0x04, //小时
        0x05, //日
        0x06, //月
        0x07, //星期
        0x10, //年
        0x36, 0x6B
    ],

    OUTPUT_6: [
        0x6A, 0x00, 0x0A, 0x01, 0x00, 0x0C, 0xF2, 0x2F, 0x38, 0x6B
    ]
};

module.exports = config;