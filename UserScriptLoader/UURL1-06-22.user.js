// ==UserScript==
// @name           Untie URL(ReShortUrl)
// @author         Yulei, coolkid
// @namespace      Yuleigq@gmail.com
// @description    Untie URL/Shortlink(Restore URL/Shortlink),ReURL.Resolve redirect source.
// @version        1.06.23
// @create         2013-09-14
// @lastmodified   2019-05-09
// @include        http://*
// @include        https://*
// @copyright      2013+, Yulei
// @run-at         document-end
// @grant			GM_xmlhttpRequest
// ==/UserScript==

(function () {
    const shortUrl = [
        'http://t.cn', 'http://dwz.cn',
        'https://t.cn', 'https://dwz.cn'
    ];
    function checkList(url){
        for(let i in shortUrl){
            if(url.indexOf(shortUrl[i])===0){
                return true;
            }
        }
        return false;
    }
    function doIt(e){
      GM_xmlhttpRequest({
                                url: e.href,
                                method: "GET",
                                onload: function (y) {
                                    if (!y.status) {
                                        e.title += "\n此网站挂了！";
                                    }
                                    if (y.status == '404' || y.status == '403') {
                                        e.title += "\n40X啦，找不到你的！";
                                    }
                                    // console.log("链接", e.href, "源地址", y.finalUrl)
                                    if (y.finalUrl != e.href) {
                                        let TUrl = y.finalUrl == '/' ? e.href.split('/')[2] : y.finalUrl;
                                        e.title += '\n你打开后的地址(源地址)为：\n' + y.finalUrl;
                                    }
                                }
                            });
    }
    window.setTimeout(function () { //延迟2秒，避免压力山大
        let l = document.links
        let k = l.length;
        for (let i = 0; i < k; i++) {
            if (checkList(l[i].href)) {
                // console.log("发现短链接", l[i].href)
                setTimeout(doIt(l[i]),500);
            }
        }
    }, 2e3);
})();
