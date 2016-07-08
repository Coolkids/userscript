/******************************************************************************************
 * AddMenuPlus 外置配置文件 RunningCheese 版本
 *******************************************************************************************/

// ===================== 紫色按钮菜单 ======================
css('#appmenu_newTab,\
    #appmenu_newPrivateWindow,\
    #appmenuPrimaryPane > hbox,\
    #appmenu_find,\
    #appmenu_find+menuseparator,\
    #appmenu_savePage,\
    #appmenu_sendLink,\
    #tiletabs-appmenu+menuseparator,\
    #tiletabs-appmenu,\
    #appmenu_webDeveloper,\
    #appmenu_webDeveloper+menuseparator,\
    #appmenu_fullScreen,\
    #sync-setup-appmenu,\
    #sync-syncnowitem-appmenu,\
    #appmenu-quit,\
    #appmenu_print,\
    #appmenuSecondaryPane{display: none !important;}');//
app([
	{label: "退出火狐",
	insertBefore : "appmenu_newPrivateWindow",
	oncommand: "goQuitApplication();",
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASklEQVQ4jWNgGJZAnkw5uIJfDAwMdljk7KByBA2BKbTDIuZASDM2Q0jWjG4IXs1MRBr2j1zbHRiwhwlRmrEFIkFDqBKNFCWkIQgAuVwVATujf2QAAAAASUVORK5CYII="
	},{
            label : "重启火狐",
            oncommand : "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
            insertBefore : "appmenu_newPrivateWindow",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jc2SsQ2AIBBFX+zs3MBN1MqWXRzB2XATprDB5qsEFTEmxpeQK7j7d9wHPqB+WzwDzRuRRiLmSZEBLOB1nGLWJKMKDFApemDI7exUCPsOutzRLce3PnLBB92vSAreCZTK2SiihAloEwK9ci6JlxhSsbuTJLZxtdLpLov4I5258xMWh0QfDZPBB7wAAAAASUVORK5CYII="
        }, {
            label : "隐私窗口",
            oncommand : "OpenBrowserWindow({private: true});",
            insertBefore : "appmenu_newPrivateWindow",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAAAAAAAAAAAAAAAAAZDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADigwXtAAAAFXRSTlMAGz8pVgucb9KweBLij4FnTPfsvTaXo85aAAAAa0lEQVQY052MNw7EMBADd7XKyXKY/3/1DFxhuPVUBAmOfEXDk7caM3BG6KV6J4zk2t1PDdc2CkJ4fZFdV4YpMiEvOyQvxRuqmEd9kTrEd3AOupeYpOEeheP2X6QQrCYLLf1HO+GIcYdi8oUflYoFAr/4Pm4AAAAASUVORK5CYII="
        },{
            label: "清理浏览痕迹", 
            oncommand: "Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);",
            insertBefore : "appmenu_newPrivateWindow",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA90lEQVQ4jZXTMUvDQBjG8R8WHETo2KkIdtDJScXVwbHgB+iuo34Dl34B50zFSXBxreDSUVw7CYLi4iBOXR1ygdzlGuIfAsm9z/PkvTcXmgwya2vpJc/7eMEevsL1bwZ4xAo3tfUzjFLxRsb8gHcs8Vyr7eIJ00znYBMLTELQd0bYxxx3uYALFLV2i5wIW6G7cVpY4HCNKWUSOolYKbfRhWqLjSF25QfbacASRx0DDoI+CpjhusV0qzxocIn7VFBN9ypj7uM3aMZ4DfcNRiGkEJ+6aurTYB5WhXSIbzjBp/g7n+MYOzjFR+7tbfRC4Fz5gw3b5e1E5j/bkCjyUT1I9wAAAABJRU5ErkJggg==",
        },{
            label : "选项设置",
            oncommand : "openPreferences();",
            insertBefore : "appmenu_find",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/UlEQVQ4jbXTPU7DQBAF4I+/XIEqHYWF0lPkFMgX4AQ0adwhipShSO0yLULKFXIFSzR0SDQWRdpUFBnLi7UJSIgnrTw78+Z5ZjTLP6LCNk51iHQ+uJe4RYMZbsK/ie8EL3jOiZX4iL/VmCaxafiq4JQ5gdWxUhNUwQWnSaDBVdgjLNHGWYRPcJqcapuUPccal3HWIdK10w6r3aJI7m0kdhiHr0MROd9aOIbdT4RhCwt9C+Ow5xHLttCJ1GGPQqQb4lI/xDpNThdpop/uzn6RZplq34ILzpLACR5xgTt84j0p+wHXuMcTXjPiSv1CtfbTLpKeVw5sYQ6/ekx/xhedMTrZe5KNFAAAAABJRU5ErkJggg=="
        }, {
            label : "附加组件",
            oncommand : "BrowserOpenAddonsMgr();",
            insertBefore : "appmenu_find",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARG5aBAAAAEXRSTlMAOH+IQ0whCt/PvbOoeGpW9xeWIxoAAABuSURBVBjTZY5LDsQwCEOB/NMkHe5/2bFSSiv1Lbx4Eja0KUNbpherFzneIgjFRkZU8KOAjFsok8F6CXJMqLhoHVucazJxpFlt46bgai6v1dAHckTvkFWsmsP5rOznpIoLRv1JWe/HkoJJjMT8lz/5bAPqIX5xvgAAAABJRU5ErkJggg=="
        },{
            label : '书签管理',
            oncommand : "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
            insertBefore : "appmenu_find",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCAAAAAAAAAAAAAAAAAAAAABDSw0qAAAAEnRSTlMAjJN8Vm1MMB0S7OKiCMm9OrMkye0rAAAAcUlEQVQY01WOWxaAIAhEQUDybe1/sVFpJT8wwxm4MKp3WGvPq95q3RbDeY9/HRJAClMoUxMAqcTdcnhkYi0ARb24w4L5F0Z3H5yOTZ+/buLT0kvVBu1kM6ZCWIB4GMScRCJ7GkaOLhggxja/6dP1+nYCVjEChrr/HZgAAAAASUVORK5CYII="
        },{
            label : '历史记录',
            oncommand : "PlacesCommandHook.showPlacesOrganizer('History');",
            insertBefore : "appmenu_find",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA90lEQVQ4jbXTLU4EQRAF4C+QrNgEA2JwiDWYVeDmGHMI1CYY/BouMFfAotaScIRRm4DDIViFGoNATDX0zs8awks6mX715nV1VTX/gAL3aNDGarCO2B6OevsKW5xghbNYK5xGrJo6ucI7rmPf4LKnWYZmYFJgF4KEDW5GDlqGtoDjIO/wiodMeBHiTc/gA+e4wnMiG5Q9YYm3kQxSrMmJFrOeaBb8YsQgxQ4a0LWuxRNu/dZojs9cOHaFhIWumI9Z2oMrrFFPGIyh1g3bD8baOIW9NuZIg3TIZHKQcpNdpFjqijWP7zpikz8npMf0gi9dtZvgBmn/Gd/lwjO75/3HFwAAAABJRU5ErkJggg=="
        },{
            label : 'UC脚本',
            exec : "\\Chrome",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZBOUJGRjQzREE5ODExRTQ4NDVBRTdEMkZBRDZDM0QxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZBOUJGRjQ0REE5ODExRTQ4NDVBRTdEMkZBRDZDM0QxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkE5QkZGNDFEQTk4MTFFNDg0NUFFN0QyRkFENkMzRDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkE5QkZGNDJEQTk4MTFFNDg0NUFFN0QyRkFENkMzRDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4zgzZwAAAAV0lEQVR42mL8//8/AyWABcZgZGTEMAloOCNRBoA0Y1OMSxyrC3ABbC5Ddh1eA/DZDnMdCyGbiA5EYgIMm9eYGCgEowYMBgMYYbmR1IQESzeMlGZngAADAKQbKSFznkEwAAAAAElFTkSuQmCC"
	        },{
            label : 'GM脚本',
            exec : "\\gm_scripts",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAB5JREFUCNdjAAI7BgZHIPrD4MDEUP8PSGJH9n+AagGmPAbHlu2RGQAAAABJRU5ErkJggg=="
	        },{
            label : '配置文件夹',
            exec : "\\",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAB5JREFUCNdjAAI7BgZHIPrD4MDEUP8PSGJH9n+AagGmPAbHlu2RGQAAAABJRU5ErkJggg=="
	        },{
	        label: '错误控制台',
	        image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAjbsAAI27AZ11gYAAAAEVSURBVEjHzdU9SoNBEIDhZ5NPUDH2QSRIOrXyBpY2FpIDCEoKDyDoAWLtT7Cx8AIK2lkJCiK2gp22gp0oWuRHCyUkRojuB5rZZtlhX2beZVhSRjAgbzjy9ov7xKpF2UhAw37wbM9hFKJhwTI1pWgBJbVM9OXPCBpO3YoBNRXNpq7g/x30IyBr0mgawIhtG3LxgEeb5lV+iki+OTsW7GDNcxyAI2xh3dPvW/iIC3fmjMc4gLyqvBU3cS2M2VVUdhYnMadqwpJLibIZzY7sgZNegMS1iitkFExptDIB5901dE9jaIMNdazBL85Kat85eGvt6uq9HPTjNP41IBFMe4j8WKaF4E627a1/F1n1oGAoRQevaRV4BzI3NnL5HPHKAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA3LTI1VDIxOjQ5OjQ1KzA4OjAwtlkiRwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0wOS0wNFQyMTo0MDo0OCswODowMMYenbEAAABOdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuOC44LTEwIFExNiB4ODZfNjQgMjAxNS0wNy0xOSBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZwUMnDUAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUxMo+NU4EAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzc4MzAyMDQ4N5iKQQAAABN0RVh0VGh1bWI6OlNpemUANi41MUtCQsGaVioAAABadEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy8xMTI1Mi8xMTI1Mjg3LnBuZ6KIeyIAAAAASUVORK5CYII=',
            oncommand: "toJavaScriptConsole();"
	        },{
            label: '同步火狐',
			image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADJSURBVDhPrVOBDcIwDMsJnMAJfFDWPsAJO4ET+IQTOGUn7AROgLg4U1qCihCWrCqxnVZaJhFSSrtpmi4551X5cFzRh06rSCnlCLJE+KDGpQv2XLYh1nThu/X0tiuGa3+PE7X1axgwcx9WzrQ08K+tcIFhOIQLVdqzKY/RDzBSHiMKg5T/h+gSkPIYURikPIbfg58GqHl2wW1TKb/w6fOpsQljja2mRcSt6U3PE4bhZN2E4bdeDXPi9z+QAhe8vVhNZ2X4C9PSQeQJaqDMYjYgrJgAAAAASUVORK5CYII=',
            oncommand: "gSyncUI.doSync(event);"
            },{
        	label: "about:config",
            oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:config');",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4ja3RIW4CURDG8V8AtaaiTRAcAYsnaVJR0RtUEnTrSKpXcgMkJ6jsiprV1XVt0gQHpIYKBIidTdew3Q0dM2/evP/M92Y407oN341wjQFW2Ddt0EeGj/AHPLRRmCONQm9xLu3iL/gmIJhhWcmlWECvpsAQr5V4gwRPmOILOjUFfioyt7jDGrd4xK5OfjckL0/kn9UMs4SzkJxgHGpGkcvjvhGcK9b4HT5tCy9OSf03GO79/qsVXK7xCp+4xAveMWnanWLCmWJQ8zbg2XYEkQ0txFaohJUAAAAASUVORK5CYII="
        },{
            label: "关于火狐",
            oncommand: "openAboutDialog();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEUAAAAAAAAMDAzNzc3FxcWpqaltbW308/Lt7e16enopKSn4+Pjk5OSBgYEfHx92SVcdAAAAAXRSTlMAQObYZgAAAFlJREFUCNdjQAKdD6VugGhWNfeSxAAgI8iAgYFZlYGBQ5mBQYDB6AADbwJInm0CA5cDSITlAQPjBhCDWwDKYBeASS0AKxYAKeaBakcYyMAqBrICaukMJDcAAOjxEU9VZMpGAAAAAElFTkSuQmCC",
        }
    ]);





