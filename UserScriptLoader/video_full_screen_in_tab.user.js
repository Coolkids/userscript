// ==UserScript==
// @name        Video Full Screen In Tab
// @namespace   http://www.icycat.com
// @description 让所有视频网页全屏 Maximize all video players
// @author      冻猫
// @include     *
// @version     5.3
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function() {

	var fullStatus = false,
		isIframe = false,
		isRbtn = true,
		parentArray = new Array(),
		backStyle = new Object(),
		mouse = {
			leave: 'listener',
			over: 'listener'
		},
		browser, btnText, player, playerParent;

	//flash游戏页面，不在flash上显示还原按钮
	var excludeRbtnRules = {
		'dmm': 'www.dmm.com',
		'4399': 'www.4399.com',
		'3366': 'www.3366.com',
		'17173flash': 'flash.17173.com',
		'7k7k': 'www.7k7k.com'
	}

	for (var i in excludeRbtnRules) {
		if (document.location.href.match(excludeRbtnRules[i])) {
			isRbtn = false;
		}
	}

	if (window.top !== window.self) {
		isIframe = true;
	}

	if (navigator.language.toLocaleLowerCase() == 'zh-cn') {
		btnText = {
			out: '网页全屏',
			inner: '内层全屏',
			restore: '还原大小'
		};
	} else {
		btnText = {
			out: 'Maximize',
			inner: 'Maximize',
			restore: 'Restore'
		};
	}

	if (navigator.userAgent.match(/Firefox/i)) {
		browser = 'firefox';
	} else if (navigator.userAgent.match(/Chrome/i)) {
		browser = 'chrome';
	} else {
		browser = 'other';
	}

	var createButton = function(id) {
		btn = document.createElement('tbdiv');
		btn.id = id;
		btn.onclick = function() {
			maximize.playerControl();
		};
		document.body.appendChild(btn);
		return btn;
	}

	var setButton = {
		init: function() {
			if (tool.isFullClient(player)) {
				return;
			}
			this.show();
		},
		show: function() {
			try {
				player.addEventListener('mouseleave', handle.leavePlayer, false);
				if (!fullStatus) {
					document.addEventListener('scroll', handle.scrollFix, false);
				}
			} catch (e) {
				mouse.leave = player.onmouseleave;
				player.onmouseleave = function() {
					handle.leavePlayer();
					player.onmouseleave = mouse.leave;
				};
			}
			controlBtn.style.display = 'block';
			controlBtn.style.visibility = 'visible';
			this.locate();
		},
		locate: function() {
			var playerRect = tool.getRect(player);
			if (playerRect.pageY < 20 || fullStatus) {
				if (fullStatus) {
					playerRect.screenY = playerRect.screenY + 50;
					playerRect.screenX = playerRect.screenX - 30;
					controlBtn.innerHTML = btnText.restore;
				} else {
					playerRect.screenY = playerRect.screenY + 20;
					playerRect.screenX = playerRect.screenX + 64;
					controlBtn.classList.add('playerControlBtnCol');
					if (isIframe) {
						controlBtn.innerHTML = btnText.inner;
					} else {
						controlBtn.innerHTML = btnText.out;
					}
				}
				if (browser == 'firefox' && fullStatus) {
					controlBtn.style.opacity = '1';
				} else {
					controlBtn.style.opacity = '0.5';
				}
			} else {
				controlBtn.classList.remove('playerControlBtnCol');
				controlBtn.style.opacity = '0.5';
				controlBtn.innerHTML = btnText.out;
			}
			controlBtn.style.top = playerRect.screenY - 20 + 'px';
			controlBtn.style.left = playerRect.screenX - 64 + player.offsetWidth + 'px';
		}
	};

	var tool = {
		getRect: function(element) {
			var rect = element.getBoundingClientRect();
			var scroll = tool.getScroll();
			return {
				pageX: rect.left + scroll.left,
				pageY: rect.top + scroll.top,
				screenX: rect.left,
				screenY: rect.top
			};
		},
		isFullClient: function(element) {
			var client = tool.getClient();
			var rect = tool.getRect(element);
			if (Math.abs(client.width - element.offsetWidth) < 21 && Math.abs(client.height - element.offsetHeight) < 21 & rect.screenY < 10 & rect.screenX < 20) {
				return true;
			} else {
				return false;
			}
		},
		getScroll: function() {
			return {
				left: document.documentElement.scrollLeft || document.body.scrollLeft,
				top: document.documentElement.scrollTop || document.body.scrollTop
			};
		},
		getClient: function() {
			return {
				width: document.compatMode == 'CSS1Compat' ? document.documentElement.clientWidth : document.body.clientWidth,
				height: document.compatMode == 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight
			};
		},
		addStyle: function(css) {
			var style = document.createElement('style');
			style.type = 'text/css';
			var node = document.createTextNode(css);
			style.appendChild(node);
			document.head.appendChild(style);
			return style;
		}
	};

	var handle = {
		getPlayer: function(e) {
			if (fullStatus) {
				return;
			}
			var target = e.target;
			var nodeName = target.nodeName;
			switch (nodeName) {
				case 'OBJECT':
				case 'EMBED':
				case 'IFRAME':
				case 'VIDEO':
					if (target.offsetWidth > 99 && target.offsetHeight > 99) {
						player = target;
						playerParent = player.parentNode.nodeName == 'OBJECT' ? player.parentNode.parentNode : player.parentNode;
						setButton.init();
					}
					break;
				default:
					handle.leavePlayer();
			}
		},
		leavePlayer: function() {
			if (controlBtn.style.visibility == 'visible') {
				controlBtn.style.opacity = '';
				controlBtn.style.visibility = '';
				player.removeEventListener('mouseleave', handle.leavePlayer, false);
				document.removeEventListener('scroll', handle.scrollFix, false);
			}
		},
		scrollFix: function() {
			setButton.locate();
		},
		restoreButton: function() {
			switch (browser) {
				case 'chrome':
					if (window.outerWidth < window.screen.width) {
						setButton.show();
					}
					break;
				case 'firefox':
					if (window.innerWidth < window.screen.width) {
						setButton.show();
					}
					break;
			}
		}
	};

	var maximize = {
		playerControl: function() {
			this.checkPlayer();
			if (!fullStatus) {
				this.fullWin();
			} else {
				this.smallWin();
			}
		},
		checkPlayer: function() {
			parentArray = [];
			var full = player;
			while (full = full.parentNode) {
				if (full.nodeName == 'BODY') {
					break;
				}
				if (full.getAttribute) {
					parentArray.push(full);
				}
			}
		},
		fullWin: function() {
			if (!fullStatus) {
				document.removeEventListener('mouseover', handle.getPlayer, false);
				if (isRbtn) {
					try {
						player.addEventListener('mouseover', handle.restoreButton, false);
					} catch (e) {
						mouse.over = player.onmouseover;
						player.onmouseover = handle.restoreButton;
					}
				}
				backStyle = {
					htmlId: document.body.parentNode.id,
					bodyId: document.body.id
				};
				document.body.parentNode.id = 'htmlToothbrush';
				document.body.id = 'bodyToothbrush';
				leftBtn.style.display = 'block';
				rightBtn.style.display = 'block';
				controlBtn.style.display = '';
				if (player.nodeName == 'VIDEO') {
					backStyle.controls = player.controls;
					player.controls = true;
				}
				for (var i = 0; i < parentArray.length; i++) {
					parentArray[i].classList.add('parentToothbrush');
					if (getComputedStyle(parentArray[i]).position == 'fixed') {
						parentArray[i].classList.add('absoluteToothbrush');
					}
				}
				if (browser == 'firefox' || player.nodeName == 'VIDEO' || player.nodeName == 'IFRAME' || getComputedStyle(player).position == 'fixed' || getComputedStyle(player).position == 'absolute') {
					player.classList.add('playerFixedToothbrush');
				} else {
					playerParent.classList.add('playerParentToothbrush');
					player.classList.add('playerRelativeToothbrush');
					if (player.offsetTop > 0){
						player.style.setProperty('top', (0-player.offsetTop)+'px', 'important');
					}
					if (player.offsetLeft > 1){
						player.style.setProperty('left', (1-player.offsetLeft)+'px', 'important');
					}
				}
			}
			fullStatus = true;
		},
		smallWin: function() {
			if (isRbtn) {
				player.removeEventListener('mouseover', handle.restoreButton, false);
				if (mouse.over != 'listener') {
					player.onmouseover = mouse.over;
				}
			}
			document.body.parentNode.id = backStyle.htmlId;
			document.body.id = backStyle.bodyId;
			for (var i = 0; i < parentArray.length; i++) {
				parentArray[i].classList.remove('parentToothbrush');
				parentArray[i].classList.remove('absoluteToothbrush');
			}
			player.classList.remove('playerFixedToothbrush');
			playerParent.classList.remove('playerParentToothbrush');
			player.classList.remove('playerRelativeToothbrush');
			player.style.removeProperty('top');
			player.style.removeProperty('left');
			if (player.nodeName == 'VIDEO') {
				player.controls = backStyle.controls;
			}
			leftBtn.style.display = '';
			rightBtn.style.display = '';
			controlBtn.style.display = '';
			document.addEventListener('mouseover', handle.getPlayer, false);
			fullStatus = false;
		}
	};

	tool.addStyle([
		'#htmlToothbrush, #bodyToothbrush {overflow:hidden !important;}',
		'#htmlToothbrush #bodyToothbrush .parentToothbrush {overflow:visible !important;z-index:auto !important;}',
		'#htmlToothbrush #bodyToothbrush .absoluteToothbrush {position:absolute !important;}',
		'#htmlToothbrush #bodyToothbrush .playerParentToothbrush {position:fixed !important;top:0px !important;left:0px !important;width:100% !important;height:100% !important;max-width:none !important;max-height:none !important;min-width:0 !important;min-height:0 !important;margin:0 !important;padding:0 !important;z-index:2147483645 !important;border:none !important;}',
		'#htmlToothbrush #bodyToothbrush .playerRelativeToothbrush {position:relative !important;top:0px !important;left:1px !important;width:calc(100% - 2px) !important;height:100% !important;max-width:none !important;max-height:none !important;min-width:0 !important;min-height:0 !important;margin:0 !important;padding:0 !important;z-index:2147483645 !important;border:none !important;}',
		'#htmlToothbrush #bodyToothbrush .playerFixedToothbrush {position:fixed !important;top:0px !important;left:1px !important;width:calc(100% - 2px) !important;height:100% !important;max-width:none !important;max-height:none !important;min-width:0 !important;min-height:0 !important;margin:0 !important;padding:0 !important;z-index:2147483645 !important;border:none !important;}',
		'#htmlToothbrush #bodyToothbrush object.playerFixedToothbrush, #htmlToothbrush #bodyToothbrush embed.playerFixedToothbrush, #htmlToothbrush #bodyToothbrush video.playerFixedToothbrush {background-color:#000 !important;}',
		'#htmlToothbrush #bodyToothbrush iframe.playerFixedToothbrush {background-color:#FFF !important;}',
		'#htmlToothbrush #bodyToothbrush object.playerRelativeToothbrush, #htmlToothbrush #bodyToothbrush embed.playerRelativeToothbrush {background-color:#000 !important;}',
		'#htmlToothbrush #bodyToothbrush object.parentToothbrush {width:100% !important;height:100% !important}',
		'#playerControlBtn {visibility:hidden;opacity:0;display:none;transition: all 0.5s ease;cursor: pointer;font: 12px "微软雅黑";margin:0;width:64px;height:20px;line-height:20px;border:none;text-align: center;position: fixed;z-index:2147483646;background-color: #27A9D8;color: #FFF;} #playerControlBtn:hover {visibility:visible;opacity:1;background-color:#2774D8;}',
		'#playerControlBtn.playerControlBtnCol {width:20px;height:64px;line-height:16px;}',
		'#leftFullStackButton{display:none;position:fixed;width:1px;height:100%;top:0;left:0;z-index:2147483646;background:#000;}',
		'#rightFullStackButton{display:none;position:fixed;width:1px;height:100%;top:0;right:0;z-index:2147483646;background:#000;}'
	].join('\n'));

	var controlBtn = createButton('playerControlBtn');
	var leftBtn = createButton('leftFullStackButton');
	var rightBtn = createButton('rightFullStackButton');

	document.addEventListener('mouseover', handle.getPlayer, false);

})();