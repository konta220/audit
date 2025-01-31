
function changed() {
    let sum_price = sum();
    let goal_price = home_price();
    price_check(sum_price, goal_price);

    replace_date();
}

const jp_week = ["日", "月", "火", "水", "木", "金", "土"];

function replace_date() {

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const week = date.getDay();
    const day = date.getDate();

    const set_date = ("" + year + "年" + ("0" + month).slice(-2) + "月" + ("0" + day).slice(-2) + "日 (" + jp_week[week] + ")");

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const set_time = ("" + ("0" + hour).slice(-2) + "時" + ("0" + minute).slice(-2) + "分" + ("0" + second).slice(-2) + "秒");

    $('p#date_text').text("監査日時: " + set_date + " " + set_time);
}

function price_check(sum_price, goal_price) {
    const person = Math.floor(sum_price / goal_price.one_price);
    $('table#result_table tr:eq(1) td#result_value').text(person);

    const result_person = person - goal_price.person;
    $('table#result_table tr:eq(1) td#result').text(add_plusminus(result_person));

    const result_price = sum_price - goal_price.sum_price;
    $('table#result_table tr:eq(2) td#result_price').text(separate(add_plusminus(result_price)));
    $('table#result_table tr:eq(2) td#result').text(result_price === 0 ? "適正" : (result_price > 0 ? "過多" : "不足"));
}

function add_plusminus(value) {
    if (value > 0) {
        return "+" + value;
    }

    if (value === 0) {
        return "±" + value;
    }

    return value;
}

function home_price() {
    const one_price = $('table#home_price tbody td #one_price').val();
    $('table#home_price tbody #name_price').text(name_separate(one_price));
    const person = $('table#home_price tbody td #person').val();
    $('table#home_price tbody #name_person').text(person);

    const sum_price = one_price * person;
    $('table#home_price tbody #sum_price').text(separate(sum_price));
    $('table#home_price tbody #name_sum').text(name_separate(sum_price));

    return { 'one_price': one_price, 'person': person, 'sum_price': sum_price };
}

function sum() {
    const len = ($('table#input_mony tbody tr').size());

    let sum = 0;
    for (let i = 0; i < len; i++) {
        let value = $('table#input_mony tbody tr:eq(' + i + ') td#value').text().replace(",", "");
        let count = $('table#input_mony tbody tr:eq(' + i + ') #count').val();
        $('table#input_mony tbody tr:eq(' + i + ') #check').text(separate(count));

        let price = value * count;

        $('table#input_mony tbody tr:eq(' + i + ') td#price').text(separate(price));
        $('table#input_mony tbody tr:eq(' + i + ') td#name_price').text(name_separate(price));
        sum += price;
    }

    $('table#result_table tr:eq(0) #result_price').text(separate(sum));
    if (sum >= 1000) {
        $('table#result_table tr:eq(0) #name_result').text(name_separate(sum));
    }

    return sum;
}

function separate(num) {
    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

function name_separate(num) {
    if (num === 0) {
        return "";
    }
    if (num < 100) {
        return num;
    }

    let str = "";
    let count;
    if ((count = Math.floor(num / 10000)) > 0) {
        str += count + "万 ";
    }
    num %= 10000;

    if ((count = Math.floor(num / 1000)) > 0) {
        str += count + "千 ";
    }
    num %= 1000;

    if (num !== 0)
        str += num;

    return str;
}


$(document).ready(changed);
$(document).change(changed);

