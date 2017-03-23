// ==UserScript==
// @name       cnbeta 工具
// @version    0.0.7
// @description  cnbeta 工具
// @include      http://*.cnbeta.com/*
// @include      https://*.cnbeta.com/*
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @grant        unsafeWindow
// @run-at       document-end
// @copyright  2017+, Coolkid
// ==/UserScript==
(function() {
    'use strict';
    var a = function(){
        var div = $("div[style*='important']");
        //console.log(div.html());
        div.remove();
        var body = $("body");
        body.css("padding-top","0px");
    };
    var b = function(){
        var img = $("img[original]");
        img.each(function(){
            var newimg = $(this).attr("original");
            var oldimg = $(this).attr("src");
            if(oldimg!=newimg&&newimg!="null"){
                console.log($(this).attr("src")+"替换为"+$(this).attr("original"));
                $(this).attr("src", newimg);
            }
        });
    };
    a();
    setTimeout(b, 1000);
    var c = function(){
        var alist = $("body > div.main-wrap > div.cnbeta-update > div > div.cnbeta-update-list > div.items-area a");
        alist.each(function(){
            var oldtitle = $(this).text();
            var newtitle = oldtitle.replace(/^[^！]+！/, "");
            if(oldtitle.indexOf("！")>-1){
                $(this).text(newtitle);
                console.log("原标题<"+oldtitle+">替换为<"+newtitle+">");
            }
        });
    };
    setTimeout(c, 1000);
}).apply(unsafeWindow);
