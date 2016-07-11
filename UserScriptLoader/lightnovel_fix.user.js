// ==UserScript==
// @name       lknovel fix + 阅读体验增强
// @version    0.0.8.0
// @description  lknovel 选中 图片浏览 firefox书签跳转 补丁
// @include      http://lknovel.lightnovel.cn/*
// @include      http://www.linovel.com/*
// @include      http://www.linovel.com
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
//结束
//书签fix
var btn = $('#J_go_bookmark');
var set = $('#J_set_mark');
var markId = null;
if (btn != null) {
  markId = btn.attr('mark-id');
}
function mScroll(id) {
  $('html,body').stop(true);
  $('html,body').animate({
    scrollTop: $('#' + id).offset().top
  }, 800);
}
function gotoLine() {
  mScroll(markId);
  //alert(markId);
}
function setLine() {
  markId = $('#J_lineNumber').text();
  //alert(markId);
}
btn.bind('click', gotoLine);
set.bind('click', setLine);
//结束
//图片无法显示
function isURL(x) {
  if (window.location.href.indexOf(x) != - 1) {
    return true;
  } else {
    return false;
  }
}
if (isURL('illustration')) {
  $('img').css('cssText', 'display:inline!important');
}
//结束
//添加跳转到指定行数
// var divs = document.getElementById('J_view').getElementsByTagName('div'); 
// var lastDiv = divs[divs.length-1]; 
// var last = $(lastDiv).attr('id');
// var last = $('#J_view div:last-child').attr('id')
var last = $('div .lk-view-line').eq(-1).attr('id')
function jumpFunction() {
  var str_1 = prompt('请输入行数1~' + last, '')
  var str = parseInt(str_1);
  if (str_1 != null) {
    if (!isNaN(str)) {
      if (str <= last && str >= 1) {
        mScroll(str);
      } else {
        alert('行号不正确');
      }
    } else {
      alert('请输入数字');
    }
  }
}
$(document).keydown(function (event) {
  if (event.keyCode == 74 && event.altKey) {
    //alert(last)
    jumpFunction();
  }
});
var total = $('<span id=\'J_totalNumber\'></span>').text('/' + last);
var jump = $('<a id=\'J_goJump\' class=\'ml-5\' href="javascript:;">跳转到指定行</a>').click(function () {
  jumpFunction()
});
$('#J_lineNumber').after(total, jump);

var pernum = $('<span id=\'J_perNumber\' style=\'float: right; text-align: center; padding-top: 5px;\'></span>')
$('#J_nav').append(pernum);
//结束
//阅读进度条
GM_addStyle(GM_getResourceText('jqueryCSS'));
var bar = $('<div id="J_progressbar" style="margin-top: 5px; text-align: center;"></div>');
var label = $('<div class="progress-label">');
var child = $('#J_toolBar p:eq(0)');
bar.insertAfter(child);
bar.append(label);
Number.prototype.toPercentA = function () {
  return (Math.round(this * 10000) / 100).toFixed(2) + '%';
}
function pageChange() {
  var nowline = $('#J_lineNumber').text();
  $('#J_progressbar').progressbar({
    max: parseInt(last),
    value: parseInt(nowline),
  });
  label.text((nowline / last).toPercentA());
  pernum.text(nowline+"/"+last+" "+(nowline / last).toPercentA());
}
setInterval(pageChange, 250);
GM_addStyle('.ui-widget-header {background:#d2e7d6}');
GM_addStyle('.progress-label {position: absolute; left:45% ; padding-top: 3px; font-weight: bold; text-shadow: 1px 1px 0 #fff; text-align:center;float:left; display:inline; vertical-align:middle;}');
GM_addStyle('.ui-progressbar-value {transition:width 0.5s}')
//$(".ui-widget-header").css("cssText", 'background:#d2e7d6');
//结束
