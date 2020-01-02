export const switchDay = (day) => {
    let result;
    switch (day) {
        case 0:
            result = "星期日";
            break;
        case 1:
            result = "星期一";
            break;
        case 2:
            result = "星期二";
            break;
        case 3:
            result = "星期三";
            break;
        case 4:
            result = "星期四";
            break;
        case 5:
            result = "星期五";
            break;
        case 6:
            result = "星期六";
            break;
    }
    return result;
}

export const filterDatas = (datas, condition, program) => {
    if (condition === "error") {
        return "";
    }
    else {
        return program(datas, condition);
    }
}