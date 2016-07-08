// ==UserScript==
// @name         ImagePlus.uc.js 
// @namespace    ImagePlus@gmail.com
// @include      main
// @include      chrome://browser/content/browser.xul
// @description  在未载入的图片的右键菜单加入"重新载入所有未显示图片", 
// ==/UserScript==
(function() {
    const nsIPermissionManager = Components.interfaces.nsIPermissionManager;
    var _pm = Components.classes["@mozilla.org/permissionmanager;1"].getService(Components.interfaces.nsIPermissionManager);
    var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
    var restore_block_host;

    showImageInit = function() {
        mItem = document.createElement("menuitem");
        mItem.setAttribute("label", "\u91CD\u65B0\u8F7D\u5165\u6240\u6709\u672A\u663E\u793A\u56FE\u7247");
        mItem.setAttribute("accesskey", "C");

        document.getElementById("contentAreaContextMenu").addEventListener("popupshowing",
        function() {
            onPopupShowing(this);
        },
        false);
    };

    onPopupShowing = function(aPopup) {
        aPopup.insertBefore(mItem, document.getElementById("context-viewimage"));
        mItem.setAttribute("oncommand", "performShowImage(true);");
        mItem.hidden = !(gContextMenu.onImage && (!gContextMenu.target.naturalWidth || !gContextMenu.target.complete));
        mItem.setAttribute("disabled", mItem.hidden);
    };

    performShowImage = function(reload) {
        var imgList = document.popupNode.ownerDocument.images;
        var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        var oriImageBehavior = 0;
        if (prefService.getIntPref("permissions.default.image") !== 0) {
            oriImageBehavior = prefService.getIntPref("permissions.default.image");
            prefService.setIntPref("permissions.default.image", 0);
        }

        for (var i = 0; i < imgList.length; ++i) {
            if (ImageAlreadyLoaded(imgList) === true && reload === true) revealPicture(imgList);
        }

        if (oriImageBehavior !== 0) {
            prefService.setIntPref("permissions.default.image", oriImageBehavior);
        }
        return;
    };

    // 重新载入图片
    revealPicture = function(imgNode) {
        try {
            if (! (imgNode instanceof Components.interfaces.nsIImageLoadingContent) || !imgNode.currentURI) {
                return;
            }
        } catch(ex) {
            return;
        }
        checkBlocking(imgNode);
        imgNode.src = imgNode.src; // 载入图片
        if (restore_block_host) // turn back on the host block if necessary
        restoreBlocking();
    };

    checkBlocking = function(imgNode) {
        restore_block_host = "";
        // Check to see if this url is blocked
        if (_pm.testPermission(imgNode.currentURI, "image") == nsIPermissionManager.DENY_ACTION) {
            _pm.remove(imgNode.currentURI.host, "image");
            restore_block_host = imgNode.currentURI.host;
        }
    };

    restoreBlocking = function() {
        var uri = ioService.newURI("http://" + restore_block_host, null, null);
        _pm.add(uri, "image", nsIPermissionManager.DENY_ACTION);
    };

    // 判读图片是否已加载。true:未加载；false：已加载
    ImageAlreadyLoaded = function(image) {
        if (image instanceof Components.interfaces.nsIImageLoadingContent) {
            var request = image.getRequest(Components.interfaces.nsIImageLoadingContent.CURRENT_REQUEST);
            return ! (request && (request.imageStatus & request.STATUS_SIZE_AVAILABLE));
        } else return false;
    };
    showImageInit();
	
    //+++++++++++++++Copy Gif++++++++++++++++++++
    var copyimage = document.querySelector("#context-copyimage-contents");
    copyimage.addEventListener("command",
    function() {
        var selection = content.getSelection();
        var ranges = [];
        for (var i = 0; i < selection.rangeCount; i++) ranges.push(selection.getRangeAt(i));

        var range = document.createRange();
        range.selectNode(document.popupNode);
        selection.removeAllRanges();
        selection.addRange(range);
        goDoCommand("cmd_copy");
        selection.removeAllRanges();

        for (i in ranges) selection.addRange(ranges[i]);
    },
    false);
    //+++++++++++++++++++OpenImgRar+++++++++++++++
	/*
    location == "chrome://browser/content/browser.xul" && (function() { (function(m) {
            m.id = "openImgRar";
            m.addEventListener("command",
            function() {
                var imageUrl = (gContextMenu.mediaURL || gContextMenu.imageURL);
				imageUrl = imageUrl.replace(/\.jpg\.thumb\.jpg$/i, '.jpg');

				var file = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("TmpD", Ci.nsILocalFile);
				file.append(new Date().getTime() + ".rar");

				Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist)
					.saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService)
						.newURI(imageUrl, null, null), null, null, null, null, file, null);
				setTimeout(function() {
					file.launch();
				}, 100);
            },
            false);
            m.setAttribute("label", "\u6253\u5F00\u56FE\u7247rar");
        })(document.getElementById("contentAreaContextMenu").insertBefore(document.createElement("menuitem"), document.getElementById("context-openlinkintab")));
        document.getElementById("contentAreaContextMenu").addEventListener("popupshowing",
        function() {
            gContextMenu.showItem("openImgRar", gContextMenu.onImage);
        },
        false);
    })();  */
})()