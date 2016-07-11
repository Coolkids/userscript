// ==UserScript==
// @name        网盘密码填写
// @namespace   http://jixun.org/
// @description 自动填写提取密码，失败不重试。
// @include     http://pan.baidu.com/share/init?*
// @include     http://yun.baidu.com/share/init?*
// @include     http://www.kuaipan.cn/file/id_*
// @include     http://*.yunpan.cn/lk/*
// @include     https://*.yunpan.cn/lk/*
// @include     http://vdisk.weibo.com/lc/*
// @include     http://pan.suning.com/cloud-web/share/link.*
// @version     1.0.2.2
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

unsafeWindow.eve = Event;

(function ($) {
	var site = {
		'yunpan.cn': {
			chk:  /^[a-z0-9]{4}$/i,
			code: '.pwd-input',
			btn:  '.submit-btn'
		},
		'baidu.com': {
			chk:  /^[a-z0-9]{4}$/i,
			code: '#accessCode',
			btn:  '#submitBtn'
		},
		'kuaipan.cn': {
			chk:  /^[a-z0-9]{6}$/i,
			code: '#pwdContaier .txt',
			btn:  '#btnOK',
			preSubmit: function (codeBox, okBtn) {
				$('#pwdContaier .bold').textContent = '请手动单击确认按钮然后刷新页面';
			}
		},
		'weibo.com': {
			chk:  /^[a-z0-9]{4}$/i,
			code: '#keypass',
			btn:  '.search_btn_wrap > a',
			preSubmit: function (codeBox, okBtn) {
				var $wt = $('.wrong_tips');
				if ($wt) {
					$wt.textContent += '；已禁用自动输入。';
					return true;
				}
				unsafeWindow.validate();
			}
		},
		'suning.com': {
			chk:  /^[a-z0-9]{4}$/i,
			code: '#shareform .code',
			btn:  'body',
			preSubmit: function (codeBox, okBtn, sCode) {
				if (location.search.indexOf('extractCode') == -1) {
					location.search += '&extractCode=' + sCode;
				}
				return true;
			}
		}
	};

	addEventListener ('DOMContentLoaded', function () {
		// 抓取提取码
		var sCode = location.hash.slice(1).trim(),
			hostName = location.host.match(/\w+\.\w+$/)[0].toLowerCase();

		var conf = site[hostName];

		// 检查是否为合法格式
		if (!conf || !conf.chk.test(sCode))
			// 没有 Key 或格式不对
			return ;

		// 调试用
		console.log ('抓取到的提取码: %s', sCode);

		// 加个小延时
		setTimeout (function () {
			// 键入提取码并单击「提交」按钮，报错不用理。
			var codeBox = $(conf.code),
				btnOk = $(conf.btn);
			
			if (codeBox) codeBox.value = sCode;

			if (conf.preSubmit)
				if (conf.preSubmit (codeBox, btnOk, sCode))
					return ;

			if (btnOk) btnOk.click();
		}, 10);
	}, false);
})(function ($) {
	return document.querySelector ($);
});