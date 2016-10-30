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
//https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
name: "ajax/fonts >> 科大反代",
from: /^(http|https):\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "$1://$2.proxy.ustclug.org/$3",
regex: true
},
{
name: "themes >> 科大反代",
from: /^(http|https):\/\/themes\.googleusercontent\.com\/(.*)$/,
to: "$1://google-themes.proxy.ustclug.org/$2",
regex: true
},
{
name: "fonts-gstatic >> 科大反代",
from: /^(http|https):\/\/fonts\.gstatic\.com\/(.*)$/,
to: "$1://fonts-gstatic.proxy.ustclug.org/$2",
regex: true
},
{
name: "gravatar >> 科大反代",
from: /^(http|https):\/\/secure\.gravatar\.com\/(.*)$/,
to: "$1://gravatar.proxy.ustclug.org/$2",
regex: true
},
];
