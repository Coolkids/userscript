// ==UserScript==
// @name         修改百度云界面
// @version      0.0.7
// @description  修改百度云界面!
// @author       Coolkid
// @match        *://pan.baidu.com/s/*
// @match        *://yun.baidu.com/s/*
// @match        *://pan.baidu.com/share/link*
// @match        *://yun.baidu.com/share/link*
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @grant        unsafeWindow
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';
    let hide_doms = [
        ".module-share-header > div > div.slide-show-right > div > div > div.button-box > a:nth-child(3)",
        ".module-share-header > div > div.slide-show-right > div > div > div.button-box > a:nth-child(4)",
        "#layoutAside > dl",
        "#bd > div.bd-aside"
    ];
    for (let i in hide_doms) {
        let dom = hide_doms[i];
        let obj = $(dom);
        if (obj !== undefined && obj !== null) {
            obj.hide();
        }
    }
    $(".slide-show-left").width("98%");
    $(".slide-show-left > h2").width("90%");
    $(".slide-show-right").css("float", "left");
    $(".slide-show-right > div > div > div.button-box").width(0);
    $("#layoutAside").insertAfter($("#layoutMain > div.frame-content > div.module-share-header > div > div.slide-show-left"));
    $("#layoutMain > div").css("margin-right", "0px");
    let dir = $("#layoutMain > div > div.module-share-file-main > div.share-file-viewer > div");
    if (dir !== undefined) {
        dir.height($(document).height() * 0.6);

    }
    $("#bd-main > div > div.module-share-header > div > div.slide-show-right > div > div > div.button-box").width("100%");
    $(".g-button").css("border-radius", "0px");

    let bd_left = $("#bd-main > .bd-left");
    if (bd_left !== undefined && bd_left !== null) {
        bd_left.css("margin-right", "0px");
    }
    let timeid;
    let exitTime = (new Date()).getTime()+12000;
    let changeName = function() {
        let userName = $("a.share-person-username.global-ellipsis").html();
        if(userName===undefined){
          return;
        }
        let img = $("#bd > div.bd-aside > div.module-share-person-info > div.share-person-inner.global-clearfix.haha > div.share-person-avatar > a.person-icon > img");
        $(".slide-show-left > h2").html($(".slide-show-left > h2").html() + "  分享自:" + userName + "   ");
        img.width(35).height(35).css("border-radius", "15px");
        img.appendTo("#bd-main > div > div.module-share-header > div > div.slide-show-left > h2");
        if(timeid!==null){
          window.clearInterval(timeid);
        }
        let now = new Date();
        if(now.getTime() > exitTime){
          if(timeid!==null){
            window.clearInterval(timeid);
          }
        }
    };

    timeid = window.setInterval(changeName, 500);
})();
