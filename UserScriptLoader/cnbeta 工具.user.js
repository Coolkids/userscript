// ==UserScript==
// @name       cnbeta 工具
// @version    0.0.2
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
        alert(img.length);
        img.each(function(){
            if($(this).attr("src")!=$(this).attr("original")){
                $(this).attr("src", $(this).attr("original"));
            }
        });
    };
    a();
    setTimeout(b, 500);
}).apply(unsafeWindow);