// =====================UC脚本管理器加图标======================
page(
{id: 'addMenu-rebuild',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAADr6+v8/Pzh4eGSkpJVVVVERERBQUErKyscHBwWFhby8vLT09PPz8+2traxsbGhoaGgoKBtbW1ra2sLCwsKCgqT8ZvFAAAAAXRSTlMAQObYZgAAAD9JREFUGNPFzTcSwCAQxVAtGZzT/a/q8o/H9Kh5pejl/UdLrWWTxNO5K0qeCeyW1BmWKgllW0uQcOS0yzHbfy87/AR9dbQdjwAAAABJRU5ErkJggg=="});
page(
{id: 'webDeveloperMenu',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeBAMAAAAiKQiSAAAAMFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaPxwLAAAAD3RSTlMAEM/vgL9QQGAsr5/fj3CUF5PQAAABAUlEQVQY04XQz0oCQRwH8O8uYmLEbEu3TnrqFpQIStCy0tl6AusJ3Eu3QKNTp+zQWXqC6gnsDeoNypNHl8UFReTnzndn8ODB72G+85k/MAywN4aJM9Fj8bxv/FRnHacD9tvSA/PA9eJFZO+NfgH8fcGmtAT259jk5ROjvkUaoSAyA+7jTKwDkRU3mBiuSKLbWomI9XZLT3R61sgdwWYqokT+jfy0TV8lHl9f9Tr0tV/J2AorMHaqrQBHZ4fPl3Tj0a/pG+WG0IsmGDfIHYe51Z1xN/fw1Xg4oLv4ob/VLR2iTQduwH9twtVOUK5ndD7e4XQy33CKgl4snaoTfbSGXVkDbzyE9+jnkBkAAAAASUVORK5CYII="});
/*
page(
{id: 'instantFox-menuitem',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdklEQVQ4jc2SsQ3AIAwEbwGK1NmFDdIwE3OxCCOkZYAU+RSRMEFyIuUkN7Z5vwH4IxtQgKYoyk2RgQokICiScnlmcgWWTm1RbeikaJpFUo9J47RsEdTznYB7BfclwvgZGxCfBC4nvY8UgX1WxOJVkdUj4jp84wDU6yD4kZGU+wAAAABJRU5ErkJggg==",
      condition: "noselect nolink nomailto noimage nomedia noinput"});
page(
{id: 'gad-options',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0Iv+qAAAAJHRSTlMAuB2oUujbjhcD1bqwXyX848/GwbKil2ZNP6GGgVdPODAQCggLYJ/IAAAAfklEQVQY04XPVw6DMBAE0N017oUeIL3c/46BDUT4i/kZ+8kaycBp3AT7GF/0GRAW4hC8GHMoBxW85dtJBsLkQHba1TRDBWrAuScTy3GZauNTInBetBxMZQP+x3jk/LlmYCVBBhDrDVL3a3Vb4X5ZX6rEbdv39l0UWuu+eQB8AQ3+BHJxz4YtAAAAAElFTkSuQmCC"});
*/



// =====================右键菜单定制======================
//复制所选
page([{label:'复制',id:"context-copy",condition:"select",accesskey:"",clone:false},{label:'粘贴所选',id:"context-paste",condition:"input",accesskey:"",clone:false},{label:'剪切所选',id:"context-cut",condition:"input",accesskey:"",clone:false},{label: '删除所选',id: "context-delete",condition:"input",accesskey:"",clone:false}]);



// 页面信息右键菜单
new function () {
	var items = [
  {
    label: "短网址",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAe0lEQVQ4je2QuxGAIBAFV1uxGTqwA0M6MLIK7MBC6IDMYjQ59Q3K6BizMwTsHfcBKooHotwjsNkpeddKoAcS0Ilr7CRpMokfj8QOCICzpLzTJu6R8JLsrfitQGuBQcaazeWswCITnk1CJp05XSFkj85PLK30mYZr58pPdhnlJMaUDTKQAAAAAElFTkSuQmCC",
    oncommand: function() {
        var url = addMenu.convertText("%RLINK_OR_URL%");
        var form = new FormData();
        form.append('url', url);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://dwz.cn/create.php", true);
        xhr.onload = function() {
            var obj = JSON.parse(xhr.responseText);
            addMenu.copy(obj.tinyurl);
        }
        xhr.send(form);
    }
},  
			    {
				label :'在线PS',
				image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVR42mNkoBAwUssAByAOB2IOIvX9AeKNQLwFZsBzIJYk0fLXQCwKM+A/1DURQOwMxJ1AfIeAAfeBWBHdgN9AzALEa4A4FEkxDxBrAPEZQgYcB2ILIM4F4ilImrcDsQEQewLxEXwGgIAIEL9B02wD5X9BMgSnASDFyUBcCMSbkTQzIBmiCMSnsRlgA7URZPMHIBbAE/1YXfAZqpmY9IPVgP1EpgFHdAPeA7EgJQkJlIDcSTTgJBDPYBzw3AgApMktEXd8LEwAAAAASUVORK5CYII=",
				oncommand:function () {gBrowser.addTab("http://pixlr.com/editor/");}
				},
{command:'menu_eyedropper',image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+0lEQVQ4jY3Tuy5EYRQF4G9MRgTFSDQKKoWGhERmKkMxLo13UKg8hMeQiAfwAGoRkVBpSETcFeLSKTQiUcw/ycE+x1nJLvbae62981/IRx13Kep5TZUCg218pRjAWkHvH7Rwi8EkvsJiWXEvLrGa4dq4R38Zgw3sBfwuNv8T9+ERE0FtFG8YzpLVYHoVW4HBO8Ywjf1oegU3mCnYcBxPwWAwi/MCcRfHWOgmPZlCA0clDA4xFRnU8FHC4BNDkcEFmiUMmjiNCjVcY7lAPIcHnesOMY8XLAW1Np6xkiWjz9TCDl5xkrgGRrDu1xvI+421tM1kys9woHOAP/AN9qwnf87G9QQAAAAASUVORK5CYII='
},{
		label:"网站涂鸦",
		url: "javascript:%20(function%20()%20{%20if%20(window.goggles%20&&%20window.goggles.active)%20{%20window.goggles.stop();%20}%20else%20{%20window.GOGGLE_SERVER='//dudl.us/page';%20var%20scr%20=%20document.createElement('script');%20scr.type%20=%20'text/javascript';%20scr.src%20=%20'//dudl.us/bookmarklet.js?rand='+Math.random();%20document.documentElement.appendChild(scr);%20}%20})();",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAD4+PghISERERExMTEUFBSVlZVPT08eHh4YGBi8vLyioqKBgYF4eHhJSUlBQUHg4ODR0dG1tbWamppzc3NgYGBXV1ft7e3i4uKvr6+oqKiPj4+JiYkoKCgkJCQICAgmMdadAAAAAXRSTlMAQObYZgAAAINJREFUGNNti1cSAyEMQwX20mGzJb3d/5YxJX+rGSw/IeNQJztp7eflz4ayAlSiPPij+qLc3vokPBIfZNqMmCpuT0QWnxT8F3WZ5IlrqfYjma4HQwMI4FsrcAPML6QC0dlirY2FJGSzlfcV7t5+GIi2GAW+oGn3j2qrGwwEJq1JBxzpB9l0A8JvhjyGAAAAAElFTkSuQmCC"
	}, {
		label:"Http to Https",
		url: "javascript:void(location.href='https:/'+location.href.replace(/http:\/\//i,%20''))",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgGCrAjoGB4ReUptgQf3yK/hOJyXIJUS4gpNmBHM1k20aWP/0p0WzHQHws0MYFMOBADUOGEAAAtLMgYRGzlKoAAAAASUVORK5CYII="
	}, {
		label:"URL向上一层",
		url: "javascript:if%20(location.pathname%20==%20%22/%22);%20else%20if%20(location.pathname.charAt(location.pathname.length-1)%20==%20%22/%22)%20location%20=%20%22..%22;%20else%20location%20=%20%22.%22;%20void%200",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABHRSTlMAPvpPlVb7NgAAACJJREFUCNdjwAdcQMABTVBIAEIzK0IFRECKECIINZjmEAYAb6UE1ZoIrJYAAAAASUVORK5CYII="
	}, {
		label:"查看明文密码",
		url: "javascript:(function()%7Bvar%20IN,F;IN=document.getElementsByTagName('input');for(var%20i=0;i<IN.length;i++)%7BF=IN%5Bi%5D;if(F.type.toLowerCase()=='password')%7Btry%7BF.type='text'%7Dcatch(r)%7Bvar%20n,Fa;n=document.createElement('input');Fa=F.attributes;for(var%20ii=0;ii<Fa.length;ii++)%7Bvar%20k,knn,knv;k=Fa%5Bii%5D;knn=k.nodeName;knv=k.nodeValue;if(knn.toLowerCase()!='type')%7Bif(knn!='height'&&knn!='width'&!!knv)n%5Bknn%5D=knv%7D%7D;F.parentNode.replaceChild(n,F)%7D%7D%7D%7D)()",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAjVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADqhzP4AAAALnRSTlMAtqa4rqqURQbFn4+EciQUDdbAvJxhCs6ximldV1BNSTwmHBr25+XLsnpYMjAfbW7huwAAAKRJREFUGNM9yFWuxEAMBdFqSneYM8yPwftf3sjSKMcfJV9UnMzWm+nMi82/b8vS1MM2AaTc8jJtOqAoWJUe4ieqaVD5CVvDLeuD+yh/YfaYO7XInLqdSEVnCFQiJVWP01o9kfOfSJuJDFhMSyZvTR2vIj4lg93D9Ws8/by7Cxw8lxzgP8aHdjhCyFhVBug267LrW81ixv0dHrMb9VfHwoXgigPAE+P4C0U7fVB0AAAAAElFTkSuQmCC"
	}, {
		label:"显示所有链接",
		url: "javascript:WN7z=open('','Z6','width=400,height=200,scrollbars,resizable,menubar');DL5e=document.links;with(WN7z.document){write('<base%20target=_blank>');for(lKi=0;lKi<DL5e.length;lKi++){write(DL5e[lKi].toString().link(DL5e[lKi])+'<br><br>')};void(close())}",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABFJREFUCNdjgAPzP0CEkw0DAKqRBzPWW0nIAAAAAElFTkSuQmCC"
	}, {
		label:"WP一键留言",
		url: "javascript:(function(){document.getElementById('author').value='%E5%AD%99%E5%AE%87%E5%8D%9A%E5%AE%A2';document.getElementById('email').value='972320721@qq.com';document.getElementById%20('url').value='sunyu.me';document.getElementById('comment').value='%E6%9D%A5%E5%8F%82%E8%A7%82%E4%B8%80%E4%B8%8B%EF%BC%8C%E6%AC%A2%E8%BF%8E%E5%9B%9E%E8%AE%BF';})()",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jd2SwQ3CMBAExxQyjQSJMnhQARW5BqoAKXEN/N2I+RiEggR2wiv7ufvs3Gm1sFJBPQFnYOj0TkBEndReM+peHVFLr/kNUnZLzU/9H1AzGb/tLR+Ehv11cQMhpoVFGoD0UeWcc1APwO0HIwFxTi11XtVjyyfzDGKF3HPOlxbAaj0Absok57WhMU0AAAAASUVORK5CYII="
	}, {
		label:"查找反向链接",
		url: "javascript:(function(){%20document.location.href='http://www.google.com/search?q=link:'+escape(document.location.href)%20})();",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGUlEQVQ4jb2SsUoDQRRFz66mSTGFKAi3sbC0EcUvUCGW2lqksjGFP2BnJ2hjm2ATMWipYCFYBuwD/sAF7YQVO41FVlyjsyEWXhgYmHvPY9578N+SlEo6lzQDMDEuIMuyfgjhDWiFEG6SnNoveF6BFdu9QtUEuAZqQ7xuCmA7+TxAA+hIqhaMu8AUUMk9G0APqMf+eSbpJL8vSHqSNF94b0uaBUgigACsAVfAPXBs+zTWl6gkHUm6KPNMloTXgS1gsQyQRsLTQItBk14k1ccCAE2gbfsOqAIHkpZz+LdF+gGQtAMI2Aew/QzsAU1JFdvvQAe4lTQXW6Ql2w9D4EsGPSmq++sYR0lSDTgENqNTGKFtYNX24x/zX/oA5V9RBLhEY9sAAAAASUVORK5CYII="
	}, 
{
		label:"今年还有多久?",
		url: "javascript:tdy6Nb5=new%20Date();w2RtxZ=tdy6Nb5.getYear();tG82Nu=(w2RtxZ<2000)?w2RtxZ+1900:w2RtxZ;YbU7v3w='December%2031,'+tG82Nu;var%20eY2FH9t=new%20Date(YbU7v3w);alert('Number%20of%20days%20left%20this%20year:%20'+Math.round((eY2FH9t.getTime()-tdy6Nb5.getTime())/86400000))",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4klEQVR42rWTsQ2DQAxF/w3ABAyAqBkAkpoF2ICGkoqCCgmJkoZpCAyAqBkA0bKBYyOCUBSSEIgly8V9P//z6RQOhppryXnZ2XvjvD4A9ASkDwMX/emA3StYA9TOZjof0Pc9FUWBtm1h2zbCMJzOsyyjuq7h+z5c11WbgKZpqCxLmKYpQlRVhWEYEEURkiSB53noug6GYai3VxCQZVlSEcfx2g0J1HGcbQALiAVie2piJ/Q1gO0R28NKhCAIaBxHpGkKXdcnV+zuNUCWxZOWNQtI0zRpwAxDnufqL894+DP9HHcX4nkR8RU2dwAAAABJRU5ErkJggg=="
	}, 
{
		label: "购物比价工具",
		oncommand: function() {
               gBrowser.loadURI("javascript:(function(){var%20s;s=document.createElement(%22script%22);s.type=%22text/javascript%22;s.charset=%22utf-8%22;s.src=%22http://www.gwdang.com/get.js?f=/js/gwdang_extension.js%22;document.body.appendChild(s);})();");
			   },
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzUlEQVQ4y6WTPQrCQBCFX1ghyHcEC9EL2CXYWthYeAuFiJWNJ7GzTecFvIBgJWinjbV1ChGMzQohxM2PD7aYnZnHe7szHrCU1JH0krRLkuSkmkizB/DVFMAdGNfpaeXiraSJpH1TBUPg+Y+Co6S3fY9SGGMeRZc3YFah+Qysi2zMjTHXEqvG/li/KNmzSc9BMCqzmQIDh/wLsHJJ3PwqyMjvugim+QnNTeuhbB7a+hdAAETf3QB8Gwe1lgyILMEiY6OSgtgShDYObRxn6z4vdzQsAV2dpAAAAABJRU5ErkJggg=="
	},
 {
		label:"飞驴视频解析",
		url: "javascript:location.href%20=%20'http://www.flvxz.com/?url='%20+%20location.href;",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcklEQVQ4jd3SsQ2DMBBG4U9iAIagYQcKaiZhGpqswyDZwE2GMI1BVmQjFKRIyZOuu/9Zvjv+hgkBsVIh9ew0eOSCgOHkgSH1QIs1iQ/ie6JARIcnlk8FAXMpc0XwwljLXBXkc/r+FyJ6lSHeXuPtQ/phNpewMd4q2yEXAAAAAElFTkSuQmCC"
	}, 

       {
				label: "搜索共享密码",
				image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAt0lEQVQ4ja2TvRECIRCFv9ECLrCESyzgWqCWSzW7YqzAuQ5swMgWLICIzAyT5fhxRTx9MzvDLrzHYwH4I3pgBhzg34STNX1J3gMWOABdZZNO1ljhLJhlohWTcBa4DztrTlxa8F+QM85GUb4RmzYBdxlbYKyqAYOQwtgXuSUeNXOdCqQOtDA1gROxu0bqY5JfFE6WGLHpFSdlDzKB1de4lcIA7IBro8AReADnUPj5KQeR1s/0Ql6NJxy8Siv3YY6WAAAAAElFTkSuQmCC",
				oncommand: function() {
               gBrowser.loadURI("javascript:(function(){w=open(('http://www.bugmenot.com/view/'+encodeURIComponent(location.host)),'w','location=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,width=500,height=400,modal=yes,dependent=yes');if(w){setTimeout('w.focus()',1000)}else{location='http://www.bugmenot.com/view/'+encodeURIComponent(location.host)}})();");
			   },
   },
{
		label: "谷歌以图搜图",
		url: "javascript:var%20googleImageSearch={init:function(){var%20a=document.createElement(%22div%22);a.id=%22toolTip4Google%22;a.innerHTML=%22%E7%82%B9%E5%87%BB%E5%9B%BE%E7%89%87%E6%90%9C%E7%B4%A2%22;document.body.appendChild(a);var%20b=document.documentElement.clientWidth,c=document.documentElement.clientHeight;a.style.color=%22red%22;a.style.backgroundColor=%22rgba(20,%2020,%2020,%200.4)%22;a.style.position=%22fixed%22;a.style.zIndex=%22999999%22;a.style.left=(b-%20a.clientWidth)/2+%22px%22;a.style.top=(c-a.clientHeight)/2+%22px%22;document.addEventListener(%22click%22,this,!1)},handleEvent:function(a){document.removeEventListener(%22click%22,this,!1);a.stopPropagation();a.preventDefault();a=a.target;if(a.localName==%22img%22){var%20b=%22http://www.google.com/searchbyimage?image_url=%22;b+=encodeURIComponent(a.src);window.open(b,%22_blank%22)}(a=document.getElementById(%22toolTip4Google%22))&&a.parentNode.removeChild(a)}};googleImageSearch.init();void%200;",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg=="
	},
{
		label: "展示所有图片",
		oncommand: function() {
               gBrowser.loadURI("javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images%5Bi%5D.src)==-1){outText+='<tr><td><img%20src='+document.images%5Bi%5D.src+'></td><td>'+document.images%5Bi%5D.height+'</td><td>'+document.images%5Bi%5D.width+'</td><td>'+document.images%5Bi%5D.src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}");
			   },
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxvvg6/eAAAAEnRSTlMA+ehJNOrxZz3e1MVLKyXEfVKQKrX3AAAAWUlEQVQY043PSQ6AMAgFUAQ6Dyr3P6xYo8Gu+hckPEICsJAiJruC2KlYIE8vxPiH6pDsyonMSAY8A7Cr0FJ4ALWoHBhSGNBhSI7QnUx34AztbrJsX6Qs/HoBLJEDskHKRZMAAAAASUVORK5CYII="
	},

 
];
	var menu = PageMenu({
		label: "多功能菜单",
		condition: 'normal',
		insertAfter: "context-inspect",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABBJREFUCNdjgID6fxCaIBcAcUwEeC1dweYAAAAASUVORK5CYII="
	});
	menu(items);
};


//当前页面
new function () {
	var items = [
	{
		label:"自动滚屏",
		url:"javascript:var%20AS_interval_pointer;AS_speed=4;AS_speed_temp=4;AS_speed_pairs=%5B%5B0,0%5D,%5B1,200.0%5D,%5B1,120.0%5D,%5B1,72.0%5D,%5B1,43.2%5D,%5B1,25.9%5D,%5B2,31.0%5D,%5B4,37.2%5D,%5B8,44.8%5D,%5B8,26.4%5D,%5B16,32.0%5D%5D;AS_last_onkeypress=document.onkeypress;AS_stop=function()%7BclearTimeout(AS_interval_pointer)%7D;AS_start=function()%7BAS_abs_speed=Math.abs(AS_speed);AS_direction=AS_speed/AS_abs_speed;AS_speed_pair=AS_speed_pairs%5BAS_abs_speed%5D;AS_interval_pointer=setInterval('scrollBy(0,'+AS_direction*AS_speed_pair%5B0%5D+');%20if((pageYOffset%3C=1)%7C%7C(pageYOffset==document.height-innerHeight))%20AS_speed=0;',AS_speed_pair%5B1%5D);%7D;AS_adj=function(q)%7BAS_speed+=q;if(Math.abs(AS_speed)%3E=AS_speed_pairs.length)%7BAS_speed=(AS_speed_pairs.length-1)*(AS_speed/Math.abs(AS_speed));%7D%7D;AS_pause=function()%7Bif(AS_speed!=0)%7BAS_speed_temp=AS_speed;AS_speed=0;%7Delse%7BAS_speed=AS_speed_temp;%7D%7D;document.onkeypress=function(e)%7Bif(e.charCode==113)%7BAS_stop();document.onkeypress=AS_last_onkeypress;return;%7Delse%7Bswitch(e.charCode)%7Bcase%2057:AS_speed=4;break;case%2048:AS_speed=0;break;case%2061:AS_adj(1);break;case%2045:AS_adj(-1);break;case%2032:AS_pause();break;default:break;%7D;%7D;AS_stop();AS_start();%7D;AS_stop();AS_start();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABHRSTlMAPvpPlVb7NgAAAC1JREFUCNdjQAEshBmMLIwQBpOIEFRERREqZ2IAU4RqqgsYgMxwACE4AyEFBwC6ugU6mH43HwAAAABJRU5ErkJggg=="
	},{
		label:"自动翻页",
		url:"javascript:(function(){if(window['pgzp']){_pgzpToggleBookmarklet();}else{window._page_zipper_is_bookmarklet=true;window._page_zipper=document.createElement('script');window._page_zipper.type='text/javascript';window._page_zipper.src='http://www.printwhatyoulike.com/static/pagezipper/pagezipper_10.js';document.getElementsByTagName('head')[0].appendChild(window._page_zipper);}})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYUlEQVQ4jWNgoBAwovH/U6ifJAP+MzAwMLDgkyTGVlwGYDgNF0A3AJtGdNcQNNyOgYHhF5TGB/CGF8wQfzya/iMz8GFcLqGeC3BpdsBnA8wAYqILVyz8x6Z/GKREQrZjAACcgyBE8VS2qwAAAABJRU5ErkJggg=="
	},{
		label:"自动刷新",
		url:"javascript:(function(p){open('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3EForce%3C/a%3E%3Cscript%3Efunction%20i(n){return%20d.getElementById(n)}function%20z(){c+=0.2;if(c%3E=t){c=0;e.location=u;r++}x()}function%20x(){s=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0||c/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22Reloads:%20%22+r;i(3).innerHTML=%22Time:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)}c=r=0;d=document;e=opener.top;u=prompt(%22URL%22,e.location.href);t=u?prompt(%22Seconds%22,60):0;setInterval(%22z()%22,200);if(!t){window.close()}%3C/script%3E%3C/body%3E')})('status=0,scrollbars=0,width=100,height=115,left=1,top=1')",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4jc3SsUoDQRQF0MMGtNpGiPZbxB/YUuy0CGmDP2BrLVhb2aXVLv8RO/tgnUaQpPALhBUt5hUhmQ3ZylwYGHhz75133+NQUeEFn2iwwARnmw+LDPkab0G+xBGG+MYcdfAecvwKK1y0/GwUwuMw2cI0lHO4xyzOAndtDictAsdrzo1MHl3QZtIdvbV7iQ+cYymF2UngBlf4wS1O8ZrhTNDH+2ZhJiX7JY2xzJDH0hi3MijwLCU9DJFHDKI2wFO0Ve/RmUraiRV+7Vjl/8cfKOMm/E47a8oAAAAASUVORK5CYII="
	},{
		label:"夜间模式",
		url:"javascript:(function(){var%20night=function(w){(function(d){var%20css='html{opacity:0.7!important;background:black!important;}body{background:white!important;}';var%20s=d.getElementsByTagName('style');for(var%20i=0,si;si=s[i];i++){if(si.innerHTML==css){si.parentNode.removeChild(si);return}};var%20heads=d.getElementsByTagName('head');if(heads.length){var%20node=d.createElement('style');node.type='text/css';node.appendChild(d.createTextNode(css));heads[0].appendChild(node)}})(w.document);%20for(var%20i=0,f;f=w.frames[i];i++){try{arguments.callee(f)}catch(e){}}};night(window)})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmaHTeAAAAIXRSTlMAxsDKvHPOw5pK97WmoYJ4bVtUQDAiCrCMimhhOCwbFwwUUO7SAAAAbUlEQVQY022OVw7AMAhDndl07z3vf8oqEapQFf/AAyOMqFJps5RxWUx2ZOwMqobxkAMCTPoGJOMAyX9QHPwEwKUI+orsZg68+zj56dvWls0qnH83KnKbDtsS7PqLRHla1YVaq4c2kxM6kaJGTC+MlANOz9LO6wAAAABJRU5ErkJggg=="
	},{
		label:"繁简转换",
		url:"javascript:(function(){var%20s=document.getElementById(%22tongwenlet_cn%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn.js%22;s.id=%22tongwenlet_cn%22;document.body.appendChild(s);%20})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAADs4udxvSaxAAAAAXRSTlMAQObYZgAAABtJREFUCNdjQADW0BAgycaAi2ANAbEccBMgAABgfgLQN3XpGgAAAABJRU5ErkJggg=="
	},{
		label:"简繁转换",
		url:"javascript:(function(){var%20s=document.getElementById(%22tongwenlet_tw%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_tw.js%22;s.id=%22tongwenlet_tw%22;document.body.appendChild(s);%20})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAADs4udxvSaxAAAAAXRSTlMAQObYZgAAABtJREFUCNdjQAKsoSFAUoUBK8EaAmI54CHAAACTvgQ4AxXYAgAAAABJRU5ErkJggg=="
	},{
		label:"高亮关键词",
		url:"javascript:%20(%20function%20()%7B%20var%20count=0,%20text,%20dv;text=prompt%20(%20%22%E8%AF%B7%E8%BE%93%E5%85%A5%E9%AB%98%E4%BA%AE%E5%85%B3%E9%94%AE%E8%AF%8D:%22,%20%22%22%20)%20;if%20(%20text==null%20%20%7C%7C%20%20text.length==0%20)%20return;dv=document.defaultView;function%20searchWithinNode%20(%20node,%20te,%20len%20)%7B%20var%20pos,%20skip,%20spannode,%20middlebit,%20endbit,%20middleclone;skip=0;if%20(%20%20node.nodeType==3%20%20)%7B%20pos=node.data.toUpperCase%20()%20.indexOf%20(%20te%20)%20;if%20(%20pos%3E=0%20)%7B%20spannode=document.createElement%20(%20%22SPAN%22%20)%20;spannode.style.backgroundColor=%22yellow%22;middlebit=node.splitText%20(%20pos%20)%20;endbit=middlebit.splitText%20(%20len%20)%20;middleclone=middlebit.cloneNode%20(%20true%20)%20;spannode.appendChild%20(%20middleclone%20)%20;middlebit.parentNode.replaceChild%20(%20spannode,middlebit%20)%20;++count;skip=1;%20%7D%7D%20else%20if%20(%20%20node.nodeType==1&&%20node.childNodes%20&&%20node.tagName.toUpperCase%20()%20!=%22SCRIPT%22%20&&%20node.tagName.toUpperCase!=%22STYLE%22%20)%7B%20for%20%20(%20var%20child=0;%20child%20%3C%20%20node.childNodes.length;%20++child%20)%7B%20child=child+searchWithinNode%20(%20node.childNodes%5Bchild%5D,%20te,%20len%20)%20;%20%7D%7D%20return%20skip;%20%7D%20window.status=%22Searching%20for%20'%22+text+%22'...%22;searchWithinNode%20(%20document.body,%20text.toUpperCase%20()%20,%20text.length%20)%20;window.status=%22Found%20%22+count+%22%20occurrence%22+%20(%20count==1?%22%22:%22s%22%20)%20+%22%20of%20'%22+text+%22'.%22;%20%7D)()%20;",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdUlEQVQ4jWNgGGjACKX/45FjwKGGEZ8kIQBXz0SEQg98CvAZ4MHAwDCLgYEhkGh3oYGjDAwMylCaZBcoQ+m7DAwMKxkYGPJItT2PAeJ/GMbrCmy2o8fKTCRXYQXIGmZCMTLwQBPDiHaapQOCgAWPKwgl5UECACwQGGYj5F3pAAAAAElFTkSuQmCC"
	},{
		label:"Readability",
			url:"javascript:(function(){x=document.createElement('SCRIPT');x.type='text/javascript';x.src='http://brettterpstra.com/share/readability.js?x='+(Math.random());document.getElementsByTagName('head')%5B0%5D.appendChild(x);y=document.createElement('LINK');y.rel='stylesheet';y.href='http://brettterpstra.com/share/readability.css?x='+(Math.random());y.type='text/css';y.media='screen';document.getElementsByTagName('head')%5B0%5D.appendChild(y);})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnbPKNAAAAI3RSTlMA+O/0xi/p4ZeFUUEI49HMcGhGPigUDurVubi0qomBdFosGkgxKCAAAABlSURBVBjTrYvHDcQwEMS4ypJzvOjYf5GGXIP5ITAY8gxnl26XqZuyo3jlLAzqVUkLhfTw93PpAuwyYj75LaZRAM2X+gegbX8PxlBoC8GBirk/IEhd6QGS9m9ZAGxs5+xpW0ce4QLyDgO0EbBIEQAAAABJRU5ErkJggg=="
	},
{
		label:"垂直分屏浏览",
		keyword: 'czfp',
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAZGRnExMS2trbgUhZ3AAAAAXRSTlMAQObYZgAAACVJREFUCNdjYFEUBAIhBwYmAwYGAQZmBQZGBiADiOjAgFsKdwYADc8DzUvmw0wAAAAASUVORK5CYII="
	},{
		label:"水平分屏浏览",
		keyword: 'spfp',
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAZGRnExMS2trbgUhZ3AAAAAXRSTlMAQObYZgAAACZJREFUCNdjgAMnQTBQYVCG8I0YBCAMRnwMQSiAixDDgFuBsBQGAPjBA2Ss8G+fAAAAAElFTkSuQmCC"
	},{
		label:"移除所有图片",
		url:"javascript:(function(){function%20toArray%20(c){var%20a,%20k;a=new%20Array;for%20(k=0;%20k%20<%20c.length;%20++k)a[k]=c[k];return%20a;}var%20images,%20img,%20altText;images=toArray(document.images);for%20(var%20i=0;%20i%20<%20images.length;%20++i){img=images[i];altText=document.createTextNode(img.alt);img.parentNode.replaceChild(altText,%20img)}})();",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFklEQVQ4jc3SPy9EQRQF8N+uREcUT6EgJIr1DUSyQUQpEgq+jKAgW9EoiEJCr9UoEBZR6JAt/Glka6HaYhVvJtZkt+ZWb+45590zZy5/XYUO/WFMYChw3lDFK0p4jNpiIpzEGS4xh170hO9r3ATxWLupm2HCUgdXJTTxjtUU3MIFsnDOUAnkOnaDuBSwO6xF8XywlfmpCk4wgHIQH7XgGV4wDTXMJI7qQRxtl/GRcBZwW5QH2UjAIkb9BFZDV8JpoBsW8ZBc4SBMHkcfjrGfXOEZs7Gxg9MARNuH+MQX9vwOuIqNxJFt+TPGtNvVcuCsx0brJsYNu0c/zuUbWMAIpgK+gqt2P2jKA3uSr3IZg6Hfusr/rL4BuIFAjab+mzQAAAAASUVORK5CYII="
	},
{
		label:"高亮选定区域",
		url:"javascript:function%20LightBox(){this.bindFn=function(c,d,e){if(typeof%20c!=%22string%22||typeof%20d!=%22function%22){return}var%20b=d.bind(this);e=e?true:false;var%20a={type:c,fn:b,userCapture:e};if(Object.prototype.toString.apply(this._fns)!==%22[object%20Array]%22){this._fns=[]}this._fns.push(a)};this.toBind=function(a){if(this._fns){this._fns.forEach(function(c,b,d){a.addEventListener(c.type,c.fn,c.userCapture)})}};this.init=function(b){var%20f=document.createElementNS(%22http://www.w3.org/1999/xhtml%22,%22div%22);if(!f){return}var%20e=Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth);var%20a=Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);f.style.cssText=%22position:%20fixed;%20border:%200px%20solid%20rgba(0,%200,%200,%200.5);%20top:%200;%20right:%200;%20bottom:%200;%20left:%200;%20margin:%200;%20padding:%200;%20z-index:%2099999;%20border-left-width:%20%22+e+%22px;%20border-top-width:%20%22+a+%22px;%20%22;var%20d=document.body||document.documentElement;var%20c=document.createElementNS(%22http://www.w3.org/1999/xhtml%22,%22div%22);if(c){c.style.cssText=%22width:%20100%;%20height:%20100%;%20margin:%200;%20padding:%200;%20-moz-box-sizing:%20border-box;%20box-sizing:%20border-box;%20%22;this._subBox=f.appendChild(c)}this.box=d.appendChild(f);this.width=e;this.height=a;this.later=b;b||this.toBind(f);f.addEventListener(%22mousedown%22,this,false);this.rect={x:0,y:0,w:0,h:0}};this.handleEvent=function(g){g.preventDefault();g.stopPropagation();var%20f=g.currentTarget;switch(g.type){case%22mousedown%22:this.x=g.clientX;this.y=g.clientY;f.style.borderLeftWidth=this.x+%22px%22;f.style.borderTopWidth=this.y+%22px%22;f.style.borderRightWidth=this.width-this.x+%22px%22;f.style.borderBottomWidth=this.height-this.y+%22px%22;f.style.width=%220px%22;f.style.height=%220px%22;this._subBox.style.border=%22none%22;var%20c=this;this._tid=setTimeout(function(){c._tid=0;f.addEventListener(%22mousemove%22,c,false)},100);f.addEventListener(%22mouseup%22,this,false);break;case%22mousemove%22:var%20a=g.clientX,i=g.clientY;f.setCapture(true);f.style.borderLeftWidth=Math.min(a,this.x)+%22px%22;f.style.borderTopWidth=Math.min(i,this.y)+%22px%22;f.style.borderRightWidth=this.width-Math.max(a,this.x)+%22px%22;f.style.borderBottomWidth=this.height-Math.max(i,this.y)+%22px%22;f.style.width=Math.abs(a-this.x)+%22px%22;f.style.height=Math.abs(i-this.y)+%22px%22;this._subBox.style.border=%221px%20dashed%20rgba(0,%200,%200,%200.6)%22;break;case%22mouseup%22:if(this._tid){clearTimeout(this._tid);this._tid=0}else{f.removeEventListener(%22mousemove%22,this,false);document.releaseCapture();var%20a=parseFloat(f.style.borderLeftWidth),i=parseFloat(f.style.borderTopWidth),b=parseFloat(f.style.width),d=parseFloat(f.style.height);this.rect={x:a,y:i,w:b,h:d};this.later&&this.toBind(f)}f.removeEventListener(%22mouseup%22,this,false);break}};this.uninit=function(){if(this.box){this.box.removeEventListener(%22mousedown%22,this,false);if(this._fns){this._fns.forEach(function(b,a,c){this.box.removeEventListener(b.type,b.fn,b.userCapture)},this);delete%20this._fns}this.box.parentNode.removeChild(this.box);delete%20this.box;if(this._subBox){delete%20this._subBox}}}}var%20hbox=new%20LightBox();if(typeof%20hbox.temp!=%22object%22){hbox.temp={}}hbox.temp.flag=0;hbox.bindFn(%22mouseup%22,function(a){this.temp.flag=0;this.box.removeEventListener(%22mousedown%22,this,false);this.box.removeEventListener(%22mouseup%22,arguments.callee,false)},false);hbox.temp.reselect=function(a){if(a.keyCode==a.DOM_VK_ESCAPE){++hbox.temp.flag;if(hbox.temp.flag==2){hbox.uninit();window.removeEventListener(%22keydown%22,arguments.callee,false)}else{hbox.box.style.borderLeftWidth=hbox.width+%22px%22;hbox.box.style.borderTopWidth=hbox.height+%22px%22;hbox.box.style.width=%220px%22;hbox.box.style.height=%220px%22;hbox.box.addEventListener(%22mousedown%22,hbox,false)}}};window.addEventListener(%22keydown%22,hbox.temp.reselect,false);hbox.init();void%200;",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUUlEQVQ4jZXSvWpUURTF8d9EvX6sQUgRC9G8gWBjJTaCjUKsVERIY2PlG6jgI0gqIY0gIhZia6EgWAVEYi3WGj8IsiF4JdrckOudGdFVHc5a6382nD0yUJI5LOM6TnbXb7GKB1W13c+PBuUGT7CAu3jdWadxC59xqap+zAKsdOVrVfVz4O3FQ3ysqpvDySU5nmQjyfyEuZuZ7zLHdu727ByaprmMtqoezQK0bbvVNM0J7Gvb9g3M9fxFfJhV7ul9lzUEfMGRfwAsdNkJwAuc735iqpKMsYSXE4Cqeoc13EsymlI+gMd4XlXr0yZgd3lW+pAk+/EM33CjX/gDUFWbOIdTuNKzrmIby8P9GE6gqr7jKc4mOZjkEM7g1XCNpwI6/cJFbOATLuDwtOAsAKxW1biqxriPrf8BrGMpydEki900a395bFJJbif5mmQzyZ1Zud8PpmLu1nwFDAAAAABJRU5ErkJggg=="
	},{
		label:"关键词密度查询",
		url:"javascript:(function(){var%20T=%7B%7D,W=%5B%5D,C=0,s,i;%20function%20F(n)%7Bvar%20i,x,a,w,t=n.tagName;if(n.nodeType==3)%7Ba=n.data.toLowerCase().split(/%5B\s\(\)\:\,\.;\<\>\&\'\%22%5D/),i;for(i%20in%20a)if(w=a%5Bi%5D)%7Bw=%22%20%22+w;T%5Bw%5D=T%5Bw%5D?T%5Bw%5D+1:1;++C;%7D%7Dif(t!=%22SCRIPT%22&&t!=%22STYLE%22)for(i=0;x=n.childNodes%5Bi%5D;++i)F(x)%7DF(document);for(i%20in%20T)W.push(%5BT%5Bi%5D,i%5D);W.sort(function(a,b)%7Bvar%20x=b%5B0%5D-a%5B0%5D;return%20x?x:((b%5B1%5D<a%5B1%5D)?1:-1)%7D);%20s=%22<h3>%22+C+%22%20words</h3>%22;for(i%20in%20W)s+=W%5Bi%5D%5B0%5D+%22:%22+W%5Bi%5D%5B1%5D+%22<br>%22;with(open().document)%7Bwrite(s);close()%7D})()",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdUlEQVQ4jWNgGGjACKX/45FjwKGGEZ8kIQBXz0SEQg98CvAZ4MHAwDCLgYEhkGh3oYGjDAwMylCaZBcoQ+m7DAwMKxkYGPJItT2PAeJ/GMbrCmy2o8fKTCRXYQXIGmZCMTLwQBPDiHaapQOCgAWPKwgl5UECACwQGGYj5F3pAAAAAElFTkSuQmCC"
	},
		


];
	
	var menu = PageMenu({
		label: "阅读辅助工具",
		condition: 'normal',
		insertAfter: "context-inspect",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiklEQVQ4je3SIQ7CcAzF4Y8Fj5hBYpEkOBSXWIKY5VQoOAYaw8QMB9gJMBgcCLpkIeEPyQQInmn7fknzmpRvaxB1jhWWmIbXYI8jZi/YNgujwgVr5BijxBm7J5Z3WNUmuSVSJlmWgB/pv+AXFgw7/QYLTGJucHjH2gQ1Tigw8vi2IrxrgtV9L+ivO97LHdW2qVgKAAAAAElFTkSuQmCC"
	});
	menu(items);
};


//屏幕截图
/*
var pagejt = PageMenu({label:"屏幕截图选项",insertBefore:"context-openlinkincurrent",condition: "noselect nolink nomailto noimage nomedia noinput",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAAAAUFBTt7e3Hx8eurq6Tk5M4ODghISH39/fw8PDe3t7ExMS1tbWysrKDg4N5eXljY2NISEgwMDAbGxvi4uLZ2dkRvepmAAAAAXRSTlMAQObYZgAAAGlJREFUGNOFjksOgCAMRIfy96+g9z+qlFAWxMS3afo6SQef2KwK2co+keFhaOKhBqBQr/tuwDRxhuMIZ0k34XwEonc9kRYUltQFaRaabhHe1jb+EbGFGZjDFkXA0XWRk7eMXlctPQbwywtVwwJZNaztNQAAAABJRU5ErkJggg==",});
pagejt([
{label:'选择区域截图',oncommand: function() {	 var path ="..\\..\\..\\Software\\snapshot.exe"; var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile); file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path)); file.launch(); return file; }, image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUUlEQVQ4jWNgoBAwQun/FOony4D/DAwMDEzYBPHQ+E2jpgtItmAYugAbLQ9lp5HjAnmomjQshhNlAMzm/+QagKyZbBegg/8MDAwMLBQaQjkAADuKJsCqgn0yAAAAAElFTkSuQmCC"},

{label:'隐藏火狐截图',oncommand: function() {	document.getElementById("titlebar-min").click();    var path ="..\\..\\..\\Software\\snapshot.exe"; var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile); file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path)); file.launch(); return file; },
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAZGRnExMS2trbgUhZ3AAAAAXRSTlMAQObYZgAAACBJREFUCNdjgAMnQTBQYVCG8I0YBCAMRqoz4FYgLIUBANVmAu3tf1vbAAAAAElFTkSuQmCC"},

{label:'可见区域截图',oncommand:function() {var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");canvas.width = content.innerWidth;canvas.height = content.innerHeight;var ctx =canvas.getContext("2d");ctx.drawWindow(content,content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVQ4jd3Orw3CYBCG8V9JJQMgKjoCkoQg2IRRukMHqEQiOkM9IyBwFYzQGkB8yaVNERDe5HJ/nrvLy7eV4YxdwAvcA3bDEYYETPV9Oh9mRP/Mj6QHl8DilGrIscEpWNqjC1j5KpqFDipYLTx+6w8eZGixDvgW14DlOHxq4Ac0Am4mHKhHtyEUAAAAAElFTkSuQmCC"},
{label:'所有区域截图',oncommand:function() {var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");canvas.width = content.document.documentElement.scrollWidth;canvas.height = content.document.documentElement.scrollHeight;var ctx = canvas.getContext("2d");ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUElEQVQ4jWNgGGjACKX/UyiPUwE+8J+BgYGBBZsgEQBuM7oBKJL4bIYBJiJtJBoQ4wXqugBmANmxQLELsMUCSa5BN4BQFOI1AJvNhJLyIAAAHYkNFxbl8rAAAAAASUVORK5CYII="},
{label:'整个界面截图',oncommand:function() {var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");canvas.width = innerWidth;canvas.height = innerHeight;var ctx = canvas.getContext("2d");ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVQ4jc2TUQoAIQgFZ7tWJ9j738GOYT+yGLuJVB87ECE+n0IGm1yABjnPTDdPJNDighsQM4yOmPY1gQA10bWa9qlVH2RH/6pZMaBEqgz/MDi2B438M7bBxe6VRRr2YAU98pm26DYbLS+yhmczAAAAAElFTkSuQmCC"},
{
		label:"录制GIF动画",
    oncommand: function() {	  var path ="..\\..\\..\\Software\\GifCam.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));file.launch();  return file; },
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcklEQVQ4jd3SsQ2DMBBG4U9iAIagYQcKaiZhGpqswyDZwE2GMI1BVmQjFKRIyZOuu/9Zvjv+hgkBsVIh9ew0eOSCgOHkgSH1QIs1iQ/ie6JARIcnlk8FAXMpc0XwwljLXBXkc/r+FyJ6lSHeXuPtQ/phNpewMd4q2yEXAAAAAElFTkSuQmCC"
	},
{
		label:"打开系统画图",
		exec:"C:\\Windows\\System32\\mspaint.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABg0lEQVQ4y6WTT2TWcRzHX/P8jHgyIkYseR+i0w7ZqXgUMVHq2JhiduiylHaNGKPLEkWKTrt0iuj0sBQPnR6mU17iIcYujXh4NNvlu/ya7dH0PX2+b9/3+/Pv/YX/PCP7gST3gYfAODAAXqt3jyLwG7gITADPgJPAabV3kEB1ANYo2VeAFvAV+JCkpW7+SwU7wAYwrXbL/RFwFbiibh1aQZJLwBZwXe3u4erjJCeAn0k2gVVgUR1UNfIF4G3J/CVJA3gO9JM01XtJxoDbwALQBOaqQp4q5Jtqp2iOA/MlngQ+A3PAGHADuAZQJZkE3gOz6sda2T+SPChb2BNtAmdKPAowkqQN9NQ7wwyT5BjQBr4Dt4Bf6vEKmAHWkiyoTw8hjwLvgC6wXAQ6f9aY5BSwBjxRX+4jN8p8+upMkgngG3BeXa9q/V4GPiUZqG9qGq+KuWZr2JK6/pcP1F6SVmlnoK4mWSmWnla3y9Nt4MUwJ54tw+oUckvtH+mLJjmXpF2MM/TsAl3+lg4Uo18cAAAAAElFTkSuQmCC"
	}
]);
*/



//复制链接文本地址
new function () {
	var items = [
		{ 
			command: 'context-copylink' ,
			image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
		},
		{
		label:"复制链接文本",
		text:"%LINK_TEXT%",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGCzgPxZMSA2GJKkWEmXAfwYGBg9yDfBgYGCYCcXEWogCjjIwMChDaZIBssY8KCYJ5DGghjhJrlBmwPTjTKg4ToCsAVvAeaCJ0S8dkGQARUl54AAAWsMsNkwmkt8AAAAASUVORK5CYII="
	},
	{
		label:"复制链接文本+地址",
		text:"%LINK_TEXT%\n%l",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
	},
];
	var menu = PageMenu({ condition:'link', insertBefore:'context-openlink', onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//打开链接的各种方法
new function () {
	var items = [
	{
    label:"在新标签页打开",
	  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4jWNgGCyAjYGBYRIDA8NrBgaG/0Tg11D1bDADJjEwMOxmYGAQJ9JCcaj6VpjAaxI0IxvyGsb5j0chXjkmEm3FABQbwIJDHN3ZyHxGYjQQLTfwYUCMAVj9TDUXwEzHF1C0BQCpARnHXF2p+wAAAABJRU5ErkJggg==", 
	  oncommand: "gContextMenu.openLinkInTab();",},
{
			label: '当前标签页打开'
			,image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWNxwqAAAAB3RSTlMA6xeSuwaF7u2ifAAAADBJREFUCNdjwASshuVAUGjKwOwE4jK5MTAqgCUUGdghKtixMtiBuuAixDLKIQBuOQBI1gi6H+1sQAAAAABJRU5ErkJggg=="
			,oncommand: 'document.getElementById("context-openlinkincurrent").doCommand();'
		},
	{
		label:"在谷歌缓存打开",
		url:"http://webcache.googleusercontent.com/search?q=cache:%l",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdklEQVQ4jc2SsQ3AIAwEbwGK1NmFDdIwE3OxCCOkZYAU+RSRMEFyIuUkN7Z5vwH4IxtQgKYoyk2RgQokICiScnlmcgWWTm1RbeikaJpFUo9J47RsEdTznYB7BfclwvgZGxCfBC4nvY8UgX1WxOJVkdUj4jp84wDU6yD4kZGU+wAAAABJRU5ErkJggg=="
	},
	{ command: 'context-copyemail' },
	{
		label:"在隐私窗口打开",
		oncommand:"gContextMenu.openLinkInPrivateWindow();",
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
	},
	{
		label:"在侧边栏中打开",
		oncommand:"openWebPanel(gContextMenu.linkText(), gContextMenu.linkURL);",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC"
	},
	{
		label:"IE浏览器中打开",
		text:"%l",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jWNgoAJYzsDAcB8H/o1Hbj/MgP9E0q/RaJg4w38i8Gso/R6Nz8DAwMCwnoGBQQEHtsEjNxlmwHEGBoYEHHg2HrnNMAPmM5AHGogxQAGqkIVcAxgYIAF2moGBQYNcAzYzQEL8OwMDgwM5BtRADbjOgOoVog3QgOLzUMNINgDZoBxKDEAHcAM2M0AyBjb8Ho/cYTItRgUAXItLMzITnmsAAAAASUVORK5CYII="
	}];
	var menu = PageMenu({ condition: 'link', insertBefore:'context-openlink', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//复制文本
new function () {
	var items = [
	{ command: 'context-copy',
	  image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII=" },
	{
		label:"复制纯文本",
		text:"%SEL%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGCzgPxZMSA2GJKkWEmXAfwYGBg9yDfBgYGCYCcXEWogCjjIwMChDaZIBssY8KCYJ5DGghjhJrlBmwPTjTKg4ToCsAVvAeaCJ0S8dkGQARUl54AAAWsMsNkwmkt8AAAAASUVORK5CYII="
	},
{
		label:"复制源代码",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAABmZmbc3Ny3t7eRkZE6OjpRDxSxAAAAAXRSTlMAQObYZgAAADJJREFUCNdjwASCECDAIADhY2UwMQoKsgqAGUyMJiAGoyATYzJMhEEYxhDAoh1hBQYAAPxVA4qkxzcpAAAAAElFTkSuQmCC",
	oncommand: function () {
			var div = content.document.createElement('div');
			div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(div.innerHTML);
		}},
	{
		label:"复制BBCode",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAAAAAADd3d1EREQiIiKIiIh3d3czMzPMzMyqqqpVVVURERHu7u6A1ky6AAAAAXRSTlMAQObYZgAAADtJREFUCNdjwASCECDAIADhIzMYBQsMpRWADBaGCiO2ALCIg6EgRCTViHMBjLEILFVjKN2AxRyEFRgAAGitCNm3Ki02AAAAAElFTkSuQmCC",
		oncommand: function () {
			var div = content.document.createElement('div');
			div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
			function HTMLtoBBCode(a){function b(k,g,j,h,f){this.pos=k;this.font=g;this.face=j;this.size=h;this.color=f}fl=new b(50);fc=new b(50);al=new b(50);function e(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<FONT",l);if(l!=-1){m=h.indexOf(">",l);fl[g]=new b(0,0,0,0,0);fl[g].pos=l;fl[g].font=1;k=h.substring(l,m);if(k.search(/FACE/)!=-1){fl[g].face=1}else{fl[g].face=0}if(k.search(/SIZE/)!=-1){fl[g].size=1}else{fl[g].size=0}if(k.search(/COLOR/)!=-1){fl[g].color=1}else{fl[g].color=0}l++;g++}}for(l=0;l!=-1;l){l=h.indexOf("</FONT>",l++);if(l!=-1){fc[f]=new b(0,0,0,0,0);fc[f].pos=l;fc[f].font=1;for(ii=g-1;ii>=0;ii--){if(fl[ii].pos<l){if(fl[ii].font==1){fl[ii].font=0;fc[f].color=fl[ii].color;fc[f].size=fl[ii].size;fc[f].face=fl[ii].face;ii=-1}}}l++;f++}else{fc[f]=new b(0,0,0,0,0);fc[f].font=0}}}function d(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<A HREF",l);if(l!=-1){m=h.indexOf(">",l);al[g]=new b(0,0,0,0,0);al[g].font=1;k=h.substring(l,m);if(k.search(/MAILTO:/)!=-1){k=k.replace(/<A HREF=MAILTO:/,"");k=k.replace(/\"/,"");k=k.replace(/\'/,"");al[g].pos=1;k=k.toLowerCase();al[g].face=k}else{al[g].pos=2}l++;g++}else{al[g]=new b(0,0,0,0,0);al[g].pos=0}}}e(a);a=a.replace(/<SCRIPT[^>]*>/gi,"<TEXTAREA>");a=a.replace(/<\/SCRIPT>/gi,"</TEXTAREA>");a=a.replace(/ = /gi,"=");a=a.replace(/=\"/gi,"=");a=a.replace(/=\'/gi,"=");a=a.replace(/<param name=movie[^>]*value=/gi,"<movie=");a=a.replace(/\s+BORDER=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TARGET=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASSID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+NAME=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+STYLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASS=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ALT=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TITLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+REL=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ONCLICK=[^\'\">]*[\'\">]/gi,"");a=a.replace(/<A\s*HREF/i,"<A HREF");d(a);a=a.replace(/<BR>/gi,"\r");a=a.replace(/<BR(.*?)\/>/gi,"\r");a=a.replace(/<P>/gi,"\r\r");a=a.replace(/<P [^>]*>/gi,"\r\r");a=a.replace(/<CODE>/gi,"[code]");a=a.replace(/<\/CODE>/gi,"[/code]");a=a.replace(/<BLOCKQUOTE>/gi,"[quote]");a=a.replace(/<\/BLOCKQUOTE>/gi,"[/quote]");a=a.replace(/<UL[^>]*>/gi,"[list]");a=a.replace(/<\/UL>/gi,"[/list]");a=a.replace(/<OL[^>]*>/gi,"[list=1]");a=a.replace(/<\/OL>/gi,"[/list]");a=a.replace(/<LI>/gi,"[*]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<BIG>/gi,"[b]");a=a.replace(/<\/BIG>/gi,"[/b]");a=a.replace(/<B>/gi,"[b]");a=a.replace(/<\/B>/gi,"[/b]");a=a.replace(/<U>/gi,"[u]");a=a.replace(/<\/U>/gi,"[/u]");a=a.replace(/<I>/gi,"[i]");a=a.replace(/<\/I>/gi,"[/i]");a=a.replace(/<EM>/gi,"[i]");a=a.replace(/<\/EM>/gi,"[/i]");a=a.replace(/<h\d>/gi,"\r\r[b]");a=a.replace(/<\/h\d>/gi,"[/b]");a=a.replace(/&nbsp;/gi," ");a=a.replace(/<FONT Face[^\'\">]*[\'\">]/gi,"<FONT");a=a.replace(/ FACE=[^\'\"]*[\'\"]/gi,"");a=a.replace(/<STRONG>/gi,"[b]");a=a.replace(/<\/STRONG>/gi,"[/b]");a=a.replace(/<TR[^>]*>/gi,"\r");a=a.replace(/<TD[^>]*>/gi," ");a=a.replace(/<TH[^>]*>/gi," ");a=a.replace(/<\/TR>/gi," ");a=a.replace(/<\/TD>/gi," ");a=a.replace(/<\/TH>/gi," ");a=a.replace(/<FONT SIZE=/gi,"[size=");a=a.replace(/<FONT color=/gi,"[color=");a=a.replace(/ color=/gi,"][color=");a=a.replace(/ size=/gi,"][size=");var c;for(i=0;fc[i].font!=0;i++){c="";if(fc[i].color==1){c=c+"[/color]"}if(fc[i].size==1){c=c+"[/size]"}a=a.replace(/<\/FONT>/i,c)}for(i=0;al[i].pos!=0;i++){if(al[i].pos==2){a=a.replace(/<A HREF/i,"[url");a=a.replace(/<\/A>/i,"[/url]")}if(al[i].pos==1){a=a.replace(/<A HREF[^<]*<\/A>/i,al[i].face)}}a=a.replace(/<[^>]*>/g,"");a=a.replace(/>/g,"]");a=a.replace(/\'>/g,"]");a=a.replace(/\">/g,"]");a=a.replace(/\']/g,"]");a=a.replace(/\"]/g,"]");a = a.replace(/\[url\=([^\]]+?)\]|\[img\](.+?)\[\/img\]/g, function($0,$1,$2){if($0.indexOf("http://")<0){var u = $1||$2,b="/";if(u){if(/^\.?\//.test(u)) b = "";return $0.replace(u,content.location.origin+b+u)}}else{return $0}});return a};
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(HTMLtoBBCode(div.innerHTML));
		}
	},
{
    label: "保存选定文本",
    condition: "select",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeElEQVQ4jWNgoBJYz8DA8J8Afs7AwNDOwMDAgs2A/1B6O5IGZHCZgYFBgoGB4ToDA8NqbIbANMzHYcB+KI3TEGINQDaEJBfcxqEeQyACqvg+Gr5MrAHEgkFsgBgDA8N7BkioY8NEGbAfXRKL+CA04DQD4cyEjqkDAH5+TabhljjtAAAAAElFTkSuQmCC",
    oncommand: function() {
        if (!window.NetUtil) Cu.import("resource://gre/modules/NetUtil.jsm");
        if (!window.FileUtils) Cu.import("resource://gre/modules/FileUtils.jsm");

        goDoCommand('cmd_copy');
        var data = readFromClipboard();

        var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
        fp.init(window, "另存为", Ci.nsIFilePicker.modeSave);
        fp.appendFilter("文本文件", "*.txt");
        fp.defaultString = content.document.title + '.txt';

        var res = fp.show();
        if (res != Ci.nsIFilePicker.returnCancel) {
            var aFile = fp.file;

            var ostream = FileUtils.openSafeFileOutputStream(aFile);

            var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
            converter.charset = "gbk";
            var istream = converter.convertToInputStream(data);

            NetUtil.asyncCopy(istream, ostream, function(status) {
                if (!Components.isSuccessCode(status)) {
                    // Handle error!
                    return;
                }

                aFile.launch();
            });
        }
    }}
];
	
	var menu = PageMenu({ condition:'select', insertBefore:'context-paste', onpopupshowing: syncHidden,image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="  });
	menu(items);
	//page({ condition:'select', insertBefore:'context-sep-copylink' });
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }')
	});
};


/*右键加图标*/
//链接另存为
page(
  { id: 'context-savelink',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeElEQVQ4jWNgoBJYz8DA8J8Afs7AwNDOwMDAgs2A/1B6O5IGZHCZgYFBgoGB4ToDA8NqbIbANMzHYcB+KI3TEGINQDaEJBfcxqEeQyACqvg+Gr5MrAHEgkFsgBgDA8N7BkioY8NEGbAfXRKL+CA04DQD4cyEjqkDAH5+TabhljjtAAAAAElFTkSuQmCC" 
});
//图像另存为
page(
{ id: 'context-saveimage',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxvvg6/eAAAAEnRSTlMA+ehJNOrxZz3e1MVLKyXEfVKQKrX3AAAAWUlEQVQY043PSQ6AMAgFUAQ6Dyr3P6xYo8Gu+hckPEICsJAiJruC2KlYIE8vxPiH6pDsyonMSAY8A7Cr0FJ4ALWoHBhSGNBhSI7QnUx34AztbrJsX6Qs/HoBLJEDskHKRZMAAAAASUVORK5CYII="
});
page(
{ id: 'context-bookmarklink',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCUlEQVQ4jbWSoVLCYRDELzDM3e2PGSPBRzASCAQCgWAwEIxEI8FgpPswBh6ASDQYCDwA8R8IBIIGPh1F/jgw4858aW/3dr5bs/9EZnbcfXCxATAHVmbWOFvs7n2gAlaSxpdun0oan5Oi7e59SU9AZWZXZtYoKZ4lDc3s+pdK0gzYADtgKWn2PXZm3gIvwBuwLW/xZRARPaCSNPkrYkSMgG1EjA6JHrA5ZVIrPjQ5NhAR3TruB4DFsaHM7ADrk+JiUDWbzRuzfRcy8+6TarVa77a/TC3awLZsmwNrYAW8lmItI6Jbq5Y0LKesJD2amZtZo5RpDewy86HWwN0HwLQmpkuaRMT9yT84Fx9MUjjgcgk5VgAAAABJRU5ErkJggg=="
});
//复制
page(
{ id: 'context-copy',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
});
//撤销
page(
{ id: 'context-undo',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAAAAAAAAAAAAAAABAQERAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAABAQEAAAAAAAAAAAABAQEAAAABAQECAgIDAwMBAQEAAAACAgIBAQEAAAAAAAAg8UzUAAAAHHRSTlMA5xG9Rg3yUyDEr5qSaFsY+eHOyLi1Yk4+Oy4GjDFPOAAAAGJJREFUGNOFj1kKwCAMRNVUa127r97/nF3UgqHQ+QiZR4Yh5JYnpSrKkN8Kz0R4JEaXSE33a3JWD8AySYuBdCNzHCzuaxDgAoP2LwJzLNE8ep1rTWfl4V0/vT+tigaqFvKlE4jpAvNwMHn3AAAAAElFTkSuQmCC"
});
//剪切
page(
{ id: 'context-cut',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
});
//粘贴
page(
{ id: 'context-paste',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVQ4jWNgoAaQlJT8j44lJCTqSTIAnS8hIXGFaEOwGSAuLi5GtCHYDEDGJBuAyyCcYYPPAHQ+Vm+RYgDWsCHFAKxhQ6wBOOWwBRahGKAodoaYAeSED0kAAOILU0uDB0+zAAAAAElFTkSuQmCC"
});  
//删除
page(
{ id: 'context-delete',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATklEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyBBCBqBjkgwgSi1M0APKVsbBJ2gAsqY8LJqJMgCXzfRxAVXCgBCgnQGkYOoAAAV3QUQ5G1NkAAAAAElFTkSuQmCC"
});     
//此框架
page(
{ id: 'frame',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVQ4y7XSuw2FMBBE0RO4CEJKoAOoiN7IaQuhpxeYxAGywBgBI222M7r74QO1iJX1SBGCDxUwY8GKX4Ydc5zSfD3+qU4Djgj25j5RVAfkZncJcjNMtQFNWtx4dcYSQVcy1O6g1DM8DfDKJ4abFO9rA1D9MeUVPKkRAAAAAElFTkSuQmCC"
});
//打开链接
page(
{ id: 'context-openlinkincurrent',clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVQ4y7XSuw2FMBBE0RO4CEJKoAOoiN7IaQuhpxeYxAGywBgBI222M7r74QO1iJX1SBGCDxUwY8GKX4Ydc5zSfD3+qU4Djgj25j5RVAfkZncJcjNMtQFNWtx4dcYSQVcy1O6g1DM8DfDKJ4abFO9rA1D9MeUVPKkRAAAAAElFTkSuQmCC"
});
/*
//分享此页面     
page(
  { id: 'context-sharepage',insertAfter:"context-inspect",clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC" 
});
*/
//播放速度     
page(
  { id: 'context-media-playbackrate',clone :false,image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAI0lEQVQ4jWNgGNbgPxQPDgPIMoxmBuA1jBhNowZQIX0MMgAAHXQ5x38zRc4AAAAASUVORK5CYII=" 
});



//添加页面右键菜单项
	/*{page([
		label: "弹窗翻译所选文本",
		condition: "select",
		oncommand: "gTranslator.selectionTranslation();",
		insertBefore: "context-selectall",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFCSURBVDhPnZExSwNBEEZPESStP8PKP2Fnr1hYiI2dkEoQJKWCnVXEIpDGQsRGJGKhFsKBHpEIFokJ4VQkpFMLm5E3OsvcmRBx4XG3e/u9md2LGB9vPfH0e+3A6/OD6KZhIx+u1Y5kb383I3h5uh8uIURgfaOoLC0vKjaHtNv4m8AHvWikAK7jCw0kjVgDq6UtWYslMH8pMnf2LjMnIlMHn4oK/IVZRTravumPFKjEC7hAaz0fPm+mCpKBgsfWbebshAy6sb/Bu4UL5VQiPnDuiWJT74EumFvLQGXbR6FfAsIGFwicFRBQ+TBOtDoC1girwIcNAiYghHDzNNEgAmRBwPBh5mMLx6FN+60EDdamKx2Z3Kl/C8ZXrjTMExCArzhbvVPoBAHPjCAfNhAQtJaBy4YgYAySsAF82NaMn/h/RxR9Ab4TXij6pKP0AAAAAElFTkSuQmCC"
 },
]);
*/

//当前页面
new function () {
	var items = [
{
    label: "编辑当前页面",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzklEQVQ4y73SIUuDYRAA4FMeNK9Pqz/B4mSbQ2Wg/8E2g+CPEctYXzcZrNaJQYMsj7kiBmHwhZULMsTt+8KuvO8dPPDevRexqUALL/jCHXbL4EvMcY09POC+DP7EIM8mapiXwYeZn2R+hY9S+Fd9mO20quAjzNCtghuJz6vgduKz/3AXP2gs1TuJ26uG9pqL8o6DrJ0mbq7C+5hiGz2Ms50Zjtf57xv0876DEb6X2/krthI9RsRbRNQi4iIixhFxWxTF87rrOsFTvqQem4wFTec0RRu9Et4AAAAASUVORK5CYII=",
    oncommand: function() {document.onkeydown=ck;content.document.body.contentEditable=true;function ck(e){k=window.event?window.event.keyCode:e.keyCode;if(k==27){content.document.body.contentEditable=false}}}
},
{
                label: '解除右键限制',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEUAAAAAAAC4uLjb29tmZmY6OjqRkZHr6+vIyMiurq6enp6fJmq8AAAAAXRSTlMAQObYZgAAAGVJREFUCNdjQAJMS5MawHSgoKAYiFEYwMBg6ABkhACxYhhQJgCIhQwNGFgTgAIKLAkMjAZAAQY2ByADKMDABGIABUAiLAlAAQZWoKCQEEg/EDsCBZhBHBYhY2MgBwgmCgoGIbkBAF+5CxbmrSXzAAAAAElFTkSuQmCC",
                oncommand: function() {
                gBrowser.loadURI("javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)");
                }
                },  	
{
    label: "跨平台浏览",
    keyword: 'view',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAc0lEQVQ4jaWS0RHAIAhDY68DuAH7j8UEdQP7U6xnOTUlv14eIQgElQBARC4AmTWrasIDqKzZPAdrnNL+6CSGeD2VbQCA3Ep7oTXcQRjQVpgVOUZ3AazRZCsU71FE6urEywk9bJZgW6qa+tWYBO5HYgN8dAMYYCHKphsA+AAAAABJRU5ErkJggg=="
},
			{
				label : '地形图查看',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAvVBMVEUAAABqampqamoFAQEFAAEFAQIEAQFtbW0EBwUTwVYFAAFra2sFAgJqamoGCwhxcXFwcHBtbW0HBQUFBAQTw1YFDggJNRmAgIB8fHxqamoHAAMGAAIGEgoFAAAHEgtubm4EAgIKFA4HDgkGBAQCAgIEBAQUzlxqamoOkUANaDBxcXFubm53d3eAgIBvb2+EhIQHAAQGAAIFAABsbGwJNhljY2MKNhoGAAEGCQcFBwQPfDkOZS8TxFcOZS9qamrBNwEKAAAAPnRSTlMA8g2ttZ2vpAoEuqinoBLy6pxXTxcXBffz5822srGuoKCSal1JRRoYFg39/fTs6unYxLy2srCvkV9fHxwSCRMA9p8AAAC9SURBVBjTPYtVtsJQFENzvbdCSw13HvLcDZn/sEhZwP45J3slaLgz2tqBKXDB6HkFVHMd1yD12/cW8OXe/3/2A4qf8cdLmmZR4ibJcMp9iM6RgLQPYYHpLx6ZhaRwyBV0Cw+3xibQUPCZEKK3llJGK1iKMuK/7tE+ezSTMgFpZvfAAPEfHLMUFF0sLZbv2/a10YHNATNMJs5FWdp9+prFAIL+eFdvVp7v7LVCY9Ro0eIp4hHPmdyESoVmAXICpIIRwKR2BIMAAAAASUVORK5CYII=",
				url: "javascript:(function(){function%20crawl(e,%20r){if%20(e.nodeType!=1)return;var%20ch%20=%20e.firstChild;while%20(ch!=null){crawl(ch,%20r+1);ch=%20ch.nextSibling;}var%20c%20='#'+r.toString()+r.toString()+r.toString();%20if(r>9)%20c='#FCC';e.style.color='white';e.style.background='none';e.style.backgroundColor=c;e.style.borderColor=c;}crawl(document.getElementsByTagName('body')[0],%200);})()"
			},
{
    label: "屏幕尺子",
    url: "javascript:void('http://centricle.com/tools/favelets/');marqueeColor=prompt('Marquee%20Color:','red');initMarquee=document.createElement('div');marquee=document.body.appendChild(initMarquee);marquee.style.position='absolute';marquee.style.border='dashed%201px%20red';initControls=document.createElement('div');controls=document.body.appendChild(initControls);controls.style.position='absolute';controls.style.top='-300px';controls.style.left='-300px';controls.style.width='85px';controls.style.background='%23eee';controls.style.padding='5px';controls.style.border='solid%201px%20%23ccc';controls.style.font='10px%20verdana,sans-serif';controls.style.width='85px';controls.style.zIndex='99';controls.innerHTML='%3Cb%3ECurrent:%3C/b%3E%3Cbr%3E%20x:%3Cspan%20id=%22currentX%22%3E0%3C/span%3E%20y:%3Cspan%20id=%22currentY%22%3E0%3C/span%3E%3Cbr%3E%3Cb%3EBegin:%3C/b%3E%3Cbr%3E%20x:%3Cspan%20id=%22beginX%22%3E0%3C/span%3E%20y:%3Cspan%20id=%22beginY%22%3E0%3C/span%3E%3Cbr%3E%3Cb%3EEnd:%3C/b%3E%3Cbr%3E%20x:%3Cspan%20id=%22endX%22%3E0%3C/span%3E%20y:%3Cspan%20id%20=%22endY%22%3E0%3C/span%3E%3Cbr%3E%3Cb%3EDimensions:%3C/b%3E%3Cbr%3E%20w:%3Cspan%20id=%22dimX%22%3E0%3C/span%3E%20h:%3Cspan%20id=%22dimY%22%3E0%3C/span%3E';document.onmousemove=follow;document.onmousedown=beginDrag;document.onmouseup=endDrag;currentX=document.getElementById('currentX');currentY=document.getElementById('currentY');beginX=document.getElementById('beginX');beginY=document.getElementById('beginY');endX=document.getElementById('endX');endY=document.getElementById('endY');dimX=document.getElementById('dimX');dimY=document.getElementById('dimY');var%20marqueeLeft=0;var%20marqueeTop=0;dragging=false;void(document.body.style.cursor='crosshair');function%20follow(e){x=e.pageX;y=e.pageY;controls.style.left=x+15+'px';controls.style.top=y+15+'px';currentX.innerHTML=x;currentY.innerHTML=y;if(dragging){marquee.style.width=x-dragstartX+'px';dimX.innerHTML=Math.abs(x-dragstartX);marquee.style.height=y-dragstartY+'px';dimY.innerHTML=Math.abs(y-dragstartY);}return%20true;};function%20beginDrag(e){marquee.style.width=0;marquee.style.height=0;marquee.style.borderColor=marqueeColor;dragging=true;x=e.pageX;y=e.pageY;marquee.style.visibility='visible';marquee.style.left=x+'px';marquee.style.top=y+'px';dragstartX=x;dragstartY=y;beginX.innerHTML=x;beginY.innerHTML=y;return%20true;}function%20endDrag(e){dragging=false;x=e.pageX;y=e.pageY;endX.innerHTML=x;endY.innerHTML=y;return%20true;}",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADnRSTlMA4TXpZ0khzVpSgS8RD5pd+0MAAABRSURBVAjXY0AB6hIQmslS0QHMUF5zWgQsYMqYsLEBJBDAInZJACLgeLMAIsCwWIGBoRIowGoEVCIEFAhWADIaoQIMEAEQcNQ0gtjAIQ4SwAQAZj4N5nxaYsgAAAAASUVORK5CYII="
},{
    label: "字体查询",
    url: "javascript:(function(){var%20d=document,s=d.createElement('scr'+'ipt'),b=d.body,l=d.location;s.setAttribute('src','http://chengyinliu.com/wf.js?o='+encodeURIComponent(l.href)+'&t='+(new%20Date().getTime()));b.appendChild(s)})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABNJREFUCNdjgAD5DwyMDAQREAAAK6kBHIC7lQ4AAAAASUVORK5CYII="
},
{
    label: "显示丢失图片",
    url: "javascript:(function(){var%20ims=document.images,%20brokenCount=0,%20brokenURLs=%22%22,%20text,%20i;%20for(i=0;i<ims.length;++i)%20if%20(!%20(ims[i].naturalHeight%20||%20ims[i].fileSize%20>%200))%20{%20++brokenCount;%20brokenURLs%20+=%20%22URL:%20%22%20+%20ims[i].src%20+%20%22\n%22;%20};%20text%20=%20brokenCount%20+%20%22%20broken%20image%22%20+%20(brokenCount==1?%22%22:%22s%22);%20if(brokenCount)%20alert(text%20+%20%22:\n\n%22%20+%20brokenURLs);%20else%20alert(%22No%20broken%20images.%22);%20})()",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxvvg6/eAAAAEnRSTlMA+ehJNOrxZz3e1MVLKyXEfVKQKrX3AAAAWUlEQVQY043PSQ6AMAgFUAQ6Dyr3P6xYo8Gu+hckPEICsJAiJruC2KlYIE8vxPiH6pDsyonMSAY8A7Cr0FJ4ALWoHBhSGNBhSI7QnUx34AztbrJsX6Qs/HoBLJEDskHKRZMAAAAASUVORK5CYII="
},
{
    label: "显示区块元素",
    url: "javascript:(function(){var%20newSS;%20newSS=document.createElement(%22link%22);%20newSS.rel=%22stylesheet%22;%20newSS.type=%22text/css%22;%20newSS.href%20=%20%22http://www.cs.hmc.edu/~jruderma/block-structure.css%22;%20document.getElementsByTagName(%22head%22)[0].appendChild(newSS);%20})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWElEQVQ4jZXSz4vNYRTH8de9binpK7+mxqexnT/AkFjazELNQvKrJsrC3rBnRwllwXYaG81GWc3SlEJJSVmwPMlYSNdGJAvfq9tF1z2bp+c85/M+5/R8OoYiyRTuYA6pqs3GRHdIfBFvsQUn8brN70vyKMlikum/ApIsYQlnq+poVT3Dt7bmK3o4hVdJlpPsHh57T5LPSRZG1nk62i3J1iTXk7xLsldLvoXHVfVw3L5V9QWXk7zHapKDXezH1XHiEdBN9HGih2ncTfJ9pG52DOceznUm6TwcSYLng184kmRuQsZH7Oy1l0vtOT8BYAc+DYy0gmbCCQ7j5QCwhtkk2ycAXMCDLlTVBlZx5X+USRYRrGwaJJumeYJrTdNsa5pmvd/v/0t8GjcwX1UbnZHHmXaSH7iNdXzALhzCeczgeFW9gT98kKSLYziDA5jyy3UvcB/LVfXbdD8Bh3Na2gFHoQgAAAAASUVORK5CYII="
},{
    label: "W3C综合检测",
    url: "javascript:if%20(0)%20void('Multivalidator%20script%20(c)2002%20Tantek%20Celik%20-%20last%20modified%202002.03.15');var%20p27=String.fromCharCode(37)+'27',d=document.location,ft='%3Cframe%20',fs=ft+'src=',fe='%5C'%20scrolling=%5C'auto%5C'%3E',fc=ft+'style=%5C'border:2px%20solid%20#ff0%5C'%20src=%5C'http://',fm='%3C/frameset%3E';var%20h=fs+'%5C'javascript:document.write('+p27+'%3C!DOCTYPE%20HTML%20PUBLIC%20%22-//W3C//DTD%20HTML%204.0//EN%22%3E%3Cbody%20style%3D%22margin:0;padding:2px%206px%22%3E';var%20h1='%3Ch1%20style%3D%22display:inline;font-size:18px;margin:0;%22%3E';var%20e='%3E%3C/body%3E'+p27+')%5C'%20scrolling=%5C'no%5C'%20noresize%3E';var%20q=String.fromCharCode(34);var%20r='%20results',v='%20validator'+r,w='validator.w3.org/check';var%20ds='%3C!DOCTYPE%20HTML%20PUBLIC%20'+q+'-//W3C//DTD%20HTML%204.0%20Frameset//EN'+q+'%3E%3Chtml%3E%3Chead%3E%3Ctitle%3EMultivalidator%3C/title%3E%3C/head%3E%3Cframeset%20cols=%5C'50%25,50%25%5C'%3E%3Cframeset%20rows=%5C'24,*%5C'%3E';ds+=h+'%3Cdiv%3E'+h1+'Page:%3C/h1%3E'+d+'%3C/div'+e;e='%3C/h1'+e;h+='%3Ch1%20style%3D%22display:inline;font-size:18px;margin:0;%22%3E';ds+=h+'%3Cscript%3Edocument.location=%22'+d+'%22%3C/script%3E'+e+fm+'%3Cframeset%20rows=%5C'24,*,24,*,24,*%5C'%3E';ds+=h+'HTML'+v+'%3Ca%20title%3D%22Refresh%20to%20remultivalidate.%20Click%20for%20more%20info%20on%20favelets.%20-Tantek%22%20href%3Dhttp://favelets.com/%20target%3Dhelp%20style%3D%22float:right;padding:1px;width:1em;font:10px%20Avant%20Garde,Chicago,Times,Arial,serif;text-decoration:none%22%3E@%3C/a%3E'+e;ds+=fc+w+'?uri='+d+fe;ds+=h+'CSS'+v+e;ds+=fc+'jigsaw.w3.org/css-validator/validator?uri='+d+fe;ds+=h+'HREF%20checker'+r+e;ds+=fc+w+'link?url='+d+fe;ds+=fm+fm+'%3C/html%3E';document.open();document.write(ds);document.close();void(20020315);",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVQ4ja2SwQ2AIAxFP8YdHMCr7uE0zOAajGA8O4IHJ3AcPNiqkJZq4k8IlF9emlKHWxFlOcMvAiKA8S1goHPMvN2C8IOVdk8w9hoLwoBQ8IqQvIKBqmAvXypA6oGWa19agEowAyWsSpyoFu46nEPTKrEJmB4lOiFWxUk97QvuOQCADelcqIAZ6S94yJOpAt7oys178AXyjw6rSDbByl+p4wAAAABJRU5ErkJggg=="
},
{
    label: "RGB to HEX",
    keyword:'hex',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABdUlEQVQ4jaXTQWTXcRjH8df+Y4wlYuxU8jl03SmimMboUkSXRRrZIbGUDulURMcRJYqOpUNidNqh059OI6LDI0akLkWMaXT4fVf/zd+Ufqfv7+P7eT+f5/F8+c9vZLeQ5BpuYAqbeFJVl/8F8BMncBD3MYlDVbU+DNAboo226suYadrrJJN/C4AHOFVV79v/c6wk2b8nIMlJfMeZqlrb1qvqDvr4luRLkuUkYzsASY7jRav8NslokkfYSDJRVVfxVDeTpZayAyQ52sxnq6rfmFNYxDimm3YJL9v5NPSSTGMFC1X1ZiD2J1zHvRYfJnC4ncdgJMkq1qtqYeg4/7Q4jlV8xDx+VNW+Hs7jWJKlPcxjeIU13GxyH3pV9RmzuJJkcYh5FM/wdWAjN1t73RBbv7O4leTiLsZj3XJdGNDuVtW734AGWddt3u0k8636sm6lz1XVVru6hYfbvmFv4YhuWP1mnqmqjSGjsSPBQJIPmMMBzO1lhl8BV3157Z2+TwAAAABJRU5ErkJggg=="
},
{
    label: "HEX to RGB",
    keyword:'rgb',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABdUlEQVQ4jaXTQWTXcRjH8df+Y4wlYuxU8jl03SmimMboUkSXRRrZIbGUDulURMcRJYqOpUNidNqh059OI6LDI0akLkWMaXT4fVf/zd+Ufqfv7+P7eT+f5/F8+c9vZLeQ5BpuYAqbeFJVl/8F8BMncBD3MYlDVbU+DNAboo226suYadrrJJN/C4AHOFVV79v/c6wk2b8nIMlJfMeZqlrb1qvqDvr4luRLkuUkYzsASY7jRav8NslokkfYSDJRVVfxVDeTpZayAyQ52sxnq6rfmFNYxDimm3YJL9v5NPSSTGMFC1X1ZiD2J1zHvRYfJnC4ncdgJMkq1qtqYeg4/7Q4jlV8xDx+VNW+Hs7jWJKlPcxjeIU13GxyH3pV9RmzuJJkcYh5FM/wdWAjN1t73RBbv7O4leTiLsZj3XJdGNDuVtW734AGWddt3u0k8636sm6lz1XVVru6hYfbvmFv4YhuWP1mnqmqjSGjsSPBQJIPmMMBzO1lhl8BV3157Z2+TwAAAABJRU5ErkJggg=="
},{
    label: "FireBugLite",
    url: "javascript:(function(F,i,r,e,b,u,g,L,I,T,E){if(F.getElementById(b))return;E=F[i+'NS']&&F.documentElement.namespaceURI;E=E?F[i+'NS'](E,'script'):F[i]('script');E[r]('id',b);E[r]('src',I+g+T);E[r](b,u);(F[e]('head')[0]||F[e]('body')[0]).appendChild(E);E=new%20Image;E[r]('src',I+L);})(document,'createElement','setAttribute','getElementsByTagName','FirebugLite','4','firebug-lite.js','releases/lite/latest/skin/xp/sprite.png','https://getfirebug.com/','#startOpened');",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeBAMAAAAiKQiSAAAAMFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaPxwLAAAAD3RSTlMAEM/vgL9QQGAsr5/fj3CUF5PQAAABAUlEQVQY04XQz0oCQRwH8O8uYmLEbEu3TnrqFpQIStCy0tl6AusJ3Eu3QKNTp+zQWXqC6gnsDeoNypNHl8UFReTnzndn8ODB72G+85k/MAywN4aJM9Fj8bxv/FRnHacD9tvSA/PA9eJFZO+NfgH8fcGmtAT259jk5ROjvkUaoSAyA+7jTKwDkRU3mBiuSKLbWomI9XZLT3R61sgdwWYqokT+jfy0TV8lHl9f9Tr0tV/J2AorMHaqrQBHZ4fPl3Tj0a/pG+WG0IsmGDfIHYe51Z1xN/fw1Xg4oLv4ob/VLR2iTQduwH9twtVOUK5ndD7e4XQy33CKgl4snaoTfbSGXVkDbzyE9+jnkBkAAAAASUVORK5CYII="
},
{
    label: "DOM Inspector",
    url: "javascript:void(z=document.body.appendChild(document.createElement('script')));void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://slayeroffice.com/tools/modi/modi.js');void(z.id='modi');",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZUlEQVQ4jaVTUQpAIQxa7yidqvtfpPfTQKSWW0IUOLXYMosxL7x9AddplzFWMq+REXuqP6ErJixGA8mExTu4iU7cgtpB2KAYz6e6+g0kAhAGPXdhZ5KaAzYpTSLCU9N/AaF2po4fwVYqq5MUvBgAAAAASUVORK5CYII="
},
{
    label: "PrintWhatYouLike",
    url: "javascript:(function(){if(window['ppw']&&ppw['bookmarklet']){ppw.bookmarklet.toggle();}else{window._pwyl_home='http://www.printwhatyoulike.com/';window._pwyl_pro_id=null;window._pwyl_bmkl=document.createElement('script');window._pwyl_bmkl.setAttribute('type','text/javascript');window._pwyl_bmkl.setAttribute('src',window._pwyl_home+'static/compressed/pwyl_bookmarklet_10.js');window._pwyl_bmkl.setAttribute('pwyl','true');document.getElementsByTagName('head')[0].appendChild(window._pwyl_bmkl);}})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAg0lEQVQ4jcWSwQmAMAxFnyI4kScncBKXchxvDtBjb3UGT/Fgi7Uixir4INBC/v8lKbykSO6SqXtkcOgplYmXfGLQAY79aXJTocd5LQ5oM8Jbr1VPPjBGZ8kxiJH/t1ABM9tAFmBS6hqg9trDGo1CbEjWGBiAXmHQ+94TlvtPFMoqgnSsVyQuMWlCu4MAAAAASUVORK5CYII="
},



];
	
var menu = PageMenu({condition: 'normal', insertAfter: "context-inspect",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzklEQVQ4y73SIUuDYRAA4FMeNK9Pqz/B4mSbQ2Wg/8E2g+CPEctYXzcZrNaJQYMsj7kiBmHwhZULMsTt+8KuvO8dPPDevRexqUALL/jCHXbL4EvMcY09POC+DP7EIM8mapiXwYeZn2R+hY9S+Fd9mO20quAjzNCtghuJz6vgduKz/3AXP2gs1TuJ26uG9pqL8o6DrJ0mbq7C+5hiGz2Ms50Zjtf57xv0876DEb6X2/krthI9RsRbRNQi4iIixhFxWxTF87rrOsFTvqQem4wFTec0RRu9Et4AAAAASUVORK5CYII=", onpopupshowing: syncHidden });
	menu(items);
};



//当前页面
new function () {
	var items = [
{
				label : '翻译当前页面',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg==",
				oncommand :
			function() {
               gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())");

				},
			}, 
{
				label : '谷歌全文翻译',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg==",
				oncommand :
				function ()
				{
					gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200")
				},
			},
{
    label: "谷歌全文翻译(新标签)",
    url: "javascript:(function(){var%20t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var%20e=(document.charset||document.characterSet);if(t!=''){window.open('http://translate.google.cn/translate_t?hl=zh-CN#auto|zh-CN|'+t);}else{window.open('http://translate.google.cn/translate?u='+escape(location.href)+'&hl=zh-CN&ie='+e+'&sl=auto&tl=zh-CN');};})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg=="
},
{
    label: "百度全文翻译",
    url: "javascript:(function(){window.open('http://fanyi.baidu.com/transpage?query='+escape(document.location.href)+'&from=auto&to=zh&source=url&render=1')})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC"
},{
                label: '必应划词翻译',
                subdir: '',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jWP4v5PhPyWYAZnzfQsz+Qb828nwPyAg4H9OovP/1W3q5BsQEBDwPzXWjTIDAgICqGNAWbr9/+UtGv/vLuUnz4AplYZwfkqM+/+ZNXr/L8wVI80LkaE+KOIBAQH//5FiwNfNrP87isxIMyA30fn//50M/+8u5f/fnGdJmgvS41z/X5wr+r+nxOR/IJrG5Bj3/4enyuAOg7wkp/8Ty43/BwX6o2gMDvL7v6hRG2tKRUnKfaXGGM5tzLX6/2QlD3F54f9Ohv8Hp8j+jwrz+Z8a4/7/+HQp0jITDP/axvz/7w5G0nMjORgALS2D1pyznwIAAAAASUVORK5CYII=",
                oncommand: function() 
              {gBrowser.loadURI("javascript:(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}");
                }
                },
{
    label: "海词划词翻译",
    url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://dict.cn/hc/init.php');%20document.body.appendChild(element);})())",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+klEQVQ4jX2TyU9bdxSFf39FI0JIApTUIgwOc5ixBVn0L2kVqV202Veq1G3VdNi0SSklDmMwBtvP0/NYj8/2MyZAmME4CTY4KVQhqaWvC+xEkaqc/bmfzj33CiGE0CWzI3o169KnMkc6NcNQYp/B+B4Dyi79sW36Ilv0hDfoDq7T5V896vCtuFqdSyNCCCH0iYNhvZot6tQDdMmyeZf+2A590W16w5v0hNa5GXhCl3+VDu9j2t1pWp2polZKDAt9KiPr1AxDyQ9R1+j0rdDuWaZNTtPiTHHDnqRJUpxiKJHJlakDyg4/KmliewfIOwes5I/Jnf7DxmGe78MqvU6VFoeK1pagSVJoMEdzYjDxjvqFXwVgK3/8dkDh1RllrT07ZECK0GSN0WCOUL8QQgwopayRTX5R0gDsHhW4bfVxxxniG2+M6dQK+ZNTAFxPtri+GKbeFERj9CP6olv0hjfpDq7zc2wJgP3jAm1ymlZXihuOJFqbwndykPh+FoBPF7x8Mufn2qwX0RPaoDt4vuEfwiqv/i2ycXhEi1NFa0/QLCk0WqIMG93En+ZYfvqcr+wB6mY91E7LiJuBNTp9q3R4HvOtJ8J24SXBnX20tngpa5TrC2FuGd3svTxh78Xf3LH7qZ1yUT3hRHR6y/Us8bXkw7ubZWZpjUZLjIbFCPWmEBpjgJ8CCqev33D6+g1D03aqJxxcMdgQbe53Wb+0+jAklrkXVfncFuAzyc9tycfD5PLbJrzr21x9aOfKA4mqcSuifBTNUpy7oQQfUub4BV2TNi6PS1T9aaFyzIzQ2uL5JqtCoznK3eD/Dzg5O+PXcIJmg42qcSuXxixU/rFIxagpJxosUbl8FB3zPgaNbvrn3PTPyvTNOGmfdFBjkLj84Jx6aczMxdFFKn43ceH+vCw0ptCIZv6vosbo59ojL3UzHmqnZGomnaWs71Mvji6UzMbiR789Ov/Ij+e8t+pmvXLttFyomXJRPeHgqsH+HrWyRK24byxcuDcnl83/AUlb4n7+kg0rAAAAAElFTkSuQmCC"
},{
    label: "爱词霸划词翻译",
    url: "javascript:var%20ICIBA_HUAYI_ALLOW=1,iciba_huaci_url=%22http://open.iciba.com/huaci/%22;void%20function(){if(!document.getElementById(%22icIBahyI-yi%22)){var%20a=document.createElement(%22div%22);a.id=%22icIBahyI-yi%22,a.style.display=%22none%22,a.style.zIndex=%224294967295%22,document.body.insertBefore(a,document.body.firstChild);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-main_box%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20e='%3Clink%20type=%22text/css%22%20rel=%22stylesheet%22%20href=%22'+iciba_huaci_url+'mini.css%22%20/%3E%3Cobject%20style=%22height:0px;width:0px;overflow:hidden;%22%20classid=%22clsid:d27cdb6e-ae6d-11cf-96b8-444553540000%22%20codebase=%22http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab%23version=6,0,0,0%22%20width=%220%22%20height=%220%22%20id=%22asound_hanci%22%20align=%22absmiddle%22%3E%3Cparam%20name=%22allowScriptAccess%22%20value=%22always%22%20/%3E%3Cparam%20name=%22movie%22%20value=%22http://www.iciba.com/top/asound.swf%22%20/%3E%3Cparam%20name=%22quality%22%20value=%22high%22%20/%3E%3Cembed%20src=%22http://www.iciba.com/top/asound.swf%22%20quality=%22high%22%20width=%220%22%20height=%220%22%20name=%22asound_hanci%22%20align=%22absmiddle%22%20allowScriptAccess=%22always%22%20type=%22application/x-shockwave-flash%22%20pluginspage=%22http://www.macromedia.com/go/getflashplayer%22%20/%3E%3C/object%3E%3Cdiv%20class=%22icIBahyI-main_title%22%20id=%22icIBahyI-main_title%22%20%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-gb%22%20class=%22icIBahyI-gb%22%20title=%22%E5%85%B3%E9%97%AD%22%3E%3C/a%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-dq%22%20class=%22icIBahyI-dq2%22%20title=%22%E7%82%B9%E5%87%BB%E5%9B%BA%E5%AE%9A%E7%BB%93%E6%9E%9C%22%3E%3C/a%3E%E7%88%B1%E8%AF%8D%E9%9C%B8%20%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3Cdiv%20class=%22icIBahyI-sz_list%22%20id=%22icIBahyI-sz_list%22%3E%3Ca%20href=%22javascript:;%22%3E%E5%85%B3%E9%97%AD%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3C/a%3E%3Ca%20href=%22%23%22%20target=%22_blank%22%3E%E5%8F%8D%E9%A6%88%3C/a%3E%3Ca%20href=%22%23%22%20style=%22border:none;%22%20target=%22_blank%22%3E%E5%B8%AE%E5%8A%A9%3C/a%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tr%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-bl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-br%22%3E%3C/span%3E%3C/div%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-search%22%3E%3Cinput%20id=%22ICIBA_HUAYI_input%22%20name=%22%22%20type=%22text%22%20onkeydown=%22ICIBA_HUAYI_KEYDOWN(event);%22%3E%3Ca%20href=%22javascript:;%22%20class=%22icIBahyI-sear%22%20onclick=%22ICIBA_HUAYI_searchword()%22%20%3E%E6%9F%A5%20%E8%AF%8D%3C/a%3E%3C/div%3E%3Cspan%20class=%22icIBahyI-contTop%22%3E%3C/span%3E%3Cdiv%20class=%22icIBahyI-loading%22%20id=%22loading%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-main_cont%22%20id=%22icIBahyI-main_cont%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-CB%22%20id=%22icIBahyI-scbiframe%22%20style=%22display:none%22%3E%3C/div%3E%3Cdiv%20id=%22ICIBA_TOO_LONG%22%20style=%22height:150px%22%20class=%22icIBahyI-footer%22%3E%E6%82%A8%E5%88%92%E5%8F%96%E7%9A%84%E5%86%85%E5%AE%B9%E5%A4%AA%E9%95%BF%EF%BC%8C%E5%BB%BA%E8%AE%AE%E6%82%A8%E5%8E%BB%E7%88%B1%E8%AF%8D%E9%9C%B8%3Ca%20href=%22http://fy.iciba.com%22%3E%E7%BF%BB%E8%AF%91%3C/a%3E%E9%A1%B5%E9%9D%A2%E3%80%82%3C/div%3E%3Cspan%20class=%22icIBahyI-contB%22%3E%3C/span%3E';document.getElementById(%22icIBahyI-main_box%22).innerHTML=e;var%20c=document.createElement(%22script%22);c.setAttribute(%22src%22,iciba_huaci_url+%22dict.php%22),document.body.appendChild(c);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-USER_LOGIN%22,i.className=%22icIBahyI-USER_LOGIN%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20t=document.createElement(%22script%22);t.setAttribute(%22src%22,iciba_huaci_url+%22ICIBA_HUACI_COM.js%22),document.body.appendChild(t)}}();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDElEQVQ4jZXSoZKDMBSF4fMYvAKysnYl8kosMrIyNnIlsrYysjK2EllZuxJZ+a8I0LRlp2xmDjGcj5sJUrG8iev1usSb0NblTcCZvM4kr+3AWplLtQ3IZS1lbyL0Z6yLWBfZ1x8QbyIEcY95ZHcciCP0P5nsvsHM/kYeEwgJBuDCAwDoDiMhhHWkBGq7LaV4v9P/ZGwzIIUFGAqktts2wNvzFPPX28PI6XT6DDzuPhTJmDQ9iqS9WAWOO5GU09Q9td0YXpC0z//OE0BoSPMLxT4jcz+XeQeSn4p9D02Ts6tgV70hAEkrR0gv5ywzI23bkiSccxMwfsGlInkRprE/7c65fCsxRpxz/858i78ni99QUhiH/QAAAABJRU5ErkJggg=="
},
{
    label: "汉典查字划祠解释",
    url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://www.zdic.net/tools/zih.asp');%20document.body.appendChild(element);})())",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg=="
}

];
	
var menu = PageMenu({condition: 'normal', insertAfter: "context-inspect",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVR42mNkwATrgXg/EE9iIAIwYhETAOKDQFwOxDuIMeA/A3FgFhCnE+MCZBAMxI1ArEOMFw4AcTIQ30USOwrEcWhiOA2wBeIOILaG8j2AOAKIE0gJRJCmQCC+CsThQOwNxB9IMUAAGoXfiNGMbIA8EG+BBpYnEN8G4jtQORVoGChDxUKAeC22aFTBEViggLSCpg1WIOYEYiN80fgfjzjIkkXIMUOsAaD00ATE2kCcB8RuQOxDigEgb8wA4s1ArADE54FYEBTIuAwgJrm3A3EVIxF5YCaUbgPij1C2MxCvARlOjAG4AvUcKDYAi+YxEXgzorIAAAAASUVORK5CYII=", onpopupshowing: syncHidden });
	menu(items);
};



/*
//当前页面
new function () {
	var items = [
{
				label : '分享当前页面',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC",
			oncommand :
			function() {SocialShare.sharePage();},
			}, {
    label: "一键分享按钮",
    url: "javascript:(function(){var%20w=window,d=document,s;if(!w.jiathis){w.jiathis=1;s=d.createElement('script');s.src='http://www.jiathis.com/code/j.js';d.getElementsByTagName('head')[0].appendChild(s);s=null}else{$CKE.center()}})()",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC"
},
{
    label: "发送到EverNote",
    url: "javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC"
},
{
		label:"发送到OneNote",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC",
		oncommand: function(){
			var onenotePath = "C:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe";
			var focusedWindow = document.commandDispatcher.focusedWindow;
			var selection = new String(focusedWindow.getSelection());
			if (selection.length == 0) {
				 goDoCommand('cmd_selectAll');
				 var allSelection = new String(focusedWindow.getSelection());
				 if (allSelection.length == 0)return;
				 goDoCommand('cmd_copy');
				 goDoCommand('cmd_selectNone');
			}
			else
			{
				 goDoCommand('cmd_copy');
			}
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			file.initWithPath(onenotePath);
			var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
			process.init(file);
			var args = ["/sidenote", "/paste"];
			process.run(false, args, args.length);
		}
	},
{
    label: "收藏到百度云",
    url: "javascript:void%20(function(d)%20{var%20e%20=%20d.createElement('script');e.byebj=true;e.src%20=%20'http://s.wenzhang.baidu.com/js/pjt/content_ex/page/bookmark.js?s=bm&t='%20+%20(+new%20Date());var%20b%20=%20d.getElementsByTagName('body')[0];b.firstChild%20?%20b.insertBefore(e,%20b.firstChild)%20:%20b.appendChild(e);}(document));",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4jcXSv0qdQRCG8d9JUmghpBC2sNAIEqshl5D6kE7bkC5WFoJg5zVoAmntRbDJn5sIBEcQAhpIkcDBwkqMGNBmj24+j8Qm5IVlmZnnnZ2B5X+r1wYR8RSf8OQO/hv6mfl1mHjQAdY65kusY6XGs5W5PUFEPMZPjNfUL7zEexw0jc8wlZkn3QleNWZ4kZk7mMJekx+vLHhYX+9hC5MNOFFK+ZyZR6WU49aEmVLKu8FgcD3Bc8z7U8/wIyIW8aFTm6+e6wav3dYmVrGNsRH1JXhUg/4IYGNErlW/bfAbM5n5/S8mEBHT+MLNCvu4qMXL7t2eyp8jqf8gIt7iEG8ycwjd9XoPy5jLzOXhCrv4iI2IuM8Wp1i4D/jvdQWgm0n7Gn2U7gAAAABJRU5ErkJggg=="
},
{
    label: "收藏到百度相册",
    url: "javascript:if(typeof%20yXzyxe58==typeof%20alert)yXzyxe58();void(function(g,d,m,s){if(g[m]){if(window._bdXC_loaded){g[m].reInit();}}else{s=d.createElement('script');s.setAttribute('charset','utf-8');s.src='http://xiangce.baidu.com/zt/collect/mark.js?'+(new%20Date()).getTime();d.body.appendChild(s);}}(window,document,'_bdXC'))",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4jcXSv0qdQRCG8d9JUmghpBC2sNAIEqshl5D6kE7bkC5WFoJg5zVoAmntRbDJn5sIBEcQAhpIkcDBwkqMGNBmj24+j8Qm5IVlmZnnnZ2B5X+r1wYR8RSf8OQO/hv6mfl1mHjQAdY65kusY6XGs5W5PUFEPMZPjNfUL7zEexw0jc8wlZkn3QleNWZ4kZk7mMJekx+vLHhYX+9hC5MNOFFK+ZyZR6WU49aEmVLKu8FgcD3Bc8z7U8/wIyIW8aFTm6+e6wav3dYmVrGNsRH1JXhUg/4IYGNErlW/bfAbM5n5/S8mEBHT+MLNCvu4qMXL7t2eyp8jqf8gIt7iEG8ycwjd9XoPy5jLzOXhCrv4iI2IuM8Wp1i4D/jvdQWgm0n7Gn2U7gAAAABJRU5ErkJggg=="
},

];

var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC", onpopupshowing: syncHidden });
	menu(items);
};
*/


//当前页面
new function () {
	var items = [
	{
		label:"IE浏览器中打开",
		text:"%u",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jWNgoAJYzsDAcB8H/o1Hbj/MgP9E0q/RaJg4w38i8Gso/R6Nz8DAwMCwnoGBQQEHtsEjNxlmwHEGBoYEHHg2HrnNMAPmM5AHGogxQAGqkIVcAxgYIAF2moGBQYNcAzYzQEL8OwMDgwM5BtRADbjOgOoVog3QgOLzUMNINgDZoBxKDEAHcAM2M0AyBjb8Ho/cYTItRgUAXItLMzITnmsAAAAASUVORK5CYII="
	},
		{
		label:"在隐私窗口打开",
		oncommand: "openLinkIn(content.location, 'window',{private:true});",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
	},
	{
		label:"在侧边栏中打开",
		oncommand:"openWebPanel(content.document.title, content.location);",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC"
	},
	{
		label:"在谷歌缓存打开",
		url:"https://webcache.googleusercontent.com/search?q=cache:%u",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg=="
	},{
				label : '谷歌站内搜索',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
				oncommand :function () {
				gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.google.com/search?num=30&hl=zh-CN&newwindow=1&q='+q+'&sitesearch='+Bar+'');window.open(qlocation);}%20void%200");
				}
},{
				label : '百度站内搜索',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
				oncommand :function () {
				gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.baidu.com/s?&ie=UTF-8&oe=UTF-8&cl=3&rn=100&wd=%20%20'+q+'%20%20%20site:%20'+Bar+'');window.open(qlocation);}%20void%200");
				}
},
{
      label: "查找相似页面",
      oncommand: function() {
      gBrowser.loadURI(
      "javascript:(function(){%20document.location.href='http://www.google.com/search?q=related:'+escape(document.location.href)%20})();");},
      condition: "noselect nolink nomailto noimage nomedia noinput",
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVQ4jaWRwQ2DMAxFX8oo6aUSg2QDtmCfjMC9K7ABR1iDK1zcNEVOFNMvfUX6sr+/HbDhAEIudIbmAOzAC3gbBwMwA17ehIdSeCial3cDJmCsTdIMRtE/nJWaooFXtJilSk0lRmGOoGjFBFVoR9QQL6nSEVsNAJ6AEw41A9dgttxJsPJdIeHuCj3yjRaDKzarQb7C9MfgX5wVmydVGUgXkQAAAABJRU5ErkJggg==",
},{
		label:"此页网站样式",
		oncommand: "stylishOverlay.findStyle(event)",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA8klEQVQ4y6XSoUpEQRiG4WdhwSIIFpNeg2AUJmw0LAajRbDtFjFq8gJMmhTvQRBNli+axKyCNpvJYrEc5aBz1kX/doZ5H84wQ8eUUpZLKSO/TK8SXuIRm5jDVZK1qYAmnsFKE39OJ9JrxUMc4gmDyt4q0gZm8II9HHX88Q/k+xGO8IBXnHUg50nWu4BVHCdZLqVsTYPUbuEeG0luSynbOJmE1IADzCcZN9+TkHENWMINFpO8T0DesNrreIW32E9y0VprI28YJrnuV+IdzOKuvZ7ktJQCY+wmua7dwg5GGCR5NsX0/hNDv4lHf4m/ACz8JYYPtRRoOaKFRHoAAAAASUVORK5CYII="
	},
{
		label:"此页油侯脚本",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAflBMVEUAAAAzMzNNTU2bm5s+Pj4uLi4qKirq6urZ2dm0tLR4eHhxcXFdXV1DQ0M7Ozv8/PzAwMCwsLCnp6eCgoJHR0dGRkY3NzceHh4HBwfk5OTg4ODR0dHPz8/FxcWqqqqenp6UlJSOjo58fHxsbGxmZmZYWFg6OjomJiYkJCQYGBhoja3FAAAAAXRSTlMAQObYZgAAAINJREFUGNNNjlcSwyAMRFf0YMB24pbe2/0vmHHADO9HehpptEg8wsBR4AKOonBLgKZ99qvSgK+yt3QARsq+mi6AZ2yNRBieunNo3qc0INjJzpufNg66qt7EWzr/ay2jA/KeGhVDivx4J+cPjGHBqNHAFdHllrPbC8h4DvVFQSP63qT+B7shBQwlpDJKAAAAAElFTkSuQmCC",
		oncommand: function () {
			var domain = content.location.hostname;
			gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/search?q=site:userscripts-mirror.org%20' + domain);
			gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/search?q=site:greasyfork.org%20' + domain);
		}
	},{
				label : '查询此页面IP',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/ElEQVQ4jcWQsW3DQAxFCWgAl6mM4z9+8arUXsADuPIUWcA7pFTrDVKlTacqbRZIqwHUCGqc5mQ40tlwAgQhQIAg/n/4pMhfVUppr6qjux9+468AdGbWAuhjjKsfuUk2ADoRqWKMHyRf7zab2RrA4O47EZEY46OqjnVdb+4FtGbWZvNnTvQyzTfL3XcABjNbi4iEEE4ZtALQu/vTLX8FoCPZTIsJkOEHAL2IVEU3yefpcSXAdBLJ48IM4AHAkFLaX+7nAHffqupoZvwGMLM3ku9z8EJY0rr7Nj9uIZ4nKKbNdzVz4bUEIiIkj/lfIgD6EMLpWqvqWOoz4N/rC21jVXlr7aqsAAAAAElFTkSuQmCC",
				oncommand :function () {
				gBrowser.loadURI("javascript:document.body.innerHTML%20+=%20'<div%20style=%22background-color:#e0e0e0;%20border:3px%20outset%20black\;width:504px\;position:fixed\;Z-index:999\;%20top:20px\;%20right:20px\;%22%20onDblClick=%22this.style.display=\'none\'\;%22><center>\u5f53\u524d\u9875\u9762\u0049\u0050\u67e5\u8be2\u3000\u002d\u3000\u53cc\u51fb\u6b64\u5904\u5173\u95ed\u6b64\u7a97\u53e3<\/center><iframe%20width=%22500%22%20height=%2240%22%20src=%22http:\/\/www.ip.cn\/getip.php?action=queryip&ip_url='+location.host+'%22><\/iframe><\/div>';%20void(0);");
				}
},
{
    label: "WOT信誉检测",
    url: "javascript:(function%28%29%7Bvar%20f%3Ddocument.getElementById%28%27wot-bookmarklet%27%29%3Bif%28f%29%7Bf.parentNode.removeChild%28f%29%3Breturn%3B%7Dvar%20l%3Dlocation.hostname%3Bif%28l%26%26l.length%29%7Bf%3Ddocument.createElement%28%27iframe%27%29%3Bif%28f%29%7Bf.setAttribute%28%27id%27%2C%27wot-bookmarklet%27%29%3Bf.setAttribute%28%27src%27%2C%27http%3A//www.mywot.com/bookmarklet/%27+encodeURIComponent%28location.hostname%29%29%3Bf.setAttribute%28%27frameborder%27%2C0%29%3Bf.setAttribute%28%27scrolling%27%2C%27no%27%29%3Bf.setAttribute%28%27style%27%2C%27position%3Afixed%3Btop%3A10px%3Bleft%3A10px%3B%27+%27width%3A135px%3Bheight%3A235px%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bz-index%3A10487575%3B%27%29%3Bif%28document.body%29%7Bdocument.body.appendChild%28f%29%3B%7D%7D%7D%7D)()",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkklEQVQ4jX2Tu2pUURSGvzMYSYqMH/EJjJfEy1uIYNAuttEm9p5yGgsfQC0MsbAQLCyCZSAQbcwriBoHgnaCFitOETLNsTjrxM1k8IcN+6z1/+us266YgHoNWAdWgAtpPgB2gFcR8bnk9wrhWfUFsAv8ApYB81xN2676Up3rdFUnBraBEfAgIkZqExGdv4mISp0HXmfQlYgYdxk8S/FqRIwmy+qQvnvAIfAUoFKvAx+AKxHxJ/94GfiWRIBz6R+mv5/+m71s2GYhvgTsATVwMU8N7GVgkrsJrFfql2xYiToinpcG9VGWWuIr6rE6WxAP1YXJ+tXzahTfs+pxb5L4HzTk1AqMe7RLcqQ2agP0gbUpAe4D/YJ3BPw4Q7thbyPiSaa2BHxM0psUrwEDYDki9pP3GFio1Bu027c0ZYzdTsxzeoz7wK2uIRvqO/Wkxsxg2r1K7gb8ewt11r6V0acifVu0q1yfBIiIMXAH+AkM1UEKZtSZvA+AIfAbuJuaU2MhV/shcBtYBMbAd+A97XP+VPL/Ai+xk5pD13LFAAAAAElFTkSuQmCC"
},
];
	
var menu = PageMenu({condition: 'normal', label: "打开页面方式", insertAfter: "context-inspect",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVQ4y7XSuw2FMBBE0RO4CEJKoAOoiN7IaQuhpxeYxAGywBgBI222M7r74QO1iJX1SBGCDxUwY8GKX4Ydc5zSfD3+qU4Djgj25j5RVAfkZncJcjNMtQFNWtx4dcYSQVcy1O6g1DM8DfDKJ4abFO9rA1D9MeUVPKkRAAAAAElFTkSuQmCC", onpopupshowing: syncHidden });
	menu(items);
};


//图片
new function () {
	var items = [
	{
    label:"复制图像地址",
	  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII=",
	  class: "context-copyimage", 
	  oncommand: "gContextMenu.copyMediaLocation();",
	  accesskey: "O"},
	{command: 'context-copyimage-contents',
	 image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4jbWQyw2DMBBEHxFNTA10kR6oB9JjelilCrjwsS17DbGYiw8jP80+aEwHIGnJdLOZfS5RUoCkRdJX0lT7+3K6NzDWIL3T/bZ3AIqnHA7MrEvLK268BQCE4A04SmKHeA5KidxUF2QSubkFyJxzLigIa4sH3bt/JEZpBlQlPuImzAon1SmKukhOFgAAAABJRU5ErkJggg=="
	},
	{
		label:"复制图像Base64",
		text:"%IMAGE_BASE64%",
		image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVQ4jWNgGAzgPwUYbgC5FmMYcBTJdA8smo4yMDAo4zIgD4oZoIrQXZYHFcNpALLp6EAZKo/XBf+RbEH3AkwjUQbg8xpBA5ABsq3o0aeMzYCZaM7GFr14XQBTgGwLyQaQAlAMoCgpDywAAF13Uxwj2+klAAAAAElFTkSuQmCC"
	},
	{ 
		label: "打开图像RAR",
    	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVQ4jWNgGCwghoGB4Q8DA8N/IvEfBgYGT2QDPjIwMFijGfofB5sBqvYZLsXIYsgYmzxBA4iVp50BZHmBjZouoNgAor3wjIHCdOAJFSA2JT5jQEuJQxgAAFeqQ1dXIFWxAAAAAElFTkSuQmCC",
		oncommand: function(){
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			try {
				var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
				file.initWithPath(path);
			} catch (e) {
				var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
			}
			file.initWithPath(path);
			Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
			setTimeout(function () {
				file.launch();
			}, 100);
		}
	},
{
    label: "OCR文字识别",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMA8pCEUxQK59CV0pPm8Xt3/wAAAFlJREFUCNdjQALBCzhMQTSLuAJToQOQ4TuNgSHzCgMDqyRIeGIAA3MZ7927F9INGDgUQCJMC4AESATJEKAUSISpAagYxM0xgGrfGAA0cBsDQ/YVuBVwSxEAAEPFFhtdnlGhAAAAAElFTkSuQmCC",
    oncommand: function() {
        //apikey
        var apikey = "aee93efca6438819212e64aa47711ee0";
   
        var base64str = img2base64(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL).replace("data:image/jpeg;base64,", "");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "http://apis.baidu.com/apistore/idlocr/ocr", true);
        xmlHttp.setRequestHeader("apikey", apikey);
        var formData = new FormData();
        for(var d of ("fromdevice=pc&clientip=10.10.10.0&detecttype=LocateRecognize&languagetype=CHN_ENG&imagetype=1&image=" + base64str).split('&'))
            formData.append.apply(formData, d.split('=', 2));
        xmlHttp.send(formData);
        xmlHttp.onload = function() {
            if (xmlHttp.status == 200) {
                var data = JSON.parse(xmlHttp.responseText);
                if (data.errNum != 0)
                    alert("错误：" + data.errMsg);
                else {
                    var str = "";
                    for (var i in data.retData) str += data.retData[i].word;
                    alert("识别内容：" + str);//弹窗提示
                    addMenu.copy(str);//自动复制识别内容到剪贴板
                }
            }
        };
   
        function img2base64(imgsrc) {
            if (typeof imgsrc == 'undefined') return "";
   
            const NSURI = "http://www.w3.org/1999/xhtml";
            var img = new Image();
            var that = this;
            var canvas,
                isCompleted = false;
            img.onload = function() {
                var width = this.naturalWidth,
                    height = this.naturalHeight;
                canvas = document.createElementNS(NSURI, "canvas");
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                isCompleted = true;
            };
            img.onerror = function() {
                Components.utils.reportError("Count not load: " + imgsrc);
                isCompleted = true;
            };
            img.src = imgsrc;
   
            var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
            while (!isCompleted) {
                thread.processNextEvent(true);
            }
   
            var data = canvas ? canvas.toDataURL("image/jpeg", 1) : "";
            canvas = null;
            return data;
        }
    }
},
{
		label: '解析图像QR码',
		oncommand: "qrReaderOnline.getClickHandler()",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jWNkgID/DLgBIwF5uAH7cYjD6PlocuuRDcZlw39C8kw4NCXg0JAAlVfAZRNMES4XqEDledD1EeOFCDS5EgYGhv+MBAxgYCAyFsgG5LoArg85FhZAJZAxPnAdmUNsOjgMZcMxqelgLi7noLsAPZ6Jygv4xHEltARSYgFZLTH6iAMA67Azl03JXC8AAAAASUVORK5CYII=",
	},{
		label: '谷歌以图搜图',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
   oncommand: function() {
        var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
        gBrowser.addTab('https://www.google.com/searchbyimage?safe=off&image_url=' + url);
    }
	},
{
    label: "四引擎搜图片",
    condition: "image",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
    oncommand: function() {
        var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
        gBrowser.addTab('https://www.google.com/searchbyimage?safe=off&image_url=' + url);
        gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
        gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
        gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
    }
},
{command: 'context-viewimageinfo',
 image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXklEQVQ4jaVTQQ4AMATzFq/y/49sFxIRoWiyU9eWDaIar+FLsBrwVCgqjEcmYku1Fqya0iSKvQFkgvRrJjiBBGUP5jnk3q2ClkCDzr+QmYzmIJqsJtFjvQsep22E8AGEZDOcIlQ9sgAAAABJRU5ErkJggg=="}
];
	
	var menu = PageMenu({ condition:'image', insertBefore:'context-saveimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

//快捷回复
new function(){
	var items = [
		{label:"虽然不知道LZ在说什么", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子～",accesskey: "T",image:" "},
		{label:"Qmail~~~", input_text: "xxxxxx@qq.com",accesskey: "D",image:" "},
		{label:"不用客气~~~", input_text: "不用客气，大家互相帮助……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",accesskey: "Y",image:" "},
		{label:"反馈情况再说", input_text: "Mark，看反馈情况再说。。。",accesskey: "M",image:" "},
		{label:"看起来很不错", input_text: "看起来很不错哦，收藏之~~~\n谢谢LZ啦！！！",accesskey: "G",image:" "},
		{label:"谢谢楼主分享", input_text: "谢谢楼主的分享!这个绝对要顶！！！",accesskey: "F",image:" "},
		{label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "R",image:" "},
		{label:"坐等楼下解答", input_text: "坐等楼下高手解答~~~⊙_⊙",accesskey: "V",image:" "},
		{},
		{label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！！！",accesskey: "A",image:" "},
		{label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "S",image:" "},
		{label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",accesskey: "C",image:" "},
		{label:"不明觉厉~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "B",image:" "},
		{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "X",image:" "}
	];
	var menu = PageMenu({
		label:"快速输入...",
		condition:"input",
		accesskey: "W",
		position: 1,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAABAQEFBQUFBQUAAAAFBQUBAQEFBQUFBQUBAQEBAQEBAQEFBQUFBQUFBQUFBQUFBQUBAQEFBQUFBQUFBQUFBQUFBQUFBQUFBQUDAwNxFq0VAAAAGXRSTlMA5xCm+wj2i5Tu7eudShoMB+/Df35nWiolwh78/gAAAGNJREFUGNN9ykkSgCAMRNEmRnAWZ7n/RU2hSBaWvcp/Feg5NofuwtBmgHDvlC4xsADiYo/tIpCb2goCuRtpAd0JOuNBtQM9QDzG7tPHbjFMTs4EhbW8QgF3vYeCuB+YwzuLj12wlgVNTTHpdAAAAABJRU5ErkJggg==",
		oncommand: function(event){
			var input_text = event.target.getAttribute('input_text');
			if(input_text) {
				addMenu.copy(input_text);
				goDoCommand("cmd_paste");
			}
		}
	});
	menu(items);
};

//颜文字输入
var Specialcharacters = PageMenu({
                label:"颜文字输入",
			         	condition:"input",
                accesskey: "T",
                insertBefore:"context-searchselect",
                oncommand: function(event){
                        var input_text = event.target.getAttribute('input_text');
                        if(input_text) {
                                addMenu.copy(input_text);
                                goDoCommand("cmd_paste");
                }
        },
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAD4+PghISERERExMTEUFBSVlZVPT08eHh4YGBi8vLyioqKBgYF4eHhJSUlBQUHg4ODR0dG1tbWamppzc3NgYGBXV1ft7e3i4uKvr6+oqKiPj4+JiYkoKCgkJCQICAgmMdadAAAAAXRSTlMAQObYZgAAAINJREFUGNNti1cSAyEMQwX20mGzJb3d/5YxJX+rGSw/IeNQJztp7eflz4ayAlSiPPij+qLc3vokPBIfZNqMmCpuT0QWnxT8F3WZ5IlrqfYjma4HQwMI4FsrcAPML6QC0dlirY2FJGSzlfcV7t5+GIi2GAW+oGn3j2qrGwwEJq1JBxzpB9l0A8JvhjyGAAAAAElFTkSuQmCC"
});
Specialcharacters([
                {label: "^_^", input_text:"^_^"},
                {label: "-_-||| ", input_text:"-_-||| "},
                {label: "Orz", input_text:"Orz"},
                {label: "-_,-", input_text:"-_,-"},
                {label: "╯﹏╰", input_text:"╯﹏╰"},
                {label: "｡◕‿◕｡", input_text:"｡◕‿◕｡"},
                {label: "、(￣.￣)", input_text:"、(￣.￣)"},
                {label: "O(∩_∩)O~", input_text:"O(∩_∩)O~"},
                {label: "o(╥﹏╥)o", input_text:"o(╥﹏╥)o"},
                {label: "(￣３￣)", input_text:"(￣３￣)"},
                {label: " o(>< )o", input_text:" o(>< )o"},
                {label: "_(:з」∠)_", input_text:"_(:з」∠)_"},
                {label: "(・(ｪ)・)", input_text:"(・(ｪ)・)"},
                {label: "￣へ￣", input_text:"￣へ￣"},
                {label: "╮(╯_╰)╭", input_text:"╮(╯_╰)╭"},
]);


/*
//================菜单栏的“工具”菜单================
menu = ToolMenu({
    label: "切换配置",
    id:"ProfileSwitch",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVQ4ja2SQQqDMBBFX7tx5SU8R3YuFHtFT9Iz9BiFFrIqHkA3PzJJIwnigwGj83/+DMKFdMBaWV0Q3Y3BA5iBW6Fm9f4ZjMBTz0c3o54xjd8AP6CtGLVVb2MT9MALWCrmX9TbW4PBxC/tIIwx2FgfwGfmtdhvXpodD7jE0J5dInDSRO6WSYJw41vvDjW5yCVWiP+DU1xm8CVeWgknzU66tFLllnqODcQBSVVEfuY+AAAAAElFTkSuQmCC"
});
menu([{
    label: "V6_Lite",
    text: "-no-remote -profile ..\\Profiles\\V6_Lite",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{
    label: "我的配置",
    text: "-no-remote -profile ..\\Profiles\\Myself",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{
    label: "默认配置",
    text: "-no-remote -profile ..\\Profiles\\Default",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\..\\Firefox\\firefox.exe",
},{
    label:"备份当前配置",
		id:"BackupProfiles",
     image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVQ4jdWSQQ6AIAwER2P8FC/gD74fz95J8CDBBinl4EE3adK0ZdsNC1/BBkQgDUYEvCQ4AFeRJiUnzwZtWNZktPrMTUE3phwqLAITi9FvnW5esIrclNDb1PuFUntNws7TB6BLcPlNgecyxqgTA5UTf4wT3dkrh8jNxJsAAAAASUVORK5CYII=",
		onclick: function(){
			FileUtils.getFile('UChrm',['Local','\\Update\\BackupProfiles.bat']).launch();
		}}
]);

*/

//================标签右键菜单-================
tab([//添加标签右键菜单项
  {
		label:"在侧边栏打开此页",
		insertAfter: "context_reloadTab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABHRSTlMAPvpPlVb7NgAAACdJREFUCNdjwAJcXBwgDAcGLAxGRSjDSADKcAFrQIgg1CB0IUzGDwBimAflBD2okgAAAABJRU5ErkJggg==",
		oncommand:"openWebPanel(content.document.title, content.location);",
	},
  {
		label:"重新载入标签页",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVQ4jcWSyw2AIBAF5+rNDuyE2AG9WIK1UQpVeMHLEggKLCHRSQgH9u3vAR+wzYovwMwkMZLEjogs4IAgx8ut6uQUgQVWuQNwaCt7EULawa5t3fGcdciFkFWv0UzYS7BITJW3EXKiO82AfIk5K8mdJqWN0UovbyrKj9Qb7UdupJYfIj9YalkAAAAASUVORK5CYII=",
    tooltiptext: "左键：重新载入当前标签\n右键：重新载入所有标签",
    onclick: function(e) {
                switch(e.button) {
            case 0:
            gBrowser.reloadTab(TabContextMenu.contextTab);
            break;
						case 1:
						break;
            case 2:
            gBrowser.reloadAllTabs();
            break;
                }
        }
	}, 
	{
		label: "关闭左侧标签页",
		accesskey: "L",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgGOzgPxQPBQP+MzDY/Wdg+PWfgcGOZAP+MzD4Y9FMnAFQm/9jw/RxAZJKB7LDAL+5Q92AIQAAuUI1DEe19f8AAAAASUVORK5CYII=",
		insertBefore:"context_closeTabsToTheEnd",
		oncommand: function() {
			var tabs = gBrowser.mTabContainer.childNodes,i;
				for (i = 0; tabs[i] != gBrowser.selectedTab; i++);
				for (i--;i>=0;i--){
					gBrowser.removeTab(tabs[i]);
			}
		}
	},

 {
		label: "关闭所有标签页",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.addTab('about:newtab'));",
		insertAfter:"context_closeOtherTabs",
		accesskey: "Q"
	},
{//关闭重复标签
label : "\u5173\u95ED\u91CD\u590D\u6807\u7B7E",
insertAfter:"context_pinTab",
onclick : function () {
	var num = gBrowser.browsers.length;
	var msg = "";
	for (var i = 0; i < num; i++)
	{
		var a = gBrowser.getBrowserAtIndex(i);
		try
		{
			for (var j = 0; j < num; j++)
			{
				if (j != i)
				{
					var b = gBrowser.getBrowserAtIndex(j);
					if (a.currentURI.spec == b.currentURI.spec)
					{
						//gBrowser.alert(a.currentURI.spec);
						if (msg != "")
							msg += "\n";
						msg += b.currentURI.spec;
						gBrowser.removeTab(gBrowser.tabContainer.childNodes[j]);
						num--;
						j--;
						//Not executing "i--" because there won't be tabs equal before the one on i
					}
				}
			}
		}
		catch(e)
		{
			Components.utils.reportError(e);
		}
	}
	if (msg != ""){
		//alert("\u5173\u95ED\u7684\u91CD\u590D\u6807\u7B7E\u9875:\n\n" + msg);
		}
	else
		alert("\u6CA1\u6709\u91CD\u590D\u6807\u7B7E\u9875");
},
},
{
		label:"复制Favicon的地址",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVQ4jWNgGAzgPwUYbgC5FmMYcBTJdA8smo4yMDAo4zIgD4oZoIrQXZYHFcNpALLp6EAZKo/XBf+RbEH3AkwjUQbg8xpBA5ABsq3o0aeMzYCZaM7GFr14XQBTgGwLyQaQAlAMoCgpDywAAF13Uxwj2+klAAAAAElFTkSuQmCC",
    tooltiptext: "左键：复制Favicon的地址\n右键：复制Favicon的Base64",
    onclick: function(e) {
                switch(e.button) {
            case 0:
            addMenu.copy(addMenu.convertText("%FAVICON%"));
            break;
						case 1:
				
						break;
            case 2:
            addMenu.copy(addMenu.convertText("%FAVICON_BASE64%"));
            break;
                }
        }
	},
{
		label:"复制标签标题",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC",
    tooltiptext: "左键：复制此页标题\n右键：复制此页标题+地址",
    onclick: function(e) {
                switch(e.button) {
            case 0:
            addMenu.copy(addMenu.convertText("%TITLES%"));
            break;
						case 1:
						break;
            case 2:
            addMenu.copy(addMenu.convertText("%TITLE%\n%URL%"));
            break;
                }
        }
	}, 
	{
		label: "复制所有标签地址",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC",
    tooltiptext: "左键：复制所有标签地址\n右键：复制所有标签标题+地址",
    onclick: function(e) {
                switch(e.button) {
            case 0:
            (function(){
            var URLs = "";
            Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab) {
                var url = gBrowser.getBrowserForTab(tab).contentWindow.location.href;
                URLs += url + "\n";
            });
            this.clipboard.copyString(URLs);      
    })();
            break;
						case 1:
						break;
            case 2:
            (function() {
            var txt = "";
            Array.slice(gBrowser.tabContainer.childNodes).forEach(function(tab) {
                 var url = gBrowser.getBrowserForTab(tab).contentWindow.location.href;
                txt += tab.label + "\n" + url + "\n";
            });
            this.clipboard.copyString(txt); 
        })();
                break;
                }
        }
	},
	{ label: "保存所有图片到ZIP",
		oncommand: function() {
			//var path = "C:\\Users\\azu\\Downloads"; // 可自定义保存路径
			var path = "";
			if (!path) {
				// ファイル保存ダイアログ
				var nsIFilePicker = Ci.nsIFilePicker;
				var FP = Cc['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);
				FP.init(window, 'Choose save folder.', nsIFilePicker.modeGetFolder);

				// ダイアログ表示
				if (FP.show() == nsIFilePicker.returnOK) {
					path = FP.file.path;
				} else {
					return false;
				}
			}
			// ダウンロードしたページを表示するために URI オブジェクト生成
			var hostURL = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService).newURI(location.href, null, null);
			// ページに贴り付けられた画像を保存する
			var links = content.document.images;
			var pack = [];
			for (var i = 0, length = links.length; i < length; i++) {
				// JPEG と PNG を保存する
				if (links[i].src.match(/\.jpe?g|\.png|img\.blogs\.yahoo(.*)folder[^thumb]/i)) {
					pack.push([links[i].src.split("/").pop(), links[i].src]);
				}
			}
			zipDeKure(pack, path);

			function zipDeKure(urls, savePath) {
				const ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
				const zipWriter = Components.Constructor("@mozilla.org/zipwriter;1", "nsIZipWriter");
				var uri = content.window.location.href;
				var fileName = uri.substring(uri.lastIndexOf('://') + 3, uri.length);
				fileName = fileName.split(".").join("_");
				fileName = fileName.split("/").join("_");
				fileName = fileName.split("?").join("_");
				var path = savePath + "\\" + fileName + ".zip";
				var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				file.initWithPath(path);
				var zipW = new zipWriter();
				var ioFlag = 0x04 | 0x08 | 0x20;
				zipW.open(file, ioFlag);
				for (var i = 0, len = urls.length; i < len; i++) {
					var [name, url] = urls[i];
					var ch = ioService.newChannel(url, "UTF-8", null);
					var stream = ch.open();
					zipW.addEntryStream(name, Date.now() * 1000, Ci.nsIZipWriter.COMPRESS_DEFAULT, stream, false);
				}
				zipW.close();
			}
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jWNgoDH4PzQNkMVhgCy6QmxAmYGB4TUDA4M9mgH2UHFlYgyBKbaHGoDMJxrANP0nRzMMBEMNCCZHMwyYEKvQk4GB4RnURkL4GVQ9CnjGwMBgTaRl1lD1KIBQgvmPpgZDPcUuoDgMyAYA/mQv97JO38EAAAAASUVORK5CYII="
	},
]);

var undoMenu = PageMenu({
    label: '撤销关闭',
	id:"context-undomenu-addmenu",
    insertAfter: "context-inspect",
    tooltiptext: "右键显示所有历史记录",
    onclick: "if (event.button == 2) {PlacesCommandHook.showPlacesOrganizer('History');}",
    onpopupshowing: function(e) {
        var popup = e.target;
        popup.setAttribute('id', 'addUndoMneun');
        var items = popup.querySelectorAll('.bookmark-item');
        [].forEach.call(items, function(item) {
            item.parentNode.removeChild(item);
        });
        var undoItems = JSON.parse(Cc['@mozilla.org/browser/sessionstore;1'].getService(Ci.nsISessionStore).getClosedTabData(window));
        if (undoItems.length == 0) {
            popup.setAttribute('oncommand', 'this.parentNode._placesView._onCommand(event);');
            if (!this.parentNode._placesView) new HistoryMenu(event);
        } else {
            undoItems.map(function(item, id) {
                var m = document.createElement('menuitem');
                m.setAttribute('label', item.title);
                m.setAttribute('image', item.image ? 'moz-anno:favicon:' + item.image : '');
                m.setAttribute('class', 'menuitem-iconic bookmark-item closedtab');
                m.setAttribute('oncommand', 'undoCloseTab(' + id + ')');
                m.setAttribute('type', 'unclose-menuitem');
                popup.appendChild(m);
            });
        }
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAABDklEQVQ4jZ3SPShFcRjH8Q8JN2IgI4pJorxkMJDNYlE27AZWG4vBJoOymewMshtsdzHIQilKUl7SDde9hnNuTqdzLuc+9UzP8/2e/uf3kFyNWMVwyrxqNWEddxjPCuewiQJeMJYFbsU2PlDGM0b/C7dhF58hXA5FR9jDBhbQh/o43IV9FCNwUhdxgx30RwWHKP0BxzuPiYpgCbcZBWWco7cimcV1bKGEJzziPUHwja3oU2ZwFVl4xTwGMYUVHMdkl/EfOokLvzGOxOY5LOI+3CnEBQTHk8eb9ENaw1fYiTWEU+mn3C2I9CFNAD3oTJm1CFI4qSaoVu04w3KtggEcoKMWuA5zmK71682CeBvgB+93YAIjVuYDAAAAAElFTkSuQmCC"
});
undoMenu([{
    label: "恢复上一次会话",
    command: "Browser:RestoreLastSession",
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFBklEQVRoge2Ya0xTdxjG301dMieZ0d2cTGgtGAIYl7gZs5mxkYFSyyVYZpzsIm5KJnMrooKIZbT0AkfRCip0VK6TIghxBC+JjMmWzU3LrYKaZQxIkKSDtrS1xbbvPmiNBDnnMI+nfuBJfl96vjxPz//8clqAmcxkJk99goXi51YL1Qu83eN/hSs4vOTd7SVhcYqLQWuEpS97uw/9CA8+v1xYEM1Pq07ZcezXyIgd5R+89M5uH2/XohVulDhwxabCvETpj/mZ5Ve/WJdancJdrwzwdi/qCLWzeHxiy6qkkgvfHm+rENd0SaP31BeEbFBGeLsaZRasU/gGxh5s4It+6D5Q3dGcc6qrMiG76XSI8PBOEGpnebWcX0QmhxMp2z/VdU6kNCEo9uDtJPnF25La6x3ZNfqftijPtwV/VKCGiF0vsNn1kfGLksT7R8mQx8/Nfvjz1wXiubzo/Mo3N6ss6WVXnAdOdf+bUdX5V0ph683ghCNtfmuki7zVeUI4/FxpkvSsa9Vnx6z+AmUWAAA3Sh66VKD4J25vzR1FvR4zKjsxvar97m7178aQ+IIB33Dxcm/3fpCAuLzW3Oo/8MS5G/j2p0VWrkBeFxSfbxEdv+xWNvRgWlk77invwKxKHYYmHLK8ESmP8XbnCeGuV4yoL9zEnFo9Fjb14mZxw928+i6U1OoxVaPDtLJ2lGi7cOUnx6w8vjLD230nZHFc+sJQYYH95KW/UaTR4b6qTpTU6nFfVSeKNDrcVdaO8vrr+H6y5k5AjFLj7b6TsvjD7HCBqMJc1HwLRRrdBFJP6lBxpgfj07UOXkxeC2u6VKlUrQRBIB0+3qnEr/KbMb+xd9KAvRUdKDragksFckNwmHgeK+UBAAiCQLfbjXSSnNuAkoor+J22e9KAtLJ2VNZ141uJhRaeQH6I1QGIiHJNC8pKyVmx8QiWnOu9920/fHzu3wHpaT0q6rpx9efHx3iCPDUAPsPagOTcM6Rsk9RjyIZDWP1zH0pq9ahs6MGCszewsPkWqpp6MafqKn6tasGNBxrvvrdNPeYfJcMlfHkxKwPcbjfyU0pJCf+yGMOT1ahq7MLM73/BrbIm5H9TgSs3qTAgWoHh29UYkZSPfmvlmb7rJXGctTnLWHmQCYJAl8uFut5BvHZ9YEoUpZcwMDYPw7aewMT9NZhVdB6L637D5ss9eLVnAF0uFxIEgU+88KMGOJ1OdDgcpIxZbKTXnU6n9waMj4+jzWZ7LMbHx5kdMB2/U6HVanFsbIwUh8PB7IDp+J0sbrcbCYJAk8lEit1uZ34AXb9PhVzTgoiIBEHgyMgIKTab7ckMoPI7FZ4BBoOBFKvV+mSOEJXfqfAcoeHhYVIsFgvzA+j4nQxd7+ADvw8NDZFiNpuZH0DH71R4/D44OEiKyWRifgCTfu/v7yfFaDQyP8DhcFD6m67f+/r6SBkdHfUMmAsAsxkZYLfbKf1N1++jo6OkGAwGzwB/AHgFAB7vPyCCINBms1H6m67f6SCTya4BQCgA+AHAfAB49rEGWK1WSn9Pw+/LaMADAA4AvApM3AGLxULp72n4fQENXgSAecDUM2A2myn9zbrfpzPAZDJR+pt1v09ngNFopPQ3636nmTke9VH5m3W/04gPALzmeYOk8jfrfqfIbABYCAAcmUz2J1O/yBj1O434AMAiAODCPS/T8Td7fqeZOfeHzAd6/mbP7zN5ivMfWO6n5hRQIO4AAAAASUVORK5CYII=",
},{}]);

page({
    label: "复制URL",
	condition: "link",
    text:"%LINK%",
	insertAfter: "context-savelink",
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAlklEQVRYhe3WMQqAMAwF0H+y3v8MonX2Bm51UAcHSX6bEKn9kE3ik/qhAJAAzACK8eRrt5jJ4eX3LBrA7ggoLMAq1M4BkB52b4kEcG+JBHBvCQOwymPnANQC2H+jP0BL+gCEH0E4oCV9AMKPIBzQklcA8xVmgK0SIMHVgITzZhIGkPL5S+u/AB4jhmkJO1kDYFrCzAogHQYp+gWKNCstAAAAAElFTkSuQmCC"
});

var search = PageMenu({
    //label: "搜索类",
	insertAfter: "context-searchselect",
	condition: "select",
	//image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABXUlEQVRYhe2WUZHDMAxEH4RCCARDCIMGQhk0DGoGLYMLk5hBD8IxSBn0PiqPNW4vVRpn/HM74x975VVWjmz4HA1wBEbgCtxlXGXuKJziaEXgbhyjxBTBWW18AwagA5ziOJkbhBP55zXCO9JX3wAvc5Y4rxIZjXFP0OLuDfcVXJbEIlyU+EfZC3YqiYs1qGXdl+fQTrSWgGi9LyAe4TGWoqGM9Tl0KZo5Yi+koaB4xCB793OkIKRugwQ62TvMkWJ7LXH4cjhS2/4TsYNthbf7V0/gh+1L8D1HClQ+hJ7Kv2G0aaJ8I5owNCJIZfAFE/AY7I9oSS6Uuozi6TfvF6/jtaXQ1puvY0h3whonnBIPSwIPSlwnccL+JDtl4mYXc/GeVI6YyBew5/lRupe1SfEX2Z6LH9RaS/o7LCOwsGxz4hqOhyuB1LZjew2y1iwRXiK+Cf7Fq4hTWxwep7aa+C/NRrhUICv3JQAAAABJRU5ErkJggg==",
});
search([{
    label: "动漫花园 搜索所选文本",
    url: "http://share.dmhy.org/topics/list?keyword=%s",
    condition: "select",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC60lEQVQ4jaXQa0+bZQDG8X5BiRlGkxlBjWy+0IY4zAZ1iMWtbMMNtboeeHocLRSQbJpMK4c10IKFlkLXgaUwdFHBUqD0+Bzu++8LyifwenO9++XKZTL930ReqsQEhP4A7w48/hMcGXBugWcbbKswkoYDzlOR5/0vED4Ek8lkMj16BdZfagw9K7NQUvH8rmGZr3J3SefrZJNAVrBZ1EEanFYbVFXBi0OVobUWMLgCX8zWeZCsE8objOUlE3uSqT3B9D6M7wge7+sUqjqHqqRU03myK7AstgBrwiC0D+P7BspzA2+mgWdb4NqE4aSOMyVwZ3T8BR1lo0EoVyewLeibF+fAjQUD8/QBQ4tNnGmJkhaYf6rzllKm3XPC8LJOaEtyP6HztnJMp7fMpz82+eQCsK7D+xNl3gtXsa/Bw1WVN/3/0Dld5vrPBl+tGdgWG1wdq9ARrPLxTIUPIif0XnzwZRquRVU6xouMpMCxpvHhZJmhpEZoz8CW0Gh3H9DmKGJdaBB5ZdAbPWEw3gIG1uHd8BHmmRKjOZ3AlsGVH8p0TZ0S2DWwZw06Hx3R/bSGNyeYeFnFviHpf9YCrkUFn8+eoWxLwjs6360KLnlLdE1XGM1KHOsa3yYFvrzAVxD48xLrXJO+iwWOHEQKoGxq+J4b3Jo3aHOd0ferhrIucKcF3iy4sk2sSxVuxVTMkWP6l1uA6wVM5g2cGYkzZWBLQJuvyOBCHX9Wcife5EqkxuVQmUvfF/lsrsrthIYl1gK6o5Lepw2siyqujOTeksFrgSNux1X8mzAwW+MN5ZDXfVWuTjRwZ1WCBbgZk+fA9Thc9pQwPzlmNCewrwrag6dYZjWCW+DOwjdpjftJDSUnmSyohPdg4OKDezn4aKZGT7TC+F+Chxs674xV6PCfcWeljn8XIrswVTAIFwTBvGAkZdC/BKa7K5LRv+FmHLqjAlcehpclPVFBTwy6Zmr0RCXDKXiQBttvYIlB75zEvgP/AdbG74wR2wccAAAAAElFTkSuQmCC",
	where: "tab"
},{
    label: "Baidu 搜索所选文本",
    url: "http://www.baidu.com/s?wd=%s",
    condition: "select",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC",
	where: "tab"
},{
    label: "Google 搜索所选文本",
    url: "https://www.google.com/search?q=%s",
    condition: "select",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
	where: "tab"
}, {
    label: "Bing 搜索所选文本",
    url: "http://www.bing.com/search?q=%s",
    condition: "select",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jWP4v5PhPyWYAZnzfQsz+Qb828nwPyAg4H9OovP/1W3q5BsQEBDwPzXWjTIDAgICqGNAWbr9/+UtGv/vLuUnz4AplYZwfkqM+/+ZNXr/L8wVI80LkaE+KOIBAQH//5FiwNfNrP87isxIMyA30fn//50M/+8u5f/fnGdJmgvS41z/X5wr+r+nxOR/IJrG5Bj3/4enyuAOg7wkp/8Ty43/BwX6o2gMDvL7v6hRG2tKRUnKfaXGGM5tzLX6/2QlD3F54f9Ohv8Hp8j+jwrz+Z8a4/7/+HQp0jITDP/axvz/7w5G0nMjORgALS2D1pyznwIAAAAASUVORK5CYII=",
	where: "tab"
}, {
    label: "Wiki-CN 该词条",
    url: "https://zh.wikipedia.org/zh-cn/%s",
    condition: "select",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4ja2TO4siQRSFC5lJOlUjEQQDE8FYRREFBUEwMDEcEJPGH2BsZiQoBgaiYCoiBv4FwRZDTQQROxE0sum2H3wT7EzDrLvs80Z1LnW+OkXVFcAr8Aas+f1af3hexcfib+tN/OHJT0mEbdvouo6u6xiGAeBq0zRxHMfVjuNgmqarbdtGbLdbMpkMQgh6vR6O41AoFBBCMBwOOZ1OJBIJcrkcqqoym83wer2Uy2V2ux0C4Hg88vLywnw+B0DTNEKhEN1uF4BsNsvtdgPg8XiQTCaxLAvgGwCgWq2SSqXcyw0GA4LBINPplHa77fYnkwn9ft/VLmCz2SCEYLVaAWBZFuFwmFgshq7rrqFYLKJp2jPgM2qlUnG1LMv4fD43rqIoNJvNL8/wBbBcLvF4PBwOBwBKpRJ+v5/xeAxAvV5HVdWfAwCi0SiyLLNYLOh2u7RaLSKRCJfLhVqt9v32Z8BoNEKSJPL5PIZhcL1ekSSJeDyOoii/BpimSSAQoNPpuL1Go0E6nX4yfwKevvJ+v8dxHFff73fO5/OP/Ov/Mkz/NM7vB+B52iVL10sAAAAASUVORK5CYII=",
	where: "tab"
}, {
    label: "Google搜索相关文字的图片",
    url: "https://www.google.com/search?hl=zh-CN&site=imghp&tbm=isch&source=hp&q=%s",
    condition: "select",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH9SURBVDhPzVE7i5pREP1+gYWFIMKCIPgHfKyFoCkEwdbKQny/xbeCoCK4i6KfqCyCCGIlbGN+wgrCohAUY20TXEgXWEg7uWfwC0tIlSoDhzv3zpkzjyv9v2axWD4ZjUbv3d2dV6/X8wkYDAavzWbzqlQq9Y36d3t4eHgtlUqUTCYpk8kQ/EQiwVgsFiSE7pnocrme3G63bDKZZKEsW61W2Ww2yyLxLZfL0Wg0+sFEYcFg8HO326VarUYibwWeVC6XCUin01QoFPgURCoWi7TZbOh8Pv8Mh8PPgUDgWVQ+Hg4Hmk6n3Al4UiqVIuBWRPJ4PKtYLEar1Youlws9Pj6yWD6fp1arxaKn04mazSbF43GSIpEIAbd8yW63y9Vqle+z2ewNsWg0ytWQ0O/3OSbuX/AuifYIQEuohBHq9TqTRMVvSBLtswg4jUaDY8J/RadQYvVQKMQkPGazWXI6nZH5fP5dScQ7Cg2HQ/L5fHW/3/+VBZQRlKUo/nK5pOv1SpPJhLeOsTqdDm23W9rv91SpVLjg7xHw30oXEMK/r9dr2u1272gZNh6PX47HIw0GA+6IdwcHQKIygiKCzfd6vXeHwyGLf5dF7AU/ofBYoN1uE4C2P3aBIBYIIcSwF8ThA+DwN2q1WrtOp7tXq9UMjUbD+OgrAO/P+226fzVJ+gV+cHLx+IUV6AAAAABJRU5ErkJggg==",
	where: "tab"
}]);

//隐藏相同项。必须，不能删除
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
				elem.hidden = true;
				return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};
