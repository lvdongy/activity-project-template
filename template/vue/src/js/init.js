export default function () {
    let _init = function () {
        const base = 750; // 设计稿基准值
        const w = document.documentElement.clientWidth;
        let ratio = w / base;
        document.documentElement.style.fontSize = ratio * 100 + 'px';
        if(w < 768){
            document.body.style.fontSize = .16 + 'rem';
        }
    }
    document.addEventListener('DOMContentLoaded', _init, false);
    window.addEventListener('resize', _init, false);
}