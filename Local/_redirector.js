rules = [
{
name: "about:haoutil", // 规则名称
from: "about:haoutil", // 需要重定向的地址
to: "https://haoutil.googlecode.com", // 目标地址
wildcard: false, // 可选，true 表示 from 是通配符
regex: false, // 可选，true 表示 from 是正则表达式
resp: false // 可选，true 表示替换 response body
},
{
//Google搜索時，中鍵點擊圖片，跳轉到原始鏈接。
//詳細說明：http://bbs.kafan.cn/thread-1799098-1-1.html
name: "Google搜圖去跳轉",
from:/^https?:\/\/www\.google\.com\/(.*)imgurl=(.*)&imgrefurl=(.*)\&h=(.*)/i,
to: "$3",
regex: true
},
{
//有時Google會要求塡驗證碼，此規則用以跳過
name: "反Google搜索驗證碼",
from: /^https?:\/\/ipv4\.google\.com\/sorry\/IndexRedirect\?continue=https?:\/\/www\.google\.com(?:\.hk|)\/search\?(.*q=.*)&q=.*/i,
to: "https://www.google.com/ncr#$1",
regex: true
},
{
//來源：http://bbs.kafan.cn/thread-1824493-1-1.html
name: "Google搜天氣时 圖標",
from: /^https?:\/\/www\.gstatic\.cn\/onebox\/weather\/(.*)/i,
to: "https://ssl.gstatic.com/onebox/weather/$1",
regex: true
},
//百度系
{
//參照『反Google搜索驗證碼』改的，很少遇到吶
name: "反百度搜索驗證碼",
from: /^https?:\/\/verify\.baidu\.com\/vcode\?http:\/\/www\.baidu\.com\/s\?wd=(.*)&(.*=.*)/i,
to: "http://www.baidu.com/s?wd=$1",
regex: true
},
{
//userscripts.org和userscripts.org:8080都跳轉到webextender.net
name: "userscripts >> webextender鏡像",
from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
//Google服務轉國內鏡像
//Google服務轉國內鏡像
//參考https://github.com/jiacai2050/gooreplacer
{
name: "ajax/fonts >> 360 useso",
from: /^http:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.useso.com/$2",
regex: true
},
/*{
//https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
name: "ajax/fonts >> 科大博客提供",
from: /^https:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.lug.ustc.edu.cn/$2",
regex: true
},
{
name: "themes >> 科大博客",
from: /^https?:\/\/themes\.googleusercontent\.com\/(.*)$/,
to: "http://google-themes.lug.ustc.edu.cn/$1",
regex: true
},
{
name: "fonts-gstatic >> 科大博客",
from: /^https?:\/\/fonts\.gstatic\.com\/(.*)$/,
to: "http://fonts-gstatic.lug.ustc.edu.cn/$1",
regex: true
},*/
{
//新浪到百度JS库
name: "sina > baidu JS Libs",
from: "http://lib.sinaapp.com/js/jquery/*/*",
to: "http://libs.baidu.com/jquery/$1/$2",
wildcard: true
},
{
//轻之文库新地址
name: "lknovel > linovel",
from: "http://lknovel.lightnovel.cn/*",
to: "http://www.linovel.com/$1",
wildcard: true
},
];
