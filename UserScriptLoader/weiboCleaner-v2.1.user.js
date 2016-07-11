// ==UserScript==
// @name			眼不见心不烦（新浪微博）
// @namespace		http://weibo.com/salviati
// @license			MIT License
// @description		新浪微博（weibo.com）非官方功能增强脚本，具有屏蔽关键词、用户、来源、链接，改造版面等功能
// @features		（V6）可以去除首页右边栏；（V6）可在首页使用紧凑版式（去除卡片间空隙）；（V6）可以恢复紧凑型（V5样式）微博工具栏；（V5->V6）可在首页与个人主页使用透明背景色；可以忽略用户名中的关键词；（V6）可以恢复方形头像；（V6）可以展开所有子微博（“还有?条对原微博的转发”）；（V6）修正不能屏蔽子微博的问题；（V6）修正清除“大家正在热搜”失效的问题
// @version			2.1
// @revision		95
// @author			@富平侯
// @committers		@牛肉火箭, @JoyerHuang_悦
// @grant			GM_getValue
// @grant			GM_setValue
// @include			http://weibo.com/*
// @include			http://www.weibo.com/*
// @include			http://d.weibo.com/*
// ==/UserScript==
// 借助自定义事件实现page script（注入页面的主程序）与content script（运行在沙箱中）
//   之间的异步通讯，使前者可以间接调用chrome.* API和GM_* API
document.addEventListener('wbpGet', function (event) {
	event.stopPropagation();
	var name = event.detail.name;
	var post = function (value) {
		// 注意：不能在此处直接调用callback，否则回调函数将在本程序所在的沙箱环境中运行，在Chrome 27及更高版本下会出错
		// 在Greasemonkey（Firefox扩展）环境下也不能通过detail直接传对象，只能送string或array
		// 详见https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Specification
		document.dispatchEvent(new CustomEvent('wbpPost', { detail: event.detail.id + '=' + value }));
	};
	post(GM_getValue(name, event.detail.defVal));
});
document.addEventListener('wbpSet', function (event) {
	event.stopPropagation();
	var data = {}, name = event.detail.name, value = event.detail.value;
	data[name] = value;
	GM_setValue(name, value);
});
// 将脚本注入页面环境
(function (source) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.textContent = '(' + source + ')();';
	document.head.appendChild(script);
	document.head.removeChild(script);
})(function () {
// 工具函数
var $ = (function () {
	// 按id选择元素（默认操作）
	var $ = function (id) {
		return document.getElementById(id);
	};
	$.version = Number('95');
	// 按CSS选择元素
	$.select = function (css) {
		return document.querySelector(css);
	};
	var CHROME_KEY_ROOT = 'weiboPlus.';
	if (window.chrome) {
		if (localStorage.getItem(CHROME_KEY_ROOT + 'chromeExtInstalled')) {
			console.warn('已安装插件版本，脚本停止运行！');
			return undefined; // 如果已经（曾经）安装过插件则不再继续运行脚本
		}
	}
	$.window = window;
	$.config = $.window.$CONFIG;
	if (!$.config) {
		return undefined;
	}
	$.uid = $.config.uid;
	if (!$.uid) {
		return undefined;
	}
	$.oid = $.config.oid; // 页面uid（个人主页或单条微博的uid）
	$.V6 = ($.config.cssPath.indexOf('/t6/') > -1);
	var callbacks = {};
	document.addEventListener('wbpPost', function (event) {
		event.stopPropagation();
		var pos = event.detail.indexOf('=');
		var id = event.detail.slice(0, pos), value = event.detail.slice(pos+1);
		callbacks[id](value);
		delete callbacks[id];
	});
	$.get = function (name, defVal, callback, sync) {
		var messageID = Math.random().toString(36).slice(2); // 生成随机ID
		callbacks[messageID] = callback;
		document.dispatchEvent(new CustomEvent('wbpGet', { detail: {
			name : name,
			defVal : defVal,
			id : messageID,
			sync : sync
		}}));
	};
	$.set = function (name, value, sync) {
		document.dispatchEvent(new CustomEvent('wbpSet', { detail: {
			name : name,
			value : value,
			sync : sync
		}}));
	};
	// 删除节点
	$.remove = function (el) {
		if (el) { el.parentNode.removeChild(el); }
	};
	// 绑定click事件
	$.click = function (el, handler) {
		if (el) { el.addEventListener('click', handler, false); }
	};
	// 返回当前页面的位置
	$.scope = function () {
		if ($.V6) {
			// V6版支持热门微博（发现/精选）页面
			return document.body.classList.contains('FRAME_main') ? 1 : document.body.classList.contains('FRAME_page') ? (document.domain === 'd.weibo.com' ? 3 : 2) : 0;
		} else {
			return document.body.classList.contains('B_index') ? 1 : document.body.classList.contains('B_profile') ? 2 : 0;
		}
	};
	return $;
})();

if (!$) { return false; }

function Options () {
	// 各类型默认值
	var typeDefault = {
		keyword : [],
		string : '',
		bool : false,
		radio : '',
		array : [],
		object : {},
		internal : null
	};
	for (var option in this.items) {
		if (this.items[option].length > 1) {
			// 使用属性默认值
			this[option] = this.items[option][1];
		} else {
			// 使用类型默认值
			this[option] = typeDefault[this.items[option][0]];
		}
	}
}

Options.prototype = {
	// 选项类型与默认值
	items : {
		version : ['internal', 0], // 内部变量：不在设置界面出现，不随设置导出
		whiteKeywords : ['keyword'],
		blackKeywords : ['keyword'],
		grayKeywords : ['keyword'],
		URLKeywords : ['keyword'],
		sourceKeywords : ['keyword'],
		sourceGrayKeywords : ['keyword'],
		userBlacklist : ['array'],
		tipBackColor : ['string', '#FFD0D0'],
		tipTextColor : ['string', '#FF8080'],
		readerModeIndex : ['bool'],
		readerModeProfile : ['bool'],
		readerModeTip : ['internal', false], // 内部变量：不在设置界面出现，不随设置导出
		readerModeWidth : ['string', 750],
		readerModeBackColor : ['string', 'rgba(100%,100%,100%,0.8)'],
		squareAvatar : ['bool'],
		compactFeedToolbar : ['bool'],
		mergeSidebars : ['bool'],
		noHomeRightBar : ['bool'],
		noHomeMargins : ['bool'],
		floatSetting : ['radio', 'Groups'],
		unwrapText : ['bool'],
		directBigImg : ['bool'],
		directFeeds : ['bool'],
		showAllGroups : ['bool'],
		showAllMsgNav : ['bool'],
		showAllSonFeeds : ['bool'],
		noDefaultFwd : ['bool'],
		noDefaultCmt : ['bool'],
		noDefaultGroupPub : ['bool'],
		clearHotSearch : ['bool'],
		clearDefTopic : ['bool'],
		overrideMyBack : ['bool'],
		overrideOtherBack : ['bool'],
		backColor : ['string', 'rgba(100%,100%,100%,0.2)'],
		overrideMySkin : ['bool'],
		overrideOtherSkin : ['bool'],
		skinID : ['string', 'skinvip001'],
		filterOthersOnly : ['bool'],
		filterPaused : ['bool'],
		filterSmiley : ['bool'],
		filterName : ['bool', true],
		filterPromotions : ['bool'],
		filterDeleted : ['bool'],
		filterTaobao : ['bool'],
		filterFlood : ['bool'],
		maxFlood : ['string', 5],
		updateNotify : ['bool', true],
		useCustomStyles : ['bool', true],
		customStyles : ['string'],
		hideMods : ['array']
	},
	// 去除内部变量并转换为字符串
	strip : function () {
		var stripped = {};
		for (var option in this.items) {
			if (this.items[option][0] !== 'internal') {
				stripped[option] = this[option];
			}
		}
		return JSON.stringify(stripped);
	},
	// 保存设置
	save : function (noSync) {
		this.version = $.version;
		$.set($.uid.toString(), JSON.stringify(this));
	},
	// 载入/导入设置，输入的str为undefined（首次使用时）或string（非首次使用和导入设置时）
	load : function (str) {
		var parsed = {};
		if (str) {
			try {
				parsed = JSON.parse(str.replace(/\n/g, ''));
				if (typeof parsed !== 'object') { throw 0; }
			} catch (e) {
				parsed = {};
				str = null; // 出错，最后返回false
			}
		}
		// 填充选项
		for (var option in this.items) {
			if (option in parsed) {
				this[option] = parsed[option];
			}
		}
		return (str !== null);
	}
};

var $options = new Options();

var $dialog = (function () {
	var shown = false, dialog, content, STK;
	var getDom = function (node) {
		// 首页与主页API不一致
		return content ? content.getDom(node) : dialog.getDomList()[node];
	};
	var bind = function (node, func, event) {
		STK.core.evt.addEvent(getDom(node), event || 'click', func);
	};
	// 从显示列表建立关键词数组
	var getKeywords = function (id, attr) {
		return Array.prototype.map.call(getDom(id).childNodes, function (keyword) {
			return attr ? keyword.getAttribute(attr) : keyword.textContent;
		});
	};
	// 将关键词添加到显示列表
	var addKeywords = function (id, list, attr) {
		var keywords;
		if (list instanceof Array) {
			keywords = list;
		} else {
			keywords = []; 
			var str = ' ' + getDom(list).value + ' ', regex = new RegExp('(\\s"([^"]+)"\\s|\\s([^\\s]+)\\s)', 'g'), result;
			while ((result = regex.exec(str)) !== null) {
				keywords.push(result[2] || result[3]); // 提取关键词
				--regex.lastIndex;
			}
		}
		var illegalRegex = keywords.filter(function (keyword) {
			if (!keyword || getKeywords(id, attr).indexOf(keyword) > -1) { return false; }
			var keywordLink = document.createElement('a');
			// 关键词是正则表达式？
			if (keyword.length > 2 && keyword.charAt(0) === '/' && keyword.charAt(keyword.length - 1) === '/') {
				try {
					// 尝试创建正则表达式，检验正则表达式的有效性
					// 调用test()是必须的，否则浏览器可能跳过该语句
					RegExp(keyword.slice(1, -1)).test('');
				} catch (e) {
					return true;
				}
				keywordLink.className = 'regex';
			}
			keywordLink.title = '点击删除';
			keywordLink.setAttribute('action-type', 'remove');
			if (attr) { keywordLink.setAttribute(attr, keyword); }
			keywordLink.href = 'javascript:void(0)';
			keywordLink.textContent = keyword;
			getDom(id).appendChild(keywordLink);
			return false;
		});
		if (!(list instanceof Array)) {
			// 在文本框中显示无效的正则表达式并闪烁提示
			getDom(list).value = illegalRegex.join(' ');
			if (illegalRegex.length) {
				// 首页与主页API不一致
				(STK.common.extra ? STK.common.extra.shine : STK.kit.extra.shine)(getDom(list));
			}
		}
	};
	var usercardLoaded = false;
	// 将用户添加到屏蔽用户列表
	var addUsers = function (id, list) {
		var updateOnly = !list, div = getDom(id);
		// 整个列表只载入一次
		if (updateOnly && usercardLoaded) { return; }
		var users = updateOnly ? getKeywords(id, 'uid') : getDom(list).value.split(' '),
			unprocessed = users.length, unfound = [], searcher, params = 
				{ onComplete : function (result, data) {
						var link;
						if (updateOnly) {
							link = div.querySelector('a[uid="' + data.id + '"]');
						} else {
							link = document.createElement('a');
						}
						if (result.code === '100000') { // 成功
							var img = result.data.match(/<img[^>]+>/)[0];
							if (!updateOnly) { data.id = img.match(/uid="([^"]+)"/)[1]; }
							// 防止重复添加
							if (updateOnly || getKeywords(id, 'uid').indexOf(data.id) === -1) {
								link.innerHTML = '<img width="50" height="50" ' + img.match(/src="[^"]+"/)[0] + ' /><br />' + img.match(/title="([^"]+)"/)[1];
								if (!updateOnly) {
									// 添加新的用户
									link.title = '点击删除';
									link.href = 'javascript:void(0)';
									link.setAttribute('uid', data.id);
									link.setAttribute('action-type', 'remove');
									div.appendChild(link);
								}
							}
						} else if (updateOnly) {
							link.innerHTML += '<br />（未找到）';
						} else {
							unfound.push(data.name);
						}
						if (--unprocessed === 0) {
							// 全部处理完成，在文本框中显示未被添加的用户并闪烁提示
							getDom(list).value = unfound.join(' ');
							if (unfound.length) {
								// 首页与主页API不一致
								(STK.common.extra ? STK.common.extra.shine : STK.kit.extra.shine)(getDom(list));
							}
						}
					}
				};
		// 首页与主页API不一致
		if (STK.common && STK.common.trans) {
			searcher = STK.common.trans.relation.getTrans(document.domain === 'www.weibo.com' ? 'userCard2_abroad' : 'userCard2', params);
		} else {
			searcher = STK.conf.trans.card.getTrans(document.domain === 'www.weibo.com' ? 'userCard_abroad' : 'userCard', params);
		}
		users.forEach(function (user) {
			var request = { type : 1 };
			if (updateOnly) {
				request.id = user;
			} else {
				request.name = user;
			}
			searcher.request(request);
		});
		usercardLoaded = true;
	};
	// 返回当前设置（可能未保存）
	var exportSettings = function () {
		var options = new Options(), radio;
		for (var option in options.items) {
			switch (options.items[option][0]) {
			case 'keyword':
				options[option] = getKeywords(option + 'List');
				break;
			case 'string':
				options[option] = getDom(option).value;
				break;
			case 'bool':
				options[option] = getDom(option).checked;
				break;
			case 'radio':
				radio = getDom('tabs').querySelector('input[type="radio"][name="' + option + '"]:checked');
				options[option] = radio ? radio.value : '';
				break;
			case 'array':
				options[option] = [];
				break;
			case 'object':
				options[option] = {};
				break;
			case 'internal':
				// 内部变量保持不变
				// WARNING: 内部变量如果是数组或对象，以下的浅拷贝方式可能导致设置的意外改变
				options[option] = $options[option];
				break;
			}
		}
		options.userBlacklist = getKeywords('userBlacklist', 'uid');
		for (var module in $page.modules) {
			if (getDom('hide' + module).checked) {
				options.hideMods.push(module);
			}
		}
		getDom('settingsString').value = options.strip();
		return options;
	};
	// 更新设置窗口内容，exportSettings()的反过程
	var importSettings = function (options) {
		var radio;
		for (var option in options.items) {
			switch (options.items[option][0]) {
			case 'keyword':
				getDom(option).value = '';
				getDom(option + 'List').innerHTML = '';
				addKeywords(option + 'List', options[option]);
				break;
			case 'string':
				getDom(option).value = options[option];
				break;
			case 'bool':
				getDom(option).checked = options[option];
				break;
			case 'radio':
				radio = getDom('tabs').querySelector('input[type="radio"][name="' + option + '"][value="' + options[option] + '"]');
				if (radio) { radio.checked = true; }
				break;
			}
		}
		getDom('userBlacklistNew').value = '';
		getDom('userBlacklist').innerHTML = '';
		addKeywords('userBlacklist', options.userBlacklist, 'uid');
		usercardLoaded = false;
		var tipBackColor = getDom('tipBackColor').value,
			tipTextColor = getDom('tipTextColor').value,
			tipSample = getDom('tipSample');
		tipSample.style.backgroundColor = tipBackColor;
		tipSample.style.borderColor = tipTextColor;
		tipSample.style.color = tipTextColor;
		for (var module in $page.modules) {
			getDom('hide' + module).checked = (options.hideMods.indexOf(module) > -1);
		}
		getDom('settingsString').value = options.strip();
	};
	// 创建设置窗口
	var createDialog = function () {
		// 由于操作是异步进行的，脚本载入时STK可能尚未载入，尤其是在Firefox中
		// 鉴于只有$dialog使用STK，将其设置为内部变量，仅在打开设置窗口时载入
		STK = $.window.STK;
		if (!STK) {
			console.warn('页面尚未载入完成，无法打开设置页面！');
			return false;
		}
		var HTML = '<div node-type="outer" class="detail wbpSettings" style="padding: 0 20px 20px"><div class="clearfix"><div style="float: left">新浪微博<span style="color: red">非官方</span>功能增强脚本。</div><div style="float: right; display: inline; position: relative"><a href="https://bitbucket.org/salviati/weibo-cleaner" target="_blank">插件主页</a><em class="W_vline"></em><a href="https://bitbucket.org/salviati/weibo-cleaner/wiki/FAQ" title="遇到问题请先阅读FAQ" target="_blank">常见问题</a><em class="W_vline"></em><a href="/salviati" title="欢迎私信、评论或@作者提出建议" target="_blank">联系作者</a><em class="W_vline"></em><span class="link"><a href="javascript:void(0);" target="_blank">捐助插件<span style="background: white"><p>欢迎捐助作者 @富平侯 支持插件的后续开发！如果您希望捐助，请使用支付宝手机客户端扫描以下二维码：</p><p align="center"><img src="data:image/png;base64,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"></p><p>捐助是完全自愿的，您<span style="color: red">无需</span>为插件的使用以及向作者的咨询支付任何费用。</p></span></a></span></div></div><div class="clearfix"><div node-type="tabHeaders" class="wbpTabHeaders"><a tab="tabKeywords" href="javascript:void(0);" class="current">关键词</a><a tab="tabLinks" href="javascript:void(0);">链接地址</a><a node-type="tabHeaderUser" tab="tabUser" href="javascript:void(0);">用户</a><a tab="tabSource" href="javascript:void(0);">来源</a><a tab="tabAdvanced" href="javascript:void(0);">高级</a><a tab="tabModules" href="javascript:void(0);">模块</a><a tab="tabModify" href="javascript:void(0);">改造版面</a><a node-type="tabHeaderSettings" tab="tabSettings" href="javascript:void(0);">设置</a></div><div node-type="tabs" style="float: right; width: 440px"><div node-type="tabKeywords"><div class="clearfix"><div style="float: left"><input type="checkbox" node-type="filterSmiley"><label title="如果选中，[呵呵]等表情也可以作为关键词被屏蔽">允许表情关键词</label><input type="checkbox" node-type="filterName" style="margin-left: 10px"><label title="如果选中，@富平侯 等用户名也可以作为关键词被屏蔽"><span style="color: blue">在用户名中搜索关键词</span></label></div><div style="float: right; display: inline; position: relative"><span class="link"><a href="javascript:void(0);" style="cursor: help">关键词设置帮助<span><ul><li>如果要添加的关键词中有空格，可将其置于一对<span style="color: blue">半角双引号</span>内，如<span style="color: green">"I love you"</span></li><li>使用<span style="color: blue">加号</span>分隔需要同时出现的关键词，如<span style="color: green">A+B+C</span>代表A、B、C三个词必须同时出现</li><li>使用<span style="color: blue">斜杠</span>设置正则表达式关键词，如<span style="color: green">/转发并@.{2,3}好友/</span></li></ul></span></a></span></div></div><div class="wbpKeywordBlock"><em>白名单</em>包含下列关键词的微博不会被屏蔽<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="wbpInput"><input type="text" node-type="whiteKeywords" class="input" placeholder="多个关键词用空格隔开；不区分大小写；区分简繁体"></div></td><td class="wbpToolBtns"><a href="javascript:void(0);" class="W_btn_b" action-type="add" action-data="list=whiteKeywordsList&text=whiteKeywords"><span>添加</span></a><a href="javascript:void(0);" class="W_btn_b" action-type="clear" action-data="list=whiteKeywordsList"><span>清空</span></a></td></tr></tbody></table><div class="wbpListWrapper"><div node-type="whiteKeywordsList" class="wbpKeywordsList wbpWhiteKeywordsList"></div></div></div><div class="wbpKeywordBlock"><em>黑名单</em>包含下列关键词的微博将被屏蔽<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="wbpInput"><input type="text" node-type="blackKeywords" class="input" placeholder="多个关键词用空格隔开；不区分大小写；区分简繁体"></div></td><td class="wbpToolBtns"><a href="javascript:void(0);" class="W_btn_b" action-type="add" action-data="list=blackKeywordsList&text=blackKeywords"><span>添加</span></a><a href="javascript:void(0);" class="W_btn_b" action-type="clear" action-data="list=blackKeywordsList"><span>清空</span></a></td></tr></tbody></table><div class="wbpListWrapper"><div node-type="blackKeywordsList" class="wbpKeywordsList wbpBlackKeywordsList"></div></div></div><div class="wbpKeywordBlock"><em>灰名单</em>包含下列关键词的微博将被屏蔽<span style="color: red">并提示</span><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="wbpInput"><input type="text" node-type="grayKeywords" class="input" placeholder="多个关键词用空格隔开；不区分大小写；区分简繁体"></div></td><td class="wbpToolBtns"><a href="javascript:void(0);" class="W_btn_b" action-type="add" action-data="list=grayKeywordsList&text=grayKeywords"><span>添加</span></a><a href="javascript:void(0);" class="W_btn_b" action-type="clear" action-data="list=grayKeywordsList"><span>清空</span></a></td></tr></tbody></table><div class="wbpListWrapper"><div node-type="grayKeywordsList" class="wbpKeywordsList wbpGrayKeywordsList"></div></div><table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 0px"><tbody><tr><td style="width: 110px">屏蔽提示背景颜色：</td><td><div class="wbpInput"><input type="text" node-type="tipBackColor" class="input"></div></td><td style="width: 15px"></td><td style="width: 110px">屏蔽提示文字颜色：</td><td><div class="wbpInput"><input type="text" node-type="tipTextColor" class="input"></div></td></tr></tbody></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="width: 40px">示例：</td><td><div node-type="tipSample" class="wbpTip" style="margin-bottom: 10px">本条来自<a href="javascript:void(0);">@某人</a>的微博因包含关键词“<a href="javascript:void(0);">XXXX</a>”而被隐藏，点击显示</div></td></tr></tbody></table></div></div><div node-type="tabLinks" style="display: none"><p>如果一条微博中包含链接且目标地址中包含下列关键词，微博将被屏蔽（无提示）。如将taobao.com设为关键词可屏蔽所有包含淘宝链接的微博。</p><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="wbpInput"><input type="text" node-type="URLKeywords" class="input" placeholder="多个关键词用空格隔开；不区分大小写；区分简繁体"></div></td><td class="wbpToolBtns"><a href="javascript:void(0);" class="W_btn_b" action-type="add" action-data="list=URLKeywordsList&text=URLKeywords"><span>添加</span></a><a href="javascript:void(0);" class="W_btn_b" action-type="clear" action-data="list=URLKeywordsList"><span>清空</span></a></td></tr></tbody></table><div class="wbpListWrapper"><div node-type="URLKeywordsList" class="wbpKeywordsList wbpBlackKeywordsList"></div></div></div><div node-type="tabUser" style="display: none"><p>如果一条微博的发布者或转发原文的作者为下列用户之一，微博将被屏蔽。除了在此处添加屏蔽用户，您还可以将鼠标悬停在用户链接上，在弹出的信息气球上点击“屏蔽”。</p><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="wbpInput"><input type="text" node-type="userBlacklistNew" class="input" placeholder="多个用户名用空格隔开；不要加上前面的@；不区分大小写"></div></td><td class="wbpToolBtns"><a href="javascript:void(0);" class="W_btn_b" action-type="addUser" action-data="list=userBlacklist&text=userBlacklistNew"><span>添加</span></a><a href="javascript:void(0);" class="W_btn_b" action-type="clear" action-data="list=userBlacklist"><span>清空</span></a></td></tr></tbody></table><div class="wbpListWrapper" style="max-height: 230px"><div node-type="userBlacklist" class="wbpUserList wbpBlackKeywordsList"></div></div></div><div node-type="tabSource" style="display: none"><p>如果一条微博的来源（包括转发原文的来源）名称中包含指定关键词，微博将被屏蔽。如将“时光机”设为关键词可屏蔽所有来自<a href="http://time.xuapp.com/" target="_blank">时光机</a>或<a href="http://weibo.pp.cc/time/" target="_blank">皮皮时光机</a>等应用的微博。</p><div class="wbpKeywordBlock"><em>黑名单</em>来源名称包含下列关键词的微博将被屏蔽<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="wbpInput"><input type="text" node-type="sourceKeywords" class="input" placeholder="多个关键词用空格隔开；不区分大小写；区分简繁体"></div></td><td class="wbpToolBtns"><a href="javascript:void(0);" class="W_btn_b" action-type="add" action-data="list=sourceKeywordsList&text=sourceKeywords"><span>添加</span></a><a href="javascript:void(0);" class="W_btn_b" action-type="clear" action-data="list=sourceKeywordsList"><span>清空</span></a></td></tr></tbody></table><div class="wbpListWrapper"><div node-type="sourceKeywordsList" class="wbpKeywordsList wbpBlackKeywordsList"></div></div></div><div class="wbpKeywordBlock"><em>灰名单</em>来源名称包含下列关键词的微博将被屏蔽<span style="color: red">并提示</span><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="wbpInput"><input type="text" node-type="sourceGrayKeywords" class="input" placeholder="多个关键词用空格隔开；不区分大小写；区分简繁体"></div></td><td class="wbpToolBtns"><a href="javascript:void(0);" class="W_btn_b" action-type="add" action-data="list=sourceGrayKeywordsList&text=sourceGrayKeywords"><span>添加</span></a><a href="javascript:void(0);" class="W_btn_b" action-type="clear" action-data="list=sourceGrayKeywordsList"><span>清空</span></a></td></tr></tbody></table><div class="wbpListWrapper"><div node-type="sourceGrayKeywordsList" class="wbpKeywordsList wbpGrayKeywordsList"></div></div></div></div><div node-type="tabAdvanced" style="display: none"><p>注意：对于所有屏蔽微博的功能，白名单具有最高优先级；如果一条微博包含白名单中的关键词，则<span style="color: red">一定不会</span>被屏蔽。</p><p><input type="checkbox" node-type="filterOthersOnly"><label>不要屏蔽我自己发布的微博</label></p><p><input type="checkbox" node-type="filterPaused"><label><span style="color: red">暂停屏蔽</span>：选中时暂时停止屏蔽微博</label></p><p><input type="checkbox" node-type="filterPromotions"><label>屏蔽推广微博</label></p><p><input type="checkbox" node-type="filterDeleted"><label>屏蔽已删除微博的转发</label></p><p><input type="checkbox" node-type="filterTaobao"><label class="WB_text">屏蔽带有 <a class="W_btn_c"><i class="W_ico20 icon_fl_tb"></i><span class="W_autocut">淘宝商品</span></a> 或 <a class="W_btn_c"><i class="W_ico20 icon_fl_tmall"></i><span class="W_autocut">天猫商品</span></a> 的微博</label></p><div style="margin-top: 5px"><input type="checkbox" node-type="filterFlood"><label>反刷屏：来自同一用户的微博最多显示</label><div class="wbpInput wbpInlineInput"><input type="text" node-type="maxFlood" class="input"></div>条</div></div><div node-type="tabModules" class="wbpTabModules" style="display: none"><p>请选择要屏蔽的版面内容。</p><table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height: 24px; margin-top: 15px"><tbody><tr><td><input type="checkbox" node-type="hideAds"><label>版面及嵌入广告</label></td></tr><tr><td><input type="checkbox" node-type="hideFooter"><label>页底链接模块</label></td><td><input type="checkbox" node-type="hideRecommendedTopic"><label>热点微话题（发布框右上）</label></td></tr><tr class="wbpV5Only"><td><input type="checkbox" node-type="hideFollowGuide"><label>“为你推荐”弹窗（新用户）</label></td><td><input type="checkbox" node-type="hideHomeTip"><label>顶部横幅（新版微博推广）</label></td></tr><tr><td><input type="checkbox" node-type="hideIMNews"><label>右下角新闻弹窗</label></td><td><input type="checkbox" node-type="hideCommentTip"><label>评论栏顶端横幅</label></td></tr><tr><td class="wbpV5Only"><input type="checkbox" node-type="hideApp"><label>我的应用（左边栏）</label></td><td class="wbpV6Only"><input type="checkbox" node-type="hideMusicPlayer"><label><span style="color: blue">微音乐播放器（左下角）</span></label></td><td><input type="checkbox" node-type="hideMemberTip"><label>微博会员推广横幅（页底）</label></td></tr><tr class="wbpRowSpacing"><td><input type="checkbox" node-type="hideRecomFeed"><label>精彩微博推荐（首页时间线）</label></td><td><input type="checkbox" node-type="hideTimelineMods"><label>首页时间线嵌入模块（好友关注等）</label></td></tr><td><input type="checkbox" node-type="hideTopicCard"><label>微博话题卡片</label></td><td><input type="checkbox" node-type="hideLocationCard"><label>微博位置卡片</label></td><tr></tr><tr class="wbpRowSpacing"><td><input type="checkbox" node-type="hideStats"><label>关注/粉丝/微博数</label></td><td><input type="checkbox" node-type="hideFriends"><label>好友圈</label></td></tr><tr class="wbpV5Only"><td><input type="checkbox" node-type="hideToMe"><label>发给我的</label></td><td><input type="checkbox" node-type="hideTopComment"><label>热评微博（“我的评论”页）</label></td></tr><tr><td><input type="checkbox" node-type="hideInterestUser"><label>可能感兴趣的人</label></td><td><input type="checkbox" node-type="hideTopic"><label>热门话题</label></td></tr><tr><td><input type="checkbox" node-type="hideWeiboRecom"><label>热门微博</label></td><td><input type="checkbox" node-type="hideLocationRecom"><label>地点推荐</label></td><tr><td><input type="checkbox" node-type="hideMusicRecom"><label>热门歌曲</label></td><td><input type="checkbox" node-type="hideMovieRecom"><label>最新电影</label></td></tr><td><input type="checkbox" node-type="hideBookRecom"><label>人气图书</label></td><td><input type="checkbox" node-type="hideUpgradeV6"><label><span style="color: blue">新版微博推介</span></label></td></tr><tr><td><input type="checkbox" node-type="hideMember"><label>会员专区</label></td><td><input type="checkbox" node-type="hideNotice"><label>公告栏</label></td></tr><tr class="wbpRowSpacing"><td><input type="checkbox" node-type="hideVerifyIcon"><label>个人/机构认证标识</label><a href="http://verified.weibo.com/verify" target="_blank"><i class="wbpV5Only W_ico16 approve"></i><i class="wbpV5Only W_ico16 approve_co"></i><i class="wbpV6Only W_icon icon_approve"></i><i class="wbpV6Only W_icon icon_approve_co"></i></a></td><td><input type="checkbox" node-type="hideDarenIcon"><label>微博达人标识</label><a href="http://club.weibo.com/intro" target="_blank"><i class="wbpV5Only W_ico16 ico_club"></i><i class="wbpV6Only W_icon icon_club"></i></a></td></tr><tr><td><input type="checkbox" node-type="hideMemberIcon"><label>微博会员标识</label><a href="http://vip.weibo.com/" target="_blank"><i class="wbpV5Only W_ico16 ico_member"></i><i class="wbpV6Only W_icon icon_member"></i></a></td><td><input type="checkbox" node-type="hideVgirlIcon"><label>微博女郎标识</label><a href="http://vgirl.weibo.com/" target="_blank"><i class="wbpV5Only W_ico16 ico_vlady"></i><i class="wbpV6Only W_icon icon_vlady"></i></a></td></tr><tr><td><input type="checkbox" node-type="hideTaobaoIcon"><label>淘宝商户</label><a href="http://e.weibo.com/taobao/introduce" target="_blank"><i class="wbpV5Only W_ico16 ico_taobao"></i><i class="wbpV5Only W_ico16 ico_tmall"></i><i class="wbpV6Only W_icon icon_taobao"></i><i class="wbpV6Only W_icon icon_tmall"></i></a></td><td><input type="checkbox" node-type="hideGongyiIcon"><label>微公益</label><a href="http://gongyi.weibo.com/" target="_blank"><i class="wbpV5Only W_ico16 ico_gongyi"></i><i class="wbpV6Only W_icon icon_gongyi"></i></a></td></tr><tr><td><input type="checkbox" node-type="hideZongyiIcon"><label><span style="color: blue">我是综艺咖</span></label><a href="http://tv.weibo.com/ka" target="_blank"><i class="wbpV5Only W_ico16 zongyika2014"></i><i class="wbpV6Only W_icon icon_zongyika2014"></i></a></td><td><input type="checkbox" node-type="hideDouble11Icon"><label><span style="color: blue">我的双11</span></label><a href="http://huodong.weibo.com/1111" target="_blank"><i class="wbpV5Only W_ico16 ico_double11"></i><i class="wbpV6Only W_icon icon_double11"></i></a></td></tr><tr class="wbpRowSpacing"><td><input type="checkbox" node-type="hideProfCover"><label>封面图（个人主页）</label></td><td><input type="checkbox" node-type="hideProfStats"><label>关注/粉丝/微博数（个人主页）</label></td></tr><tr class="wbpV5Only"><td><input type="checkbox" node-type="hideMyMicroworld"><label>我的微博人气（个人主页）</label></td></tr><tr class="wbpV5Only"><td colspan="2"><input type="checkbox" node-type="hideMyRightSidebar"><label><span style="color: red">个人主页右边栏</span>：选中后整个右边栏将被去除</label></td></tr><tr><td><input type="checkbox" node-type="hideRelation"><label>关注/粉丝/微关系（个人主页）</label></td><td><input type="checkbox" node-type="hideAlbum"><label>微相册（个人主页）</label></td></tr><tr class="wbpV5Only"><td><input type="checkbox" node-type="hideProfHotTopic"><label>话题（个人主页）</label></td><td><input type="checkbox" node-type="hideProfHotWeibo"><label>热门微博（个人主页）</label></td></tr><tr class="wbpRowSpacing"><td colspan="2"><input type="checkbox" node-type="hideFeedRecom"><label>相关推荐：单条微博右边栏</label></td></tr></tbody></table><p style="margin-top: 15px"><a href="javascript:void(0);" class="W_btn_b" node-type="hideAll"><span>全选</span></a><a href="javascript:void(0);" class="W_btn_b" node-type="hideInvert" style="margin-left: 5px"><span>反选</span></a></p></div><div node-type="tabModify" style="display: none"><p class="wbpV6Only"><input type="checkbox" node-type="squareAvatar"><label><span style="color: blue">使用方形头像</span></label></p><p class="wbpV6Only"><input type="checkbox" node-type="compactFeedToolbar"><label><span style="color: blue">使用紧凑型（V5样式）微博工具栏</span>（收藏 | 转发 | 评论 | 赞）</label></p><p class="wbpV5Only"><input type="checkbox" node-type="mergeSidebars"><label><span style="color: red">双栏版式</span>（将左边栏并入右边栏）</label></p><p class="wbpV6Only"><input type="checkbox" node-type="noHomeRightBar"><label><span style="color: blue">去除首页右边栏</span></label></p><p class="wbpV6Only"><input type="checkbox" node-type="noHomeMargins"><label><span style="color: blue">在首页使用紧凑版式（去除卡片间空隙）</span></label></p><p class="wbpV5Only">左边栏浮动选项：</p><p class="wbpV5Only" style="margin-top: 3px"><input type="radio" name="floatSetting" value="Nav"><label>导航栏随分组栏浮动</label></p><p class="wbpV5Only" style="margin-top: 3px"><input type="radio" name="floatSetting" value="Groups"><label>仅分组栏浮动（新浪微博默认值）</label></p><p class="wbpV5Only" style="margin-top: 3px"><input type="radio" name="floatSetting" value="None"><label>禁止浮动</label></p><p><input type="checkbox" node-type="showAllGroups"><label>展开分组栏中的所有分组</label></p><p><input type="checkbox" node-type="showAllMsgNav"><label>展开导航栏中的所有消息链接（左边栏“消息”下的“提到我的”、“评论”等）</label></p><p><input type="checkbox" node-type="showAllSonFeeds"><label><span style="color: blue">展开所有子微博</span>（“还有?条对原微博的转发”）</label></p><p><input type="checkbox" node-type="unwrapText"><label>微博作者与正文间不折行</label></p><p><input type="checkbox" node-type="directBigImg"><label>点击“查看大图”直接打开大图</label></p><p class="wbpV5Only"><input type="checkbox" node-type="directFeeds"><label>点击用户名直接进入微博列表（跳过“他/她的主页”）</label></p><p class="wbpV5Only"><input type="checkbox" node-type="noDefaultFwd"><label>禁止在评论时默认选中“同时转发”</label></p><p class="wbpV5Only"><input type="checkbox" node-type="noDefaultCmt"><label>禁止在转发时默认选中“同时评论”</label></p><p><input type="checkbox" node-type="noDefaultGroupPub"><label>禁止在浏览分组时默认发布新微博到该分组</label></p><p><input type="checkbox" node-type="clearHotSearch"><label><span style="color: blue">清除搜索框中的推介话题（“大家正在热搜”）</span></label></p><p><input type="checkbox" node-type="clearDefTopic"><label title="关闭此选项后需要刷新页面生效">清除微博发布框中的默认话题</label></p><div style="margin-top: 15px">在<input type="checkbox" node-type="readerModeIndex" style="margin: 0 2px 0 8px"><label>我的首页</label><input type="checkbox" node-type="readerModeProfile" style="margin: 0 2px 0 8px"><label style="margin-right: 8px">个人主页</label>启用极简阅读模式<span style="color: red">（可按F8切换）</span><table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 3px"><tbody><tr><td style="width: 85px; padding-left: 19px">宽度（像素）：</td><td><div class="wbpInput" style="width: 40px"><input type="text" node-type="readerModeWidth" class="input"></div></td><td class="wbpV5Only" style="width: 60px">背景颜色：</td><td><div class="wbpV5Only wbpInput"><input type="text" node-type="readerModeBackColor" class="input"></div></td></tr></tbody></table></div><div style="margin-top: 10px">设置<input type="checkbox" node-type="overrideMyBack" style="margin: 0 2px 0 8px"><label>我的首页</label><input type="checkbox" node-type="overrideOtherBack" style="margin: 0 2px 0 8px"><label style="margin-right: 8px">个人主页</label>透明背景色<div class="wbpInput wbpInlineInput" style="width: 190px" title="最后一个参数为透明度，0为全透明，1为不透明"><input type="text" node-type="backColor" class="input"></div></div><div style="margin-top: 10px">覆盖<input type="checkbox" node-type="overrideMySkin" style="margin: 0 2px 0 8px"><label>我的首页</label><input type="checkbox" node-type="overrideOtherSkin" style="margin: 0 2px 0 8px"><label style="margin-right: 8px">个人主页</label>模板设置为<div class="wbpInput wbpInlineInput" style="width: 80px" title="普通模板为“skin+三位数字编号”，如skin012\n会员专属模板为“skinvip+三位数字编号”，如skinvip012\n默认模板为default"><input type="text" node-type="skinID" class="input"></div>（仅自己可见）</div><p style="margin-top: 10px"><input type="checkbox" node-type="useCustomStyles"><label><span style="color: red">自定义样式</span>（CSS）：可用于屏蔽模块、改造版面，</label><a href="https://bitbucket.org/salviati/weibo-cleaner/wiki/CustomCSS" target="_blank">点此查看示例</a></p><textarea node-type="customStyles" rows="6" style="margin-top: 5px"></textarea></div><div node-type="tabSettings" style="display: none"><p><input type="checkbox" node-type="updateNotify"><label>更新后首次使用时显示新功能</label></p><div class="clearfix" style="margin-top: 8px"><div style="float: left; width: 375px"><p>当前账号的设置信息在以下文本框中，您可以将其复制到其它位置保存。导入设置时，请将设置信息粘贴到文本框中，然后点击“导入”。</p></div><a href="javascript:void(0)" class="W_btn_b" node-type="import" style="float: right; margin-top: 6px"><span>导入</span></a></div><textarea node-type="settingsString" rows="10"></textarea></div></div></div><p style="margin-top: 10px"><a href="javascript:void(0);" class="W_btn_a" node-type="OK"><span>确定</span></a><a href="javascript:void(0);" class="W_btn_b" node-type="cancel" style="margin-left: 10px"><span>取消</span></a></p></div>', events;
		dialog = STK.ui.dialog({isHold: true});
		dialog.setTitle('“眼不见心不烦”(v2.1)设置');
		// 首页与主页API不一致
		if (dialog.getDom) {
			content = STK.ui.mod.layer(HTML);
			dialog.setContent(content.getOuter());
			events = STK.core.evt.delegatedEvent(content.getDom('tabs'));
		} else {
			//content = STK.ui.mod.layer({template: HTML, appendTo: null});
			dialog.setContent(HTML);
			events = STK.core.evt.delegatedEvent(dialog.getDomList(true).tabs); // true用于更新DOM缓存（只需做一次）
		}
		getDom('outer').classList.add($.V6 ? 'wbpV6' : 'wbpV5'); // 版本标识
		if (!$.V6) { // 新旧版微博不同的class
			getDom('cancel').className = 'W_btn_c';
		}
		// 修改屏蔽提示颜色事件
		bind('tipBackColor', function () {
			getDom('tipSample').style.backgroundColor = this.value;
		}, 'blur');
		bind('tipTextColor', function () {
			getDom('tipSample').style.borderColor = this.value;
			getDom('tipSample').style.color = this.value;
		}, 'blur');
		// 添加关键词按钮点击事件
		events.add('add', 'click', function (action) {
			addKeywords(action.data.list, action.data.text);
		});
		// 清空关键词按钮点击事件
		events.add('clear', 'click', function (action) {
			getDom(action.data.list).innerHTML = '';
		});
		// 删除关键词事件
		events.add('remove', 'click', function (action) {
			$.remove(action.el);
		});
		// 添加用户按钮点击事件
		events.add('addUser', 'click', function (action) {
			addUsers(action.data.list, action.data.text);
		});
		// 复选框标签点击事件
		bind('outer', function (event) {
			var node = event.target;
			// 标签下可能有span等元素
			if (node.parentNode && node.parentNode.tagName === 'LABEL') {
				node = node.parentNode;
			}
			if (node.tagName === 'LABEL') {
				event.preventDefault();
				event.stopPropagation();
				if (node.getAttribute('for')) {
					// 有for属性则使用之
					getDom(node.getAttribute('for')).click();
				} else {
					// 默认目标在标签之前（同级）
					node.previousSibling.click();
				}
			}
		});
		// 标签点击事件
		bind('tabHeaders', function (event) {
			var node = event.target;
			if (node && node.tagName === 'A') {
				node.className = 'current';
				getDom(node.getAttribute('tab')).style.display = '';
				Array.prototype.forEach.call(this.childNodes, function (child) {
					if (node !== child) {
						child.className = '';
						getDom(child.getAttribute('tab')).style.display = 'none';
					}
				});
			}
		});
		// 点击“设置导入/导出”标签时更新内容
		bind('tabHeaderSettings', exportSettings);
		// 点击“用户”标签时载入用户黑名单头像
		bind('tabHeaderUser', function () { addUsers('userBlacklist'); });
		bind('hideAll', function () {
			for (var module in $page.modules) {
				getDom('hide' + module).checked = true;
			}
		});
		bind('hideInvert', function () {
			for (var module in $page.modules) {
				var item = getDom('hide' + module);
				item.checked = !item.checked;
			}
		});
		// 对话框按钮点击事件
		bind('import', function () {
			var options = new Options();
			if (options.load(getDom('settingsString').value)) {
				importSettings(options);
				alert('设置导入成功！');
			} else {
				alert('设置导入失败！\n设置信息格式有问题。');
			}
		});
		bind('OK', function () {
			$options = exportSettings();
			$options.save();
			$filter();
			$page();
			dialog.hide();
			shown = false;
		});
		bind('cancel', function () {
			dialog.hide();
			shown = false;
		});
		return true;
	};
	// 显示设置窗口
	var show = function () {
		if (!dialog && !createDialog()) {
			return;
		}
		shown = true;
		importSettings($options);
		if (getDom('tabHeaderUser').classList.contains('current')) {
			addUsers('userBlacklist');
		}
		dialog.show().setMiddle();
	};
	show.shown = function () {
		return shown;
	};

	return show;
})();

// 关键词过滤器
var $filter = (function () {
	var forwardFeeds = {}, floodFeeds = {};
	// 搜索指定文本中是否包含列表中的关键词
	var search = function  (str, key) {
		var text = str.toLowerCase(), keywords = $options[key];
		if (str === '' || keywords.length === 0) { return ''; }
		var matched = keywords.filter(function (keyword) {
			if (!keyword) { return false; }
			if (keyword.length > 2 && keyword.charAt(0) === '/' && keyword.charAt(keyword.length - 1) === '/') {
				try {
					// 尝试匹配正则表达式
					return (RegExp(keyword.slice(1, -1)).test(str));
				} catch (e) { }
			} else {
				return keyword.split('+').every(function (k) { return text.indexOf(k.toLowerCase()) > -1; });
			}
			return false;
		});
		return matched.length ? matched[0] : '';
	};
	// 获取微博正文
	var getText = function (content) {
		var node = content.firstChild, text = '';
		// 只保留ID（如果用户要求）与话题，去掉其它链接（如淘宝链接、短链接、地点等）
		while (node) {
			if (node.nodeType === Node.TEXT_NODE) {
				text += node.nodeValue.trim();
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				if (node.tagName === 'A' && node.getAttribute('extra-data') === 'type=topic') { // 话题
					text += node.textContent;
				} else if ($options.filterName && node.tagName === 'A' && node.hasAttribute('usercard')) { // 用户ID
					text += node.textContent;
				} else if ($options.filterSmiley && node.tagName === 'IMG' && node.getAttribute('type') === 'face') {
					text += node.getAttribute('alt');
				}
			}
			node = node.nextSibling;
		}
		return text;
	};
	// 过滤微博来源
	var searchSource = function (source, keywords) {
		if (!source) {
			source = '';
		} else {
			// 过长的应用名称会被压缩，完整名称存放在title属性中
			source = source.title || source.textContent;
		}
		return search(source, keywords);
	};
	// 过滤单条微博
	var apply = function (feed) {
		if (feed.firstChild && feed.firstChild.className === 'wbpTip') {
			// 已被灰名单屏蔽过，移除屏蔽提示和分隔线
			feed.removeChild(feed.firstChild);
			if (!$.V6) { feed.removeChild(feed.firstChild); }
		}
		var mid = feed.getAttribute('mid');
		if (!mid) { return false; } // 动态没有mid
		var scope = $.scope(), isForward = (feed.getAttribute('isforward') === '1');
		var author, content, source, fwdAuthor, fwdContent, fwdSource;
		if ($.V6) {
			if (scope === 3) { scope = 1; } // 热门微博的展现形式类似主页
			// V6版单条微博页面与用户主页结构类似，不要屏蔽
			if (scope === 2 && feed.parentNode.getAttribute('node-type') === 'feedconfig') { return false; }
			if (scope === 1 && feed.getAttribute('feedtype') === 'subfeed') { // “还有?条对原微博的转发”
				author = feed.querySelector('.WB_detail>.WB_text>a[usercard]');
				content = feed.querySelector('.WB_detail>.WB_text>[node-type="feed_list_content"]');
				source = feed.querySelector('.WB_detail>.WB_func>.WB_from>a[action-type="app_source"]');
			} else {
				author = (scope === 1) ? feed.querySelector('.WB_detail>.WB_info>a[usercard]') : null;
				content = feed.querySelector('.WB_detail>.WB_text');
				source = feed.querySelector('.WB_detail>.WB_from>a[action-type="app_source"]');
				fwdAuthor = feed.querySelector('.WB_feed_expand .WB_info>a[usercard]');
				fwdContent = feed.querySelector('.WB_feed_expand .WB_text');
				fwdSource = feed.querySelector('.WB_feed_expand .WB_func .WB_from>a[action-type="app_source"]');
			}
		} else {
			author = (scope === 1) ? feed.querySelector('.WB_detail>.WB_info .WB_name') : null;
			content = feed.querySelector('.WB_detail>.WB_text');
			source = feed.querySelector('.WB_detail>.WB_func .WB_from>em+a');
			fwdAuthor = feed.querySelector('.WB_media_expand .WB_info .WB_name');
			fwdContent = feed.querySelector('.WB_media_expand .WB_text>em');
			fwdSource = feed.querySelector('.WB_media_expand .WB_func .WB_from>em+a');
		}
		var uid = author ? author.getAttribute('usercard').match(/id=(\d+)/)[1] : null,
			fuid = fwdAuthor ? fwdAuthor.getAttribute('usercard').match(/id=(\d+)/)[1] : null,
			text = '';

		if (!content) { return false; }
		if (scope === 1 && $options.filterName) { text = '@' + author.getAttribute('nick-name') + ': '; }
		text += getText(content);
		if (isForward && fwdAuthor && fwdContent) {
			// 转发内容
			text += '////' + ($options.filterName ? '@' + fwdAuthor.getAttribute('nick-name') + ': ' : '') + getText(fwdContent);
		}

		// 处理子微博
		if ($.V6 && feed.querySelector('.WB_feed_together')) {
			var sonFeeds = feed.querySelectorAll('.WB_feed_detail[feedtype="subfeed"]'),
				sonFeedsLeft = sonFeeds.length - Array.prototype.filter.call(sonFeeds, apply).length;
			if (sonFeedsLeft === 0) {
				feed.querySelector('.WB_feed_together').style.display = 'none'; // 隐藏整个子微博栏目
			} else {
				feed.querySelector('.WB_feed_together').style.display = '';
				feed.querySelector('.WB_feed_together [node-type="followNum"]').innerHTML = sonFeedsLeft;
			}
		}
		
		if ($options.filterPaused || // 暂停屏蔽
			($options.filterOthersOnly && feed.querySelector('.WB_screen a[action-type="feed_list_delete"]')) || // 不要屏蔽自己的微博（判据：工具栏是否有“删除”）
			search(text, 'whiteKeywords')) { // 白名单条件
		} else if ((function () { // 黑名单条件
			// 屏蔽推广微博
			if (scope === 1 && $options.filterPromotions && feed.getAttribute('feedtype') === 'ad') {
				return true;
			}
			// 屏蔽已删除微博的转发（是转发但无转发作者）
			if ($options.filterDeleted && isForward && !fwdAuthor) {
				return true;
			}
			// 用户黑名单
			if ((scope === 1 && author && $options.userBlacklist.indexOf(uid) > -1) ||
					(isForward && fwdAuthor && (scope === 1 || fuid !== $.oid) && $options.userBlacklist.indexOf(fuid) > -1)) {
				return true;
			}
			// 屏蔽淘宝和天猫链接微博
			if ($options.filterTaobao && feed.querySelector('a>i.icon_fl_tb, a>i.icon_fl_tmall')) {
				return true;
			}			
			// 屏蔽指定来源
			if (searchSource(source, 'sourceKeywords') ||
					(isForward && searchSource(fwdSource, 'sourceKeywords'))) {
				return true;
			}
			// 反刷屏（屏蔽同一用户大量发帖）
			if ($options.filterFlood && uid && floodFeeds[uid]) {
				if (floodFeeds[uid] >= Number($options.maxFlood) && floodFeeds[uid].indexOf(mid) === -1) {
					return true;
				}
			}
			// 在微博内容中搜索屏蔽关键词
			if (search(text, 'blackKeywords')) {
				return true;
			}
			// 搜索t.cn短链接
			return Array.prototype.some.call(feed.getElementsByTagName('A'), function (link) {
				if (link.href.slice(0, 12) === 'http://t.cn/' && search(link.title, 'URLKeywords')) {
					return true;
				}
				return false;
			});
		})()) {
			feed.style.display = 'none'; // 直接隐藏，不显示屏蔽提示
			return true;
		} else { // 灰名单条件
			// 搜索来源灰名单
			var sourceKeyword = searchSource(source, 'sourceGrayKeywords'), 
				keyword = search(text, 'grayKeywords');
			if (!sourceKeyword && isForward) {
				sourceKeyword = searchSource(fwdSource, 'sourceGrayKeywords');
			}
			if (keyword || sourceKeyword) {
				// 找到了待隐藏的微博
				var authorClone;
				if (scope === 1) {
					// 添加隐藏提示链接
					authorClone = author.cloneNode(false);
					authorClone.textContent = '@' + author.getAttribute('nick-name');
					authorClone.className = '';
				}
				var showFeedLink = document.createElement('a');
				showFeedLink.href = 'javascript:void(0)';
				showFeedLink.className = 'wbpTip';
				var keywordLink = document.createElement('a');
				keywordLink.href = 'javascript:void(0)';
				keywordLink.className = 'wbpTipKeyword';
				keywordLink.textContent = keyword || sourceKeyword;
				if (scope === 1) {
					showFeedLink.appendChild(document.createTextNode('本条来自'));
					showFeedLink.appendChild(authorClone);
					showFeedLink.appendChild(document.createTextNode('的微博因'));
				} else if (scope === 2) {
					showFeedLink.appendChild(document.createTextNode('本条微博因'));
				}
				showFeedLink.appendChild(document.createTextNode(keyword ? '内容包含“' : '来源名称包含“'));
				showFeedLink.appendChild(keywordLink);
				showFeedLink.appendChild(document.createTextNode('”而被隐藏，点击显示'));
				if ($.V6) {
					feed.insertBefore(showFeedLink, feed.firstChild);
				} else {
					var line = document.createElement('div');
					line.className = 'S_line2 wbpTipLine';
					feed.insertBefore(line, feed.firstChild);
					feed.insertBefore(showFeedLink, line);
				}
				return false; // 灰名单不作为屏蔽处理
			}
		}
		// 显示微博并记录
		feed.style.display = '';
		if (!$options.filterPaused) {
			if ($options.filterFlood && uid) {
				if (!floodFeeds[uid]) {
					floodFeeds[uid] = [];
				}
				if (floodFeeds[uid].indexOf(mid) === -1) {
					floodFeeds[uid].push(mid);
				}
			}
		}
		return false;
	};
	// 过滤所有微博
	var applyToAll = function () {
		// 过滤所有微博
		if ($.scope()) {
			forwardFeeds = {}; floodFeeds = {};
			Array.prototype.forEach.call(document.querySelectorAll('.WB_feed_type'), apply);
		}
	};
	// 屏蔽提示相关事件的冒泡处理
	var bindTipOnClick = function (node) { 
		if (!node) { return; }
		$.click(node, function (event) {
			var node = event.target;
			if (node && node.tagName === 'A') {
				if (node.className === 'wbpTipKeyword') {
					$dialog();
					event.stopPropagation(); // 防止事件冒泡触发屏蔽提示的onclick事件
				} else if (node.className === 'wbpTip') {
					if (!$.V6) {
						$.remove(node.nextSibling); // 分隔线
					}
					$.remove(node);
				}
			}
		});
	};

	// 处理动态载入的微博
	if ($.scope()) {
		bindTipOnClick($.select('.WB_feed'));
	}
	// 点击“查看大图”事件拦截处理
	document.addEventListener('click', function (event) {
		if (!$options.directBigImg || !event.target) { return true; }
		var actionType = event.target.getAttribute('action-type'), actionData = event.target.getAttribute('action-data');
		if ((actionType === 'images_view_tobig' || actionType === 'widget_photoview') &&
				actionData && actionData.match(/pid=(\w+)&mid=(\d+)&uid=(\d+)/)) {
			window.open('http://photo.weibo.com/' + RegExp.$3 + 
				'/wbphotos/large/mid/' + RegExp.$2 +
				'/pid/' + RegExp.$1, '_blank');
			event.stopPropagation();
		}
	}, true); // 使用事件捕捉以尽早触发事件，避免与新浪自带事件撞车
	document.addEventListener('DOMNodeInserted', function (event) {
		var node = event.target;
		if ($.scope() === 0 || node.tagName !== 'DIV') { return; }
		if (node.classList.contains('WB_feed_type')) {
			// 处理动态载入的微博
			apply(node);
		} else if (node.classList.contains('W_loading')) {
			var requestType = node.getAttribute('requesttype');
			// 仅在搜索和翻页时需要初始化反刷屏/反版聊记录
			// 其它情况（新微博：newFeed，同页接续：lazyload）下不需要
			if (requestType === 'search' || requestType === 'page') {
				forwardFeeds = {}; floodFeeds = {};
			}
		} else if (node.classList.contains('WB_feed') || node.querySelector('.WB_feed')) {
			// 微博列表作为pagelet被一次性载入
			bindTipOnClick(node);
			applyToAll();
		}
	}, false);

	return applyToAll;
})();

// 修改页面
var $page = (function () {
	// 模块屏蔽设置
	var modules = $.V6 ? {
			Ads : '#plc_main [id^="v6_pl_rightmod_ads"], div[ad-data], #v6_pl_ad_bottomtip',
			Stats : '#v6_pl_rightmod_myinfo .W_person_info { height: auto !important } #v6_pl_rightmod_myinfo .user_atten',
			Friends : '#v6_pl_leftnav_group .lev > a[isfriends]',
			InterestUser : '#trustPagelet_recom_interest', // 动态右边栏
			Topic : '#trustPagelet_zt_hottopic', // 动态右边栏
			Member : '#v6_trustPagelet_recom_member',
			WeiboRecom : '#trustPagelet_recom_weibo', // 动态右边栏
			LocationRecom : '#trustPagelet_recom_location', // 动态右边栏
			MusicRecom : '#trustPagelet_recom_music', // 动态右边栏
			MovieRecom : '#trustPagelet_recom_movie', // 动态右边栏
			BookRecom : '#trustPagelet_recom_book', // 动态右边栏
			Notice : '#v6_pl_rightmod_noticeboard',
			Footer : '#plc_bot .WB_footer',
			MusicPlayer : '.PCD_mplayer',
			RecommendedTopic : '#v6_pl_content_publishertop div[node-type="recommendTopic"]',
			CommentTip : 'div[node-type="feed_privateset_tip"]',
			MemberTip : 'div[node-type="feed_list_shieldKeyword"]',
			TimelineMods : '.FRAME_main .WB_feed .WB_feed_type:not([mid])',
			TopicCard : '.WB_feed_spec[exp-data*="value=1022-topic"]',
			LocationCard : '.WB_feed_spec[exp-data*="value=1022-place"]',
			IMNews : '.WBIM_news',
			UpgradeV6 : '#v6_pl_rightmod_updatev6',
			RecomFeed : 'div[node-type="feed_list_recommend"]',
			ProfCover : '#Pl_Official_Headerv6__1 .PCD_header .S_shadow { background: transparent !important } #Pl_Official_Headerv6__1 .cover_wrap',
			ProfStats : '.WB_frame_b .PCD_counter',
			Relation : '.WB_frame_b .PCD_user_a',
			Album : '.WB_frame_b .PCD_photolist',
			FeedRecom : '.WB_frame_b .apps_PCD_reco_detail_right',
			MemberIcon : '.W_icon[class*="icon_member"], .icon_member_dis',
			VerifyIcon : '.icon_approve, .icon_approve_co',
			DarenIcon : '.icon_club',
			VgirlIcon : '.icon_vlady',
			TaobaoIcon : '.icon_taobao, .icon_tmall',
			ZongyiIcon : '.icon_zongyika2014',
			Double11Icon : '.icon_double11',
			GongyiIcon : '.W_icon[class*="icon_gongyi"]'
		} : {
			Ads : '#plc_main [id^="pl_rightmod_ads"], #Box_right [id^="ads_"], #trustPagelet_zt_hottopicv5 [class*="hot_topicad"], div[ad-data], .WB_feed .popular_buss, #trustPagelet_checkin_lotteryv5',
			Stats : '#pl_rightmod_myinfo .user_atten',
			ToMe : '#pl_leftnav_common a[href^="/direct/tome"]',
			Friends : '#pl_leftnav_group > div[node-type="groupList"] > .level_1_Box, #pl_leftnav_common .level_1_Box > form.left_nav_line',
			InterestUser : '#trustPagelet_recom_interestv5', // 动态右边栏
			Topic : '#trustPagelet_zt_hottopicv5', // 动态右边栏
			Member : '#trustPagelet_recom_memberv5',
			WeiboRecom : '#trustPagelet_recom_weibo', // 动态右边栏
			LocationRecom : '#trustPagelet_recom_location', // 动态右边栏
			MusicRecom : '#trustPagelet_recom_music', // 动态右边栏
			MovieRecom : '#trustPagelet_recom_movie', // 动态右边栏
			BookRecom : '#trustPagelet_recom_book', // 动态右边栏
			Notice : '#pl_rightmod_noticeboard',
			Footer : 'div.global_footer',
			RecommendedTopic : '#pl_content_publisherTop div[node-type="recommendTopic"]',
			App : '#pl_leftnav_app',
			CommentTip : 'div[node-type="feed_privateset_tip"]',
			MemberTip : 'div[node-type="feed_list_shieldKeyword"]',
			TimelineMods : '.B_index .WB_feed .WB_feed_type:not([mid])',
			TopicCard : '.WB_feed_spec[exp-data*="value=1022-topic"]',
			LocationCard : '.WB_feed_spec[exp-data*="value=1022-place"]',
			FollowGuide : '.layer_userguide_brief',
			HomeTip : '#pl_content_hometip',
			IMNews : '.WBIM_news',
			UpgradeV6 : '#v5_pl_rightmod_updatev6',
			TopComment : '#pl_content_commentTopNav',
			RecomFeed : 'div[node-type="feed_list_recommend"]',
			MyRightSidebar : '.B_profile .W_main_c, .B_profile .WB_feed .repeat .input textarea { width: 100% } .B_profile .WB_feed .WB_screen { margin-left: 928px } .B_profile .W_main_2r',
			ProfCover : '.profile_top .pf_head { top: 10px } .profile_top .pf_info { margin-top: 20px } .profile_top .S_bg5 { background-color: transparent !important } .profile_pic_top',
			ProfStats : '.profile_top .user_atten',
			MyMicroworld : '.W_main_c div[id^="Pl_Official_MyMicroworld__"]',
			Relation : '.W_main_2r div[id^="Pl_Core_RightUserGrid__"]',
			Album : '.W_main_2r div[id^="Pl_Core_RightPicMulti__"]',
			ProfHotTopic : '.W_main_2r div[id^="Pl_Core_RightTextSingle__"]',
			ProfHotWeibo : '.W_main_2r div[id^="Pl_Core_RightPicText__"]',
			FeedRecom : '.W_main_2r div[id^="Pl_Third_Inline__"]',
			MemberIcon : '.W_ico16[class*="ico_member"], .ico_member_dis',
			VerifyIcon : '.approve, .approve_co',
			DarenIcon : '.ico_club',
			VgirlIcon : '.ico_vlady',
			TaobaoIcon : '.ico_taobao, .ico_tmall',
			ZongyiIcon : '.zongyika2014',
			Double11Icon : '.ico_double11',
			GongyiIcon : '.W_ico16[class*="ico_gongyi"]'
		};
	// 显示设置链接
	var showSettingsBtn = function (node) {
		if (!$('wbpShowSettings')) {
			if (!node) {
				node = $.select('.WB_global_nav .gn_topmenulist_set[node-type="accountLayer"] > ul');
				if (!node) { return false; }
			}
			var tab = document.createElement('li');
			tab.id = 'wbpShowSettings';
			tab.innerHTML = '<a href="javascript:void(0)" style="color: blue">眼不见心不烦</a>';
			$.click(tab, $dialog);
			node.insertBefore(tab, node.firstChild);
			node.parentNode.style.width = "auto";
		}
		return true;
	};
	// 极简阅读模式（仅在个人首页生效）
	var toggleReaderMode = function () {
		var readerModeStyles = $('wbpReaderModeStyles');
		if ($options.readerModeIndex || $options.readerModeProfile) {
			if (!readerModeStyles) {
				readerModeStyles = document.createElement('style');
				readerModeStyles.type = 'text/css';
				readerModeStyles.id = 'wbpReaderModeStyles';
				document.head.appendChild(readerModeStyles);
			}
			var width = Number($options.readerModeWidth);
			readerModeStyles.innerHTML = '';
			if ($options.readerModeIndex) {
				if ($.V6) {
					readerModeStyles.innerHTML += '.FRAME_main #plc_top, .FRAME_main .WB_main_l, .FRAME_main .WB_main_r, .FRAME_main .WB_main_c>div:not(#v6_pl_content_homefeed), .FRAME_main #v6_pl_content_homefeed .WB_tab_a, .FRAME_main #plc_bot .WB_footer { display: none }\n' +
							'.FRAME_main .WB_frame { background-color: transparent !important; width: ' + width + 'px !important }\n' +
							'.FRAME_main #plc_main, .FRAME_main .WB_main_c { width: 100% !important; margin-right: 0 !important }\n' +
							'.FRAME_main #base_scrollToTop { margin-left: ' + (width/2) + 'px !important }\n';
				} else {
					readerModeStyles.innerHTML += '.B_index .W_main_l, .B_index .W_main_r, .B_index #Box_center>div:not(#pl_content_homeFeed), .B_index .group_read, .B_index .global_footer { display: none }\n' +
							'.B_index #pl_content_top, .B_index .WB_global_nav { top: -40px }\n' +
							'.B_index { background-position-y: -40px }\n' +
							'.B_index .W_miniblog { padding-top: 20px; background-position-y: -40px }\n' +
							'.B_index .W_main { width: ' + width + 'px !important; background: ' + $options.readerModeBackColor + ' }\n' +
							'.B_index #Box_center, .B_index .W_main_a { width: ' + width + 'px }\n' +
							'.B_index .WB_feed .repeat .input textarea { width: 100% }\n' +
							'.B_index .WB_feed .WB_screen { margin-left: ' + (width-48) + 'px }\n' +
							'.B_index .WB_feed .type_text { margin-left: ' + (width-165) + 'px }\n' +
							'.B_index .W_gotop { margin-left: ' + (width/2) + 'px !important }\n';
				}
			}
			if ($options.readerModeProfile) { // 个人主页
				if ($.V6) {
					readerModeStyles.innerHTML += '.FRAME_page.B_page #pl_common_top, .FRAME_page.B_page .WB_frame_a, .FRAME_page.B_page .WB_frame_b, .FRAME_page.B_page .WB_frame_c>div:not([id^="Pl_Official_MyProfileFeed"]):not([id^="Pl_Official_TimeBase"]), .FRAME_main #v6_pl_content_homefeed .WB_tab_a, .FRAME_page.B_page #pl_common_footer>:not(#base_scrollToTop) { display: none }\n' +
							'.FRAME_page.B_page .WB_frame { width: ' + width + 'px !important; padding-top: 0 !important }\n' +
							'.FRAME_page.B_page #plc_main, .FRAME_page.B_page .WB_frame_c { width: 100% !important; margin-right: 0 !important }\n' + 
							'.FRAME_page.B_page .WB_timeline, .FRAME_page.B_page #base_scrollToTop { margin-left: ' + (width/2) + 'px !important }';
				} else {
					readerModeStyles.innerHTML += '.B_profile #Pl_Official_Header__1, .B_profile #Pl_Core_Nav__2, .B_profile .group_read, .B_profile .W_main_2r, .B_profile .group_read, .B_profile .global_footer { display: none }\n' +
							'.B_profile #pl_content_top, .B_profile .WB_global_nav { top: -40px }\n' +
							'.B_profile { background-position-y: -40px }\n' +
							'.B_profile .W_miniblog { padding-top: 20px; background-position-y: -40px }\n' +
							'.B_profile .W_main { width: ' + width + 'px !important; background: ' + $options.readerModeBackColor + ' }\n' +
							'.B_profile .W_main_c { padding-top: 0; width: ' + width + 'px }\n' +
							'.B_profile .WB_feed .repeat .input textarea { width: 100% }\n' +
							'.B_profile .WB_feed .WB_screen { margin-left: ' + (width-48) + 'px }\n' +
							'.B_profile .WB_feed .type_text { margin-left: ' + (width-165) + 'px }\n' +
							'.B_profile .W_gotop { margin-left: ' + (width/2) + 'px !important }\n';
				}
			}
			if (!$options.readerModeTip && (
					($.scope() === 1 && $options.readerModeIndex) ||
					($.scope() === 2 && $options.readerModeProfile))) {
				alert('欢迎进入极简阅读模式！\n\n您可以按【F8】键快速开关本模式，也可以在“眼不见心不烦”插件设置“改造版面”页进行选择。');
				$options.readerModeTip = true;
				$options.save(true);
			}
		} else if (readerModeStyles) {
			$.remove(readerModeStyles);
		}
	};
	// 覆盖当前模板设置
	var overrideSkin = function () {
		var formerStyle = $('custom_style') || $('skin_style') || document.head.querySelector('link:not([id])[href*="/skin/"]'),
			skinCSS = $('wbpOverrideSkin');
		if (!formerStyle) { return; }
		if (($.uid === $.config.oid && $options.overrideMySkin) ||
			($.uid !== $.config.oid && $options.overrideOtherSkin)) {
			if (!skinCSS) {
				skinCSS = document.createElement('link');
				skinCSS.id = 'wbpOverrideSkin';
				skinCSS.type = 'text/css';
				skinCSS.rel = 'stylesheet';
				skinCSS.charset = 'utf-8';
				document.head.insertBefore(skinCSS, formerStyle);
			}
			skinCSS.href = $.config.cssPath + 'skin/' + $options.skinID + '/skin.css?version=' + $.config.version;
			formerStyle.disabled = true;
		} else if (skinCSS) {
			$.remove(skinCSS);
			formerStyle.disabled = false;
		}
	};
	// 2013年6月起右边栏模块不再有固定ID，为其打上ID
	var tagRightbarMods = function (rightBar) {
		if (!rightBar) { return; }
		var identifiers = $.V6 ? {
			'hottopic_r2' : 'Topic',
			'interest_r2' : 'InterestUser',
			'weibo_r2' : 'WeiboRecom',
			'LBS_r2' : 'LocationRecom',
			'song_r2' : 'MusicRecom',
			'mov_r2' : 'MovieRecom',
			'book_r2' : 'BookRecom'
		} : {
			'hottopic_r1' : 'Topic',
			'interest_r1' : 'InterestUser',
			'index_weibo' : 'WeiboRecom',
			'index_LBS' : 'LocationRecom',
			'index_song' : 'MusicRecom',
			'index_mov' : 'MovieRecom',
			'index_book' : 'BookRecom'
		}, mods = rightBar.querySelectorAll($.V6 ? '.WB_cardwrap' : '.WB_right_module');
		for (var i = 0; i < mods.length; ++i) {
			for (var id in identifiers) {
				if (mods[i].querySelector('[change-data*="key=' + id + '"]')) {
					mods[i].id = modules[identifiers[id]].slice(1);
					break;
				}
			}
		}
	};
	// 屏蔽模块
	var hideModules = function () {
		var cssText = '';
		$options.hideMods.forEach(function (module) {
			if (modules[module]) {
				cssText += modules[module] + ' { display: none !important }\n';
			}
		});
		if ($options.hideMods.indexOf('ProfCover') !== -1) { // 屏蔽封面时的特别处理
			cssText += '.profile_top { min-height: ' + ($options.hideMods.indexOf('ProfStats') === -1 ? 250 : 200) + 'px }\n';
		}
		// 屏蔽提示相关CSS
		var tipBackColor = $options.tipBackColor, tipTextColor = $options.tipTextColor;
		cssText += '.wbpTip:not(:hover) { background-color: ' + tipBackColor + '; border-color: ' + tipTextColor + '; color: ' + tipTextColor + '; }';
		// 更新CSS
		var styles = $('wbpModuleStyles');
		if (!styles) {
			styles = document.createElement('style');
			styles.type = 'text/css';
			styles.id = 'wbpModuleStyles';
			document.head.appendChild(styles);
		}
		styles.innerHTML = cssText + '\n';
		// 单独处理“为你推荐”弹窗
		if ($options.hideMods.indexOf('FollowGuide') > -1) {
			// 载入页面时，如果DOM中包含#pl_guide_homeguide > div[node-type="follow_dialog"]则会弹出
			// 如果能抢在pl.guide.homeguide.index()之前去除，可以避免弹窗出现
			$.remove($.select('#pl_guide_homeguide > div[node-type="follow_dialog"]'));
			// 如果弹窗已经显示，则关闭之
			//var closeBtn = $.select('.layer_userguide_brief .W_close');
			//if (closeBtn) { closeBtn.click(); }
			// 模拟点击关闭按钮会导致页面刷新，改为去除弹窗DOM及其下的overlay
			var followGuide = $.select('.layer_userguide_brief');
			if (followGuide) {
				while (!followGuide.classList.contains('W_layer')) { followGuide = followGuide.parentNode; }
				if (followGuide.previousSibling.style.zIndex === followGuide.style.zIndex) {
					$.remove(followGuide.previousSibling); // 覆盖层
				}
				$.remove(followGuide);
			}
		}
	};
	// 禁止默认发布新微博到当前浏览的分组
	var disableDefaultGroupPub = function (node) {
		if (!$options.noDefaultGroupPub) { return; }
		var groupLink = node.querySelector('.limits a[node-type="showPublishTo"]');
		if (groupLink) {
			groupLink.firstChild.innerHTML = '公开';
			groupLink.setAttribute('action-data', 'rank=0');
		}
	};
	// 清除搜索框中的推介话题
	var clearHotSearch = function (node) {
		var searchBar, clearBar = function () { this.value = ' '; };
		if (node) {
			searchBar = node.querySelector('.gn_search>input');
		} else {
			searchBar = $.select('.WB_global_nav .gn_search>input');
			if (!searchBar) { return; }
			searchBar.removeEventListener('blur', clearBar, false);
		}
		if ($options.clearHotSearch) {
			// 尽管DOM2并无明确规定（DOM3草案已有规定），事件监听器在习惯上按照其注册顺序被触发
			searchBar.value = ' ';
			searchBar.addEventListener('blur', clearBar, false);
		}
	};
	// 清除发布框中的默认话题
	var clearDefTopic = function () {
		if ($options.clearDefTopic && $.scope() === 1) {
			var inputBox = $.select(($.V6 ? '#v6_pl_content_publishertop' : '#pl_content_publisherTop') + ' .send_weibo .input textarea');
			if (inputBox && inputBox.hasAttribute('hottopic')) {
				// IFRAME载入方式，hotTopic可能尚未启动，直接清除相关属性即可
				inputBox.removeAttribute('hottopic');
				inputBox.removeAttribute('hottopicid');
				// 在发布框中模拟输入，欺骗STK.common.editor.plugin.hotTopic
				inputBox.value = 'DUMMY';
				inputBox.focus();
				inputBox.value = '';
				inputBox.blur();
			}
		}
	};
	// 将左边栏合并到右边栏
	var leftBar = $.select('.W_main_l'), navBar;
	if (leftBar) { navBar = leftBar.querySelector('.WB_left_nav'); }
	var mergeSidebars = function () {
		// 不要作用于“我关注的人”页面
		if (!navBar || navBar.id === 'pl_leftNav_relation') { return; }
		// 浮动边栏设置
		var navBox = navBar.querySelector('#pl_leftnav_common'), node, next;
		if ($options.floatSetting === 'Nav' && navBox.parentNode.getAttribute('node-type') === 'left_all') {
			navBar.querySelector('[node-type="left_fixed_item"]').insertBefore(navBox, navBar.querySelector('#pl_leftnav_group'));
		} else if ($options.floatSetting !== 'Nav' && navBox.parentNode.getAttribute('node-type') === 'left_fixed_item') {
			navBar.querySelector('[node-type="left_all"]').insertBefore(navBox, navBar.querySelector('[node-type="left_fixed"]'));
		}
		if ((!$options.mergeSidebars || $options.floatSetting === 'None') && navBar.hasAttribute('modsMoved')) {
			// 将右边栏原来的浮动模块移回原位
			node = navBar.parentNode.querySelector('#trustPagelet_indexright_recom [node-type="right_module_fixed"]');
			while ((next = node.parentNode.firstChild) !== node) {
				node.appendChild(next);
			}
			// 将原属于右边栏的模块移出
			next = navBar.querySelector('#pl_leftnav_app').nextSibling;
			while (node = next) {
				next = node.nextSibling;
				navBar.parentNode.appendChild(node); // 移动回原位置
			}
			navBar.removeAttribute('modsMoved');
		}
		// 合并边栏
		if ($options.mergeSidebars) {
			if (!navBar.id) {
				var rightBar = $.select('.W_main_r'), myInfo = $('pl_rightmod_myinfo');
				if (!rightBar) { return; }
				leftBar.style.display = 'none';
				navBar.id = 'wbpNavBar';
				// 注意：Firefox不支持background-position-x
				$.select('.W_main').style.cssText = 'width: 830px; background-position: -150px 0';
				// 左边栏移动到右边栏
				rightBar.insertBefore(navBar, myInfo ? myInfo.nextSibling : rightBar.firstChild);
			}
			// 移动右边栏模块的操作需在完成合并边栏后进行
			if ($options.floatSetting !== 'None' && !navBar.hasAttribute('modsMoved')) {
				node = navBar.querySelector('[node-type="left_all"]');
				while (next = navBar.nextSibling) {
					node.appendChild(next);
				}
				navBar.setAttribute('modsMoved', '');
				// 如果左边栏有浮动模块，则禁止右边栏浮动
				node = navBar.querySelector('#trustPagelet_indexright_recom [node-type="right_module_fixed"]');
				if (node) { // 此时浮动模块可能尚未载入，交由DOMNodeInserted事件处理
					while (next = node.firstChild) {
						node.parentNode.insertBefore(next, node);
					}
				}
			}
		} else if (navBar.id) {
			navBar.id = '';
			leftBar.style.display = 'none';
			$.select('.W_main').style.cssText = '';
			// 移动回原位置
			leftBar.appendChild(navBar);
			leftBar.style.display = '';
		}
	};
	// V6版首页没有消息导航条，人工创建一个
	var addMessageNav = function () {
		// V5版用CSS解决，见customStyles()
		if ($.V6 && $.scope() === 1) {
				var currMsgNav = $.select('#v6_pl_leftnav_group>.WB_left_nav[node-type="groupList"]>.lev_Box:first-of-type>h3.lev:nth-of-type(2)');
				if (!currMsgNav) { return; }
				var msgNavBox = currMsgNav.parentNode.querySelector('.wbpMessageNav');
				if ($options.showAllMsgNav) {
					if (!msgNavBox) {
						msgNavBox = document.createElement('div');
						msgNavBox.className = 'wbpMessageNav';
						msgNavBox.innerHTML = '<div class="lev"><a href="/at/weibo?leftnav=1&amp;wvr=6" class="S_txt1"><span class="ico_block"><em class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">@我的</span></a></div>\n' +
							'<div class="lev"><a href="/comment/inbox?leftnav=1&amp;wvr=6" class="S_txt1"><span class="ico_block"><em class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">评论</span></a></div>\n' + 
							'<div class="lev"><a href="/messages?leftnav=1&amp;wvr=6" class="S_txt1"><span class="ico_block"><em class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">私信</span></a></div>\n' + 
							'<div class="lev"><a href="/notesboard?leftnav=1&amp;wvr=6" class="S_txt1"><span class="ico_block"><em class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">未关注人私信</span></a></div>\n';
						currMsgNav.parentNode.appendChild(msgNavBox);
					}
					currMsgNav.style.display = 'none';
					msgNavBox.style.display = '';
				} else if (!$options.showAllMsgNav && msgNavBox) {
					currMsgNav.style.display = '';
					msgNavBox.style.display = 'none';
				}
		}
	};
	// 首次进入用户主页时直接跳转到微博列表
	var redirectToFeeds = (function () {
		var required, link;
		return function (node, req) {
			if (arguments.length === 2 && required === undefined) { required = req; }
			if (required === false) { return; }
			if (!link) { link = node.querySelector('.PRF_tab_noicon li.pftb_itm>a[href*="/weibo?"]'); }
			if (required && link) { link.click(); required = false; }
		};
	})();
	// 用户自定义样式及程序附加样式
	var customStyles = function () {
		var cssText = $.V6 ? '' : ('.W_person_info { margin: 0 20px 20px !important }\n' + 
			'.layer_personcard .name_card_new .cover .btn_item { margin-right: 7px !important } ' +
			'.layer_personcard .name_card_new .cover .btn_item span { padding: 0 5px !important }\n'),
			styles = $('wbpCustomStyles');
		if (!styles) {
			styles = document.createElement('style');
			styles.type = 'text/css';
			styles.id = 'wbpCustomStyles';
			document.head.appendChild(styles);
		}
		if ($.V6 && $options.squareAvatar) {
			cssText += '.W_face_radius { border-radius: 0 !important }\n';
		}
		if ($.V6 && $options.compactFeedToolbar) {
			cssText += '.WB_feed_handle { margin-top: -35px } .WB_feed_handle>.WB_handle { margin-right: 6px } .WB_feed_handle>.WB_handle>ul { border-top: none; text-align: right; margin-right: -1px } .WB_feed_handle>.WB_handle>ul>li { width: auto; display: inline-block; float: none } .WB_feed_handle>.WB_handle>ul>li .line { margin-left: 10px; padding-right: 10px; border-left: none; border-right: 1px solid; line-height: normal; height: auto } .WB_feed_handle>.WB_handle>ul>li .line>[node-type="like_status"]>.W_icon { margin-top: 0 }\n';
		}
		if ($options.showAllGroups) {
			if ($.V6) {
				cssText += '#v6_pl_leftnav_group div[node-type="moreList"] { display: block !important } #v6_pl_leftnav_group .levmore { display: none }\n';
			} else {
				cssText += '#pl_leftnav_group div[node-type="moreList"] { display: block !important } #pl_leftnav_group > div[node-type="groupList"] > .level_2_Box > .levmore { display: none }\n';
			}
		}
		if (!$.V6 && $options.showAllMsgNav) {
			cssText += '#pl_leftnav_common > .level_1_Box > .lev2_new { display: block !important }\n';
		}
		if ($.V6 && $options.showAllSonFeeds) {
			cssText += '.WB_feed_together [node-type="feed_list_wrapForward"] { display: block !important }.WB_feed_together>a[action-type="feed_list_seeAll"], .WB_feed_together>a[action-type="feed_list_foldForward"] { display: none }\n';
		}
		if ($options.unwrapText) {
			cssText += '.WB_info, .WB_text { display: inline } .WB_info+.WB_text:before { content: ": " } ';
			if ($.V6) {
				cssText += '.WB_screen .screen_box .W_ficon { width: 16px !important } .WB_screen .screen_box { margin-left: -6px !important }\n';
			} else {
				cssText += '.WB_func { margin-top: 5px } .B_index .WB_feed .W_ico16 { vertical-align: -3px !important }\n';
			}
		}
		if (!$.V6 && $options.mergeSidebars) {
			cssText += 'body:not(.S_profile) .W_gotop { margin-left: 415px } body:not(.S_profile) .WB_left_nav .FIXED { width: 230px !important } \n';
		}
		if (!$.V6 && $options.floatSetting === 'None') {
			cssText += 'body:not(.S_profile) .WB_left_nav [node-type="left_fixed"] { position: static !important; height: auto !important }\n';
		}
		if ($.V6 && $options.noHomeRightBar) {
			cssText += '.FRAME_main .WB_frame .WB_main_r { display: none }\n';
		}
		if ($.V6 && $options.noHomeMargins) {
			cssText += '.FRAME_main .send_weibo, .FRAME_main .WB_tab_a, .FRAME_main .WB_notes, .FRAME_main .WB_cardwrap { margin-bottom: 0; border-radius: 0 } .FRAME_main #home_new_feed_tip { margin-top: 0; padding-top: 0 } .FRAME_main .WB_main_c, .FRAME_main .WB_main_r { margin-right: 0 } .FRAME_main .WB_tab_a .tab li:nth-child(2) .b .b1 em.l i, .FRAME_main .WB_tab_a .tab li:nth-child(2) .t, .FRAME_main .WB_tab_a .tab_box .fr_box { border-radius: 0 } \n';
		}
		if ($.V6 && ($options.noHomeRightBar || $options.noHomeMargins)) {
			// 右栏宽度230+10；卡片间隙宽度10+10
			var reducedWidth = 10 + 230*$options.noHomeRightBar + 10*$options.noHomeMargins;
			cssText += '.FRAME_main .WB_frame { width: ' + (1000 - reducedWidth) + 'px } .FRAME_main .WB_frame #plc_main { width: ' + (850 - reducedWidth) + 'px } .FRAME_main .W_gotop { margin-left: ' + (1000 - reducedWidth)/2 + 'px }\n';
		}
		if ($options.overrideMyBack) {
			if ($.V6) {
				cssText += '.FRAME_main .S_bg1, .FRAME_main .S_bg2 { background-color: ' + $options.backColor + ' } .FRAME_main .WB_feed_handle .WB_row_line { border-top: none }\n';
			} else {
				cssText += 'body:not(.S_profile) .W_main { background: none ' + $options.backColor + ' !important } body:not(.S_profile) .S_bg4, body:not(.S_profile) .W_main_a, body:not(.S_profile) .W_main_bg { background: none transparent !important }\n';
			}
		}
		if ($options.overrideOtherBack) {
			if ($.V6) {
				cssText += '.FRAME_page .S_bg1, .FRAME_page .S_bg2 { background-color: ' + $options.backColor + ' } .FRAME_page .WB_feed_handle .WB_row_line { border-top: none }\n';
			} else {
				cssText += '.S_profile .W_profile_bg, .S_profile .S_bg5 { background-color: ' + $options.backColor + ' } .S_profile .S_bg4:not(.W_profile_bg) { background: none transparent !important }\n';
			}
		}
		if ($options.useCustomStyles) {
			cssText += $options.customStyles;
		}
		styles.innerHTML = cssText + '\n';
	};
	// 在用户信息气球或用户主页上添加屏蔽链接
	var showUserFilterBtn = function (node) {
		if (!node) { node = document.body; }
		var balloon = ($.V6 ? (node.classList.contains('layer_personcard') || node.querySelector('.layer_personcard')) : node.classList.contains('name_card_new')), userData, toolbar, uid;
		if (balloon) {
			// 获得关注链接
			userData = node.querySelector('.name a[uid]');
			if (!userData) { return false; }
			uid = userData.getAttribute('uid');
			toolbar = node.querySelector($.V6 ? '.c_btnbox' : '.action');
		} else if ($.scope() === 2) {
			if (userData = $('wbpUserFilter')) {
				// 按钮已存在时只更新状态
				userData.update();
				return false;
			}
			uid = $.oid;
			toolbar = node.querySelector($.V6 ? '.pf_opt .opt_box' : '.pf_info .pf_do');
		}
		if (!toolbar || uid === $.uid) { return false; }
		// 创建分隔符
		var button = document.createElement('div');
		if (balloon) {
			if ($.V6) {
				button.style.display = 'inline-block';
			} else {
				button.className = 'btn_item';
			}
		} else {
			button.id = 'wbpUserFilter';
			button.className = 'btn_bed W_fl';
		}
		// 创建操作链接
		var link = document.createElement('a');
		button.appendChild(link);
		link.href = 'javascript:void(0)';
		(button.update = function () {
			link.className = ($.V6 && !balloon) ? 'W_btn_d btn_34px' : 'W_btn_b';
			if ($options.userBlacklist.indexOf(uid) === -1) {
				link.innerHTML = '<span>屏蔽</span>';
			} else {
				link.innerHTML = $.V6 ? '<span><em class="W_ficon ficon_right">Y</em>已屏蔽</span>' : '<span><em class="W_ico12 icon_addone"></em>已屏蔽</span>';	
			}
		})();
		$.click(link, function () {
			// 切换屏蔽状态
			var i = $options.userBlacklist.indexOf(uid);
			if (i === -1) {
				$options.userBlacklist.push(uid);
			} else {
				$options.userBlacklist.splice(i, 1);
			}
			$options.save();
			$filter();
			if (balloon) {
				// 回溯到顶层，关闭信息气球
				while (!node.classList.contains('W_layer')) {
					node = node.parentNode;
				}
				$.remove(node);
				//node.style.display = 'none';
			}
			if (i = $('wbpUserFilter')) { i.update(); }
		});
		toolbar.insertBefore(button, toolbar.querySelector('div+div'));
	};
	// 根据当前设置修改页面
	var apply = function (init) {
		// 极简阅读模式
		toggleReaderMode();
		// 设置链接
		showSettingsBtn();
		// 屏蔽用户按钮
		showUserFilterBtn();
		// 屏蔽版面模块
		hideModules();
		// 清除搜索框中的推介话题
		clearHotSearch();
		// 清除发布框中的默认话题
		clearDefTopic();
		if ($.V6) {
			// 人工添加首页消息导航栏
			addMessageNav();
		} else {
			// 合并边栏
			mergeSidebars();
		}
		// 覆盖当前模板设置
		overrideSkin();
		// 应用自定义CSS
		customStyles();
		// 禁止默认发布新微博到当前浏览的分组
		disableDefaultGroupPub(document);
		// 首次进入用户主页时直接跳转到微博列表
		if (!$.V6 && init) {
			redirectToFeeds(document, $.scope() === 2 && $.config.location.substr(-5) === '_home' && $options.directFeeds);
		}
	};

	// IFRAME载入不会影响head中的CSS，只添加一次即可
	var myStyles = document.createElement('style');
	myStyles.type = 'text/css';
	myStyles.id = 'wbpDialogStyles';
	myStyles.innerHTML = '.wbpV5 .wbpV6Only,.wbpV6 .wbpV5Only{display:none}.wbpTip{border:1px solid;display:block;line-height:23px;text-align:center}.wbpTip:hover{background-color:#D0FFD0;border-color:#40D040;color:#40D040;margin-bottom:10px}.wbpTip:not(:hover)~:not(.wbpTipLine){display:none !important}.wbpTip:hover~*{opacity:0.5}.wbpTip:hover+.wbpTipLine{display:none}.wbpTipLine{padding-bottom:20px;border-bottom-style:solid;border-bottom-width:1px}#wbpNavBar{margin-bottom:20px}#wbpNavBar .lev a,#wbpNavBar .lev2 a,#wbpNavBar .levmenu,#wbpNavBar .levmenu .lm_li:hover{background-image:none}#wbpNavBar .lev a.lev_curr{background-color:transparent}#wbpNavBar .left_nav_line fieldset .btns{margin-left:148px}#wbpNavBar .WB_left_nav .lev_edit .lev a{width:200px}.wbpSettings p{line-height:150%}.wbpSettings p+p{margin-top:10px}.wbpSettings .W_vline{margin:0 8px}.wbpSettings.wbpV5 .W_vline{border-left-width:1px;border-left-style:solid;display:inline}.wbpSettings table{line-height:30px;margin-top:8px}.wbpSettings span.link{position:relative}.wbpSettings span.link a>span{display:none}.wbpSettings span.link a>span li{list-style:circle inside;padding-left:1em;text-indent:-1em}.wbpSettings span.link a>span li+li{margin-top:5px}.wbpSettings span.link a>span p+p{margin-top:10px}.wbpSettings span.link a:hover>span{display:block;position:absolute;margin-top:10px;margin-left:-100px;width:250px;padding:5px;z-index:20000;background:#FFFFB0;color:black;border:1px solid #808000;text-align:left;text-decoration:none;border-radius:3px 3px;box-shadow:3px 3px 3px rgba(0,0,0,0.2)}.wbpTabHeaders{float:left;width:100px;margin-right:10px}.wbpTabHeaders a{display:block;padding:6px 0;text-align:center;text-decoration:none}.wbpTabHeaders a:hover{background-color:#C6E8F4}.wbpTabHeaders a.current{background-color:#79C5E9;color:white;cursor:default}.wbpInput{border:1px solid #D2D5D8;padding:0 2px}.wbpInlineInput{display:inline-block;width:30px;margin:0 3px;vertical-align:middle}.wbpInput input{width:100%;height:22px;border:0;padding:0;margin:0;display:block}.wbpSettings>div{margin-top:15px}.wbpSettings textarea{width:440px;margin-top:10px;border:1px solid #D2D5D8}.wbpSettings input[type="checkbox"],.wbpSettings input[type="radio"]{vertical-align:middle;margin-right:5px}.wbpTabModules tr.wbpRowSpacing td{padding-top:10px}.wbpV5 .wbpTabModules a>.W_ico16,.wbpV6 .wbpTabModules a>.W_icon{display:inline-block !important}.wbpKeywordBlock{margin-top:10px;border:1px solid #D2D5D8;padding:8px 8px 0}.wbpKeywordBlock em{font-weight:bold;margin-right:15px}.wbpV5 .wbpToolBtns{width:105px;text-align:right}.wbpV6 .wbpToolBtns{width:135px;text-align:right}.wbpToolBtns a+a{margin-left:5px}.wbpListWrapper{margin:8px 0;max-height:120px;overflow:hidden}.wbpListWrapper:hover{overflow-y:auto}.wbpKeywordsList{margin-top:-5px;line-height:18px}.wbpKeywordsList a{margin:5px 5px 0 0;padding:0 4px;border:1px solid;display:inline-block;height:18px;white-space:nowrap}.wbpKeywordsList a:hover{text-decoration:none}.wbpWhiteKeywordsList a{border-color:#008000;color:#008000}.wbpWhiteKeywordsList a.regex{background-color:#80FF80}.wbpWhiteKeywordsList a:hover{border-color:#008000;background-color:#D0FFD0}.wbpBlackKeywordsList a{border-color:#D00000;color:#D00000}.wbpBlackKeywordsList a.regex{background-color:#FFB0B0}.wbpBlackKeywordsList a:hover{border-color:#FF0000;background-color:#FFD0D0}.wbpGrayKeywordsList a{border-color:#808000;color:#808000}.wbpGrayKeywordsList a.regex{background-color:#FFFF00}.wbpGrayKeywordsList a:hover{border-color:#808000;background-color:#FFFFB0}.wbpUserList>a{margin:5px 5px 0 0;padding:3px;border:1px solid;display:inline-block;cursor:pointer;text-align:center;text-decoration:none}';
	document.head.appendChild(myStyles);
	// 为右边栏动态模块打屏蔽标记
	tagRightbarMods($($.V6 ? 'v6_pl_rightmod_recominfo' : 'trustPagelet_indexright_recom'));
	// 处理动态载入内容
	document.addEventListener('DOMNodeInserted', function (event) {
		var scope = $.scope(), node = event.target;
		//if (node.tagName !== 'SCRIPT') { console.log(node); }
		if (scope && node.tagName === 'UL' && node.parentNode.getAttribute('node-type') === 'accountLayer') {
			// 重新载入设置按钮
			showSettingsBtn(node);
		}
		if (node.tagName !== 'DIV') { return; }
		if (($.V6 && (node.classList.contains('layer_personcard') || node.querySelector('.layer_personcard'))) || 
			(!$.V6 && (node.classList.contains('name_card_new') || node.classList.contains('PRF_profile_header')))) {
			// 在用户信息气球或个人主页信息栏中显示屏蔽按钮
			showUserFilterBtn(node);
		} else if ($.V6 && node.classList.contains('WB_left_nav')) {
			// V6版需要人工添加消息导航栏
			addMessageNav();
		} else if (!$.V6 && node.classList.contains('W_main_r') || node.querySelector('.W_main_r')) {
			// 合并边栏
			mergeSidebars();
		} else if (!$.V6 && node.getAttribute('node-type') === 'follow_dialog' && $options.hideMods.indexOf('FollowGuide') > -1) {
			// 动态载入的div[node-type="follow_dialog"]会使后续运行的pl.guide.homeguide.index显示“为你推荐”弹窗
			$.remove(node);
		} else if (!$.V6 && node.querySelector('.commoned_list') && $options.noDefaultFwd) {
			// 禁止评论时默认选中“同时转发”
			var fwdCheckbox = node.querySelector('.commoned_list .W_checkbox[name="forward"]');
			if (fwdCheckbox && fwdCheckbox.checked) {
				fwdCheckbox.checked = false;
			}
		} else if (!$.V6 && node.classList.contains('feed_repeat') && $options.noDefaultCmt) {
			// 禁止转发时默认选中“同时评论”
			var runs = 0,
				cmtFwdCheckbox = node.parentNode.parentNode.querySelector('.W_checkbox[node-type="forwardInput"]'),
				cmtOrgCheckbox = node.parentNode.parentNode.querySelector('.W_checkbox[node-type="originInput"]');
			// 如果满足指定条件（uid倒数第二位是8或9），在转发窗口“当前已转发”微博列表
			// 成功载入后会自动选中“同时评论”，此处采用短时间延时器将其取消选中
			(function waitForUncheck() {
				if (cmtFwdCheckbox && cmtFwdCheckbox.checked) {
					cmtFwdCheckbox.checked = false;
				} else if (cmtOrgCheckbox && cmtOrgCheckbox.checked) {
					cmtOrgCheckbox.checked = false;
				} else if (++runs < 10) { // 最多等待10ms*10=0.1s
					setTimeout(waitForUncheck, 10);
				}
			})();
		} else if (node.classList.contains('send_weibo')) {
			// 禁止默认发布新微博到当前浏览的分组
			disableDefaultGroupPub(node);
			// 清除发布框中的默认话题
			clearDefTopic();
		} else if (node.classList.contains('WB_global_nav')) {
			// 清除搜索框中的推介话题
			clearHotSearch(node);
		} else if (!$.V6 && node.classList.contains('PRF_tab_noicon')) {
			// 首次进入用户主页时直接跳转到微博列表
			redirectToFeeds(node);
		} else if (!$.V6 && node.hasAttribute('ucardconf') && node.parentNode.id === 'trustPagelet_indexright_recom') {
			// 微博新首页右边栏模块处理
			tagRightbarMods(node.parentNode);
			if ($options.mergeSidebars && $options.floatSetting !== 'None') {
				// 如果左边栏有浮动模块，则禁止右边栏浮动
				var fixed = node.querySelector('[node-type="right_module_fixed"]'), next;
				while (next = fixed.firstChild) {
					node.insertBefore(next, fixed.parentNode.firstChild);
				}
			}
		} else if ($.V6 && node.classList.contains('WB_cardwrap')) {
			// 微博新首页右边栏模块处理
			tagRightbarMods(node.parentNode);
		}
	}, false);
	document.addEventListener('DOMNodeRemoved', function (event) {
		if (!navBar || !navBar.id) { return; }
		var node = event.target;
		if (node.tagName === 'DIV' && node.querySelector('#wbpNavBar')) {
			if (navBar.hasAttribute('modsMoved')) {
				// 将原属于右边栏的模块移出，注意node变量此处被重用
				var next = navBar.querySelector('#pl_leftnav_app').nextSibling;
				while (node = next) {
					next = node.nextSibling;
					navBar.parentNode.appendChild(node); // 移动回原位置
				}
				navBar.removeAttribute('modsMoved');
				// 右边栏即将被移除，无需将浮动模块移动回原位置
			}
			// 原左边栏所属模块即将随着右边栏被移除，需要将其暂时移动回左边栏（必须在DOM中时刻保持一个副本）
			navBar.id = '';
			leftBar.appendChild(navBar);
		}
	});
	// 检测按键，开关极简阅读模式
	document.addEventListener('keyup', function onKeyPress(event) {
		if ($dialog.shown()) { return; }
		var scope = $.scope();
		if (scope && event.keyCode === 119) {
			if (scope === 1) {
				$options.readerModeIndex = !$options.readerModeIndex;
			} else {
				$options.readerModeProfile = !$options.readerModeProfile;
			}
			$options.save();
			toggleReaderMode();
		}
	}, false);

	apply.modules = modules;
	return apply;
})();

// 先读取本地设置
$.get($.uid.toString(), undefined, function (options) {
	var init = function () {
		// 如果第一次运行时就在作用范围内，则直接屏蔽关键词（此时页面已载入完成）；
		// 否则交由$filter中注册的DOMNodeInserted事件处理
		if ($.scope()) { $filter(); }
		// 直接应用页面设置（此时页面已载入完成）
		// 与IFRAME相关的处理由$page中注册的DOMNodeInserted事件完成
		$page(true);
	};
	if (!$options.load(options)) {
		console.warn('“眼不见心不烦”设置读取失败！\n设置信息格式有问题。');
	} else if (options && $options.version < $.version) {
		$options.save(true); // 更新版本信息
		if ($options.updateNotify) {
			alert('您已更新到“眼不见心不烦”v2.1：\n\n- ' + '（V6）可以去除首页右边栏；（V6）可在首页使用紧凑版式（去除卡片间空隙）；（V6）可以恢复紧凑型（V5样式）微博工具栏；（V5->V6）可在首页与个人主页使用透明背景色；可以忽略用户名中的关键词；（V6）可以恢复方形头像；（V6）可以展开所有子微博（“还有?条对原微博的转发”）；（V6）修正不能屏蔽子微博的问题；（V6）修正清除“大家正在热搜”失效的问题'.split('；').join('\n- '));
		}
	}
	init();
});
});