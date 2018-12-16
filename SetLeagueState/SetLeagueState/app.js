
var request = require("request");

(function () {
    
    var timeout = setInterval(function () {
        try {
            //SetLeagueState();
            console.log(GetCurrentTime());
            console.log(GetCurrentDate());
            
            request("http://adok.ir/GamesData/ADok/SetLeagueState.php", function (error, response, body) {
                console.log(body);
            });
        } catch (e) {
            console.log("11: " + e.message);
        }
    }, 10000);

})();

function GetCurrentDate() {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    m++;
    var day = d.getDate();
    var dateHijri = gregorian_to_jalali(y, m, day);
    y = dateHijri[0];
    m = dateHijri[1];
    day = dateHijri[2];
    var mounth = "";
    var dayOfMounth = "";
    if (m < 10) {
        mounth = "0" + m;
    } else {
        mounth = "" + m;
    }
    
    if (day < 10) {
        dayOfMounth = "0" + day;
    } else {
        dayOfMounth = "" + day;
    }
    
    var curDate = y + "" + mounth + "" + dayOfMounth;
    return curDate;
}

function GetCurrentTime() {
    var d = new Date();
    var localTime = d.getTime();
    var localOffset = d.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var offset = 3.8;
    var teh = utc + (3600000 * offset);
    nd = new Date(teh);
    
    var h = nd.getHours();
    var Min = nd.getMinutes();
    
    var hour = "";
    var minute = "";
    var tm = "";
    
    //Min += 41;
    Min -= 30;
    if (Min > 59) {
        Min -= 59;
        h++;
    }
    
    if (Min < 0) {
        Min = 59 + Min;
        h--;
    }
    
    if (h > 24) {
        h = 1;
    }
    
    if (h < 0) {
        h = 24 + h;
    }
    
    if (h < 10) {
        hour = "0" + h;
    } else {
        hour = "" + h;
    }
    
    if (Min < 10) {
        minute = "0" + Min;
    } else {
        minute = "" + Min;
    }
    tm = hour + minute;
    return tm;
}

function gregorian_to_jalali(gy, gm, gd) {
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    if (gy > 1600) {
        jy = 979;
        gy -= 1600;
    } else {
        jy = 0;
        gy -= 621;
    }
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (parseInt(days / 12053));
    days %= 12053;
    jy += 4 * (parseInt(days / 1461));
    days %= 1461;
    if (days > 365) {
        jy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
}


function jalali_to_gregorian(jy, jm, jd) {
    if (jy > 979) {
        gy = 1600;
        jy -= 979;
    } else {
        gy = 621;
    }
    days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4)) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * (parseInt(days / 146097));
    days %= 146097;
    if (days > 36524) {
        gy += 100 * (parseInt(--days / 36524));
        days %= 36524;
        if (days >= 365) days++;
    }
    gy += 4 * (parseInt(days / 1461));
    days %= 1461;
    if (days > 365) {
        gy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    gd = days + 1;
    sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (gm = 0; gm < 13; gm++) {
        v = sal_a[gm];
        if (gd <= v) break;
        gd -= v;
    }
    return [gy, gm, gd];
}


