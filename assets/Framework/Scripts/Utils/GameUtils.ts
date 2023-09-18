
export class GameUtils {
    public static formatNum (num: number) {
        // 0 和负数均返回 NaN。特殊处理。
        if (num <= 0) {
            return '0';
        }

        var k = 1000;
        var sizes = ['', '', 'K', 'M', 'B'];
        var i = Math.round(Math.log(num) / Math.log(k));
        return parseInt((num / (Math.pow(k, i - 1 < 0 ? 0 : i - 1))).toString(), 10) + sizes[i];
    }

    /**
     * 判断是否是新的一天
     * @param {Object|Number} dateValue 时间对象 todo MessageCenter 与 pve 相关的时间存储建议改为 Date 类型
     * @returns {boolean}
     */
    public static isNewDay (dateValue: any) {
        // todo：是否需要判断时区？
        var oldDate = new Date(dateValue);
        var curDate = new Date();

        var oldYear = oldDate.getFullYear();
        var oldMonth = oldDate.getMonth();
        var oldDay = oldDate.getDate();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth();
        var curDay = curDate.getDate();

        if (curYear > oldYear) {
            return true;
        } else {
            if (curMonth > oldMonth) {
                return true;
            } else {
                if (curDay > oldDay) {
                    return true;
                }
            }
        }

        return false;
    }

    public static getPropertyCount(o: Object) {
        var n, count = 0;
        for (n in o) {
            if (o.hasOwnProperty(n)) {
                count++;
            }
        }
        return count;
    }

    /**
     * 返回一个差异化数组（将array中diff里的值去掉）
     * @param array
     * @param diff
     */
    public static difference (array: any, diff: any) {
        var result = [];
        if (array.constructor !== Array || diff.constructor !== Array) {
            return result;
        }

        var length = array.length;
        for (var i = 0; i < length; i++) {
            if (diff.indexOf(array[i]) === -1) {
                result.push(array[i]);
            }
        }

        return result;
    }

