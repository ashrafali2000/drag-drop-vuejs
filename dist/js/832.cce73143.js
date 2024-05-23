"use strict";(self["webpackChunkquant_ux"]=self["webpackChunkquant_ux"]||[]).push([[832],{77852:function(t,e,n){n.d(e,{Z:function(){return c}});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},o=[],i=n(54554),s=n(80326),h=n(64686),a={name:"NLS",mixins:[],data:function(){return{nls:i,nlsLanguage:""}},components:{},methods:{getLanguage(){return this.nlsLanguage},initNLS(){this.$route&&this.$route.query.ln&&(h.Z.log(-1,"NLS.initNLS() > set by query: ",this.$route.query.ln),this.$root.$i18n.locale=this.$route.query.ln,this.nlsLanguage=this.$route.query.ln)},getNlSWithReplacement(t,e){let n=this.getNLS(t);for(let r in e){const t=e[r];n=n.replace(new RegExp(`{{${r}}}`),t)}return n},getNLS(t){if(this.$i18n){let e=this.$i18n.t(t);if(null!=e&&void 0!=e)return e}const e=s.Z.get(i,t);return e||t}},mounted(){}},u=a,l=n(1001),d=(0,l.Z)(u,r,o,!1,null,null,null),c=d.exports},90258:function(t,e,n){n.d(e,{Z:function(){return p}});var r,o,i=n(24615),s=n(4623),h=n(34287),a="notChecked",u={name:"_Touch",methods:{hasTouch(){return"notChecked"===a&&(a=!0===(0,h.Z)("touch")),a},addTouchStart(t,e){return this.hasTouch()?(0,i.Z)(t,s.Z.press,e,{passive:!1}):(0,i.Z)(t,s.Z.press,e)},addTouchMove(t,e){return this.hasTouch()?(0,i.Z)(t,"touchmove",e,{passive:!1}):(0,i.Z)(t,s.Z.move,e)},addTouchRelease(t,e){return this.hasTouch()?(0,i.Z)(t,"touchend",e,{passive:!1}):(0,i.Z)(t,s.Z.release,e)}},mounted(){}},l=u,d=n(1001),c=(0,d.Z)(l,r,o,!1,null,null,null),p=c.exports},99917:function(t,e,n){n.d(e,{Z:function(){return v}});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"})},o=[],i=(n(21703),n(6827));function s(t,e){console.debug("requestSync",t,e);let n=null,r=null;var o=new XMLHttpRequest;return o.open(e.method,t,!1),o.setRequestHeader("Content-Type","application/json"),o.setRequestHeader("Accept","application/json"),o.onload=function(){if(o.status>=200&&o.status<300){let t=this.response;"json"===e.handleAs&&(t=JSON.parse(t)),n=t}},o.onerror=function(){console.error("requestSync()",this.error),r=this.error},e.data?o.send(JSON.stringify(e.data)):o.send(),{then(t,e){if(!r)return t(n);e(r)}}}function h(t,e){return e.sync?s(t,e):new Promise((function(n,r){var o=new XMLHttpRequest;o.open(e.method,t,!0),o.setRequestHeader("Content-Type","application/json"),o.setRequestHeader("Accept","application/json"),o.onload=function(){if(o.status>=200&&o.status<300){let t=this.response;"json"===e.handleAs&&(t=JSON.parse(t)),n(t)}else{let t=this.response;"json"===e.handleAs&&(t=JSON.parse(t)),r(t)}},o.onerror=function(){r(this.error)},e.data?o.send(e.data):o.send()}))}var a=n(66839),u=n(3076),l=n(77852),d=n(90258),c={},p={name:"DojoWidget",mixins:[l.Z,d.Z],components:{},data:function(){return{dojoInited:!1}},methods:{stopPropagation(t){t&&t.stopPropagation&&t.stopPropagation()},stopEvent(t){try{t&&t.stopPropagation&&(t.stopPropagation(),t.preventDefault())}catch(e){console.warn("DojoWidget.stopEvent",e,t)}},$new(t,e){return i.V(t,e)},inherited(){console.error("Inherted called....",arguments,(new Error).stack)},placeAt(t){t&&t.toLowerCase&&(t=document.getElementById(t)),t.appendChild(this.$el),this.afterPlaceAt()},afterPlaceAt(){},initDomNodes(){if(this.domNode=this.$el,this.domNode)if(this.domNode.querySelectorAll){let t=this.domNode.querySelectorAll("[data-dojo-attach-point]");t.forEach((t=>{let e=t.getAttribute("data-dojo-attach-point");this[e]||(this[e]=t)}))}else console.warn("initDomNodes",this);else console.warn("no domnode for",this.name)},postCreate(){},startup(){},tempOwn(t){t&&t.remove||console.error("tempOwn() > wrong object passed!",(new Error).stack),this._dojoTempListener||(this._dojoTempListener=[]),this._dojoTempListener.push(t)},cleanUpTempListener(){if(this._dojoTempListener){for(let e=0;e<this._dojoTempListener.length;e++)try{this._dojoTempListener[e].remove()}catch(t){console.error("cleanUpTemp,",this.name,t.stack)}this._dojoTempListener=null}},own(t){this._dojoListener.push(t)},emit(t,e,n,r,o,i){if(this.$emit(t,e,n,r,o,i),this._dojoWidgetEventListener[t]){let s=this._dojoWidgetEventListener[t];s.forEach((t=>{t.callback(e,n,r,o,i)}))}},_dojoCleanUpOwn(){this._dojoListener.forEach((t=>{try{t.remove()}catch(e){console.error("DojoWidget._dojoCleanUpOwn() >> ERROR",e)}}))},_dojoCleanUpEvent(){for(let t in this._dojoWidgetEventListener){let e=this._dojoWidgetEventListener[t];e.forEach((t=>{try{t.remove()}catch(e){console.error("DojoWidget._dojoCleanUpOwn() >> ERROR",e)}}))}},on(t,e){this._dojoWidgetEventListener[t]||(this._dojoWidgetEventListener[t]=[]);let n=this._dojoWidgetEventListenerCounter++,r={event:t,callback:e,id:n,remove:()=>{this._removeListener(t,n)}};return this._dojoWidgetEventListener[t].push(r),r},_removeListener(t,e){this._dojoWidgetEventListener[t]&&(this._dojoWidgetEventListener[t]=this._dojoWidgetEventListener[t].filter((t=>t.id!==e)))},_doGet(t,e){return this._request(t,null,e,"GET")},_doPost(t,e,n){return this.clearXHRCache(),this._request(t,e,n,"POST")},_doPut(t,e,n){return this.clearXHRCache(),this._request(t,e,n,"PUT")},_doDelete(t,e,n){return this.clearXHRCache(),this._request(t,e,n,"DELETE")},clearXHRCache(){this._xhrGetCache={}},_setXHRCache(t,e,n){"GET"===n?this._xhrGetCache[t]={ts:(new Date).getTime(),data:e}:this._xhrGetCache={}},_getXHRCache:function(t,e){if("GET"===e){var n=this._xhrGetCache[t];if(n){var r=(new Date).getTime();if(r-n.ts<1e4)return n.data}}return!1},_request:function(t,e,n,r){var o=this._getXHRCache(t,r);if(o)return n?void(this[n]?this[n](o):n(o)):o;var i=!0;n&&(i=!1);var s=window.location.hostname,u={handleAs:"json",method:r,sync:i,headers:{app:s}};e&&(u.data=JSON.stringify(e));var l=this,d=null;return h(t,u).then((function(e){console.debug("request() > ",t,e),c["default"]=(new Date).getTime(),l._setXHRCache(t,e,r),n?l[n]?l[n](e):n(e):d=e}),(function(e){var r=(new Date).getTime(),o=Math.round((r-c["default"])/1e3);e&&e.response&&401===e.response.status?a.Z.publish("de/vommond/RequestError",t,e,o):l[n]?l[n](null):n(null)})),d},_doMultiGet(t,e){for(var n=t.length,r=[],o=this,i=!1,s=0,h=function(t,h){null==h&&console.error("_Widget._doMultiGet() returnd null"),r[t]=h,s++,s!=n||i||(o[e]?o[e](r):e(r))},a=0;a<n;a++){var u=t[a];this._doGetWithClosure(u,a,h)}},_doGetWithClosure(t,e,n){h(t,{handleAs:"json",method:"GET",sync:!1}).then((function(t){n(e,t)}),(function(t){console.warn("_Widget._doGetWithClosure()",t),n(e,null)}))},initLogger(){this.$options.name||console.warn("No name for widget",this)},showHint(t){this.$root.$emit("Hint",t)},showError(t){this.$root.$emit("Error",t)},showSuccess(t){this.$root.$emit("Success",t)},stripHTML:function(t){return t||(t=""),t=t.replace(/<\/?[^>]+(>|$)/g,""),t=t.replace(/%/g,"$perc;"),t},unStripHTML:function(t){return t||(t=""),t=t.replace(/\$perc;/g,"%"),t},setInnerHTML:function(t,e){t?(e=this.stripHTML(e),e=e.replace(/\n/g,"<br>"),e=e.replace(/\$perc;/g,"%"),t.innerHTML=e):console.warn("setInnerHTML() > No node to set test > ",e)},setTextContent(t,e){t?(e=this.stripHTML(e),e=e.replace(/\n/g,"<br>"),e=e.replace(/\$perc;/g,"%"),t.textContent=e):console.warn("setTextContent() > No node to set test > ",e)},_getStatus:function(t){if("undefined"!==typeof Storage){let e=localStorage.getItem(t);if(e)return JSON.parse(e)}},_setStatus(t,e){"undefined"!==typeof Storage&&localStorage.setItem(t,JSON.stringify(e))},_getMousePosition(t){let e={x:0,y:0};return t&&(t.touches&&t.touches.length>0?(t=t.touches[0],e.x=t.clientX,e.y=t.clientY):t.changedTouches&&t.changedTouches.length>0?(t=t.changedTouches[0],e.x=t.clientX,e.y=t.clientY):(e.x=t.pageX,e.y=t.pageY)),e},destroy(){this._dojoCleanUpOwn(),this._dojoCleanUpEvent(),this.cleanUpTempListener(),u.Z.remove(this)},initDojoListeners(){this._dojoListener||(this._dojoListener=[],this._dojoWidgetEventListener={},this._dojoWidgetEventListenerCounter=0,this._xhrGetCache={},this._dojoTempListener=[])}},beforeDestroy(){this.destroy(),this._dojoCleanUpOwn(),this._dojoCleanUpEvent(),this.cleanUpTempListener(),u.Z.remove(this)},mounted(){this.initDojoListeners(),this.initLogger(),this.initDomNodes(),this.dojoInited||(u.Z.add(this),this.startup(),this.postCreate(),this.dojoInited=!0)}},m=p,g=n(1001),f=(0,g.Z)(m,r,o,!1,null,null,null),v=f.exports},55887:function(t,e,n){n.d(e,{Z:function(){return o}});var r=n(93134);class o{constructor(){this.current=null,this.root=null}tooltip(t,e){if(this.current){var n=document.createElement("div");r.Z.add(n,"vommondToolTip"),e&&r.Z.add(n,e);var o=document.createElement("div");n.appendChild(o),r.Z.add(o,"vommondToolTipArrow");var i=document.createElement("span");n.appendChild(i),r.Z.add(i,"vommondToolTipLabel"),i.innerHTML=t,r.Z.add(this.current,"vommondToolTipCntr"),this.current.appendChild(n)}else console.warn("tooltip() > Tooltips can only be attached to build nodes");return this}row(t,e,n,r){const o=[];t=t?"row "+t:"row",this.div(t);for(let i=0;i<e.length;i++){let t="col-md-"+e[i];r&&(t+=" "+r[i]),n?this.div(t,n[i]):this.div(t),o.push(this.current),this.parent()}return o}div(t,e,n){return this.element("div",t,e,n)}pre(t,e){return this.element("pre",t,e)}img(t,e){return this.element("img",e),this.current.src=t,this}canvas(t,e){return this.element("canvas"),this.current.height=e,this.current.width=t,this}ol(t){return this.element("ol",t),this}ul(t){return this.element("ul",t),this}li(t,e){return this.element("li",t,e),this}b(t,e){return this.element("b",t,e),this}form(t){return this.element("img",t)}formGroup(t,e,n,r,o){return this.div("form-group"),this.label("",e),this.parent(),t?this.input("form-control "+t,n,r,o):this.input("form-control ",n,r,o),this}formGroupTextArea(t,e,n,r,o){return this.div("form-group"),this.label("",e),this.parent(),t?this.textarea("form-control "+t,n,r,o):this.textarea("form-control ",n,r,o),this}span(t,e){return this.element("span",t,e)}label(t,e){return this.element("label",t,e)}file(t){return this.element("input",t),this.current.type="file",this}input(t,e,n,r){return this.element("input",t),e&&(this.current.value=e),n&&(this.current.placeholder=n),this.current.type=r||"text",this}textarea(t,e,n){return this.element("textarea",t),e&&(this.current.value=e),n&&(this.current.placeholder=n),this}table(t){return this.element("table",t)}thead(t){const e=this.element("thead");if(t){const e=document.createElement("tr");this.current.appendChild(e);for(let n=0;n<t.length;n++){const r=document.createElement("td");r.innerHTML=t[n],e.appendChild(r)}}return e}tbody(t){return this.element("tbody",t)}tr(t){const e=this.element("tr");if(t)for(let n=0;n<t.length;n++){const e=document.createElement("td");e.innerHTML=t[n],this.current.appendChild(e)}return e}td(t,e){return this.element("td",t,e)}a(t,e){return this.element("a",t,e)}p(t,e,n){return this.element("p",t,e,n)}h1(t,e){return this.element("h1",t,e),this}h2(t,e){return this.element("h2",t,e),this}h3(t,e){return this.element("h3",t,e),this}element(t,e,n,o){const i=document.createElement(t);return null!=this.current&&this.current.appendChild(i),null!=e&&r.Z.add(i,e),null!=n&&(i.innerHTML=o?n:this.stripHTML(n)),this.current=i,null==this.root&&(this.root=i),this}child(t,e,n){const o=document.createElement(t);return null!=this.current?this.current.appendChild(o):console.warn("No Parent node created. you cannot add a child"),null!=e&&r.Z.add(o,e),null!=n&&(o.innerHTML=this.stripHTML(n)),this}inner(t){return this.current&&(this.current.innerHTML=this.stripHTML(t)),this}css(t){return this.current&&r.Z.add(this.current,t),this}get(){return this.current}up(){return this.current&&(this.current=this.current.parentNode),this}parent(){return this.current&&(this.current=this.current.parentNode),this}reset(){this.current=null,this.root=null}build(t,e){t&&(t.substring&&(t=document.getElementById(t),e&&(t.innerHTML="")),t.appendChild(this.root));var n=this.current;return this.reset(),n}top(t,e="px"){return this.setStyle("top",t+e)}bottom(t,e="px"){return this.setStyle("bottom",t+e)}left(t,e="px"){return this.setStyle("left",t+e)}h(t,e="px"){return this.setStyle("height",t+e)}w(t,e="px"){return this.setStyle("width",t+e)}marginBottom(t){return this.setStyle("marginBottom",t+"px")}marginRight(t){return this.setStyle("marginRight",t+"px")}paddingRight(t){return this.setStyle("paddingRight",t+"px")}paddingLeft(t){return this.setStyle("paddingLeft",t+"px")}paddingTop(t){return this.setStyle("paddingTop",t+"px")}background(t){return this.setStyle("background",t)}borderWidth(t){return this.setStyle("borderWidth",t+"px")}borderColor(t){return this.setStyle("borderColor",t)}borderRadius(t,e="px"){return this.setStyle("borderRadius",t+e)}paddingBottom(t){return this.setStyle("paddingBottom",t+"px")}fontSize(t){return this.setStyle("fontSize",t+"px")}setStyle(t,e){return this.current&&(this.current.style[t]=e),this}stripHTML(t){return null!=t&&void 0!=t||(t=""),t.replace&&(t=t.replace(/</g,"&lt;"),t=t.replace(/>/g,"&gt;"),t=t.replace(/<\/?[^>]+(>|$)/g,""),t=t.replace(/\n/g,"<br>"),t=t.replace(/\$perc;/g,"%")),t}}},80326:function(t,e){class n{get(t,e,n=void 0){if(t){if(null!==t[e]&&void 0!==t[e])return t[e];if(e.indexOf(".")>=0){let n=this.getJsonPath(e),r=n.shift(),o=t[r];while(null!=r&&void 0!=r&&null!==o&&void 0!=o&&n.length>0)r=n.shift(),o=o[r];return o}}return n}set(t,e,n){let r=this.getJsonPath(e),o=r.shift(),i=t,s=0;while(void 0!==o&&null!==o&&s<100)s++,r.length>0?(i[o]||(r[0].toLowerCase?i[o]={}:i[o]=[]),i=i[o],o=r.shift()):i[o]=n;return t}getJsonPath(t){return t.split(".").flatMap((t=>{if(t.indexOf("[")>=0){let e=t.split("[");if(2==e.length){let t=e[0],n=1*e[1].substring(0,e[1].length-1);return[t,n]}return 1*t.substring(1,t.length-1)}return t}))}}e.Z=new n},6827:function(t,e,n){n.d(e,{V:function(){return o}});var r=n(20144);function o(t,e){var n=r.Z.extend(t),o=new n;for(let r in e)o[r]=e[r];return o.$mount(),o}},52298:function(t,e){class n{constructor(){this.doc=document}body(){return document.getElementsByTagName("BODY")[0]}getBox(t){t=t||window.document;var e=t.documentElement,n=0,r=0;return n=e.clientWidth,r=e.clientHeight,{w:n,h:r}}}e.Z=new n},40626:function(t,e,n){var r=n(52298);class o{docScroll(){var t=r.Z.doc.parentWindow||r.Z.doc.defaultView;return{x:t.pageXOffset,y:t.pageYOffset}}position(t,e){t&&t.toLowerCase&&(t=document.getElementById(t));let n=t.getBoundingClientRect();if(n={x:n.left,y:n.top,w:n.right-n.left,h:n.bottom-n.top},e){var r=this.docScroll(t.ownerDocument);n.x+=r.x,n.y+=r.y}return n}}e.Z=new o},34287:function(t,e,n){function r(t){if("mobile"===t){let t=navigator.userAgent||navigator.vendor||window.opera;return/iPad|iPhone|iPod/.test(t)||/android/i.test(t)}if("android"===t){let t=navigator.userAgent||navigator.vendor||window.opera;return/android/i.test(t)}if("touch"===t){let t=navigator.userAgent||navigator.vendor||window.opera;return/iPad|iPhone|iPod/.test(t)||/android/i.test(t)}if("ios"===t){let t=navigator.userAgent||navigator.vendor||window.opera;return/iPad|iPhone|iPod/.test(t)}if("chrome"===t){let t=navigator.userAgent||navigator.vendor||window.opera;return/chrome/i.test(t)}if("ff"===t){let t=navigator.userAgent||navigator.vendor||window.opera;return/firefox/i.test(t)}if("mac"===t)return!!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)}n.d(e,{Z:function(){return r}})},24615:function(t,e,n){n.d(e,{Z:function(){return o}});var r=n(4623);function o(t,e,n,o){return t.on?t.on(e,n):(t&&t.toLowerCase&&(t=document.getElementById(t)),t&&t.addEventListener?(o||(o=r.Z.options),t.addEventListener(e,n,o),{callback:n,node:t,event:e,options:o,remove:function(){this.node.removeEventListener(this.event,this.callback,o)}}):void console.warn("on() > Pass a node of valid id"))}},3076:function(t,e,n){n(21703);class r{constructor(){this.components={},this.compontentCounter=0}byNode(t){return this.components[t.getAttribute("widgetId")]}byId(t){return"string"==typeof t?this.components[t]:t}remove(t){delete this.components[t.id]}add(t){if(t.id="w"+this.compontentCounter++,t.$el)try{t.$el.setAttribute("widgetid",t.id)}catch(e){console.warn("registry.add() > no $el",t)}else console.warn("registry.add() > no $el",t);if(this.components[t.id])throw new Error("Tried to register widget with id=="+t.id+" but that id is already registered");this.components[t.id]=t}}e.Z=new r},66839:function(t,e){class n{constructor(){this._dojoTopicListeners={},this._idCounter=0}on(t,e){this._dojoTopicListeners[t]||(this._dojoTopicListeners[t]=[]);const n=this._idCounter++,r={topic:t,callback:e,id:n,remove:()=>{this.remove(t,n)}};return this._dojoTopicListeners[t].push(r),r}remove(t,e){this._dojoTopicListeners[t]&&(this._dojoTopicListeners[t]=this._dojoTopicListeners[t].filter((t=>t.id!==e)))}publish(t,e,n,r,o,i,s){if(this._dojoTopicListeners[t]){let h=this._dojoTopicListeners[t];h.forEach((t=>{t.callback(e,n,r,o,i,s)}))}}subscribe(t,e){return this.on(t,e)}}e.Z=new n},4623:function(t,e,n){var r=n(34287);class o{constructor(){(0,r.Z)("touch")?(this.press="touchstart",this.move="touchmove",this.release="touchend",this.options={passive:!1}):(this.press="mousedown",this.move="mousemove",this.release="mouseup"),this.click="click",this.over="mouseover",this.out="mouseout",this.enter="mouseenter",this.leave="mouseleave"}}e.Z=new o}}]);
//# sourceMappingURL=832.cce73143.js.map