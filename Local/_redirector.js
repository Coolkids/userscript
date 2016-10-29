rules = [
/*{
name: "about:haoutil", // 规则名称
from: "about:haoutil", // 需要重定向的地址
to: "https://haoutil.googlecode.com", // 目标地址
wildcard: false, // 可选，true 表示 from 是通配符
regex: false, // 可选，true 表示 from 是正则表达式
resp: false // 可选，true 表示替换 response body
},*/
//Google服務轉國內鏡像
//Google服務轉國內鏡像
//參考https://github.com/jiacai2050/gooreplacer
{
name: "http ajax/fonts >> 科大反代",
from: /^http:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.proxy.ustclug.org/$2",
regex: true
},
{
//https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
name: "https ajax/fonts >> 科大反代",
from: /^https:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "https://$1.proxy.ustclug.org/$2",
regex: true
},
{
name: "themes >> 科大反代",
from: /^https?:\/\/themes\.googleusercontent\.com\/(.*)$/,
to: "https://google-themes.proxy.ustclug.org/$1",
regex: true
},
{
name: "fonts-gstatic >> 科大反代",
from: /^https?:\/\/fonts\.gstatic\.com\/(.*)$/,
to: "https://fonts-gstatic.proxy.ustclug.org/$1",
regex: true
},
{
//新浪到百度JS库
name: "sina > baidu JS Libs",
from: "http://lib.sinaapp.com/js/jquery/*/*",
to: "http://libs.baidu.com/jquery/$1/$2",
wildcard: true
},
];
