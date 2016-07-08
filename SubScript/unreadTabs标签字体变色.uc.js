// ==UserScript==
// @name           unreadTabs.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    タブの移動後もタブの選択状態(未読状態)を維持する。 The selected attribute (unread state) of tabs after moving a tab is preserved.
// @author         Alice0775
// @include        main
// @modified by    Alice0775
// @compatibility  4.0b8pre - 9
// @version        2012/12/08 22:30 Bug 788290 Bug 788293 Remove E4X 
// ==/UserScript==
var unreadTabs = {
  // -- config --
  CONTENT_LOAD: true,     // [true]:コンテントの読み込み, false:新規タブの時のみ, を未読とする
  CHECK_MD5:    false,     // CONTENT_LOAD=trueの時,
                          // true:未読かどうか文書のMD5もチェックする, [false]:チェックしない
                          // (frameドキュメントはfalseと同じ扱い)
                          // (ダイナミックドキュメントの場合はfalseとした方が無駄がない)

  READ_SCROLLCLICK: false,// true:コンテントのスクロールまたはクリック, [false]:タブセレクト, で既読とする
  TABCONTEXTMENU: false,   // タブのコンテキスト"Remove UnRead For All Tabs"を表示 [ture]:する, false:しない
  READ_TIMER: 60,        // タブが選択されてから READ_TIMER(msec)後には強制既読とする

  UNREAD_COLOR: 'blue',    // 未読のタブの文字色
  UNREAD_STYLE: 'normal', // 未読のタブの文スタイル
  LOADING_COLOR:'red',   // 読み込み中のタブの文字色
  LOADING_STYLE:'italic', // 読み込み中のタブの文スタイル
  // -- config --

  ss: null,

  init: function(){
    if('TM_init' in window ||
       'InformationalTabService' in window)
      return;

    this.CHECK_MD5 = this.CHECK_MD5 && this.CONTENT_LOAD;

    this.ss = Components.classes["@mozilla.org/browser/sessionstore;1"].
                           getService(Components.interfaces.nsISessionStore);

    if (this.TABCONTEXTMENU)
      this.tabContextMenu();

    window.addEventListener('unload', this, false);
    gBrowser.tabContainer.addEventListener('TabOpen', this, false);
    gBrowser.tabContainer.addEventListener('TabClose', this, false);
    gBrowser.tabContainer.addEventListener('TabSelect', this, false);
    gBrowser.tabContainer.addEventListener('SSTabRestoring', this, false);
    gBrowser.tabContainer.addEventListener('SSTabRestored', this, false);

    // 既にあるタブに対して
    var that = this;
    init(0);
    function init(i){
      if(i < gBrowser.mTabs.length) {
        var aTab = gBrowser.mTabs[i];
        if(aTab.linkedBrowser.docShell.busyFlags
          || aTab.linkedBrowser.docShell.restoringDocument) {
          setTimeout(arguments.callee, 250, i);
        }else{
          that.initTab(aTab);
          if (!(aTab.hasAttribute('unreadTabs-restoring') ||
                aTab.hasAttribute('unreadTab')) ){
            that.restoreUnreadForTab(aTab);
            that.restoreMD5ForTab(aTab);
          }
          if (aTab.selected) {
              aTab.removeAttribute('unreadTabs-restoring')
            if (aTab.hasAttribute('unreadTab'))
              that.setReadForTab(aTab);
          }
          i++;
          arguments.callee(i);
        }
      }else{
      }
    }

    var func;
    // Tree Stryle Tab
    if ("treeStyleTab" in gBrowser &&
        "performDrop" in gBrowser.treeStyleTab) {
      func = gBrowser.treeStyleTab.performDrop.toString();
        func = func.replace(
        'targetBrowser.swapBrowsersAndCloseOther(tab, aTab);',
        " \
        if (aTab.hasAttribute('unreadTab')) { \
          tab.setAttribute('unreadTab', true); \
        } else { \
          tab.removeAttribute('unreadTab'); \
        } \
        $&"
        );
      eval("gBrowser.treeStyleTab.performDrop = "+ func);

    } else if ("_onDrop" in gBrowser) {
      func = gBrowser._onDrop.toString();
        func = func.replace(
        'this.swapBrowsersAndCloseOther(newTab, draggedTab);',
        " \
        if (draggedTab.hasAttribute('unreadTab')) { \
          newTab.setAttribute('unreadTab', true); \
        } else { \
          newTab.removeAttribute('unreadTab'); \
        } \
        $& "
        );
      eval("gBrowser._onDrop = "+ func);
    }
    //Multiple Tab Handler
    var menupopup = document.getElementById('multipletab-selection-menu');
    if (menupopup){
      var menuitem = document.createElement('menuitem');
      menuitem.setAttribute('label', 'Toggle Unread Selected Tabs');
      menuitem.setAttribute('oncommand', 'unreadTabs.toggleUnreadSelectedTabs();');
      menupopup.appendChild(menuitem);
    }

    var style = ' \
    @namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"); \
      /*未読のタブの文字色*/ \
      .tabbrowser-tab[unreadTab] .tab-text, \
      .alltabs-item[unreadTab] \
      { \
        color: %UNREAD_COLOR%; \
        font-style: %UNREAD_STYLE%; \
      } \
 \
      /*読み込み中のタブの文字色*/ \
      .tabbrowser-tab[busy] .tab-text, \
      .alltabs-item[busy] \
      { \
        color: %LOADING_COLOR%; \
        font-style: %LOADING_STYLE%; \
      } '.
                  replace(/%UNREAD_STYLE%/g, this.UNREAD_STYLE).
                  replace(/%UNREAD_COLOR%/g, this.UNREAD_COLOR).
                  replace(/%LOADING_STYLE%/g, this.LOADING_STYLE).
                  replace(/%LOADING_COLOR%/g, this.LOADING_COLOR).replace(/\s+/g, " ");
    var sspi = document.createProcessingInstruction(
      'xml-stylesheet',
      'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
    );
    document.insertBefore(sspi, document.documentElement);
    sspi.getAttribute = function(name) {
      return document.documentElement.getAttribute(name);
    };
  },

  uninit: function(){
    // タイマークリア
    if (this._timer)
      clearTimeout(this._timer);

    // イベントリスナを削除
    window.removeEventListener('unload', this, false);
    gBrowser.tabContainer.removeEventListener('TabOpen', this, false);
    gBrowser.tabContainer.removeEventListener('TabClose', this, false);
    gBrowser.tabContainer.removeEventListener('TabSelect', this, false);
    gBrowser.tabContainer.removeEventListener('SSTabRestoring', this, false);
    gBrowser.tabContainer.removeEventListener('SSTabRestored', this, false);

    // タブのイベントリスナを削除
    for (var i = 0; i < gBrowser.mTabs.length; i++) {
      try {
        gBrowser.mTabs[i].unreadTabsEventListener.destroy();
      } catch(e) {}
    }
  },

  tabContextMenu: function(){
    //tab context menu
    var tabContext = document.getAnonymousElementByAttribute(
                        gBrowser, "anonid", "tabContextMenu") ||
                     gBrowser.tabContainer.contextMenu;
    var menuitem = tabContext.appendChild(
                        document.createElement("menuitem"));
    menuitem.id = "removeunreadalltabs";
    menuitem.setAttribute("label", "Remove UnRead For All Tabs");
    menuitem.setAttribute("accesskey", "z");
    menuitem.setAttribute("oncommand","unreadTabs.removeUnreadForAllTabs();");
  },


  // タブのイベントリスナを登録
  initTab: function(aTab){
    if (typeof aTab.unreadTabsEventListener == 'undefined')
      aTab.unreadTabsEventListener = new unreadTabsEventListener(aTab);
  },

  // タブのイベントリスナを削除
  uninitTab: function(aTab){
    if (aTab.unreadtimer)
      clearTimeout(aTab.unreadtimer);
    //try {
      aTab.unreadTabsEventListener.destroy();
      delete aTab.unreadTabsEventListener;
    //} catch(e) {}
  },

  checkCachedSessionDataExpiration : function(aTab) {
    var data = aTab.linkedBrowser.__SS_data; // Firefox 3.6-
    if (data &&
       data._tabStillLoading &&
       aTab.getAttribute('busy') != 'true')
      data._tabStillLoading = false;
  },

  // タブの状態をセッションデータに保存
  saveUnreadForTab: function (aTab){
    if (aTab.hasAttribute("unreadTab"))
      this.ss.setTabValue(aTab, "unreadTab", true);
    else {
      //try {
        this.checkCachedSessionDataExpiration(aTab);
        this.ss.setTabValue(aTab, "unreadTab", '');
        //this.ss.deleteTabValue(aTab, "unreadTab");
      //} catch(e) {}
    }
  },

  // タブの状態をセッションデータから復元
  restoreUnreadForTab: function(aTab){
    var retrievedData = this.ss.getTabValue(aTab, "unreadTab");
//window.userChrome_js.debug( "restoreUnreadForTab " + !!retrievedData)
    if(typeof retrievedData != 'undefined' && retrievedData)
      aTab.setAttribute('unreadTab', true);
    else
      aTab.removeAttribute('unreadTab');
    return retrievedData;
  },

  // タブのMD5をセッションデータに保存
  saveMD5ForTab: function (aTab){
    if (!this.CHECK_MD5)
      return;
    if (aTab.hasAttribute('md5'))
      this.ss.setTabValue(aTab, "md5", aTab.getAttribute('md5'));
    else {
      //try {
        this.checkCachedSessionDataExpiration(aTab);
        this.ss.setTabValue(aTab, "md5", '');
        //this.ss.deleteTabValue(aTab, "md5");
      //} catch(e) {}
    }
  },

  // タブのMD5をセッションデータから復元
  restoreMD5ForTab: function(aTab){
    if (!this.CHECK_MD5)
      return;
    var retrievedData = this.ss.getTabValue(aTab, "md5");
    if(typeof retrievedData != 'undefined' && retrievedData)
      aTab.setAttribute('md5', retrievedData);
    else
      aTab.removeAttribute('md5');
    return retrievedData;
  },

  setUnreadForTab: function(aTab){
//window.userChrome_js.debug("setUnreadForTab");
    aTab.setAttribute('unreadTab', true);
    this.saveUnreadForTab(aTab);
    this.saveMD5ForTab(aTab);
  },

  setReadForTab: function(aTab){
//window.userChrome_js.debug("setReadForTab");
    aTab.removeAttribute('unreadTab');
    this.saveUnreadForTab(aTab);
    this.saveMD5ForTab(aTab);
  },

  toggleUnreadSelectedTabs: function(){
    var tabs = MultipleTabService.getSelectedTabs();
    for (var i= 0; i < tabs.length; i++) {
      if (tabs[i].selected)
        continue;
      if (tabs[i].hasAttribute('unreadTab'))
        this.setReadForTab(tabs[i]);
      else
        this.setUnreadForTab(tabs[i]);
    }
  },

  removeUnreadForAllTabs: function(){
    for (var i= 0; i < gBrowser.mTabs.length; i++) {
      var aTab = gBrowser.mTabs[i];
      if (!aTab.hasAttribute('busy') &&
          aTab.hasAttribute('unreadTab'))
        this.setReadForTab(aTab);
    }
  },

  tabSelected: function(aTab){
    var Start = new Date().getTime();

    if (this._timer)
      clearTimeout(this._timer);

    if (!aTab.hasAttribute('unreadTab'))
      return;

    this._timer = setTimeout(function(self, aTab){
      //try {
        self.setReadForTab(aTab);
      //} catch(e) {}
    }, Math.max(this.READ_TIMER - ((new Date()).getTime()-Start), 0), this, aTab);
  },

  _timer: null,

  handleEvent: function(event){
    var aTab;
//window.userChrome_js.debug(event.type);
    switch (event.type) {
      case 'unload':
        this.uninit();
        break;
      case 'TabSelect':
        this.tabSelected(event.target);
        break;
      case 'TabOpen':
        this.initTab(event.target);
        this.setUnreadForTab(event.target);
        break;
      case 'TabClose':
        this.uninitTab(event.target);
        this.saveUnreadForTab(event.target);
        this.saveMD5ForTab(event.target);
        break;
      case 'SSTabRestoring':
        event.target.setAttribute('unreadTabs-restoring', true)
        break;
      case 'SSTabRestored':
        this.initTab(event.target);
        event.target.removeAttribute('unreadTabs-restoring')
        this.restoreUnreadForTab(event.target);
        this.restoreMD5ForTab(event.target);
        break;
    }
  }
}



