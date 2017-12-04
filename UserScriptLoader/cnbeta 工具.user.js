// ==UserScript==
// @name       cnbeta 工具
// @version    0.0.10
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
    var oe = this.eval;
    var uw = this;
    var $ = this.jQuery;
    try {
        uw.checkBlock = {
            on: function() {}
        };
        uw.document.addEventListener("DOMContentLoaded", function() {
            if (uw.CheckBlock) uw.CheckBlock.prototype.on = function() {};
        });
    } catch (e) {}
    var checkCount = 0;
    var fn = function() {
        try {
            var eles = Array.prototype.slice.call(document.querySelectorAll("body>div[id][style*='important']>div[style*='fixed']"));
            if (eles.length) {
                eles.forEach(function(ele) {
                    ele.parentNode.remove();
                });
            } else {
                if (checkCount++ < 200) {
                    setTimeout(fn, 20);
                }
            }
        } catch (e) {}
    };
    fn();
    (function() {
        var style = document.createElement("style");
        style.textContent = ".cbhelp{height:" + Math.round((Math.random() + 1) * 113) + "px!important; width:" + Math.round((Math.random() + 1) * 113) + "px!important; visibility: hidden; position: fixed; opacity:0; left: " + Math.round((((Math.random() + 1) * 2000) * (Math.random() > 0.5 ? 1 : -1))) + "px; }";
        document.head.appendChild(style);
    })();
    Object.defineProperty(uw, "onload", {
        get: function() {},
        set: function() {}
    });
    (function() {
        uw[atob("cmFuZG9tU3RyaW5n")] = function() {
            throw '求推荐综合性的IT资讯站点，这些年看Cnbeta看得有点不怎么了解IT界了';
        };
        var processed = false;
        /*
        if (!processed && $.fn.removeClass) {
            processed = !0;
            var bak = $.fn.removeClass;
            $.fn.removeClass = function() {
                /*if (cls.indexOf("cbhelp") === -1) {

                }**
                bak.apply(this, Array.prototype.slice.call(arguments));
                    //return;
                var eles = $('.cbhelp');
                eles.each(function() {
                    var template = document.createElement("template");
                    var ele = document.createElement("div");
                    this.appendChild(ele);
                    this.style = "position:fixed;opacity:0; left: " + Math.round((((Math.random() + 1) * 2000) * (Math.random() > 0.5 ? 1 : -1))) + "px;";
                    template.innerHTML = "<div style='height:" + Math.round((Math.random() + 1) * 113) + "px!important; width:" + Math.round((Math.random() + 1) * 113) + "px!important; visibility: hidden; opacity:0; left: " + Math.round((((Math.random() + 1) * 2000) * (Math.random() > 0.5 ? 1 : -1))) + "px;'>求推荐综合性的IT资讯站点，这些年看Cnbeta看得有点不怎么了解IT界了</div>";
                    var sr = ele.attachShadow && ele.attachShadow({
                        mode: "closed"
                    }) || ele.createShadowRoot();
                    var child = document.importNode(template, true);
                    sr.appendChild(child.content);
                });
            };
        }
     */
    })();
}).apply(unsafeWindow);