    //public method for encoding
    public static base64encode (input: string) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = this.utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    }

    // private method for UTF-8 encoding
    public static utf8Encode (string: string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    public static base64Decode (input: string) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1;
        var chr2;
        var chr3;
        var enc1;
        var enc2;
        var enc3;
        var enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this.utf8Decode(output);
        return output;
    }

    public static utf8Decode (utftext: string) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

    public static remove(array, predicate) {
        var result = [];
        var indexes = [];
        array.forEach(function (item, index) {
            if (predicate(item)) {
                result.push(item);
                indexes.push(index);
            }
        });

        this.basePullAt(array, indexes);
        return result;
    }

    public static basePullAt(array, indexes) {
        var length = array ? indexes.length : 0;
        var lastIndex = length - 1;
        var previous;

        while (length--) {
            var index = indexes[length];
            if (length === lastIndex || index !== previous) {
                previous = index;
                Array.prototype.splice.call(array, index, 1);
            }
        }

        return array;
    }

    public static stringToArray (string: string) {
        // 用于判断emoji的正则们
        var rsAstralRange = '\\ud800-\\udfff';
        var rsZWJ = '\\u200d';
        var rsVarRange = '\\ufe0e\\ufe0f';
        var rsComboMarksRange = '\\u0300-\\u036f';
        var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
        var rsComboSymbolsRange = '\\u20d0-\\u20ff';
        var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
        var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

        var rsFitz = '\\ud83c[\\udffb-\\udfff]';
        var rsOptVar = '[' + rsVarRange + ']?';
        var rsCombo = '[' + rsComboRange + ']';
        var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
        var reOptMod = rsModifier + '?';
        var rsAstral = '[' + rsAstralRange + ']';
        var rsNonAstral = '[^' + rsAstralRange + ']';
        var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
        var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
        var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
        var rsSeq = rsOptVar + reOptMod + rsOptJoin;
        var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
        var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

        var hasUnicode = function (val) {
            return reHasUnicode.test(val);
        };

        var unicodeToArray = function (val) {
            return val.match(reUnicode) || [];
        };

        var asciiToArray = function (val) {
            return val.split('');
        };

        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }

    // 模拟传msg的uuid
    public static simulationUUID () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    public static trim (str: string) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    /**
     * 判断当前时间是否在有效时间内
     * @param {String|Number} start 起始时间。带有时区信息
     * @param {String|Number} end 结束时间。带有时区信息
     */
    public static isNowValid (start, end) {
        var startTime = new Date(start);
        var endTime = new Date(end);
        var result = false;

        if (startTime.getDate() + '' !== 'NaN' && endTime.getDate() + '' !== 'NaN') {
            var curDate = new Date();
            result = curDate < endTime && curDate > startTime;
        }

        return result;
    }

    public static getDeltaDays (start, end) {
        start = new Date(start);
        end = new Date(end);

        var startYear = start.getFullYear();
        var startMonth = start.getMonth() + 1;
        var startDate = start.getDate();
        var endYear = end.getFullYear();
        var endMonth = end.getMonth() + 1;
        var endDate = end.getDate();

        start = new Date(startYear + '/' + startMonth + '/' + startDate + ' GMT+0800').getTime();
        end = new Date(endYear + '/' + endMonth + '/' + endDate + ' GMT+0800').getTime();

        var deltaTime = end - start;
        return Math.floor(deltaTime / (24 * 60 * 60 * 1000));
    }

    public static getMin (array) {
        var result = null;
        if (array.constructor === Array) {
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (i === 0) {
                    result = Number(array[0]);
                } else {
                    result = result > Number(array[i]) ? Number(array[i]) : result;
                }
            }
        }

        return result;
    }

    public static formatTwoDigits (time) {
        return (Array(2).join('0')+time).slice(-2);
    }

    public static formatDate (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * 获取格式化后的日期（不含小时分秒）
     */
    public static getDay () {
        var date = new Date();

        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    }

    public static formatName (name, limit) {
        limit = limit || 6;
        var nameArray = this.stringToArray(name);
        var str = '';
        var length = nameArray.length;
        if (length > limit) {
            for (var i = 0; i < limit; i++) {
                str += nameArray[i];
            }

            str += '...';
        } else {
            str = name;
        }

        return str;
    }

    /**
     * 格式化钱数，超过10000 转换位 10K   10000K 转换为 10M
     */
    public static formatMoney (money: number) {
        var arrUnit = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];

        var strValue = '';
        for (var idx = 0; idx < arrUnit.length; idx++) {
            if (money >= 10000) {
                money /= 1000;
            } else {
                strValue = Math.floor(money) + arrUnit[idx];
                break;
            }
        }

        if (strValue === '') {
            strValue = Math.floor(money) + 'U'; //超过最大值就加个U
        }

        return strValue;
    }

    public static formatValue (value: number) {
        let arrUnit = [];
        let strValue = '';
        for(let i=0;i<26;i++){
            arrUnit.push(String.fromCharCode(97+i));
        }

        for (let idx = 0; idx < arrUnit.length; idx++) {
            if (value >= 10000) {
                value /= 1000;
            } else {
                strValue = Math.floor(value) + arrUnit[idx]; 
                break;      
            }
        }

        return strValue;
    }

    /**
     * 根据剩余秒数格式化剩余时间 返回 HH:MM:SS
     * @param {Number} leftSec 
     */
    public static formatTimeForSecond (leftSec: number, withoutSeconds: boolean = false) {
        var timeStr = '';
        var sec = leftSec % 60;
    
        var leftMin = Math.floor(leftSec / 60);
        leftMin = leftMin < 0 ? 0 : leftMin;
    
        var hour = Math.floor(leftMin / 60);
        var min = leftMin % 60;
    
        if (hour > 0) {
            timeStr += hour > 9 ? hour.toString() : '0' + hour;
            timeStr += ':';
        } else {
            timeStr += '00:';
        }
        
        timeStr += min > 9 ? min.toString() : '0' + min;

        if (!withoutSeconds) {
            timeStr += ':';
            timeStr += sec > 9 ? sec.toString() : '0' + sec;
        }
       
        return timeStr;
    }

    /**
     *  根据剩余毫秒数格式化剩余时间 返回 HH:MM:SS
     *
     * @param {Number} ms
     */
    public static formatTimeForMillisecond(ms: number): Object {
        let second = Math.floor(ms / 1000 % 60);
        let minute = Math.floor(ms / 1000 / 60 % 60);
        let hour = Math.floor(ms / 1000 / 60 / 60);
        // let strSecond = second < 10 ? '0' + second : second;
        // let strMinute = minute < 10 ? '0' + minute : minute;
        // let strHour = hour < 10 ? '0' + hour : hour;
        // return `${strSecond}:${strMinute}:${strHour}`;
        return {'hour': hour, 'minute': minute, 'second': second };
    }

    /**
     * TODO 需要将pako进行引入，目前已经去除了压缩算法的需要，如需要使用需引入库文件
     * 将字符串进行压缩
     * @param {String} str 
     */
    /*public static zip (str) {
        var binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' });
        return this.base64encode(binaryString);
    }*/

    /**
     * todo 目前已经去除了压缩算法的需要，如需要使用需引入库文件
     * 将数据进行解压
     * @param {String} b64Data 
     */
    /*public static unZip (b64Data) {
        var strData   = this.base64Decode(b64Data);
        // Convert binary string to character-number array
        var charData  = strData.split('').map(function(x){return x.charCodeAt(0);});
        // Turn number array into byte-array
        var binData   = new Uint8Array(charData);
        // // unzip
        var data    = pako.inflate(binData);
        // Convert gunzipped byteArray back to ascii string:
        strData   = String.fromCharCode.apply(null, new Uint16Array(data));
        return decodeURIComponent(strData);
    }*/

    /**
     * 数据加密
     * @param {String} str 
     */
    public static encrypt (str) {
        let b64Data = this.base64encode(str);

        let n = 6;
        if (b64Data.length % 2 === 0) {
            n = 7;
        }

        let encodeData = '';

        for (let idx = 0; idx < (b64Data.length - n + 1) / 2; idx++) {
            encodeData += b64Data[2*idx+1];
            encodeData += b64Data[2*idx];
        }

        encodeData += b64Data.slice(b64Data.length - n + 1);

        return encodeData;
    }

    /**
     * 数据解密
     * @param {String} b64Data 
     */
    public static decrypt (b64Data) {
        let n = 6;
        if (b64Data.length % 2 === 0) {
            n = 7;
        }

        let decodeData = '';
        for (var idx = 0; idx < b64Data.length - n; idx += 2) {
            decodeData += b64Data[idx + 1];
            decodeData += b64Data[idx];
        }

        decodeData += b64Data.slice(b64Data.length - n + 1);

        decodeData = this.base64Decode(decodeData);

        return decodeData;
    }

    /**
     * 获得开始和结束两者之间相隔分钟数
     *
     * @static
     * @param {number} start
     * @param {number} end
     * @memberof Util
     */
    public static getOffsetMimutes (start: number, end: number) {
        let offSetTime = end - start;
        let minute = Math.floor((offSetTime % (1000 * 60 * 60)) / (1000 * 60));
        return minute;
    }

    /**
     * 返回指定小数位的数值
     * @param num 
     * @param idx 
     */
    public static formatNumToFixed (num: number, idx: number = 0) {
        return Number(num.toFixed(idx));
    }

}