function unreadTabsEventListener(aTab) {
  this.mTab = aTab;
  this.init();
}

unreadTabsEventListener.prototype = {
  mTab : null,
  init : function() {
    //window.userChrome_js.debug('init');
    //this.mTab = aTab;
    if (unreadTabs.CONTENT_LOAD)
      this.mTab.linkedBrowser.addEventListener('DOMContentLoaded', this, false);
    if (unreadTabs.READ_SCROLLCLICK) {
      this.mTab.linkedBrowser.addEventListener('scroll', this, false);
      this.mTab.linkedBrowser.addEventListener('mousedown', this, false);
    }
  },
  destroy : function() {
    if (unreadTabs.CONTENT_LOAD)
      this.mTab.linkedBrowser.removeEventListener('DOMContentLoaded', this, false);
    if (unreadTabs.READ_SCROLLCLICK) {
      this.mTab.linkedBrowser.removeEventListener('scroll', this, false);
      this.mTab.linkedBrowser.removeEventListener('mousedown', this, false);
    }

    delete this.mTab;
  },
  handleEvent: function(aEvent) {
    switch (aEvent.type) {
      case 'DOMContentLoaded':
        //window.userChrome_js.debug('DOMContentLoaded');
        this.contentLoad(aEvent);
        break;

      case 'scroll':
      case 'mousedown':
        aTab = this.mTab;
        if (!aTab.hasAttribute('unreadTab'))
          return;

        unreadTabs.setReadForTab(aTab);
        break;

    }
  },

  // コンテント読み込み時の処理
  contentLoad: function(aEvent){
      var aTab = this.mTab;
/**/
      if (aTab.unreadtimer)
        clearTimeout(aTab.unreadtimer);
      if (aTab.hasAttribute('busy') && unreadTabs.CONTENT_LOAD && unreadTabs.CHECK_MD5) {
        aTab.unreadtimer = setTimeout(function(aEvent, self){self.contentLoad(aEvent);}, 10, aEvent, this);
        return;
      }

      // コンテントの文書のMD5
      var doc = aTab.linkedBrowser.contentDocument;
      var md5 = null;
      var prevmd5 = null;
      if (unreadTabs.CHECK_MD5) {
        md5 = this.calculateHashFromStr(this.getTextContentForDoc(doc));
        if (aTab.hasAttribute('md5')) {
          prevmd5 = aTab.getAttribute('md5');
        }
        aTab.setAttribute('md5', md5);
      }

      // コンテントを読み込んだのが前面のタブなら既読にセット
      if (aTab.selected) {
          aTab.removeAttribute('unreadTabs-restoring')
        if (!aTab.hasAttribute('unreadTab'))
          return;
        unreadTabs.setReadForTab(aTab);
        return;
      }

      // タブの復元中なら何もしない
      if (aTab.hasAttribute('unreadTabs-restoring')) {
        //aTab.removeAttribute('unreadTabs-restoring')
        return;
      }

      // コンテントを読み込んだのが背面のタブなら未読にセット
      if (unreadTabs.CONTENT_LOAD) {
        if (!unreadTabs.CHECK_MD5 || md5 != prevmd5) {
          unreadTabs.setUnreadForTab(aTab);
        }
      }
  },

  getTextContentForDoc: function(aDocument) {
    try {
      if (aDocument.body) {
        var str = aDocument.body.textContent;
        return str.replace(/\b\d{1,2}\b/g,'').replace(/\b\d{1,16}\b/g,'').replace(/\s/g,'');
      }
    } catch(e) {
    }
    return "";
  },

  calculateHashFromStr: function(str) {
    var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"]
                              .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
    // ここでは UTF-8 を使います。他のエンコーディングも選ぶこともできます。
    converter.charset = "UTF-8";
    // result は出力用パラメータです。
    // result.value は配列の長さを保持します。
    var result = {};
    // data はバイトの配列です。
    var data = converter.convertToByteArray(str, result);
    var ch = Components.classes["@mozilla.org/security/hash;1"]
                       .createInstance(Components.interfaces.nsICryptoHash);
    str = null;
    ch.init(ch.MD5);
    ch.update(data, data.length);
    var hash = ch.finish(false);
    str = data = ch = null;
    // 1 バイトに対して 2 つの 16 進数コードを返す。
    function toHexString(charCode)
    {
      return ("0" + charCode.toString(16)).slice(-2);
    }

    // バイナリのハッシュデータを 16 進数文字列に変換する。
    return [toHexString(hash.charCodeAt(i)) for (i in hash)].join("");
  }


};


unreadTabs.init();
