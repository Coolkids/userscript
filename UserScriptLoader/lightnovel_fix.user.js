// ==UserScript==
// @name       右键限制接触
// @version    0.0.9.0
// @description  右键限制接触
// @include     *
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @require      http://code.jquery.com/ui/1.11.4/jquery-ui.js
// @resource     jqueryCSS http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-end
// @icon         http://www.linovel.com/favicon.ico
// @copyright  2013+, Coolkid
// ==/UserScript==
//破解无法选择 无法右键
document.oncontextmenu = '\'\''; //不允许右键
document.onpaste = '\'\''; //不准粘贴
document.oncopy = '\'\''; //不准复制
document.oncut = '\'\''; //防止剪切
document.onselectstart = '\'\''; //不允许选择
$('body').css('-moz-user-select', 'toggle');
$('body').css('-webkit-user-select', 'toggle');