//=>防抖函数封装
export function debounce(func, delay) {
    let timer = null;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}

//=>时间字符串格式化函数
export function formatDate(template = `{0}年{1}月{2}日 {3}时{4}分{5}秒`) {
    // 使用 try catch 捕获一下错误，防止在外面使用报错
    try {
        let timeArr = this.match(/\d+/g);
        return template.replace(/\{(\d+)\}/g, (...[, $1]) => {
            let time = timeArr[$1] || `00`;
            return time.length < 2 ? `0` + time : time;
        });
    } catch (e) {
        // console.log(e);
    }
}

String.prototype.formatDate = formatDate;