// ==UserScript==
// @name        网盘密码提取
// @author      林岑影 Coolkid
// @description 360,百度网盘,微盘链接自动添加访问密码
// @namespace   
// @icon        http://disk.yun.uc.cn/favicon.ico
// @license     GPL version 3
// @encoding    utf-8
// @date        18/07/2015
// @modified    11/04/2015
// @include     *
// @exclude     http://pan.baidu.com/*
// @exclude     http://yunpan.360.cn/*
// @exclude     http://yunpan.cn/*
// @exclude     http://vdisk.weibo.com/*
// @grant       unsafeWindow
// @grant       GM_setClipboard
// @run-at      document-end
// @version     0.0.4
// ==/UserScript==

(function(window){
    var autoHash = function(){
        this.config = {
            domain: {
                "baidu":"pan.baidu.com/s/",
                "yunpan":"yunpan.cn",
                "vdisk":"vdisk.weibo.com"
            },
            reg: /\s*(提取密碼|提取密码|提取码|提取碼|提取|密碼|密码|百度|百度云|云盘|360云盘|360云|360yun|yun|访问码|码)[:：]?\s*(<[^>]+>)?\s*([0-9a-zA-Z]{4,})\s*/,
        }
    };
    autoHash.prototype = {
        init: function(){
            this.auto();
            var toolbar = document.querySelector("body");
            toolbar.addEventListener("click", hash.delegate(hash.buttonsFilter, hash.buttonHandler));
        },
        delegate: function(criteria, listener) {
            return function (e) {
                var el = e.target;
                if (criteria(el)) {
                    e.delegateTarget = el;
                    listener.apply(this, arguments);
                }
                return;
            };
        },
        buttonsFilter: function(elem) {
            var href = typeof elem == "object" ? elem.getAttribute("href") : "",
                isDomain = false;
            if (!href) return false;
            for (var index in hash.config.domain) {
                if (href.indexOf(hash.config.domain[index]) > -1) {
                    isDomain = true;
                    break;
                }
            }
            return isDomain;
        },
        buttonHandler: function(e) {
            var a    = e.delegateTarget,
                link = a.getAttribute("href");
            if (link.indexOf("#")>-1) return true;
            hash.replace(a, link);
        },
        replace: function(a, link){
            link = link || a.getAttribute("href");
            var body = document.querySelector("body").innerHTML,
                arr_body = body.split('"'+link),
                text = arr_body[1].split('href=')[0],
                re = this.config.reg,
                r = re.exec(text);
            if(r){
               
            }else {
                text = a.parentNode.innerText,
                r = re.exec(text);
            }
            var res = text.match(re);
            if(res.length>0&&res[res.length-1]){
                //alert(res[res.length-1]);
                if(link.indexOf("#"+res[res.length-1])==-1){
                    a.setAttribute("href", link+"#"+res[res.length-1]);
                }
            }
        },
        auto: function() {
            var alllink = document.querySelectorAll("a");
            for (var index in alllink) {
                if (this.buttonsFilter(alllink[index])) {
                    this.replace(alllink[index]);
                }
            }
        }
    };
    var hash = new autoHash();
    hash.init();
}(window));