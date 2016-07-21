// ==UserScript==
// @name        CSDN Auto Download
// @namespace   杨自强
// @include     http://download.csdn.net/d*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

//      http://code.jquery.com/jquery-1.11.0.min.js 
var flag1 = /http:\/\/download\.csdn\.net\/detail\/.+/.test(window.top.location.href);
var flag2 = /http:\/\/download\.csdn\.net\/download\/.+/.test(window.top.location.href);
if(flag1){
 window.location.href = window.location.href.replace(/detail/,"download");
}
if(flag2){
document.ready = function(){
  //document.getElementById("android-popup").className="modal fade in"; 
  //document.getElementById("android-popup").style="display:block;";
  document.getElementById("user_score_btn").click();
  };
}