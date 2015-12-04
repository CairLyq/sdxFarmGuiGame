/* Zepto v1.1.3 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=(function(){var undefined,key,$,classList,emptyArray=[],slice=emptyArray.slice,filter=emptyArray.filter,document=window.document,elementDisplay={},classCache={},cssNumber={"column-count":1,"columns":1,"font-weight":1,"line-height":1,"opacity":1,"z-index":1,"zoom":1},fragmentRE=/^\s*<(\w+|!)[^>]*>/,singleTagRE=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,tagExpanderRE=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,rootNodeRE=/^(?:body|html)$/i,capitalRE=/([A-Z])/g,methodAttributes=["val","css","html","text","data","width","height","offset"],adjacencyOperators=["after","prepend","before","append"],table=document.createElement("table"),tableRow=document.createElement("tr"),containers={"tr":document.createElement("tbody"),"tbody":table,"thead":table,"tfoot":table,"td":tableRow,"th":tableRow,"*":document.createElement("div")},readyRE=/complete|loaded|interactive/,simpleSelectorRE=/^[\w-]*$/,class2type={},toString=class2type.toString,zepto={},camelize,uniq,tempParent=document.createElement("div"),propMap={"tabindex":"tabIndex","readonly":"readOnly","for":"htmlFor","class":"className","maxlength":"maxLength","cellspacing":"cellSpacing","cellpadding":"cellPadding","rowspan":"rowSpan","colspan":"colSpan","usemap":"useMap","frameborder":"frameBorder","contenteditable":"contentEditable"},isArray=Array.isArray||function(object){return object instanceof Array};zepto.matches=function(element,selector){if(!selector||!element||element.nodeType!==1){return false}var matchesSelector=element.webkitMatchesSelector||element.mozMatchesSelector||element.oMatchesSelector||element.matchesSelector;if(matchesSelector){return matchesSelector.call(element,selector)}var match,parent=element.parentNode,temp=!parent;if(temp){(parent=tempParent).appendChild(element)}match=~zepto.qsa(parent,selector).indexOf(element);temp&&tempParent.removeChild(element);return match};function type(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object"}function isFunction(value){return type(value)=="function"}function isWindow(obj){return obj!=null&&obj==obj.window}function isDocument(obj){return obj!=null&&obj.nodeType==obj.DOCUMENT_NODE}function isObject(obj){return type(obj)=="object"}function isPlainObject(obj){return isObject(obj)&&!isWindow(obj)&&Object.getPrototypeOf(obj)==Object.prototype}function likeArray(obj){return typeof obj.length=="number"}function compact(array){return filter.call(array,function(item){return item!=null})}function flatten(array){return array.length>0?$.fn.concat.apply([],array):array}camelize=function(str){return str.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():""})};function dasherize(str){return str.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}uniq=function(array){return filter.call(array,function(item,idx){return array.indexOf(item)==idx})};function classRE(name){return name in classCache?classCache[name]:(classCache[name]=new RegExp("(^|\\s)"+name+"(\\s|$)"))}function maybeAddPx(name,value){return(typeof value=="number"&&!cssNumber[dasherize(name)])?value+"px":value}function defaultDisplay(nodeName){var element,display;if(!elementDisplay[nodeName]){element=document.createElement(nodeName);document.body.appendChild(element);display=getComputedStyle(element,"").getPropertyValue("display");element.parentNode.removeChild(element);display=="none"&&(display="block");elementDisplay[nodeName]=display}return elementDisplay[nodeName]}function children(element){return"children" in element?slice.call(element.children):$.map(element.childNodes,function(node){if(node.nodeType==1){return node}})}zepto.fragment=function(html,name,properties){var dom,nodes,container;if(singleTagRE.test(html)){dom=$(document.createElement(RegExp.$1))}if(!dom){if(html.replace){html=html.replace(tagExpanderRE,"<$1></$2>")}if(name===undefined){name=fragmentRE.test(html)&&RegExp.$1}if(!(name in containers)){name="*"}container=containers[name];container.innerHTML=""+html;dom=$.each(slice.call(container.childNodes),function(){container.removeChild(this)})}if(isPlainObject(properties)){nodes=$(dom);$.each(properties,function(key,value){if(methodAttributes.indexOf(key)>-1){nodes[key](value)}else{nodes.attr(key,value)}})}return dom};zepto.Z=function(dom,selector){dom=dom||[];dom.__proto__=$.fn;dom.selector=selector||"";return dom};zepto.isZ=function(object){return object instanceof zepto.Z};zepto.init=function(selector,context){var dom;if(!selector){return zepto.Z()}else{if(typeof selector=="string"){selector=selector.trim();if(selector[0]=="<"&&fragmentRE.test(selector)){dom=zepto.fragment(selector,RegExp.$1,context),selector=null}else{if(context!==undefined){return $(context).find(selector)}else{dom=zepto.qsa(document,selector)}}}else{if(isFunction(selector)){return $(document).ready(selector)}else{if(zepto.isZ(selector)){return selector}else{if(isArray(selector)){dom=compact(selector)}else{if(isObject(selector)){dom=[selector],selector=null}else{if(fragmentRE.test(selector)){dom=zepto.fragment(selector.trim(),RegExp.$1,context),selector=null}else{if(context!==undefined){return $(context).find(selector)}else{dom=zepto.qsa(document,selector)}}}}}}}}return zepto.Z(dom,selector)};$=function(selector,context){return zepto.init(selector,context)};function extend(target,source,deep){for(key in source){if(deep&&(isPlainObject(source[key])||isArray(source[key]))){if(isPlainObject(source[key])&&!isPlainObject(target[key])){target[key]={}}if(isArray(source[key])&&!isArray(target[key])){target[key]=[]}extend(target[key],source[key],deep)}else{if(source[key]!==undefined){target[key]=source[key]}}}}$.extend=function(target){var deep,args=slice.call(arguments,1);if(typeof target=="boolean"){deep=target;target=args.shift()}args.forEach(function(arg){extend(target,arg,deep)});return target};zepto.qsa=function(element,selector){var found,maybeID=selector[0]=="#",maybeClass=!maybeID&&selector[0]==".",nameOnly=maybeID||maybeClass?selector.slice(1):selector,isSimple=simpleSelectorRE.test(nameOnly);return(isDocument(element)&&isSimple&&maybeID)?((found=element.getElementById(nameOnly))?[found]:[]):(element.nodeType!==1&&element.nodeType!==9)?[]:slice.call(isSimple&&!maybeID?maybeClass?element.getElementsByClassName(nameOnly):element.getElementsByTagName(selector):element.querySelectorAll(selector))};function filtered(nodes,selector){return selector==null?$(nodes):$(nodes).filter(selector)}$.contains=document.documentElement.contains?function(parent,node){return parent!==node&&parent.contains(node)}:function(parent,node){while(node&&(node=node.parentNode)){if(node===parent){return true}}return false};function funcArg(context,arg,idx,payload){return isFunction(arg)?arg.call(context,idx,payload):arg}function setAttribute(node,name,value){value==null?node.removeAttribute(name):node.setAttribute(name,value)}function className(node,value){var klass=node.className||"",svg=klass&&klass.baseVal!==undefined;if(value===undefined){return svg?klass.baseVal:klass}svg?(klass.baseVal=value):(node.className=value)}function deserializeValue(value){try{return value?value=="true"||(value=="false"?false:value=="null"?null:+value+""==value?+value:/^[\[\{]/.test(value)?$.parseJSON(value):value):value}catch(e){return value}}$.type=type;$.isFunction=isFunction;$.isWindow=isWindow;$.isArray=isArray;$.isPlainObject=isPlainObject;$.isEmptyObject=function(obj){var name;for(name in obj){return false}return true};$.inArray=function(elem,array,i){return emptyArray.indexOf.call(array,elem,i)};$.camelCase=camelize;$.trim=function(str){return str==null?"":String.prototype.trim.call(str)};$.uuid=0;$.support={};$.expr={};$.map=function(elements,callback){var value,values=[],i,key;if(likeArray(elements)){for(i=0;i<elements.length;i++){value=callback(elements[i],i);if(value!=null){values.push(value)}}}else{for(key in elements){value=callback(elements[key],key);if(value!=null){values.push(value)}}}return flatten(values)};$.each=function(elements,callback){var i,key;if(likeArray(elements)){for(i=0;i<elements.length;i++){if(callback.call(elements[i],i,elements[i])===false){return elements}}}else{for(key in elements){if(callback.call(elements[key],key,elements[key])===false){return elements}}}return elements};$.grep=function(elements,callback){return filter.call(elements,callback)};if(window.JSON){$.parseJSON=JSON.parse}$.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()});$.fn={forEach:emptyArray.forEach,reduce:emptyArray.reduce,push:emptyArray.push,sort:emptyArray.sort,indexOf:emptyArray.indexOf,concat:emptyArray.concat,map:function(fn){return $($.map(this,function(el,i){return fn.call(el,i,el)}))},slice:function(){return $(slice.apply(this,arguments))},ready:function(callback){if(readyRE.test(document.readyState)&&document.body){callback($)}else{document.addEventListener("DOMContentLoaded",function(){callback($)},false)}return this},get:function(idx){return idx===undefined?slice.call(this):this[idx>=0?idx:idx+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){if(this.parentNode!=null){this.parentNode.removeChild(this)}})},each:function(callback){emptyArray.every.call(this,function(el,idx){return callback.call(el,idx,el)!==false});return this},filter:function(selector){if(isFunction(selector)){return this.not(this.not(selector))}return $(filter.call(this,function(element){return zepto.matches(element,selector)}))},add:function(selector,context){return $(uniq(this.concat($(selector,context))))},is:function(selector){return this.length>0&&zepto.matches(this[0],selector)},not:function(selector){var nodes=[];if(isFunction(selector)&&selector.call!==undefined){this.each(function(idx){if(!selector.call(this,idx)){nodes.push(this)}})}else{var excludes=typeof selector=="string"?this.filter(selector):(likeArray(selector)&&isFunction(selector.item))?slice.call(selector):$(selector);this.forEach(function(el){if(excludes.indexOf(el)<0){nodes.push(el)}})}return $(nodes)},has:function(selector){return this.filter(function(){return isObject(selector)?$.contains(this,selector):$(this).find(selector).size()})},eq:function(idx){return idx===-1?this.slice(idx):this.slice(idx,+idx+1)},first:function(){var el=this[0];return el&&!isObject(el)?el:$(el)},last:function(){var el=this[this.length-1];return el&&!isObject(el)?el:$(el)},find:function(selector){var result,$this=this;if(!selector){result=$()}else{if(typeof selector=="object"){result=$(selector).filter(function(){var node=this;return emptyArray.some.call($this,function(parent){return $.contains(parent,node)})})}else{if(this.length==1){result=$(zepto.qsa(this[0],selector))}else{result=this.map(function(){return zepto.qsa(this,selector)})}}}return result},closest:function(selector,context){var node=this[0],collection=false;if(typeof selector=="object"){collection=$(selector)}while(node&&!(collection?collection.indexOf(node)>=0:zepto.matches(node,selector))){node=node!==context&&!isDocument(node)&&node.parentNode}return $(node)},parents:function(selector){var ancestors=[],nodes=this;while(nodes.length>0){nodes=$.map(nodes,function(node){if((node=node.parentNode)&&!isDocument(node)&&ancestors.indexOf(node)<0){ancestors.push(node);return node}})}return filtered(ancestors,selector)},parent:function(selector){return filtered(uniq(this.pluck("parentNode")),selector)},children:function(selector){return filtered(this.map(function(){return children(this)}),selector)},contents:function(){return this.map(function(){return slice.call(this.childNodes)})},siblings:function(selector){return filtered(this.map(function(i,el){return filter.call(children(el.parentNode),function(child){return child!==el})}),selector)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(property){return $.map(this,function(el){return el[property]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display="");if(getComputedStyle(this,"").getPropertyValue("display")=="none"){this.style.display=defaultDisplay(this.nodeName)}})},replaceWith:function(newContent){return this.before(newContent).remove()},wrap:function(structure){var func=isFunction(structure);if(this[0]&&!func){var dom=$(structure).get(0),clone=dom.parentNode||this.length>1}return this.each(function(index){$(this).wrapAll(func?structure.call(this,index):clone?dom.cloneNode(true):dom)})},wrapAll:function(structure){if(this[0]){$(this[0]).before(structure=$(structure));var children;while((children=structure.children()).length){structure=children.first()}$(structure).append(this)}return this},wrapInner:function(structure){var func=isFunction(structure);return this.each(function(index){var self=$(this),contents=self.contents(),dom=func?structure.call(this,index):structure;contents.length?contents.wrapAll(dom):self.append(dom)})},unwrap:function(){this.parent().each(function(){$(this).replaceWith($(this).children())});return this},clone:function(){return this.map(function(){return this.cloneNode(true)})},hide:function(){return this.css("display","none")},toggle:function(setting){return this.each(function(){var el=$(this);(setting===undefined?el.css("display")=="none":setting)?el.show():el.hide()})},prev:function(selector){return $(this.pluck("previousElementSibling")).filter(selector||"*")},next:function(selector){return $(this.pluck("nextElementSibling")).filter(selector||"*")},html:function(html){return 0 in arguments?this.each(function(idx){var originHtml=this.innerHTML;$(this).empty().append(funcArg(this,html,idx,originHtml))}):(0 in this?this[0].innerHTML:null)},text:function(text){return 0 in arguments?this.each(function(idx){var newText=funcArg(this,text,idx,this.textContent);this.textContent=newText==null?"":""+newText}):(0 in this?this[0].textContent:null)},attr:function(name,value){var result;return(typeof name=="string"&&!(1 in arguments))?(!this.length||this[0].nodeType!==1?undefined:(!(result=this[0].getAttribute(name))&&name in this[0])?this[0][name]:result):this.each(function(idx){if(this.nodeType!==1){return}if(isObject(name)){for(key in name){setAttribute(this,key,name[key])}}else{setAttribute(this,name,funcArg(this,value,idx,this.getAttribute(name)))}})},removeAttr:function(name){return this.each(function(){this.nodeType===1&&name.split(" ").forEach(function(attribute){setAttribute(this,attribute)},this)})},prop:function(name,value){name=propMap[name]||name;return(1 in arguments)?this.each(function(idx){this[name]=funcArg(this,value,idx,this[name])}):(this[0]&&this[0][name])},data:function(name,value){var attrName="data-"+name.replace(capitalRE,"-$1").toLowerCase();var data=(1 in arguments)?this.attr(attrName,value):this.attr(attrName);return data!==null?deserializeValue(data):undefined},val:function(value){return 0 in arguments?this.each(function(idx){this.value=funcArg(this,value,idx,this.value)}):(this[0]&&(this[0].multiple?$(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value))},offset:function(coordinates){if(coordinates){return this.each(function(index){var $this=$(this),coords=funcArg(this,coordinates,index,$this.offset()),parentOffset=$this.offsetParent().offset(),props={top:coords.top-parentOffset.top,left:coords.left-parentOffset.left};if($this.css("position")=="static"){props["position"]="relative"}$this.css(props)})}if(!this.length){return null}var obj=this[0].getBoundingClientRect();return{left:obj.left+window.pageXOffset,top:obj.top+window.pageYOffset,width:Math.round(obj.width),height:Math.round(obj.height)}},css:function(property,value){if(arguments.length<2){var computedStyle,element=this[0];if(!element){return}computedStyle=getComputedStyle(element,"");if(typeof property=="string"){return element.style[camelize(property)]||computedStyle.getPropertyValue(property)}else{if(isArray(property)){var props={};$.each(property,function(_,prop){props[prop]=(element.style[camelize(prop)]||computedStyle.getPropertyValue(prop))});return props}}}var css="";if(type(property)=="string"){if(!value&&value!==0){this.each(function(){this.style.removeProperty(dasherize(property))})}else{css=dasherize(property)+":"+maybeAddPx(property,value)}}else{for(key in property){if(!property[key]&&property[key]!==0){this.each(function(){this.style.removeProperty(dasherize(key))})}else{css+=dasherize(key)+":"+maybeAddPx(key,property[key])+";"}}}return this.each(function(){this.style.cssText+=";"+css})},index:function(element){return element?this.indexOf($(element)[0]):this.parent().children().indexOf(this[0])},hasClass:function(name){if(!name){return false}return emptyArray.some.call(this,function(el){return this.test(className(el))},classRE(name))},addClass:function(name){if(!name){return this}return this.each(function(idx){if(!("className" in this)){return}classList=[];var cls=className(this),newName=funcArg(this,name,idx,cls);newName.split(/\s+/g).forEach(function(klass){if(!$(this).hasClass(klass)){classList.push(klass)}},this);classList.length&&className(this,cls+(cls?" ":"")+classList.join(" "))})},removeClass:function(name){return this.each(function(idx){if(!("className" in this)){return}if(name===undefined){return className(this,"")}classList=className(this);funcArg(this,name,idx,classList).split(/\s+/g).forEach(function(klass){classList=classList.replace(classRE(klass)," ")});className(this,classList.trim())})},toggleClass:function(name,when){if(!name){return this}return this.each(function(idx){var $this=$(this),names=funcArg(this,name,idx,className(this));names.split(/\s+/g).forEach(function(klass){(when===undefined?!$this.hasClass(klass):when)?$this.addClass(klass):$this.removeClass(klass)})})},scrollTop:function(value){if(!this.length){return}var hasScrollTop="scrollTop" in this[0];if(value===undefined){return hasScrollTop?this[0].scrollTop:this[0].pageYOffset}return this.each(hasScrollTop?function(){this.scrollTop=value}:function(){this.scrollTo(this.scrollX,value)})},scrollLeft:function(value){if(!this.length){return}var hasScrollLeft="scrollLeft" in this[0];if(value===undefined){return hasScrollLeft?this[0].scrollLeft:this[0].pageXOffset}return this.each(hasScrollLeft?function(){this.scrollLeft=value}:function(){this.scrollTo(value,this.scrollY)})},position:function(){if(!this.length){return}var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rootNodeRE.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();offset.top-=parseFloat($(elem).css("margin-top"))||0;offset.left-=parseFloat($(elem).css("margin-left"))||0;parentOffset.top+=parseFloat($(offsetParent[0]).css("border-top-width"))||0;parentOffset.left+=parseFloat($(offsetParent[0]).css("border-left-width"))||0;return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}},offsetParent:function(){return this.map(function(){var parent=this.offsetParent||document.body;while(parent&&!rootNodeRE.test(parent.nodeName)&&$(parent).css("position")=="static"){parent=parent.offsetParent}return parent})}};$.fn.detach=$.fn.remove;["width","height"].forEach(function(dimension){var dimensionProperty=dimension.replace(/./,function(m){return m[0].toUpperCase()});$.fn[dimension]=function(value){var offset,el=this[0];if(value===undefined){return isWindow(el)?el["inner"+dimensionProperty]:isDocument(el)?el.documentElement["scroll"+dimensionProperty]:(offset=this.offset())&&offset[dimension]}else{return this.each(function(idx){el=$(this);el.css(dimension,funcArg(this,value,idx,el[dimension]()))})}}});function traverseNode(node,fun){fun(node);for(var i=0,len=node.childNodes.length;i<len;i++){traverseNode(node.childNodes[i],fun)}}adjacencyOperators.forEach(function(operator,operatorIndex){var inside=operatorIndex%2;$.fn[operator]=function(){var argType,nodes=$.map(arguments,function(arg){argType=type(arg);return argType=="object"||argType=="array"||arg==null?arg:zepto.fragment(arg)}),parent,copyByClone=this.length>1;if(nodes.length<1){return this}return this.each(function(_,target){parent=inside?target:target.parentNode;target=operatorIndex==0?target.nextSibling:operatorIndex==1?target.firstChild:operatorIndex==2?target:null;var parentInDocument=$.contains(document.documentElement,parent);nodes.forEach(function(node){if(copyByClone){node=node.cloneNode(true)}else{if(!parent){return $(node).remove()}}parent.insertBefore(node,target);if(parentInDocument){traverseNode(node,function(el){if(el.nodeName!=null&&el.nodeName.toUpperCase()==="SCRIPT"&&(!el.type||el.type==="text/javascript")&&!el.src){window["eval"].call(window,el.innerHTML)}})}})})};$.fn[inside?operator+"To":"insert"+(operatorIndex?"Before":"After")]=function(html){$(html)[operator](this);return this}});zepto.Z.prototype=$.fn;zepto.uniq=uniq;zepto.deserializeValue=deserializeValue;$.zepto=zepto;return $})();window.Zepto=Zepto;window.$===undefined&&(window.$=Zepto);(function($){var _zid=1,undefined,slice=Array.prototype.slice,isFunction=$.isFunction,isString=function(obj){return typeof obj=="string"},handlers={},specialEvents={},focusinSupported="onfocusin" in window,focus={focus:"focusin",blur:"focusout"},hover={mouseenter:"mouseover",mouseleave:"mouseout"};specialEvents.click=specialEvents.mousedown=specialEvents.mouseup=specialEvents.mousemove="MouseEvents";function zid(element){return element._zid||(element._zid=_zid++)}function findHandlers(element,event,fn,selector){event=parse(event);if(event.ns){var matcher=matcherFor(event.ns)}return(handlers[zid(element)]||[]).filter(function(handler){return handler&&(!event.e||handler.e==event.e)&&(!event.ns||matcher.test(handler.ns))&&(!fn||zid(handler.fn)===zid(fn))&&(!selector||handler.sel==selector)})}function parse(event){var parts=(""+event).split(".");return{e:parts[0],ns:parts.slice(1).sort().join(" ")}}function matcherFor(ns){return new RegExp("(?:^| )"+ns.replace(" "," .* ?")+"(?: |$)")}function eventCapture(handler,captureSetting){return handler.del&&(!focusinSupported&&(handler.e in focus))||!!captureSetting}function realEvent(type){return hover[type]||(focusinSupported&&focus[type])||type}function add(element,events,fn,data,selector,delegator,capture){var id=zid(element),set=(handlers[id]||(handlers[id]=[]));events.split(/\s/).forEach(function(event){if(event=="ready"){return $(document).ready(fn)}var handler=parse(event);handler.fn=fn;handler.sel=selector;if(handler.e in hover){fn=function(e){var related=e.relatedTarget;if(!related||(related!==this&&!$.contains(this,related))){return handler.fn.apply(this,arguments)}}}handler.del=delegator;var callback=delegator||fn;handler.proxy=function(e){e=compatible(e);if(e.isImmediatePropagationStopped()){return}e.data=data;var result=callback.apply(element,e._args==undefined?[e]:[e].concat(e._args));if(result===false){e.preventDefault(),e.stopPropagation()}return result};handler.i=set.length;set.push(handler);if("addEventListener" in element){element.addEventListener(realEvent(handler.e),handler.proxy,eventCapture(handler,capture))}})}function remove(element,events,fn,selector,capture){var id=zid(element);(events||"").split(/\s/).forEach(function(event){findHandlers(element,event,fn,selector).forEach(function(handler){delete handlers[id][handler.i];if("removeEventListener" in element){element.removeEventListener(realEvent(handler.e),handler.proxy,eventCapture(handler,capture))}})})}$.event={add:add,remove:remove};$.proxy=function(fn,context){var args=(2 in arguments)&&slice.call(arguments,2);if(isFunction(fn)){var proxyFn=function(){return fn.apply(context,args?args.concat(slice.call(arguments)):arguments)};proxyFn._zid=zid(fn);return proxyFn}else{if(isString(context)){if(args){args.unshift(fn[context],fn);return $.proxy.apply(null,args)}else{return $.proxy(fn[context],fn)}}else{throw new TypeError("expected function")}}};$.fn.bind=function(event,data,callback){return this.on(event,data,callback)};$.fn.unbind=function(event,callback){return this.off(event,callback)};$.fn.one=function(event,selector,data,callback){return this.on(event,selector,data,callback,1)};var returnTrue=function(){return true},returnFalse=function(){return false},ignoreProperties=/^([A-Z]|returnValue$|layer[XY]$)/,eventMethods={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function compatible(event,source){if(source||!event.isDefaultPrevented){source||(source=event);$.each(eventMethods,function(name,predicate){var sourceMethod=source[name];event[name]=function(){this[predicate]=returnTrue;return sourceMethod&&sourceMethod.apply(source,arguments)};event[predicate]=returnFalse});if(source.defaultPrevented!==undefined?source.defaultPrevented:"returnValue" in source?source.returnValue===false:source.getPreventDefault&&source.getPreventDefault()){event.isDefaultPrevented=returnTrue}}return event}function createProxy(event){var key,proxy={originalEvent:event};for(key in event){if(!ignoreProperties.test(key)&&event[key]!==undefined){proxy[key]=event[key]}}return compatible(proxy,event)}$.fn.delegate=function(selector,event,callback){return this.on(event,selector,callback)};$.fn.undelegate=function(selector,event,callback){return this.off(event,selector,callback)};$.fn.live=function(event,callback){$(document.body).delegate(this.selector,event,callback);return this};$.fn.die=function(event,callback){$(document.body).undelegate(this.selector,event,callback);return this};$.fn.on=function(event,selector,data,callback,one){var autoRemove,delegator,$this=this;if(event&&!isString(event)){$.each(event,function(type,fn){$this.on(type,selector,data,fn,one)});return $this}if(!isString(selector)&&!isFunction(callback)&&callback!==false){callback=data,data=selector,selector=undefined}if(isFunction(data)||data===false){callback=data,data=undefined}if(callback===false){callback=returnFalse}return $this.each(function(_,element){if(one){autoRemove=function(e){remove(element,e.type,callback);return callback.apply(this,arguments)}}if(selector){delegator=function(e){var evt,match=$(e.target).closest(selector,element).get(0);if(match&&match!==element){evt=$.extend(createProxy(e),{currentTarget:match,liveFired:element});return(autoRemove||callback).apply(match,[evt].concat(slice.call(arguments,1)))}}}add(element,event,callback,data,selector,delegator||autoRemove)})};$.fn.off=function(event,selector,callback){var $this=this;if(event&&!isString(event)){$.each(event,function(type,fn){$this.off(type,selector,fn)});return $this}if(!isString(selector)&&!isFunction(callback)&&callback!==false){callback=selector,selector=undefined}if(callback===false){callback=returnFalse}return $this.each(function(){remove(this,event,callback,selector)})};$.fn.trigger=function(event,args){event=(isString(event)||$.isPlainObject(event))?$.Event(event):compatible(event);event._args=args;return this.each(function(){if(event.type in focus&&typeof this[event.type]=="function"){this[event.type]()}else{if("dispatchEvent" in this){this.dispatchEvent(event)}else{$(this).triggerHandler(event,args)}}})};$.fn.triggerHandler=function(event,args){var e,result;this.each(function(i,element){e=createProxy(isString(event)?$.Event(event):event);e._args=args;e.target=element;$.each(findHandlers(element,event.type||event),function(i,handler){result=handler.proxy(e);if(e.isImmediatePropagationStopped()){return false}})});return result};("focusin focusout focus blur load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select keydown keypress keyup error").split(" ").forEach(function(event){$.fn[event]=function(callback){return(0 in arguments)?this.bind(event,callback):this.trigger(event)}});$.Event=function(type,props){if(!isString(type)){props=type,type=props.type}var event=document.createEvent(specialEvents[type]||"Events"),bubbles=true;if(props){for(var name in props){(name=="bubbles")?(bubbles=!!props[name]):(event[name]=props[name])}}event.initEvent(type,bubbles,true);return compatible(event)}})(Zepto);(function($){var jsonpID=0,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/,originAnchor=document.createElement("a");originAnchor.href=window.location.href;function triggerAndReturn(context,eventName,data){var event=$.Event(eventName);$(context).trigger(event,data);return !event.isDefaultPrevented()}function triggerGlobal(settings,context,eventName,data){if(settings.global){return triggerAndReturn(context||document,eventName,data)}}$.active=0;function ajaxStart(settings){if(settings.global&&$.active++===0){triggerGlobal(settings,null,"ajaxStart")}}function ajaxStop(settings){if(settings.global&&!(--$.active)){triggerGlobal(settings,null,"ajaxStop")}}function ajaxBeforeSend(xhr,settings){var context=settings.context;if(settings.beforeSend.call(context,xhr,settings)===false||triggerGlobal(settings,context,"ajaxBeforeSend",[xhr,settings])===false){return false}triggerGlobal(settings,context,"ajaxSend",[xhr,settings])}function ajaxSuccess(data,xhr,settings,deferred){var context=settings.context,status="success";settings.success.call(context,data,status,xhr);if(deferred){deferred.resolveWith(context,[data,status,xhr])}triggerGlobal(settings,context,"ajaxSuccess",[xhr,settings,data]);ajaxComplete(status,xhr,settings)}function ajaxError(error,type,xhr,settings,deferred){var context=settings.context;settings.error.call(context,xhr,type,error);if(deferred){deferred.rejectWith(context,[xhr,type,error])}triggerGlobal(settings,context,"ajaxError",[xhr,settings,error||type]);ajaxComplete(type,xhr,settings)}function ajaxComplete(status,xhr,settings){var context=settings.context;settings.complete.call(context,xhr,status);triggerGlobal(settings,context,"ajaxComplete",[xhr,settings]);ajaxStop(settings)}function empty(){}$.ajaxJSONP=function(options,deferred){if(!("type" in options)){return $.ajax(options)}var _callbackName=options.jsonpCallback,callbackName=($.isFunction(_callbackName)?_callbackName():_callbackName)||("jsonp"+(++jsonpID)),script=document.createElement("script"),originalCallback=window[callbackName],responseData,abort=function(errorType){$(script).triggerHandler("error",errorType||"abort")},xhr={abort:abort},abortTimeout;if(deferred){deferred.promise(xhr)}$(script).on("load error",function(e,errorType){clearTimeout(abortTimeout);$(script).off().remove();if(e.type=="error"||!responseData){ajaxError(null,errorType||"error",xhr,options,deferred)}else{ajaxSuccess(responseData[0],xhr,options,deferred)}window[callbackName]=originalCallback;if(responseData&&$.isFunction(originalCallback)){originalCallback(responseData[0])}originalCallback=responseData=undefined});if(ajaxBeforeSend(xhr,options)===false){abort("abort");return xhr}window[callbackName]=function(){responseData=arguments};script.src=options.url.replace(/\?(.+)=\?/,"?$1="+callbackName);document.head.appendChild(script);if(options.timeout>0){abortTimeout=setTimeout(function(){abort("timeout")},options.timeout)}return xhr};$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:true,xhr:function(){return new window.XMLHttpRequest()},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:false,timeout:0,processData:true,cache:true};function mimeToDataType(mime){if(mime){mime=mime.split(";",2)[0]}return mime&&(mime==htmlType?"html":mime==jsonType?"json":scriptTypeRE.test(mime)?"script":xmlTypeRE.test(mime)&&"xml")||"text"}function appendQuery(url,query){if(query==""){return url}return(url+"&"+query).replace(/[&?]{1,2}/,"?")}function serializeData(options){if(options.processData&&options.data&&$.type(options.data)!="string"){options.data=$.param(options.data,options.traditional)}if(options.data&&(!options.type||options.type.toUpperCase()=="GET")){options.url=appendQuery(options.url,options.data),options.data=undefined}}$.ajax=function(options){var settings=$.extend({},options||{}),deferred=$.Deferred&&$.Deferred(),urlAnchor;for(key in $.ajaxSettings){if(settings[key]===undefined){settings[key]=$.ajaxSettings[key]}}ajaxStart(settings);if(!settings.crossDomain){urlAnchor=document.createElement("a");urlAnchor.href=settings.url;urlAnchor.href=urlAnchor.href;settings.crossDomain=(originAnchor.protocol+"//"+originAnchor.host)!==(urlAnchor.protocol+"//"+urlAnchor.host)}if(!settings.url){settings.url=window.location.toString()}serializeData(settings);var dataType=settings.dataType,hasPlaceholder=/\?.+=\?/.test(settings.url);if(hasPlaceholder){dataType="jsonp"}if(settings.cache===false||((!options||options.cache!==true)&&("script"==dataType||"jsonp"==dataType))){settings.url=appendQuery(settings.url,"_="+Date.now())}if("jsonp"==dataType){if(!hasPlaceholder){settings.url=appendQuery(settings.url,settings.jsonp?(settings.jsonp+"=?"):settings.jsonp===false?"":"callback=?")}return $.ajaxJSONP(settings,deferred)}var mime=settings.accepts[dataType],headers={},setHeader=function(name,value){headers[name.toLowerCase()]=[name,value]},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=settings.xhr(),nativeSetHeader=xhr.setRequestHeader,abortTimeout;if(deferred){deferred.promise(xhr)}if(!settings.crossDomain){setHeader("X-Requested-With","XMLHttpRequest")}setHeader("Accept",mime||"*/*");if(mime=settings.mimeType||mime){if(mime.indexOf(",")>-1){mime=mime.split(",",2)[0]}xhr.overrideMimeType&&xhr.overrideMimeType(mime)}if(settings.contentType||(settings.contentType!==false&&settings.data&&settings.type.toUpperCase()!="GET")){setHeader("Content-Type",settings.contentType||"application/x-www-form-urlencoded")}if(settings.headers){for(name in settings.headers){setHeader(name,settings.headers[name])}}xhr.setRequestHeader=setHeader;xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=empty;clearTimeout(abortTimeout);var result,error=false;if((xhr.status>=200&&xhr.status<300)||xhr.status==304||(xhr.status==0&&protocol=="file:")){dataType=dataType||mimeToDataType(settings.mimeType||xhr.getResponseHeader("content-type"));result=xhr.responseText;try{if(dataType=="script"){(1,eval)(result)}else{if(dataType=="xml"){result=xhr.responseXML}else{if(dataType=="json"){result=blankRE.test(result)?null:$.parseJSON(result)}}}}catch(e){error=e}if(error){ajaxError(error,"parsererror",xhr,settings,deferred)}else{ajaxSuccess(result,xhr,settings,deferred)}}else{ajaxError(xhr.statusText||null,xhr.status?"error":"abort",xhr,settings,deferred)}}};if(ajaxBeforeSend(xhr,settings)===false){xhr.abort();ajaxError(null,"abort",xhr,settings,deferred);return xhr}if(settings.xhrFields){for(name in settings.xhrFields){xhr[name]=settings.xhrFields[name]}}var async="async" in settings?settings.async:true;xhr.open(settings.type,settings.url,async,settings.username,settings.password);for(name in headers){nativeSetHeader.apply(xhr,headers[name])}if(settings.timeout>0){abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty;xhr.abort();ajaxError(null,"timeout",xhr,settings,deferred)},settings.timeout)}xhr.send(settings.data?settings.data:null);return xhr};function parseArguments(url,data,success,dataType){if($.isFunction(data)){dataType=success,success=data,data=undefined}if(!$.isFunction(success)){dataType=success,success=undefined}return{url:url,data:data,success:success,dataType:dataType}}$.get=function(){return $.ajax(parseArguments.apply(null,arguments))};$.post=function(){var options=parseArguments.apply(null,arguments);options.type="POST";return $.ajax(options)};$.getJSON=function(){var options=parseArguments.apply(null,arguments);options.dataType="json";return $.ajax(options)};$.fn.load=function(url,data,success){if(!this.length){return this}var self=this,parts=url.split(/\s/),selector,options=parseArguments(url,data,success),callback=options.success;if(parts.length>1){options.url=parts[0],selector=parts[1]}options.success=function(response){self.html(selector?$("<div>").html(response.replace(rscript,"")).find(selector):response);callback&&callback.apply(self,arguments)};$.ajax(options);return this};var escape=encodeURIComponent;function serialize(params,obj,traditional,scope){var type,array=$.isArray(obj),hash=$.isPlainObject(obj);$.each(obj,function(key,value){type=$.type(value);if(scope){key=traditional?scope:scope+"["+(hash||type=="object"||type=="array"?key:"")+"]"}if(!scope&&array){params.add(value.name,value.value)}else{if(type=="array"||(!traditional&&type=="object")){serialize(params,value,traditional,key)}else{params.add(key,value)}}})}$.param=function(obj,traditional){var params=[];params.add=function(key,value){if($.isFunction(value)){value=value()}if(value==null){value=""}this.push(escape(key)+"="+escape(value))};serialize(params,obj,traditional);return params.join("&").replace(/%20/g,"+")}})(Zepto);(function($){$.fn.serializeArray=function(){var name,type,result=[],add=function(value){if(value.forEach){return value.forEach(add)}result.push({name:name,value:value})};if(this[0]){$.each(this[0].elements,function(_,field){type=field.type,name=field.name;if(name&&field.nodeName.toLowerCase()!="fieldset"&&!field.disabled&&type!="submit"&&type!="reset"&&type!="button"&&type!="file"&&((type!="radio"&&type!="checkbox")||field.checked)){add($(field).val())}})}return result};$.fn.serialize=function(){var result=[];this.serializeArray().forEach(function(elm){result.push(encodeURIComponent(elm.name)+"="+encodeURIComponent(elm.value))});return result.join("&")};$.fn.submit=function(callback){if(0 in arguments){this.bind("submit",callback)}else{if(this.length){var event=$.Event("submit");this.eq(0).trigger(event);if(!event.isDefaultPrevented()){this.get(0).submit()}}}return this}})(Zepto);(function($){if(!("__proto__" in {})){$.extend($.zepto,{Z:function(dom,selector){dom=dom||[];$.extend(dom,$.fn);dom.selector=selector||"";dom.__Z=true;return dom},isZ:function(object){return $.type(object)==="array"&&"__Z" in object}})}try{getComputedStyle(undefined)}catch(e){var nativeGetComputedStyle=getComputedStyle;window.getComputedStyle=function(element){try{return nativeGetComputedStyle(element)}catch(e){return null}}}})(Zepto);
/*    Zepto.js fx.animate  动画模块  */
(function($,undefined){var prefix="",eventPrefix,endEventName,endAnimationName,vendors={Webkit:"webkit",Moz:"",O:"o"},document=window.document,testEl=document.createElement("div"),supportedTransforms=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,transform,transitionProperty,transitionDuration,transitionTiming,transitionDelay,animationName,animationDuration,animationTiming,animationDelay,cssReset={};function dasherize(str){return str.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function normalizeEvent(name){return eventPrefix?eventPrefix+name:name.toLowerCase()}$.each(vendors,function(vendor,event){if(testEl.style[vendor+"TransitionProperty"]!==undefined){prefix="-"+vendor.toLowerCase()+"-";eventPrefix=event;return false}});transform=prefix+"transform";cssReset[transitionProperty=prefix+"transition-property"]=cssReset[transitionDuration=prefix+"transition-duration"]=cssReset[transitionDelay=prefix+"transition-delay"]=cssReset[transitionTiming=prefix+"transition-timing-function"]=cssReset[animationName=prefix+"animation-name"]=cssReset[animationDuration=prefix+"animation-duration"]=cssReset[animationDelay=prefix+"animation-delay"]=cssReset[animationTiming=prefix+"animation-timing-function"]="";$.fx={off:(eventPrefix===undefined&&testEl.style.transitionProperty===undefined),speeds:{_default:400,fast:200,slow:600},cssPrefix:prefix,transitionEnd:normalizeEvent("TransitionEnd"),animationEnd:normalizeEvent("AnimationEnd")};$.fn.animate=function(properties,duration,ease,callback,delay){if($.isFunction(duration)){callback=duration,ease=undefined,duration=undefined}if($.isFunction(ease)){callback=ease,ease=undefined}if($.isPlainObject(duration)){ease=duration.easing,callback=duration.onComplete,delay=duration.delay,duration=duration.duration}if(duration){duration=(typeof duration=="number"?duration:($.fx.speeds[duration]||$.fx.speeds._default))/1000}if(delay){delay=parseFloat(delay)/1000}return this.anim(properties,duration,ease,callback,delay)};$.fn.anim=function(properties,duration,ease,callback,delay){var key,cssValues={},cssProperties,transforms="",that=this,wrappedCallback,endEvent=$.fx.transitionEnd,fired=false;if(duration===undefined){duration=$.fx.speeds._default/1000}if(delay===undefined){delay=0}if($.fx.off){duration=0}if(typeof properties=="string"){cssValues[animationName]=properties;cssValues[animationDuration]=duration+"s";cssValues[animationDelay]=delay+"s";cssValues[animationTiming]=(ease||"linear");endEvent=$.fx.animationEnd}else{cssProperties=[];for(key in properties){if(supportedTransforms.test(key)){transforms+=key+"("+properties[key]+") "}else{cssValues[key]=properties[key],cssProperties.push(dasherize(key))}}if(transforms){cssValues[transform]=transforms,cssProperties.push(transform)}if(duration>0&&typeof properties==="object"){cssValues[transitionProperty]=cssProperties.join(", ");cssValues[transitionDuration]=duration+"s";cssValues[transitionDelay]=delay+"s";cssValues[transitionTiming]=(ease||"linear")}}wrappedCallback=function(event){if(typeof event!=="undefined"){if(event.target!==event.currentTarget){return}$(event.target).unbind(endEvent,wrappedCallback)}else{$(this).unbind(endEvent,wrappedCallback)}fired=true;$(this).css(cssReset);callback&&callback.call(this)};if(duration>0){this.bind(endEvent,wrappedCallback);setTimeout(function(){if(fired){return}wrappedCallback.call(that)},(duration*1000)+25)}this.size()&&this.get(0).clientLeft;this.css(cssValues);if(duration<=0){setTimeout(function(){that.each(function(){wrappedCallback.call(this)})},0)}return this};testEl=null})(Zepto);
/**  Touch.js For Zepto （min）   **/
(function($){var touch={},touchTimeout,tapTimeout,swipeTimeout,longTapTimeout,longTapDelay=750,gesture;function swipeDirection(x1,x2,y1,y2){return Math.abs(x1-x2)>=Math.abs(y1-y2)?(x1-x2>0?"Left":"Right"):(y1-y2>0?"Up":"Down")}function longTap(){longTapTimeout=null;if(touch.last){touch.el.trigger("longTap");touch={}}}function cancelLongTap(){if(longTapTimeout){clearTimeout(longTapTimeout)}longTapTimeout=null}function cancelAll(){if(touchTimeout){clearTimeout(touchTimeout)}if(tapTimeout){clearTimeout(tapTimeout)}if(swipeTimeout){clearTimeout(swipeTimeout)}if(longTapTimeout){clearTimeout(longTapTimeout)}touchTimeout=tapTimeout=swipeTimeout=longTapTimeout=null;touch={}}function isPrimaryTouch(event){return(event.pointerType=="touch"||event.pointerType==event.MSPOINTER_TYPE_TOUCH)&&event.isPrimary}function isPointerEventType(e,type){return(e.type=="pointer"+type||e.type.toLowerCase()=="mspointer"+type)}$(document).ready(function(){var now,delta,deltaX=0,deltaY=0,firstTouch,_isPointerType;if("MSGesture" in window){gesture=new MSGesture();gesture.target=document.body}$(document).bind("MSGestureEnd",function(e){var swipeDirectionFromVelocity=e.velocityX>1?"Right":e.velocityX<-1?"Left":e.velocityY>1?"Down":e.velocityY<-1?"Up":null;if(swipeDirectionFromVelocity){touch.el.trigger("swipe");touch.el.trigger("swipe"+swipeDirectionFromVelocity)}}).on("touchstart MSPointerDown pointerdown",function(e){if((_isPointerType=isPointerEventType(e,"down"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];if(e.touches&&e.touches.length===1&&touch.x2){touch.x2=undefined;touch.y2=undefined}now=Date.now();delta=now-(touch.last||now);touch.el=$("tagName" in firstTouch.target?firstTouch.target:firstTouch.target.parentNode);touchTimeout&&clearTimeout(touchTimeout);touch.x1=firstTouch.pageX;touch.y1=firstTouch.pageY;if(delta>0&&delta<=250){touch.isDoubleTap=true}touch.last=now;longTapTimeout=setTimeout(longTap,longTapDelay);if(gesture&&_isPointerType){gesture.addPointer(e.pointerId)}}).on("touchmove MSPointerMove pointermove",function(e){if((_isPointerType=isPointerEventType(e,"move"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];cancelLongTap();touch.x2=firstTouch.pageX;touch.y2=firstTouch.pageY;deltaX+=Math.abs(touch.x1-touch.x2);deltaY+=Math.abs(touch.y1-touch.y2)}).on("touchend MSPointerUp pointerup",function(e){if((_isPointerType=isPointerEventType(e,"up"))&&!isPrimaryTouch(e)){return}cancelLongTap();if((touch.x2&&Math.abs(touch.x1-touch.x2)>30)||(touch.y2&&Math.abs(touch.y1-touch.y2)>30)){swipeTimeout=setTimeout(function(){touch.el.trigger("swipe");touch.el.trigger("swipe"+(swipeDirection(touch.x1,touch.x2,touch.y1,touch.y2)));touch={}},0)}else{if("last" in touch){if(deltaX<100&&deltaY<100){tapTimeout=setTimeout(function(){var event=$.Event("tap");event.cancelTouch=cancelAll;touch.el.trigger(event);if(touch.isDoubleTap){if(touch.el){touch.el.trigger("doubleTap")}touch={}}else{touchTimeout=setTimeout(function(){touchTimeout=null;if(touch.el){touch.el.trigger("singleTap")}touch={}},250)}},0)}else{touch={}}}}deltaX=deltaY=0}).on("touchcancel MSPointerCancel pointercancel",cancelAll);$(window).on("scroll",cancelAll)});["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(eventName){$.fn[eventName]=function(callback){return this.on(eventName,callback)}})})(Zepto);
/*!
 * artTemplate - Template Engine
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */
!function(a){"use strict";var b=function(a,c){return b["string"==typeof c?"compile":"render"].apply(b,arguments)};b.version="2.0.2",b.openTag="<%",b.closeTag="%>",b.isEscape=!0,b.isCompress=!1,b.parser=null,b.render=function(a,c){var d=b.get(a)||e({id:a,name:"Render Error",message:"No Template"});return d(c)},b.compile=function(a,d){function l(c){try{return new j(c,a)+""}catch(f){return h?e(f)():b.compile(a,d,!0)(c)}}var g=arguments,h=g[2],i="anonymous";"string"!=typeof d&&(h=g[1],d=g[0],a=i);try{var j=f(a,d,h)}catch(k){return k.id=a||d,k.name="Syntax Error",e(k)}return l.prototype=j.prototype,l.toString=function(){return j.toString()},a!==i&&(c[a]=l),l};var c=b.cache={},d=b.helpers={$include:b.render,$string:function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?d.$string(a()):""),a},$escape:function(a){var b={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"};return d.$string(a).replace(/&(?![\w#]+;)|[<>"']/g,function(a){return b[a]})},$each:function(a,b){var c=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)};if(c(a))for(var d=0,e=a.length;e>d;d++)b.call(a,a[d],d,a);else for(d in a)b.call(a,a[d],d)}};b.helper=function(a,b){d[a]=b},b.onerror=function(b){var c="Template Error\n\n";for(var d in b)c+="<"+d+">\n"+b[d]+"\n\n";a.console&&console.error(c)},b.get=function(d){var e;if(c.hasOwnProperty(d))e=c[d];else if("document"in a){var f=document.getElementById(d);if(f){var g=f.value||f.innerHTML;e=b.compile(d,g.replace(/^\s*|\s*$/g,""))}}return e};var e=function(a){return b.onerror(a),function(){return"{Template Error}"}},f=function(){var a=d.$each,c="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",e=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,f=/[^\w$]+/g,g=new RegExp(["\\b"+c.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),h=/^\d[^,]*|,\d[^,]*/g,i=/^,+|,+$/g,j=function(a){return a.replace(e,"").replace(f,",").replace(g,"").replace(h,"").replace(i,"").split(/^$|,+/)};return function(c,e,f){function x(a){return m+=a.split(/\n/).length-1,b.isCompress&&(a=a.replace(/[\n\r\t\s]+/g," ").replace(/<!--.*?-->/g,"")),a&&(a=r[1]+B(a)+r[2]+"\n"),a}function y(a){var c=m;if(i?a=i(a):f&&(a=a.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===a.indexOf("=")){var e=0!==a.indexOf("==");if(a=a.replace(/^=*|[\s;]*$/g,""),e&&b.isEscape){var g=a.replace(/\s*\([^\)]+\)/,"");d.hasOwnProperty(g)||/^(include|print)$/.test(g)||(a="$escape("+a+")")}else a="$string("+a+")";a=r[1]+a+r[2]}return f&&(a="$line="+c+";"+a),z(a),a+"\n"}function z(b){b=j(b),a(b,function(a){n.hasOwnProperty(a)||(A(a),n[a]=!0)})}function A(a){var b;"print"===a?b=t:"include"===a?(o.$include=d.$include,b=u):(b="$data."+a,d.hasOwnProperty(a)&&(o[a]=d[a],b=0===a.indexOf("$")?"$helpers."+a:b+"===undefined?$helpers."+a+":"+b)),p+=a+"="+b+","}function B(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}var g=b.openTag,h=b.closeTag,i=b.parser,k=e,l="",m=1,n={$data:1,$id:1,$helpers:1,$out:1,$line:1},o={},p="var $helpers=this,"+(f?"$line=0,":""),q="".trim,r=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],s=q?"if(content!==undefined){$out+=content;return content;}":"$out.push(content);",t="function(content){"+s+"}",u="function(id,data){data=data||$data;var content=$helpers.$include(id,data,$id);"+s+"}";a(k.split(g),function(a){a=a.split(h);var c=a[0],d=a[1];1===a.length?l+=x(c):(l+=y(c),d&&(l+=x(d)))}),k=l,f&&(k="try{"+k+"}catch(e){"+"throw {"+"id:$id,"+"name:'Render Error',"+"message:e.message,"+"line:$line,"+"source:"+B(e)+".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')"+"};"+"}"),k=p+r[0]+k+"return new String("+r[3]+");";try{var v=new Function("$data","$id",k);return v.prototype=o,v}catch(w){throw w.temp="function anonymous($data,$id) {"+k+"}",w}}}();"function"==typeof define?define(function(){return b}):"undefined"!=typeof exports&&(module.exports=b),a.template=b}(this);

/**
 * Created with JetBrains WebStorm.
 * User: EX-LUOYONG002 （Rodey）
 * Date: 14-9-11
 * Time: 下午1:08
 * To change this template use File | Settings | File Templates.
 */


/**
 * 提示弹窗  ( type类型预置四种，可以自己添加 )
 * @param type      类型:  success (成功) || warning (警告) || info (消息) || error (异常错误)
 * @param options   可选:  预留选项
 * @return { Object }
 *
 * Use:
 *
 * tipDialog({
                msg:'【公众号推荐】"理财宝宝大比拼"，新理财资讯一网打尽',  //内容
                type: 'success',                                     //状态
                title: '推送',                                       //标题
                btnOk: {                                             //确认按钮
                    val: '确认',                                     // 按钮文字
                    close: false                                     // 触发后是否关闭弹窗（ true: 关闭， false: 保留）
                    call: function(evt){                             // 确认按钮回调函数
                        console.log(evt)
                    }
                },
                btnCancel:{
                    val: '关闭',
                    call: function(evt){
                        console.log(evt)
                    },
                    close: true
                },
                autoClose: true,                                     // 是否自动关闭
                closeTime: 2000,                                     // 多长时间自动关闭
                ZorQ: 'Zepto'                                       // 基于 jQuery 还是 Zepto, 默认 'Zepto', 可选值：'jQuery' || 'Zepto'
            });
 *
 *
 */

//define(['jQuery', 'text!templates/public/tipDialog.html'], function($, tipDialogHTML){
;(function(){

    'use strict';

    //模板
    var tipDialogHTML = '<div id="tipDialog" class="tipDialog-00" style="width:80%;">'+
        '<button type="button" class="close">×</button>'+
        '<i class="tipType"></i>'+
        '<span class="tipTitle"></span>'+
        '<p class="tipContent"></p>'+
        '<div class="tipBtns">'+
        '<span class="btnCancel">关闭</span>'+
        '<span class="btnOk">确认</span>'+
        '</div>'+
        '</div>';


    var tipDialog = function(options){
        //svg图标
        var svgs = {
            'success': '<svg><g id="icon-checkmark-circle" fill="#79C46C"><path d="M24 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zM19.5 39l-9.938-12.938 4.406-4.594 5.531 7.031 17.344-14.156 2.156 2.156-19.5 22.5z"></path></g></svg>',
            'error': '<svg><g id="icon-cancel-circle" fill="#FF645C"><path d="M24 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zM36 16.243l-7.757 7.757 7.757 7.757v4.243h-4.243l-7.757-7.757-7.757 7.757h-4.243v-4.243l7.757-7.757-7.757-7.757v-4.243h4.243l7.757 7.757 7.757-7.757h4.243v4.243z"></path></g></svg>',
            'warning': '<svg><g id="icon-question" fill="#EAB36E"><path d="M21 33h6v6h-6zM33 12c1.657 0 3 1.343 3 3v9l-9 6h-6v-3l9-6v-3h-15v-6h18zM24 4.5c-5.209 0-10.105 2.028-13.789 5.711s-5.711 8.58-5.711 13.789c0 5.209 2.028 10.106 5.711 13.789s8.58 5.711 13.789 5.711c5.209 0 10.106-2.028 13.789-5.711s5.711-8.58 5.711-13.789c0-5.209-2.028-10.105-5.711-13.789s-8.58-5.711-13.789-5.711zM24 0v0c13.255 0 24 10.745 24 24s-10.745 24-24 24c-13.255 0-24-10.745-24-24s10.745-24 24-24z"></path></g></svg>',
            'info': '<svg><g id="icon-info" fill="#62D1CD"><path d="M24 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zM21 9h6v6h-6v-6zM30 39h-12v-3h3v-12h-3v-3h9v15h3v3z"></path></g></svg>'
        };

        //创建选项
        var opts = options || {};
        var defaults = {
            type: opts.type || '',
            title: opts.title || '',
            msg: opts.msg || '',
            btnOk: {
                val: opts.btnOk && opts.btnOk.val || '\u786e\u8ba4', //确认
                call: opts.btnOk && opts.btnOk.call || btnFunction,
                close: (opts.btnOk && opts.btnOk.close != undefined) ? opts.btnOk.close : true
            },
            btnCancel: {
                val: opts.btnCancel && opts.btnCancel.val || '\u5173\u95ed', //关闭
                call: opts.btnCancel && opts.btnCancel.call || btnFunction,
                close: (opts.btnCancel && opts.btnCancel.close != undefined) ? opts.btnCancel.close : true
            },
            lock: opts.lock || true,
            time: opts.time || 'fast',
            autoClose: (undefined == opts.autoClose ? true : opts.autoClose),
            closeTime: opts.closeTime || 2000,
            ZorQ: 'Zepto' // 'jQuery' || 'Zepto'
        };

        //回调执行
        var handEvent = function(obj, callback){
            var self = this, args = [];
            for(var i = 2; i < arguments.length; i++)   args.push(arguments[i]);
            return function(e){
                e.preventDefault();
                e.stopPropagation();
                //console.log(e);
                args.push(e);
                args.push(obj);
                btnFunction(obj.close);
                if(typeof callback === 'function'){
                    callback.apply(tipDialog, args);
                }
            }
        };

        var cache = [];
        var tipDialog    = $('#tipDialog')[0] ? $('#tipDialog') : $(tipDialogHTML);
        var tipCloseBtn  = tipDialog.find('.close');
        var tipType      = tipDialog.find('.tipType');
        var tipTitle     = tipDialog.find('.tipTitle');
        var tipContent   = tipDialog.find('.tipContent');

        //按钮
        var tipBtns      = tipDialog.find('.tipBtns');
        var btnOk        = tipDialog.find('.btnOk');
        var btnCancel    = tipDialog.find('.btnCancel');

        /* 创建背景遮罩层 */
        var masker = document.getElementById('tipDialogMasker00')
            ? document.getElementById('tipDialogMasker00')
            : document.createElement('div');
        masker.setAttribute('id', 'tipDialogMasker00');
        masker.setAttribute('class', 'tipDialogMasker');
        document.body.appendChild(masker);
        if(defaults.ZorQ == 'jQuery'){
            $(masker).stop().fadeIn(defaults.time);
        }else if(defaults.ZorQ == 'Zepto'){
            $(masker).show();
        }

        //获取页面窗口大小
        var ww = $(window).width();//document.documentElement.clientWidth;
        var wh = $(window).height();
        tipContent.html(opts.msg || '');
        masker.appendChild(tipDialog[0]);
        //console.log(tipDialog.width(), tipDialog.height(), ww, wh) ;
        //tipDialog.width(ww * .8);
        if(defaults.ZorQ == 'jQuery'){
            tipDialog.stop().fadeIn(defaults.time);
        }else if(defaults.ZorQ == 'Zepto'){
            tipDialog.show();
        }
        tipDialog.css({ left: "10%", top: "30%" });

        //类型定义
        if(defaults.type && defaults.type != ''){
            tipType.html(svgs[defaults.type]).css('display', 'block');
        }

        //显示标题
        if(defaults.title && defaults.title != ''){
            tipTitle.text(defaults.title).show();
        }else{
            tipTitle.text('').hide();
        }

        //自动隐藏
        if(defaults.autoClose){
            setTimeout(function(){
                _hide();
            }, defaults.closeTime);
        }

        //按钮存在
        var isOk        = opts.btnOk && opts.btnOk != {};
        var isCancel    = opts.btnCancel && opts.btnCancel != {};
        tipBtns.show();
        //确认按钮和关闭存在
        if(isOk && isCancel){
            btnOk.removeClass('btmRadius').addClass('btmRRadius').css({
                'borderLeft': 'solid 1px #CCC',
                'width': '49%',
                'display': 'block'
            }).html(defaults.btnOk.val);
            btnOk.on('touchend', handEvent(defaults.btnOk, defaults.btnOk.call));

            btnCancel.removeClass('btmRadius').addClass('btmLRadius').css({
                'width': '50%',
                'display': 'block'
            }).html(defaults.btnCancel.val);
            btnCancel.on('touchend', handEvent(defaults.btnCancel, defaults.btnCancel.call));
            //确认按钮存在, 关闭按钮不存在
        }else if(isOk && !isCancel){
            btnOk.removeClass('btmLRadius').addClass('btmRadius').css({
                'borderLeft': 'none',
                'width': '100%',
                'display': 'block'
            }).html(defaults.btnOk.val);
            btnOk.on('touchend', handEvent(defaults.btnOk, defaults.btnOk.call));
            btnCancel.css({ 'display': 'none' });
            //确认按钮不存在, 关闭按钮存在
        }else if(!isOk && isCancel){
            btnCancel.removeClass('btmLRadius').addClass('btmRadius').css({
                'borderRight': 'none',
                'width': '100%',
                'display': 'block'
            }).html(defaults.btnCancel.val);
            btnCancel.on('touchend', handEvent(defaults.btnCancel, defaults.btnCancel.call));
            btnOk.css({ 'display': 'none' });
            //确认按钮和关闭按钮都不存在
        }else if(!isOk && !isCancel){
            tipBtns.hide();
        }

        //btnOk.on('tap', endEvent);
        //btnCancel.on('tap', endEvent);

        //关闭
        /*tipCloseBtn.on('click', function(evt){
         tipDialog.hide();
         return false;
         });*/

        var show = _show;
        var hide = _hide;

        function _show(time, callback){
            //$(masker).fadeIn(defaults.time, callback);
            if(defaults.ZorQ == 'jQuery'){
                $(masker).stop().fadeIn(defaults.time, callback);
            }else if(defaults.ZorQ == 'Zepto'){
                $(masker).show();
            }
        }
        function _hide(time, callback){
            //$(masker).fadeOut(defaults.time, callback);
            if(defaults.ZorQ == 'jQuery'){
                $(masker).stop().fadeOut(defaults.time, callback);
            }else if(defaults.ZorQ == 'Zepto'){
                $(masker).hide();
            }
        }

        //按钮默认事件
        var btnFunction = function(flag, callback){
            if(document.getElementById('payaccount-contianer')){
                document.getElementById('payaccount-contianer').innerHTML = '';
            }
            var sit;
            if(flag){
                sit = setTimeout(function(){
                    clearTimeout(sit);
                    //$(masker).stop().fadeOut(defaults.time);
                    if(defaults.ZorQ == 'jQuery'){
                        $(masker).stop().fadeOut(defaults.time);
                    }else if(defaults.ZorQ == 'Zepto'){
                        $(masker).hide();
                    }
                },50);
                return false;
            }
            //callback.call(this);
        };

        function endEvent(evt){
            evt.preventDefault();
            evt.stopPropagation();
        }

        return this;
    };

    //作为mp框架的模块
    if(window.PayAccount){
        window.PayAccount.tipDialog = tipDialog;
    }else{
        window.PayAccount = new Object();
        window.PayAccount.tipDialog = tipDialog;
    }
    return tipDialog;
}).call(this);


/**
 * Created by rodey on 14/10/22.
 */
!(function(){

    var root = this;

    var utils = {
        // 在localStorage中存取
        getItem: function(key, flagInt){
            var flagInt = flagInt || 1;
            var storage = window.localStorage;
            if(flagInt <= 0){
                storage = window.sessionStorge;
            }
            var result;
            result = storage.getItem(key);
            try{
                result = JSON.parse(result);
            }catch(e){}

            return result;
        },
        setItem: function(key, value, flagInt){
            var flagInt = flagInt || 1;
            var storage = window.localStorage;
            if(flagInt <= 0){
                storage = window.sessionStorge;
            }
            if(typeof key === 'object'){
                for(var k in key){
                    storage.setItem(k, key[k]);
                }
            }else if(typeof key === 'string' && key.length > 0){
                if(typeof value === 'object'){
                    storage.setItem(key, JSON.stringify(value));
                }else{
                    storage.setItem(key, value);
                }
            }else{
                return this;
            }
        },
        hasItem: function(key, flagInt){
            var flagInt = flagInt || 1;
            return (flagInt <= 0) ? Boolean(window.sessionStorge.getItem(key)) : Boolean(window.localStorage.getItem(key));
        },
        removeItem: function(key, flagInt){
            var flagInt = flagInt || 1;
            if(flagInt <= 0)
                window.sessionStorge.removeItem(key);
            else
                window.localStorage.removeItem(key);
        },
        removeAll: function(flag, flagInt){
            var flagInt = flagInt || 1;
            if(flagInt <= 0)
                window.sessionStorge.clear();
            else
                window.localStorage.clear();
        },

        /**
         * 通用AJAX请求方法
         * @param url
         * @param postData
         * @param su
         * @param fail
         */
        doRequest: function(url, postData, su, fail, options){
            if(!postData || typeof postData !== 'object' || !url || url == '') return;
            var su = options && options.success ? options.success : su;
            var fail = options && options.error ? options.error : fail;
            var type = options && options.type ? options.type : 'post';
            var dataType = options && options.dataType ? options.dataType : 'json';
            if(root.$ || root.Zepto){
                root.Zepto.ajax({
                    url: url,
                    type: type,
                    data: postData,
                    dataType: dataType,
                    crossDomain:true,
                    success: function(res){
                        //console.log(res);
                        if(typeof su === 'function') su.call(this, res);
                    },
                    error: function(xhr, errType){
                        //alert('网络异常，请重试');
                        //console.log('网络异常，请重试');
                        if(typeof fail === 'function') fail.call(this, xhr, errType);
                    }
                });
            }else{
                throw new Error('doRequest: $不存在，此方法依赖于(jQuery||Zepto||Ender)');
            }
        },
        /**
         * doRequest 包装
         * @param url
         * @param postData
         * @param su
         * @param fail
         */
        doAjax: function(url, postData, su, fail, options){
            var postData = $.extend({
                'pf': navigator.userAgent.match(/(android|iphone|ipod|ipad)/i)[0] || '',
                'md': '',
                'rhv': '',
                'sw': document.documentElement.clientWidth,
                'sh': document.documentElement.clientHeight,
                'nt': ''
            }, postData);
            this.doRequest(url, postData, function(res){
                if(typeof su === 'function') su.call(this, res);
            }, function(xhr, errType){
                if(typeof fail === 'function') fail.call(this, xhr, errType);
            }, options);
        },

        //验证 E-mail 地址
        isEmail     : function(val){      return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi.test(val); },
        //验证 URL 地址
        isURL       : function(val){        return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/i.test(val); },
        //验证电话号码
        isTel       : function(val){        return /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/gi.test(val); },
        //验证手机号码
        isMobile    : function(val){     return /^1[3|4|5|6|7|8]{1}\d{9}$/.test(val); },
        isZip       : function(val){    return /^\d{6}$/.test(val); },
        // 去除两边空白
        trim        : function(val){        return val.replace(/^\s*|\s*$/gi, ''); },
        strimHtmlTag: function(val){        return val.replace(/<\/?[^>]*>/gi, ''); },
        //获取get模式下url中的指定参数值
        getParams: function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if(r) {
                return decodeURI(r[2]);
            }
            return null;
        },
        /**
         * 浏览器 cookie操作
         */
        Cookie: function(key, value, options) {
            if(arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
                options = options || {};

                if(value === null || value === undefined) {
                    options.expires = -1;
                }

                if( typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                value = String(value);

                return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
            }
            options = value || {};
            var decode = options.raw ? function(s) {
                return s;
            } : decodeURIComponent;
            var pairs = document.cookie.split('; ');
            for(var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
                if(decode(pair[0]) === key)
                    return decode(pair[1] || '');
            }
            return null;
        },

        //生成随机字符串
        generateChars: function(len){
            var chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
            var clen = chars.length;
            var len = Number(len) || Math.floor(Math.random() * clen / 9 + 6);
            //console.log(len);
            var i = 0;
            var s = [];
            if(len && len >= 0){
                for(; i < len; ++i){
                    s.push(chars[Math.floor(Math.random() * clen)]);
                }
            }
            return s.join('');
        },

        dateFm: function(n){ return (n < 10 ? '0' + n : n); },
        /**
         * 将指定时间戳转为： yyyy-assistModel-dd hh:ii:ss
         * @param timestamp
         * @param flag  // true 返回数组 ['2014-08-09', '12:36:38'] , false 返回字符串 '2014-08-09 12:36:38'
         * 默认返回字符串
         * @return {String}
         */
        setDateFormat: function(timestamp, flag){
            var flag = flag || false;
            var date = new Date(parseInt(timestamp, 10));
            if(!flag){
                return date.getFullYear() +'-'+ this.dateFm(date.getMonth() + 1) +'-'+ this.dateFm(date.getDate()) + ' ' + this.dateFm(date.getHours()) + ':' + this.dateFm(date.getMinutes()) + ':' + this.dateFm(date.getSeconds());
            }else{
                return [date.getFullYear() +'-'+ this.dateFm(date.getMonth() + 1) +'-'+ this.dateFm(date.getDate()), this.dateFm(date.getHours()) + ':' + this.dateFm(date.getMinutes()) + ':' + this.dateFm(date.getSeconds())];
            }
        },

        animate: {
            animateTranslate: function(obj, x, y, z, duration, delx){
                obj.css({
                    '-webkit-transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)',
                    '-moz-transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)',
                    '-ms-transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)',
                    '-o-transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)',
                    'transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)'
                });
            }
        }
    };

    window.PayAccount.utils = utils;

})();


PayAccount.simpScroller = (function() {
	// 根据是否支持touch方法确定事件的类型
	var _upSupportTouch = !((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window) * 1
		, _event = {
		start: ["touchstart", "mousedown"][_upSupportTouch],
		move: ["touchmove", "mousemove"][_upSupportTouch],
		end: ["touchend", "mouseup"][_upSupportTouch]
	};
	
	// 滚动
	var _scroller = function(container, direction, params) {
		var key = "top", Key = "Top", size = "height", Size = "Height", pageKey = "pageY";
		if (direction == "horizontal") {
			key = "left";
			Key = "Left"
			size = "width";
			Size = "Width"
			pageKey = "pageX";
		}
		
		
		// 插入滚动条
		var scroller = null;
		if (params.hideScrollBar == false) {
			scroller = document.createElement("div");
			scroller.className = "scroller_" + direction;
			params.container.appendChild(scroller);
		}
		
		// 容器尺寸以及包含滚动的尺寸
		var sizeContainer = container["client" + Size]
			// 因为有滚动动态加载等情况出现，因此默认为0
			, sizeContainerWithScroll = 0;
		
		// 滚动条位置定位方法
		var fnPosScroll = function() {
			if (scroller == null) return;
			var sizeScroller = scroller.style[size].replace("px", "")
				, keyScroller = container["scroll" + Key] / (sizeContainerWithScroll - sizeContainer) * (sizeContainer - sizeScroller);
			
			// 边界溢出的修正
			if (sizeContainer - sizeScroller - keyScroller <= 0) {
				keyScroller = sizeContainer - sizeScroller;
			}
			// 滚动条的定位
			scroller.style[key] = keyScroller + "px";
		};
		
		// 事件
		var pos = {};
		container.addEventListener(_event.start, function(event) {	
			sizeContainerWithScroll = this["scroll" + Size];
			pos[pageKey] = event.touches? event.touches[0][pageKey]: event[pageKey];
			pos[key] = this["scroll" + Key];
			document.moveFollow = true;
			if (scroller && sizeContainerWithScroll > sizeContainer) {
				scroller.style.opacity = 1;
				scroller.style[size] = (sizeContainer * sizeContainer / sizeContainerWithScroll) + "px";
				
				fnPosScroll();	
			}
		});	
		container.addEventListener(_event.move, function(event) {		
			if (_upSupportTouch == false || (document.moveFollow == true)) {
				// touch设备或有可移动标志
                this["scroll" + Key] = pos[key] + (pos[pageKey] - (event.touches? event.touches[0][pageKey]: event[pageKey]));
				// 自定义滚动条的位置
				fnPosScroll();
				// 回调
				params.onScroll.call(this, event);
			}	
			// 阻止默认滚动
			event.preventDefault();
		});
		container.addEventListener(_event.end, function(event) {
			scroller && (scroller.style.opacity = 0);
		});
		
		if (_upSupportTouch == true) {
			document.addEventListener("mouseup", function() {
				this.moveFollow = false;	
			});	
		}
	};
	
	// 滚动方法
	return function(container, options) {
		options = options || {};
		// 确定参数
		var params = new Object({
			verticalScroll: true,
			horizontalScroll: false,
			hideScrollBar: false,
			onScroll: function() {}
		}), key;
		for (key in options) {
			params[key] = options[key];	
		}
		
		if (window.getComputedStyle(container).position == "static") {
			container.style.position = "relative";
		}

		
		// 子元素们
		var childerns = container.childNodes
		// 文档片段
			, fragment = document.createDocumentFragment();
			
		// 将子元素的集合放在文档片段中
		// 方便实现wrap效果
		[].slice.call(childerns).forEach(function(child) {
			fragment.appendChild(child);	
		});
		
		// wrap的父元素
		var wrap = document.createElement("div");
		wrap.style.height = "100%";
		wrap.style.width = "100%";
		wrap.style.overflow = "hidden";
		
		// 容器插入包裹元素
		container.appendChild(wrap);
		// 加载子元素集合文档片段，完成wrap包裹效果
		wrap.appendChild(fragment);
		params.container = container;
		
		if (params.verticalScroll == true) {
			_scroller(wrap, "vertical", params);	
		}
		if (params.horizontalScroll == true) {
			_scroller(wrap, "horizontal",  params);	
		}
	};
})();

/**
 * Created by Rodey on 2014/10/13.
 */

/**
 * 定义 PayAccount 对象==========
 * 用与全局指定，初始化，自动注册，登录，绑定手机，充值等
 * 具体详情请查看文档 ...
 */
var PayAccount = (function($, undefined){

    'use strict';

    //zepto 重定义proxy方法 =====
    if($ || zepto || jquery){
        $.proxy = function(content, prop, data){
            var args = ([].slice.call(arguments)).slice(2);
            return function(e){
                (e && typeof e === 'object') && args.push(e);
                content[prop].call(content, e, data, args);
            }
        };
        $.fx.off = false;
    }


    //console.dir($);
    var PayAccount = window.PayAccount || new Object();

    PayAccount.config = {};
    var config = PayAccount.config;

    //接口默认地址 == 全局配置 ==
    var web_server_apis = {
        //注册---自动生成账号
        'register': 'payaccount/fastreg',
        //登录
        'login': 'payaccount/login',
        //获取短信验证码
        'sendMScode': 'payaccount/sendphonecode',
        //绑定手机号
        'bindPhone': 'payaccount/bindphone',
        //修改密码
        'modPwd': 'payaccount/resetpwd',
        //设置密码
        'setPwd': 'payaccount/setpwd',
        //通过手机找回密码
        'findPwdByPhone': 'payaccount/findPasswprdByPhone',
        //充值
        topUp: 'payaccount/topup',
        //查询余额
        queryBalance: 'payaccount/querybalance',
        //购买商品，创建订单
        buyDiamond: 'payaccount/buygoods'
    };

    var Logger = {
        success: function(text){ console.log('%c ['+ PayAccount.utils.setDateFormat(Date.now()) + '] ' + text +': ', 'padding:0 50px 0 10px;background:green;color:white;'); },
        info: function(text){ console.log('%c ['+ PayAccount.utils.setDateFormat(Date.now()) + '] ' + text +': ', 'padding:0 50px 0 10px;background:cyan;color:white;'); },
        error: function(text){ console.log('%c ['+ PayAccount.utils.setDateFormat(Date.now()) + '] ' + text +': ', 'padding:0 50px 0 10px;background:red;color:white;'); },
        warning: function(text){ console.log('%c ['+ PayAccount.utils.setDateFormat(Date.now()) + '] ' + text +': ', 'padding:0 50px 0 10px;background:orange;color:white;'); }
    };

    //通用参数
    var generalParameters = {

    };

    //支付类型数组
    var payCatetorys = {
        'alipay': '{{1}}支付宝',
        'yeepay': '{{2}}充值卡',
        'SMS': '{{3}}短信充值(优贝)',
        'tenpay': '{{4}}财付通',
        'mo9': '{{5}}mo9先玩后付',
        'weixinweb': '{{6}}微信支付web扫码',
        //充值卡类型
        types: {
            //支付宝的
            'ALIPAYDIRECT': '网页版即时到帐',
            'WS_WAP_PAYWAP': 'Wap即时到帐',
            'WS_SECURE_PAY': '快捷支付',
            //SMS(短信充值)
            'SMS_UPAY': '短信（优贝）',
            //充值卡充值的
            'TELECOM': '电信充值卡',
            'SZX': '移动充值卡',
            'UNICOM': '联通充值卡',
            'QQCARD': 'QQ充值卡',
            //财付通的
            'TENPAY': '财付通',
            //Mo9先玩后付
            'MO9': 'Mo9先玩后付',
            //微信支付web扫码
            'WEIXINWEB': '微信支付web扫码'

        },

        //充值所使用的平台 1-web端； 2-移动端
        clientType: 2
    };

    var CS = {
        //'e_bank':		{ name:'网上银行',       type: ''},
        'e_unicom':		{ name:'联通充值卡',     type: 'UNICOM', cardmtList: [10,20,30,50,100,200,300,500,1000]},
        'e_telecom':	{ name:'电信充值卡',     type: 'TELECOM', cardmtList: [50,100]},
        'e_szx':		{ name:'神州行充值卡',   type: 'SZX', cardmtList: [10,20,30,50,100,200,300,500,1000]},
        'e_qqcard':		{ name:'Q币充值卡',      type: 'QQCARD', cardmtList: [5,10,15,20,30,60,100,200]},
        'e_sndacard':	{ name:'盛大一卡通',     type: 'SNDACARD', cardmtList: [5,10,30,35,45,100,350,1000]},
        'e_zongyou':	{ name:'纵游一卡通',     type: 'ZONGYOU', cardmtList: [5,10,15,30,50,100]},
        'e_tianxia':	{ name:'天下一卡通',     type: 'TIANXIA', cardmtList: [5,6,10,15,30,50,100]},
        'e_tianhong':	{ name:'天宏一卡通',     type: 'TIANHONG', cardmtList: [5,10,15,20,30,50,100]},
        'e_junnet':		{ name:'骏网一卡通',     type: 'JUNNET', cardmtList: [5,10,15,20,30,60,100,200]},
        'e_wanmei':		{ name:'完美充值卡',     type: 'WANMEI', cardmtList: [15,30,50,100]},
        'e_netease':	{ name:'网易充值卡',     type: 'NETEASE', cardmtList: [10,15,20,30,50]},
        'e_sohu':		{ name:'搜狐充值卡',     type: 'SOHU', cardmtList: [5,10,15,30,40,100]},
        'e_jiuyou':		{ name:'久游充值卡',     type: 'JIUYOU', cardmtList: [5,10,30,50]},
        'e_ypcard':		{ name:'易宝e卡通',      type: 'YPCARD', cardmtList: [2,5,10,15,20,25,30,50,100]},
        'e_zhengtu':	{ name:'征途充值卡',     type: 'ZHENGTU', cardmtList: [5,10,15,18,20,25,30,50,60,68,100,120,180,208,250,300,468,500]}
        //'a_direct':		{ name:'Wap即时到帐', type: 'WS_WAP_PAYWAP'},
        //'sms_upay':		{ name:'短信（优贝）', type: 'SMS_UPAY'}
    };

    /**
     * +++++++++++++++++++++++++++++++++++++检查账号是否存在+++++++++++++++++++++++++++++++++++++++=
     */
    PayAccount.checkAccount = function(config){
        var self = this;
        var config = config || PayAccount.config;
        self.config = $.extend({
            DEBUG: false,
            //ajax请求方式
            XHR_TYPE: 'POST',
            CHECK_ACCOUNT: false,
            //如果服务器跟地址不存在，则使用主服务器默认地址， 这个后面应该填确认的接口跟路径
            BASE: window.location.origin, //项目后台的接口地址
            PATH: '',
            _STURL_: window.location.origin + window.location.pathname || 'http://farm.gamexun.com/farm-web/', //模板、css、apiJson的文件地址，请谨慎修改
            TEMPLATE: 'templates/viewTemplate.html',
            CSS: 'assets/css/app.css',
            API_URL: 'data/web_server_api.json',
            WEB_SERVER_URL: web_server_apis,
            APPID: '677e4460-7ef2-4b9a-9172-5b94b406730f', //appid和appkey应尽量放到后段
            APPKEY: '677e4460-7ef2-4b9a-9172-5b94b406730f', //这里appid和appkey已经放到后台了
            PLAIN_TEXT: 'PKCS7',
            NBITS: 128

        }, config);
        //对象相关全局变量
        self.isInit = false;
        //当前的token
        self.token = '';
        //师傅需要认证
        self.isAuthoration = false;
        //支付类型
        self.payCatetorys = payCatetorys;
        self.CS = CS;
        //是否是购买商品的时候，金额不足然后跳到充值面板，充值成功后将定位到购买商品面板
        self.buyReturn = false;
        //存储当前购买的商品信息
        self.goodsData = {};
        //当前余额(盛米)
        self.sm_balance = 0;
        //当前用户金额
        self.money_balance = 0;
        //是否正在请求后数据中...
        self.isPost = false;
        //充值的默认数据
        self.payCategory = 'alipay';    //默认支付宝充值
        self.payType = 'WS_WAP_PAYWAP'; //如果是充值卡；默认 电信充值卡
        self.payMoney = 500;           //默认5000盛米 rmb：500
        self.stim = null;
        self.isAutoLogin = false;
        self.callback = null;   //各种操作的回调

        //初始化
        self.init();

    };
    PayAccount.checkAccount.prototype = {

        /**
         * 获取接口路径
         * @private
         */
        _getServersAPI: function(apiUrl){
            var self = this;
            var apiUrl = apiUrl || self.config.API_URL;
            apiUrl = self.config._STURL_ + apiUrl;
            $.getJSON(apiUrl, function(res){
                if(String(res.code) == "200"){
                    self.isInit = true;
                    self.config.WEB_SERVER_URL = res.apis;
                }else{
                    throw new ReferenceError('--->获取api地址出错');
                }
            }, function(err){
                throw new ReferenceError('--->获取api地址时出现网络异常');
            });
        },

        /**
         * 查询余额 ( 后台默认请求查询 )
         * @private
         */
        _queryBalance: function(dom, cb){
            var self = this, dom = dom;
            var url = self.getWebServerUrl('queryBalance');
            var postData = {
                token: self.tokener()
            };
            if(self.isPost) return false;
            self.isPost = true;
            if(dom && '' !== dom){
                if(typeof dom === 'string')
                    dom = $('#' + dom);
                else if(typeof dom === 'object')
                    dom = $(dom);
                //为当前的dom对象增加正在查询余额的进度样式
                dom.addClass('loading').html('').css({
                    'background-size': '16px 16px'
                });
            }

            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                dom && dom.removeClass('loading');
                if(String(res.code) == '1'){
                    self.balance = self.ms_balance = res.result.balance;
                    //向当前用户的本地数据中写入余额字段
                    self.insertItemFormUserData('balance', res.result.balance);
                    console.log('....res中....');
                }
                //完成后回调
                (cb && typeof cb === 'function') && cb.apply(self, arguments);
            }, function(err){
                self.isPost = false;
                dom && dom.removeClass('loading');
                (cb && typeof cb === 'function') && cb.apply(self, arguments);
            }, { type: self.config.XHR_TYPE });
        },

        //页面初始化
        init: function(){
            var self = this;
            if(!self.config.WEB_SERVER_URL || typeof self.config.WEB_SERVER_URL !== 'object'){
                self._getServersAPI(self.config.API_URL);
            }
            //获取账号信息
            self.sdkUserID = PayAccount.utils.getItem('sdkUserID');
            self.sdkUserData = PayAccount.utils.getItem('sdkUserData');
            self.isPayaccount = (self.sdkUserID && '' != self.sdkUserID && null != self.sdkUserID) ? true : false;

            //console.log(self.sdkUserID, self.isPayaccount);
            //加载需要的模板
            self.ww = document.documentElement.clientWidth || document.body.clientWidth;
            self.wh = document.documentElement.clientHeight || document.body.clientHeight;

            //当前账户余额， 默认为0，检查到账号已经登录后将请求后台查询
            self.balance = self.queryItemFormUserData('balance') || 0;

            //开始渲染模板到页面dom中
            this.render();
        },

        //加载并渲染模板
        render: function(){
            var self = this;
            //将组件的css文件添加的dom中
            self.appendCss(self.config.CSS);
            if(self.isPost) return false;
            self.isPost = true;
            //读取模板文件
            $.ajax({
                url: self.config._STURL_ + this.config.TEMPLATE,
                type: 'GET',
                dataType: 'html',
                success: function(res){
                    self.isPost = false;
                    //console.log(res);
                    //将模板数据添加到当前的dom中
                    //$('body').prepend(res);
                    //默认将组件的顶级元素也加入到dom中
                    //self.createMainContianer();
                    //加载需要的模板
                    self.ww = $(window).width();
                    self.wh = $(window).height();
                    //开始检查用户是否登录或者是否注册
                    if(self.config.CHECK_ACCOUNT){
                        self.checkPayaccount();
                    }
                },
                error: function(){
                    self.isPost = false;
                    console.log('网络异常，加载模板资源失败！');
                }
            });
        },

        /**
         * 初始化时就创建组件的顶级容器，然后将容器预先放到dom中
         */
        createMainContianer: function(){
            var self = this;
            var contianer = document.createElement('div');
            contianer.setAttribute('id', 'payaccount-contianer');
            contianer.setAttribute('class', 'payaccount-contianer');
            contianer.innerHTML = '';
            document.body.appendChild(contianer);
            self.contianer = $(contianer);
        },

        /**
         * 创建组件顶级容器, 并将子内容添加到容器中
         * @param dom
         * @returns {boolean}
         */
        appendToMainContiner: function(dom){
            var contianer = document.getElementById('payaccount-contianer');
            var dom = (typeof dom === 'string') ? $(dom) : $(dom)[0];
            if(contianer){
                contianer.innerHTML = '';
                //$(contianer).remove();
            }else{
                contianer = document.createElement('div');
                contianer.setAttribute('id', 'payaccount-contianer');
                contianer.setAttribute('class', 'payaccount-contianer');
                if(dom.attr('id') != 'payaccount-register' || !dom.hasClass('payaccount-check')){
                    $(contianer).addClass('add-background');
                }
                $('body').append($(contianer));
            }

            //console.dir(dom)
            $(contianer).append(dom);
            if(!dom.hasClass('payaccount-check')){
                $(contianer).addClass('add-background');
            }

            this.contianer = $(contianer);
        },

        /**
         * 动态添加css文件到dom中
         * @param cssfile 文件地址
         */
        appendCss: function(cssfile){
            var linkStyle = document.getElementById('app-css');
            if(!linkStyle){
                linkStyle = document.createElement('link');
                linkStyle.setAttribute('id', 'app-css');
                linkStyle.rel = 'stylesheet';
                linkStyle.href = this.config._STURL_ + cssfile;
                document.getElementsByTagName('head')[0].appendChild(linkStyle);
            }
        },

        /**
         * 隐藏或者消除指定的层
         * @param id    id值 或者是 zepto(jQuery)对象
         * @param time  延迟时间
         * @param cb    完成后的回调
         */
        hideORremoveDom: function(id, cb, flag){
            var self = this;
            var id = arguments[0];
            var time = arguments[2] || 150;
            var cb = arguments[1] || function(){};
            //获取element，将其显示
            var dom = (typeof id === 'string') ? $('#' + id) : $(id);
            var dw = dom.width(),
                dh = dom.height(),
                cw = (self.ww - dw) * .5,
                ch = (self.wh - dh) * .5;
            //显示交互按钮动画效果
            if(dom[0]){
                dom.removeClass('animate-translate');
                self.contianer.removeClass('add-background');
                dom.removeAttr('style');
                var stim = setTimeout(function(){
                    clearTimeout(stim);
                    !flag && dom.remove();

                    (typeof cb === 'function') && cb.apply(self);
                    (typeof self.callback === 'function') && self.callback.apply(self);
                }, time || 25);
            }else{
                (typeof cb === 'function') && cb.apply(self);
            }
            self.contianer.removeClass('add-background');
            $('.payaccount-contianer').removeClass('add-background');
        },

        /**
         * 延迟现实作用层
         * @param dom
         * @param time
         */
        showDomAStimeout: function(dom, time, cb){
            var dom = (typeof dom === 'string') ? $('#' + dom) : $(dom);
            var self = this;
            //加载需要的模板
            self.ww = document.documentElement.clientWidth || document.body.clientWidth;
            self.wh = document.documentElement.clientHeight || document.body.clientHeight;
            var dw = (dom.width() == self.ww) ? self.ww * .9 : dom.width(), //初始其实为屏幕的 90%
                dh = dom.height(),
                cw = (self.ww - dw) * .5, ch = (self.wh - dh) * .5;
            //显示交互按钮动画效果
            var stim = setTimeout(function(){
                clearTimeout(stim);
                dom.addClass('animate-translate');
                if(!dom.hasClass('payaccount-check'))
                    self.transformTo(dom, cw, ch, 0);
                if(typeof cb === 'function')
                    cb.apply(self);

            }, time || 25);
        },

        /**
         * 动画现实当前层
         * @param dom
         * @param x
         * @param y
         * @param z
         * @param flag
         */
        transformTo: function(dom, x, y, z, flag){
            var dom = typeof dom === 'string' ? $('#' + dom) : $(dom);
            var flag = flag || true, x = x || 0, y = y || 0, z = z || 0;
            if(flag){
                dom.css({
                    '-webkit-transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)',
                    '-moz-transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)',
                    '-ms-transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)',
                    '-o-transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)',
                    'transform': 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)'
                });
            }

        },

        /**
         * 存储用户信息到本地
         * sdkUserID: 用户名
         * sdkUserData: 当前用户所有信息
         * @param data
         */
        setGameUserData: function(data){
            var body = data;
            if(body && typeof body === 'object'){
                this.sdkUserID = body.userid;
                PayAccount.utils.setItem('sdkUserID', this.sdkUserID);
                PayAccount.utils.setItem('sdkUserData', body);
            }
            this.token = data.token;
            PayAccount.utils.setItem('token', this.token);
            this.sdkUserID = PayAccount.utils.getItem('sdkUserID');
            this.sdkUserData = PayAccount.utils.getItem('sdkUserData');
            this.account = PayAccount.utils.getItem('account');
            this.isPayaccount = (this.account && '' != this.account && null != this.account && typeof this.account === 'string') ? true : false;
        },
        /**
         * 向当前本地数据中添加或者覆盖字段
         * @param key
         * @param value
         */
        insertItemFormUserData: function(key, value){
            var self = this, userData = PayAccount.utils.getItem('sdkUserData') || {};
            userData[key] = value;
            PayAccount.utils.setItem('sdkUserData', userData);
            self.sdkUserData = PayAccount.utils.getItem('sdkUserData');
        },
        queryItemFormUserData: function(key){
            var self = this, userData = PayAccount.utils.getItem('sdkUserData') || self.sdkUserData || {};
            return (userData && userData[key]) ? userData[key] : undefined;
        },

        //Token getter and setter
        tokener: function(token){
            var self = this;
            if(token && typeof token === 'string'){
                self.token = token;
                PayAccount.utils.setItem('sdGameUserToken', token);
            }else{
                return (self.token || PayAccount.utils.getItem('sdGameUserToken'));
            }
        },
        getToken: function(){
            return (this.token || PayAccount.utils.getItem('sdGameUserToken'));
        },
        setToken: function(token){
            this.token = token;
            PayAccount.utils.setItem('sdGameUserToken', token);
        },

        //userid getter and setter
        userid: function(userid){
            var self = this;
            if(userid && typeof userid === 'string'){
                self.sdkUserID = userid;
                PayAccount.utils.setItem('sdkUserID', userid);
            }else{
                return (this.sdkUserID || PayAccount.utils.getItem('sdkUserID'));
            }
        },
        getUserId: function(){
            return (this.sdkUserID || PayAccount.utils.getItem('sdkUserID'));
        },
        setUserId: function(userid){
            this.sdkUserID = userid;
            PayAccount.utils.setItem('sdkUserID', userid);
        },

        //修改手机绑定状态
        setBindPhoneStatus: function(isBindPhone){
            var self = this;
            self.insertItemFormUserData('isbindphone', isBindPhone || 1);
            self.sdkUserData = PayAccount.utils.getItem('sdkUserData');
        },
        getBindPhoneStatus: function(){
            var self = this;
            return self.queryItemFormUserData('isbindphone');
        },

        /**
         * 获取对应的接口地址
         * @param name
         * @returns {*}
         */
        getWebServerUrl: function(name){
            var base = this.config.BASE + (/\/$/.test(this.config.BASE) ? '' : '/');
            var baseURL = base;
            if(this.config.PATH && typeof this.config.PATH === 'string' && '' !== this.config.PATH){
                baseURL = baseURL + this.config.PATH + (/\/$/.test(this.config.PATH) ? '' : '/');
            }
            return baseURL + this.config.WEB_SERVER_URL[name];
        },

        /*=====token 失效，提示重新登录====*/
        loginAgainAsToken: function(){
            var self = this;
            PayAccount.tipDialog({
                title: '温馨提示',
                type: 'warning',
                msg: '登录信息已过期，请重新登录',
                autoClose: false,
                btnOk: {
                    val: '确认',
                    call: function(){ self.loginAction(); }
                }
            });
        },

        initCallBack: function(){
            if(typeof self.callback === 'function')
                self.callback.call(this);
        },

        resetLogin: function(cb){
            var self = this;
            //if(self.isPost) return;
            var url = self.getWebServerUrl('login');
            var postData = {
                account: self.getUserId(),
                pwd: self.sdkUserData.password || '123456',
                type: 3
            };
            self.isPost = true;

            self.showSign();

            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                self.removeRegisterOrSign();
                if(String(res.code) == '1'){
                    //将返回的用户信息存储到本地
                    console.dir(res);
                    self.setGameUserData(res.result);
                    self.callback && self.callback.call(this, res);
                }else{

                    self.callback && self.callback.call(this, res);

                    /*PayAccount.tipDialog({
                        msg: res.msg || '登录失败，请您重试登录！',
                        type: 'error',
                         autoClose: false,
                         btnOk: {
                            val: '重新登录',
                            call: function(){
                                self.resetLogin();
                            }
                         },
                         btnCancel: { val: '取消' }
                    });*/
                }
            }, function(){
                self.isPost = false;
                self.removeRegisterOrSign();
                PayAccount.tipDialog({
                    msg: '当前网络异常，请您稍后重试！',
                    type: 'error'
                });
            });

        },

        /**
         * 初始化 检查账号是否存在  =====================================================
         * @param id
         */
        initCheckPayaccount: function(id){
            var self = this;

            if(id && '' !== id){
                var dom = (typeof id === 'string') ? $('#' + id) : $(id);
                dom.on('tap', $.proxy(self, 'checkPayaccount'));
                //console.log(dom.selector);
            }else{
                self.checkPayaccount();
            }
        },

        /**
         * 游戏进入加载时并行检查当前手机用户是否已登录或注册
         * 如果没有登录，则显示注册-->后台自动生成账号-->（成功：显示账号信息；失败：提示取消或者重新注册）
         * 在显示账号信息时需提示用户是否立即去绑定当前手机好
         */
        checkPayaccount: function(evt){
            var self = this;
            self.isPayaccount && self._queryBalance();
            if(self.contianer){
                self.hideORremoveDom(self.contianer.children()[0], function(){
                    self.showCheckPayaccount();
                });
            }else{
                self.showCheckPayaccount();
            }
        },

        showCheckPayaccount: function(){
            var self = this, checkPayaccountHTML = '', payaccountCheckDom = null;
            //先渲染需要显示的交互按钮
            var text = self.text = '注册';
            /*if(self.isPayaccount){
                //检查用户已经存在，下一步在页面中显示登录按钮
                // 修改后直接显示登录层
                text = '登录';
                checkPayaccountHTML = template.render('payaccount-signup-tpl', {text: text});
                self.appendToMainContiner(checkPayaccountHTML);
                payaccountCheckDom = $('#payaccount-signup');
                payaccountCheckDom.find('.reging-con').addClass('animate-signup')
            }else{
                checkPayaccountHTML = template.render('payaccount-register-tpl', {text: text});
                self.appendToMainContiner(checkPayaccountHTML);
                payaccountCheckDom = $('#payaccount-register');
            }
            //显示交互按钮动画效果
            self.showDomAStimeout(payaccountCheckDom);

            //按钮侦听事件
            $('#payaccount-action-btn').on('tap', $.proxy(self, 'payaccountAction'));
            payaccountCheckDom.on('swipeUp', $.proxy(self, 'removeRegisterLoginCheck'));*/

            if(self.isPayaccount){
                if(self.isAutoLogin){
                    self.resetLogin();
                }else{
                    self.showLoginAccountInfo();
                }
            }else{
                self.registerAction();
            }

        },

        /**
         * 隐藏或移除正在 注册或者登录层
         */
        removeRegisterOrSign: function(){
            var self = this;
            self.hideORremoveDom('payaccount-signup');
        },

        //注册或者登录按钮触犯事件回调
        payaccountAction: function(){
            var self = this;
            $('#payaccount-action-btn').html('').addClass('loading-data');
            if(self.isPayaccount){
                //执行登录
                self.loginAction();
            }else{
                //执行注册
                self.registerAction();
            }
        },

        /**
         * 初始化 登录 ==========================================
         * @param id
         */
        initLoginPayaccount: function(id){
            var self = this;
            if(id || '' !== id){
                var dom = typeof id === 'string' ? $('#' + id.replace(/^#/, '')) : $(id);
                //触发事件侦听
                dom.on('tap', $.proxy(self, 'loginAction'));
            }else{
                self.loginAction();
            }
        },

        loginAction: function(){
            var self = this;
            self.hideORremoveDom(self.contianer.children()[0], function(){
                if(!self.isPayaccount){
                    //self.checkPayaccount();
                    PayAccount.tipDialog({
                        title: '温馨提示',
                        msg: '目前系统未能检查到您的账号，如您有账号可以直接登录，否则您需要先注册一个账号，点击注册账号，系统讲自动为您注册一个新账号。',
                        type: 'info',
                        autoClose: false,
                        btnOk: {
                            val: '注册',
                            call: function(){
                                self.registerAction();
                            }
                        },
                        btnCancel: {
                            val: '登录',
                            call: function(){
                                self.showLoginAccountInfo();
                            }
                        }
                    });

                }else{
                    self.showLoginAccountInfo();
                }
            });
            return false;
        },

        /**
         * 显示正在登录中
         */
        showSign: function(){
            var self = this, checkPayaccountHTML = '', payaccountCheckDom = null;
            checkPayaccountHTML = template.render('payaccount-signup-tpl', {text: '登录'});
            self.appendToMainContiner(checkPayaccountHTML);
            payaccountCheckDom = $('#payaccount-signup');

            //显示交互按钮动画效果
            self.showDomAStimeout(payaccountCheckDom, 10, function(){
                payaccountCheckDom.find('.reging-con').addClass('animate-signup');
                //debugger;
            });
        },

        /**
         * 显示登录层
         * @param user
         */
        showLoginAccountInfo: function(username){
            var self = this;

            var username = username || self.sdkUserID || self.sdkUserData.username;
            var password = self.sdkUserData.password || '123456';
            var payaccountLoginHTML = template.render('payaccount-login-tpl', { username: username, password:password });
            self.appendToMainContiner(payaccountLoginHTML);
            //获取element，将其显示
            var payaccountLoginDom = $('#payaccount-login');
            //显示交互按钮动画效果
            self.showDomAStimeout(payaccountLoginDom);

            //登录按钮触发侦听
            $('#payaccount-login-submit-btn').on('tap', $.proxy(self, 'postLoginServer', self.callback));
            $('#payaccount-login-cancel-btn').on('tap', $.proxy(self, 'removeLoginAccountInfo'));
            //payaccountLoginDom.on('swipeUp', $.proxy(self, 'removeLoginAccountInfo'));
            //找回密码
            $('#repeat-password-btn').on('tap', $.proxy(self, 'repeatPasswordAction'));

        },

        /**
         * 登录成功后，隐藏或移出当前登录层
         * @param cb
         */
        removeLoginAccountInfo: function(cb){
            var self = this;
            self.hideORremoveDom('payaccount-login', cb);
        },

        /**
         * 请求后台登录
         * @param evt
         */
        postLoginServer: function(evt, cb){
            var self = this, target = evt.currentTarget || evt.target, $target = $(target);
            var payaccountLoginDom = $('#payaccount-login');
            var account = PayAccount.utils.trim($('#payaccount-login-account').val());
            var password = $('#payaccount-login-pwd').val();
            //可用性检测
            if(!account || '' == account){
                PayAccount.tipDialog({ msg: '账号不能为空，请您填写账号！', type: 'warning' });
                return false;
            }
            if(!password || '' == password){
                PayAccount.tipDialog({ msg: '密码不能为空，请您填写登录密码！', type: 'warning' });
                return false;
            }
            //将登录的账号存储到本地临时账号中
            PayAccount.utils.setItem('tmpAccount', account);
            //请求数据
            var url = self.getWebServerUrl('login');
            var postData = {
                account: account,
                pwd: password,
                type: 3
            };
            //显示登录加载状态
            //$(target).html('').addClass('payaccount-loading-data').css('background-color', 'rgba(243,247,245,1)');
            self.isPost = true;

            //self.showSign();
            $target.addClass('loading').html('').css('background-color', '#989898');

            //发送登录请求
            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                $target.removeClass('loading').html('登录').css('background-color', '#12cfcf');
                //移除正在登录进度显示层
                //self.removeRegisterOrSign();

                if(String(res.code) == '1'){
                    //将返回的用户信息存储到本地
                    console.dir(res);
                    self.setGameUserData(res.result);
                    self.removeLoginAccountInfo(cb);
                }else{

                    PayAccount.tipDialog({
                        msg: res.msg || '登录失败，请您重试登录！',
                        type: 'error'/*,
                        autoClose: false,
                        btnOk: {
                            val: '重新登录',
                            call: function(){
                                self.showLoginAccountInfo(account);
                            }
                        },
                        btnCancel: { val: '取消' }*/
                    });
                }
            }, function(err){
                self.isPost = false;
                $target.removeClass('loading').html('登录').css('background-color', '#12cfcf');
                //移除正在登录进度显示层
                //self.removeRegisterOrSign();
                PayAccount.tipDialog({
                    msg: '当前网络异常，请您稍后重试！',
                    type: 'error'
                });
            }, {type: self.config.XHR_TYPE});

        },

        /**
         * 初始化 自动注册账号 ================================================
         * @param id
         * @returns {boolean}
         */
        initRegsterPayaccount: function(id){
            var self = this;
            if(id && '' !== id){
                var dom = typeof id === 'string' ? $('#' + id.replace(/^#/, '')) : $(id);
                //触发事件侦听
                dom.on('tap', $.proxy(self, 'registerAction'));
            }else{
                self.registerAction();
            }
        },

        registerAction: function(){
            var self = this;
            self.showRegister();
            self.postRegisterServer();
        },

        /**
         * 显示注册中...层
         */
        showRegister: function(){
            var self = this;
            var registerHTML = template.render('payaccount-signup-tpl', {text: '注册'});
            self.appendToMainContiner(registerHTML);
            var registerDom = $('#payaccount-signup');

            //显示交互按钮动画效果
            self.showDomAStimeout(registerDom, 10, function(){
                registerDom.find('.reging-con').addClass('animate-signup');
                //debugger;
            });
        },

        //请求后台接口（注册||登录）
        postRegisterServer: function(url, postData){
            var self = this;
            var regingConDom = $('#payaccount-signup').find('.reging-con');
            //是否正在发送请求中...
            //if(self.isPost) return false;
            //debugger;

            //生成随机密码,如何值存在中文或者其他 需要对值先进行UFT8 Encoding
            var password = PayAccount.utils.generateChars(6);
            //请求数据
            var url = url || self.getWebServerUrl('register');

            var postData = postData || {
                password: password
            };

            //显示注册加载状态
            self.isPost = true;
            regingConDom.addClass('animate-signup');

            //调用自动生成账号接口，将注册新账号
            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                //移除正在登录进度显示层
                regingConDom.removeClass('animate-signup');

                Logger.success(res);
                if(String(res.code) == '1'){
                    //注册成功
                    console.log('注册成功，账号：' + res.result.userid + "\n密码为：" + res.result.password);
                    self.setGameUserData(res.result);
                    //如果注册成功，则显示账号信息
                    self.hideORremoveDom(self.contianer.children()[0], function(){
                        self.showRegisterAccountInfo(res.result);

                    });
                }else{
                    //注册失败
                    PayAccount.tipDialog({
                        title: '温馨提示',
                        msg: '注册失败，您可以点击重新注册按钮重新注册账号！',
                        type: 'error',
                        autoClose: false,
                        btnOk: {
                            val: '重新注册',
                            call: function(){
                                //重新登录或者重新注册（重新链接，调用对应函数）
                                //self.postRegisterServer(url, postData);
                                self.registerAction();
                            }
                        },
                        btnCancel: {
                            val: '取消',
                            call: function(){
                                ///移除正在登录进度显示层
                                self.removeRegisterOrSign();
                            }
                        }
                    });
                }
            }, function(xhr, errType){
                Logger.error(errType);
                self.isPost = false;
                //移除正在登录进度显示层
                regingConDom.removeClass('animate-signup');
                //注册失败
                PayAccount.tipDialog({
                    title: '温馨提示',
                    msg: '由于网络异常，无法注册，您可以重新尝试注册！',
                    type: 'error',
                    autoClose: false,
                    btnOk: {
                        val: '重新注册',
                        call: function(){
                            //重新登录或者重新注册（重新链接，调用对应函数）
                            self.postRegisterServer(url, postData);
                        }
                    },
                    btnCancel: {
                        val: '取消',
                        call: function(){
                            ///移除正在登录进度显示层
                            self.removeRegisterOrSign();
                        }
                    }
                });
            }, {type: self.config.XHR_TYPE});

        },

        /**
         * 隐藏或者消除注册登录层
         */
        removeRegisterLoginCheck: function(type, res){
            var self = this;
            self.hideORremoveDom('payaccount-check', function(){
                if(type == 'login'){
                    //如果检查到账号已存在，则显示登录层
                    self.showLoginAccountInfo(res);
                }else if(type == 'register'){
                    //如果注册成功，则显示刚注册的账号信息
                    res && self.showRegisterAccountInfo(res);
                }
            });
        },

        /**
         * 显示账号信息
         */
        showRegisterAccountInfo: function(res){
            var self = this;

            if('' != self.contianer.html() || self.contianer.children()[0]){
                self.hideORremoveDom(self.contianer.children()[0], function(){
                    if(!self.isPayaccount){
                        self.checkPayaccount();
                    }
                });
                return false;
            }
            //渲染账户信息层
            var payaccountInfoHTML = template.render('payaccount-info-tpl', {body: res});
            self.appendToMainContiner(payaccountInfoHTML);
            //获取element，将其显示
            var payaccountInfoDom = $('#payaccount-info');
            //显示交互按钮动画效果
            self.showDomAStimeout(payaccountInfoDom);

            //账号信息面板上的按钮触发
            $('#payaccount-info-cancel-btn').on('tap', $.proxy(self, 'unBindMobile'));
            $('#payaccount-info-bind-btn').on('tap', $.proxy(self, 'bindMobile'));
            //当前层向上滑即消除
            //payaccountInfoDom.on('swipeUp', $.proxy(self, 'unBindMobile'));
        },

        /**
         *隐藏或者消除账号信息层
         */
        removeAccountInfo: function(ident, cb){
            var self = this;
            var ident = ident || '';
            self.hideORremoveDom(ident == 'manager-in' ? 'payaccount-manager' : 'payaccount-info', cb);

        },

        /**
         * 初始化手机绑定 =================================================
         * @param id
         */
        initBindMobile: function(id){
            var self = this;
            if(id && '' !== id){
                var dom = typeof id === 'string' ? $('#' + id.replace(/^#/, '')) : $(id);
                dom.on('tap', $.proxy(self, 'bindMobile'));
            }else{
                self.bindMobile();
            }
        },

        /**
         * 取消绑定手机
         * @param evt
         */
        unBindMobile: function(evt){
            var self = this;
            self.hideORremoveDom('payaccount-info');
        },
        /**
         * 绑定手机按钮触发回调
         * @param evt
         * @param type  切入点
         */
        bindMobile: function(evt, type){
            var self = this;
            //表明是切入点是用户管理中的”绑定手机“
            //如果已经绑定手机了，则无需再次绑定，程序直接返回
            if(type == 'manager'){
                var $target = $(evt.currentTarget || evt.target);
                if($target.children().length > 0 || $target.attr('data-isbind') == '1'){
                    return false;
                }
            }
            //这里因为有动画效果，需要使用回调的方式进行消除和显示处理
            self.hideORremoveDom(self.contianer.children()[0], function(){
                //检查账号是否存在和已登录
                if(!self.isPayaccount){
                    self.checkPayaccount();
                }else{
                    self.showBindMobile();
                }
            });
        },

        /**
         * 显示手机绑定
         */
        showBindMobile: function(){
            var self = this;
            //渲染手机绑定弹出层模板
            var payaccountBindMobileHTML = template.render('payaccount-bind-mobile-tpl');
            self.appendToMainContiner(payaccountBindMobileHTML);
            //获取element，将其显示
            var payaccountBindMobileDom = $('#payaccount-bind-mobile-con');
            //显示交互按钮动画效果
            self.showDomAStimeout(payaccountBindMobileDom);
            /*var stim = setTimeout(function(){
                clearTimeout(stim);
                payaccountBindMobileDom.addClass('animate-translate');
            }, 50);*/

            //禁止连续获取验证码，必须每个30秒后可以重新获取
            self.isSend = false;

            /*--手机绑定层中按钮对应的触发事件侦听--*/
            //获取短信验证码
            $('#payaccount-bind-get-vcode-btn').on('tap', $.proxy(self, 'getMScode', 2));
            //取消绑定
            $('#payaccount-bind-bind-cancel-btn').on('tap', $.proxy(self, 'removeBindMobile'));
            //确认绑定
            $('#payaccount-bind-bind-submit-btn').on('tap', $.proxy(self, 'bindSubmit'));
            //关闭弹层, 当前层向上滑即关闭
            $('#payaccount-bind-close-btn').on('tap', $.proxy(self, 'removeBindMobile'));
            //payaccountBindMobileDom.on('swipeUp', $.proxy(self, 'removeBindMobile'));
        },

        /**
         * 获取手机短信回调函数
         * @param evt
         * @param type 短信发送的类型 1=注册,2=绑定手机，3=解绑手机，4-找回密码，5-手机令牌
         */
        getMScode: function(evt, type){
            var self = this, target = evt.currentTarget || evt.target;
            evt.preventDefault();
            evt.stopPropagation();
            //整个http请求判断
            if(self.isPost || self.isSend) return false;
            //禁止连续获取验证码，必须每个30秒后可以重新获取
            //if(self.isSend) return false;
            var mobileDom = $('#payaccount-bind-mobile');
            var getCodeDom = $('#payaccount-bind-get-vcode');
            //获取用户输入的内容
            var mobile = PayAccount.utils.trim(mobileDom.val());
            //验证输入内容是否为手机号码
            if('' == mobile){
                PayAccount.tipDialog({ msg: '手机号不能为空，请您输入正确的手机号码！', type: 'error' });
                return false;
            }
            if(!PayAccount.utils.isMobile(mobile)){
                PayAccount.tipDialog({ msg: '手机号码不正确，请您输入正确的手机号码！', type: 'error' });
                mobileDom[0].focus();
                mobileDom[0].select();
                return false;
            }

            var msg = '';
            if(type == 2){
                msg = '该手机号已经被绑定过了，请更换手机号或先解绑';
            }else if(type == 4){
                msg = '该手机号已经被绑定过了，请更换手机号或先解绑';
            }

            //将按钮致灰色
            $(target).html('').addClass('gray payaccount-bind-loading-data');
            //临时禁止用户输入
            mobileDom.attr({'readonly': 'readonly', 'disabled': 'disabled'});
            //显示请求加载进度
            /*getCodeDom.addClass('payaccount-bind-loading-data').css({
                'background-size': '30px 30px',
                'background-position': '80% center',
                'height': '50px'
            });*/

            //绑定手机是否已经绑定
            self.phoneIsBind(mobile, function(res){
                self.isPost = false;
                if(self.isPost) return;
                //已绑定
                if(String(res.code) == '1' && type == 2){
                    $(target).html('获取验证码').removeClass('gray payaccount-bind-loading-data');
                    mobileDom.removeAttr('readonly').removeAttr('disabled');
                    //getCodeDom.removeClass('payaccount-bind-loading-data').removeAttr('style');
                    PayAccount.tipDialog({ msg: '该手机号已经被绑定过了，请更换手机号或先解绑', type: 'error' });
                    return false;
                }else{

                    //$(target).hide();
                    //整理短信发送接口所需要的数据和地址
                    //type字段：类型；1=注册,2=绑定手机，3=解绑手机，4-找回密码，5-手机令牌
                    //token为系统返回字段
                    var url = self.getWebServerUrl('sendMScode'),
                        postData = { type: type || 2, phone: mobile, token: self.tokener() };
                    //改变http请求状态
                    self.isPost = true;
                    self.isSend = true;
                    //调用后段短信发送接口，系统将发送短信验证码到客户端手机上
                    PayAccount.utils.doAjax(url, postData, function(res){
                        $(target).html('30秒后重新获取').removeClass('payaccount-bind-loading-data');
                        //getCodeDom.removeClass('payaccount-bind-loading-data').removeAttr('style');
                        //$(target).show();
                        sendInterval();
                        if(String(res.code) == '1'){
                            /*PayAccount.tipDialog({
                                msg: '发送成功，我们已经将验证码以短信的方式发送到您的手机号为:<strong class="payaccount-bind-tips">'+ mobile +'</strong>的设备上了，请您及时查收！',
                                type: 'success',
                                autoClose: false,
                                btnCancel:{ val: '关闭' }
                            });*/
                            //如果是找回密码
                            /*if(type == 4){
                                $('.reslvoe').show();
                                self.resetTransformTo(self.contianer.children()[0]);
                            }*/
                        }else if(String(res.code) == '10004'){
                            self.loginAgainAsToken();
                        }else{
                            PayAccount.tipDialog({
                                msg: '验证码发送失败，30秒后您可以重新获取短信验证码！',
                                type: 'error',
                                closeTime: 3000
                            });
                        }

                    }, function(err){
                        sendInterval();
                        //getCodeDom.removeClass('loading-data').removeAttr('style');
                        //$(target).show();
                        PayAccount.tipDialog({
                            msg: '网络异常，请您稍后重试！',
                            type: 'error'
                        });
                    }, {type: self.config.XHR_TYPE});

                }


            }, function(){
                self.isPost = false;
                $(target).html('获取验证码').removeClass('gray payaccount-bind-loading-data');
                mobileDom.removeAttr('readonly').removeAttr('disabled');
                //getCodeDom.removeClass('loading-data').removeAttr('style');
            }, {type: self.config.XHR_TYPE});



            //30秒后重新获取
            function sendInterval(){
                var i = 30;
                self.isPost = false;
                var sint = setInterval(function(){
                    if(i < 0) {
                        $(target).html('获取验证码').removeClass('gray payaccount-bind-loading-data');
                        mobileDom.removeAttr('readonly').removeAttr('disabled');
                        clearInterval(sint);
                        self.isSend = false;
                    }else{
                        $(target).html(i + '秒后重新获取');
                        i--;
                    }
                }, 1000);
            }

        },

        /**
         * 判断手机号是否已经绑定
         * @param phone
         */
        phoneIsBind: function(phone, su, fail){
            var self = this;
            if(!phone || !PayAccount.utils.isMobile(phone)){
                return false;
            }
            if(self.isPost) return false;
            var url = self.getWebServerUrl('phoneIsBind');
            var postData = { phone: phone };
            self.isPost = true;
            PayAccount.utils.doAjax(url, postData, function(res){
                if(su && typeof su === 'function'){
                    su.call(self, res);
                }
            }, function(err){
               PayAccount.tipDialog({ msg: '当前网络异常，请稍后重试!', type: 'error' });
                if(fail && typeof fail === 'function'){
                    fail.call(self, err);
                }
            });

        },

        /**
         * 完成绑定回调函数
         * @param evt
         */
        bindSubmit: function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            var self = this,
                $target = $(evt.target || evt.currentTarget),
                mobile = $('#payaccount-bind-mobile').val(),
                mscode = PayAccount.utils.trim($('#payaccount-bind-mscode').val());
            //验证输入信息
            if('' == mobile){
                PayAccount.tipDialog({ msg: '手机号码不能为空，请您输入正确的手机号码！', type: 'error' });
                return false;
            }
            if('' == mscode){
                PayAccount.tipDialog({ msg: '验证码不能为空，请您输入刚刚获取的短信验证码！', type: 'error' });
                return false;
            }
            //请求状态调试
            if(self.isPost) return false;
            //请求数据
            var url = self.getWebServerUrl('bindPhone'),
                postData = { phone: mobile, phonecode: mscode, token: self.tokener() };
            //请求状态调度
            self.isPost = true;
            //按钮加入加载进度样式
            $target.addClass('loading').html('').css('background-color', '#989898');
            //请求接口
            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                $target.removeClass('loading').html('完成').css('background-color', 'rgb(18, 207, 207)');
                if(String(res.code) == '1'){
                    //绑定成功后，将本地化的数据进行更新
                    //充值当前用户的手机绑定状态
                    self.setBindPhoneStatus(1);
                    self.insertItemFormUserData('phone', mobile);
                    //首先获取一下本地化的最新数据
                    /*self.setGameUserData();
                    self.sdkUserData.phone = mobile;*/

                    self.removeBindMobile(evt);
                    PayAccount.tipDialog({ msg: '绑定成功，感谢您的加入！', type: 'success' });
                }else if(String(res.code) == '10004'){
                    self.loginAgainAsToken();
                }else{
                    PayAccount.tipDialog({ msg: res.msg || '绑定失败，请您重新绑定！', type: 'error' });
                }
            }, function(err){
                self.isPost = false;
                $target.removeClass('loading').html('完成').css('background-color', 'rgb(18, 207, 207)');
                PayAccount.tipDialog({ msg: '当前网络异常，请您稍后重试！', type: 'error' });
            }, {type: self.config.XHR_TYPE});

        },

        /**
         * 隐藏或者消除 手机绑定层
         * @param evt
         */
        removeBindMobile: function(evt, cb){
            evt.preventDefault();
            evt.stopPropagation();
            var self = this;
            self.hideORremoveDom('payaccount-bind-mobile-con', cb);
        },

        /* ++++++++++++++++++++++++++++++++ 找回密码 +++++++++++++++++++++++++++++++++++ */
        initRepeatPassword: function(id){
            var self = this;
            if(id || '' !== id){
                var dom = typeof id === 'string' ? $('#' + id.replace(/^#/, '')) : $(id);
                //触发事件侦听
                dom.on('tap', $.proxy(self, 'repeatPasswordAction'));
            }else{
                self.repeatPasswordAction();
            }
        },

        repeatPasswordAction: function(){
            var self = this;
            self.hideORremoveDom(self.contianer.children()[0], function(){
                if(!self.isPayaccount){
                    self.checkPayaccount();
                }else{
                    self.showRepeatPassword();
                }
            });
        },

        /**
         * 显示找回密码层 (通过绑定的手机号找回密码)
         */
        showRepeatPassword: function(){
            var self = this;
            //检查用户是否存在，并且是否已经登录
            var repeatPasswordHTML = template.render('payaccount-repeat-password-tpl', { body: self.sdkUserData });
            self.appendToMainContiner(repeatPasswordHTML);

            //获取element，将其显示
            var repeatPasswordDom = $('#payaccount-repeat-password');
            //显示交互按钮动画效果
            self.showDomAStimeout(repeatPasswordDom);

            //获取短信验证码
            $('#payaccount-bind-get-vcode-btn').on('tap', $.proxy(self, 'getMScode', 4));
            //取消绑定
            $('#payaccount-repeat-cancel-btn').on('tap', $.proxy(self, 'removeRepeatPassword'));
            $('#payaccount-bind-close-btn').on('tap', $.proxy(self, 'removeRepeatPassword'));
            //确认绑定
            $('#payaccount-repeat-submit-btn').on('tap', $.proxy(self, 'repeatPasswordPostSever'));

        },

        /**
         * 移除找回密码层
         */
        removeRepeatPassword: function(){
            this.hideORremoveDom('payaccount-repeat-password');
        },

        /**
         * 请求后台，修改密码
         * @param evt
         */
        repeatPasswordPostSever: function(evt){
            if(this.isPost) return false;
            var self = this,
                target = evt.currentTarget || evt.target,
                $target = $(target),
                mobileDom = $('#payaccount-bind-mobile'),
                mobile = mobileDom.val(),
                mscodeDom = $('#payaccount-bind-mscode'),
                mscode = mscodeDom.val(),
                newPasswordDom = $('#newPWD'),
                newPassword = newPasswordDom.val(),
                confirmPasswordDom = $('#confirm-newPWD'),
                confirmPassword = confirmPasswordDom.val();

            if('' == mscode || !mscode){
                PayAccount.tipDialog({ msg: '请输入手机短信验证码', type: 'error' });
                return false;
            }
            if('' == newPassword || !newPassword){
                PayAccount.tipDialog({ msg: '请设置您的新密码', type: 'error' });
                return false;
            }
            if(newPassword.length < 6 || newPassword.length > 20){
                PayAccount.tipDialog({ msg: '请确保新密码长度在 6～20 位之间', type: 'error' });
                return false;
            }
            if('' == confirmPassword || !confirmPassword){
                PayAccount.tipDialog({ msg: '请确认您的新密码', type: 'error' });
                return false;
            }
            if(newPassword !== confirmPassword){
                PayAccount.tipDialog({ msg: '两次输入的密码不一致，请保持新密码和确认密码一致', type: 'error' });
                return false;
            }

            var url = self.getWebServerUrl('findPwdByPhone');
            var postData = {
                phone: mobile || self.sdkUserData.phone,
                phonecode: mscode,
                pwd: confirmPassword
            };
            self.isPost = true;

            $target.addClass('loading').html('').css('background-color', '#989898');
            //请求后台
            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                $target.removeClass('loading').html('提交').css('background-color', 'rgb(240, 110, 93)');
                if(String(res.code) == '1'){
                    PayAccount.tipDialog({
                        msg: '密码重置成功了！',
                        type: 'success',
                        autoClose: false,
                        btnOk: {
                            val: '登录',
                            call: function(){
                                self.loginAction();
                            }
                        },
                        btnCancel: {
                            val: '关闭',
                            call: function(){
                                self.hideORremoveDom(self.contianer.children()[0]);
                            }
                        }
                    });

                }else{
                    PayAccount.tipDialog({ msg: res.msg || '找回密码失败，请联系客服!', type: 'error' });
                }
            }, function(err){
                self.isPost = false;
                $target.removeClass('loading').html('提交').css('background-color', 'rgb(240, 110, 93)');
                PayAccount.tipDialog({ msg: '当前网络异常，请您稍后重试!' });
            });

        },


        /** ++++++++++++++++++++++++++++++++账号管理 模板++++++++++++++++++++++++++++++++++++++= **/
        initManagerAccount: function(id){
            var self = this;
            if(id || '' !== id){
                var dom = typeof id === 'string' ? $('#' + id.replace(/^#/, '')) : $(id);
                //触发事件侦听
                dom.on('tap', $.proxy(self, 'managerAction'));
            }else{
                self.managerAction();
            }
        },

        /**
         * 显示账号管理层 (中间件)
         * @param evt
         */
        managerAction: function(evt){
            var self = this;
            self.hideORremoveDom(self.contianer.children()[0], function(){
                if(!self.isPayaccount){
                    self.checkPayaccount();
                }else{
                    self.showManagerAccount();
                }
            });

        },

        /**
         * 显示账号管理层
         * @param evt
         * @returns {boolean}
         */
        showManagerAccount: function(evt){
            var self = this;
            //检查用户是否存在，并且是否已经登录
            var payaccountManagerHTML = template.render('payaccount-manager-tpl', { body: self.sdkUserData });
            self.appendToMainContiner(payaccountManagerHTML);

            //获取element，将其显示
            var payaccountManagerDom = $('#payaccount-manager');
            //显示交互按钮动画效果
            self.showDomAStimeout(payaccountManagerDom);

            //时间侦听
            $('#payaccount-manager-bind-mobile-btn').on('tap', $.proxy(self, 'bindMobile', 'manager'));    //绑定手机
            $('#payaccount-manager-mod-pwd-btn').on('tap', $.proxy(self, 'modPassword'));       //修改密码
            $('#payaccount-manager-switch-account-btn').on('tap', $.proxy(self, 'switchAccout'));//切换账号
            //payaccountManagerDom.on('swipeUp', $.proxy(self, 'removeManagerAccount'));            //关闭当前层
            $('#payaccount-manager-close-btn').on('tap', $.proxy(self, 'removeManagerAccount'));

        },

        /**
         * 隐藏或者移除账号管理层
         * @param evt
         */
        removeManagerAccount: function(evt){
            var self = this, target = evt.currentTarget || evt.target;
            if(target.id == 'payaccount-manager-close-btn' || target.id == 'payaccount-manager'){
                //关闭按钮触发
                self.hideORremoveDom('payaccount-manager');
            }else{
                //修改密码，切换账号，绑定手机，联系客服 按钮触发
                self.openManagerAccountOther(target.id);
            }
        },

        openManagerAccountOther: function(id){
            var self = this;
            //关闭按钮触发

        },

        /**
         * 初始化修改密码层 =========================
         * @param id
         */
        initModPassword: function(id){
            var self = this;
            if(id && '' !== id){
                var dom = typeof id === 'string' ? $('#' + id) : $(id);
                dom.on('tap', $.proxy(self, 'modPassword', 'set'));
            }else{
                self.modPassword(null, 'set');
            }
        },

        /**
         * 修改密码事件回调
         * @param type
         * @param evt
         */
        modPassword: function(evt, type){
            var self = this;
            //如果检查其他层已经存在，则先消除
            self.hideORremoveDom(self.contianer.children()[0], function(){
                //检查用户是否存在，并且是否已经登录
                if(!self.isPayaccount) {
                    self.checkPayaccount();
                }else{
                    self.showModPwdAccount(type);
                }
            });
        },

        /**
         * 显示修改密码层
         * @params type 修改密码：'mod' || 设置密码：'set'
         */
        showModPwdAccount: function(type){
            var self = this;
            var type = type || 'set';
            var body = {
                type: type,
                btnText: type === 'mod' ? '\u4fee\u6539\u5bc6\u7801' : '\u8bbe\u7f6e\u5bc6\u7801'
            };
            var payaccountModPwdHTML = template.render('payaccount-mopwd-tpl', { body: body });
            self.appendToMainContiner(payaccountModPwdHTML);
            var payaccountModPwdDom = $('#payaccount-modpwd');
            //显示修改密码弹层
            self.showDomAStimeout(payaccountModPwdDom);
            //隐藏或移除当前层
            $('#payaccount-modpwd-close-btn').on('tap', $.proxy(self, 'removeModPwdAccount'));
            //payaccountModPwdDom.on('swipeUp', $.proxy(self, 'removeModPwdAccount'));
            //修改密码
            $('#payaccount-modpwd-submit-btn').on('tap', $.proxy(self, 'postModPwdServer', type));
        },

        /**
         * 请求修改密码
         * @params type  修改密码：mod； 设置密码：set
         */
        postModPwdServer: function(evt, type){
            var self = this, target = evt.currentTarget || evt.target, $target = $(target);
            var type = type || 'set';
            if(self.isPost) return false;
            var newPWDDOM = $('#newPWD'),
                confirmNewPWDDOM = $('#confirm-newPWD'),
                newPwd = newPWDDOM.val(),
                confirmPwd = confirmNewPWDDOM.val();
            var errMessage = '';

            if(type == 'mod'){
                var oldPWDDOM = $('#oldPWD'),
                oldPwd = oldPWDDOM.val();

                //输入验证
                if(!oldPwd || '' == oldPwd){
                     errMessage = '当前密码不能为空，请输入当前密码';
                     PayAccount.tipDialog({ msg: errMessage, type: 'error' }, function(){
                         oldPWDDOM[0].focus();
                     });
                     return false;
                 }
            }


            if(!newPwd || '' == newPwd){
                errMessage = '新密码不能为空，请输入新密码';
                PayAccount.tipDialog({ msg: errMessage, type: 'error' }, function(){
                    newPWDDOM[0].focus();
                });
                return false;
            }
            if(newPwd.length < 6 || newPwd.length > 20){
                errMessage = '请确保新密码长度在 6～20 位之间';
                PayAccount.tipDialog({ msg: errMessage, type: 'error' }, function(){
                    confirmNewPWDDOM[0].focus();
                });
                return false;
            }
            if(!confirmPwd || '' == confirmPwd){
                errMessage = '新密码确认不能为空，请输入确认新密码';
                PayAccount.tipDialog({ msg: errMessage, type: 'error' }, function(){
                    confirmNewPWDDOM[0].focus();
                });
                return false;
            }
            if(newPwd !== confirmPwd){
                errMessage = '请保持新密码一致！';
                PayAccount.tipDialog({ msg: errMessage, type: 'error' }, function(){
                    confirmNewPWDDOM[0].focus();
                });
                return false;
            }

            //请求修改密码
            var url = self.getWebServerUrl((type === 'mod') ? 'modPwd' : 'setPwd');
            var postData = {
                'token': self.tokener()
            };
            if(type === 'mod') {
                postData.oldpwd = oldPwd;
                postData.newpwd = newPwd;
            }else if(type === 'set'){
                postData.password = newPwd;
            }
            self.isPost = true;
            $target.addClass('loading').html('').css('background-color', '#989898');

            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                $target.removeClass('loading').html('提交').css('background-color', 'rgb(240, 110, 93)');
                if(String(res.code) == '1'){
                    errMessage = '修改密码成功！';
                    self.hideORremoveDom('payaccount-modpwd');
                }else if(String(res.code) == '10004'){
                    self.loginAgainAsToken();
                    return;
                }else{
                    errMessage = '修改密码失败，您可以重试！'
                }
                PayAccount.tipDialog({ msg: errMessage, type: (String(res.code) == '1' ? 'success' : 'error') });
            }, function(err){
                self.isPost = false;
                $target.removeClass('loading').html('提交').css('background-color', 'rgb(240, 110, 93)');
                PayAccount.tipDialog({ msg: '当前网络异常，请您稍后重试！', type: 'error' });
            }, {type: self.config.XHR_TYPE});

        },

        /**
         * 隐藏或移除修改密码层
         * @param evt
         */
        removeModPwdAccount: function(evt){
            this.hideORremoveDom('payaccount-modpwd');
        },

        /**
         * 初始化 切换账号 =============================
         */
        initSwitchAccount: function(id){
            var self = this;
            if(id && '' !== id){
                var dom = typeof id === 'string' ? $('#' + id) : $(id);
                dom.on('tap', $.proxy(self, 'switchAccout'));
            }else{
                self.switchAccout();
            }
        },

        /**
         * 切换账号事件回调
         * @param evt
         */
        switchAccout: function(evt){
            var self = this;
            //检查用户是否存在，并且是否已经登录
            if(!self.isPayaccount){
                //如果检查其他层已经存在，则先消除
                self.hideORremoveDom(self.contianer.children()[0], function(){
                    self.checkPayaccount();
                });
                return false;
            }else{
                self.hideORremoveDom(self.contianer.children()[0], function(){

                    //只有当用户已经登录的情况下才能进行下一步操作
                    PayAccount.tipDialog({
                        msg: '您确定要切换当前<strong>' + self.sdkUserID + '</strong>的游戏账号吗？' +
                            '<strong style="color:#FD7F1F;">警告:</strong> 如果切换该账号，本机原来的游戏进程将丢失。',
                        type: 'warning',
                        autoClose: false,
                        btnOk: {
                            val: '切换账号',
                            call: function(){
                                //这里跳到 重新登录层
                                //self.hideORremoveDom(self.contianer.children()[0], function(){
                                    self.loginAction();
                                //});
                            }
                        },
                        btnCancel: { val: '取消' }
                    });

                });
            }
        },


        /**++++++++++++++++++++++++++++++++++++购买++++++++++++++++++++++++++++++++++**/

        /**
         * 购买商品
         * @param diamondMoney  金额
         * @param goodsid       商品编号
         * @param goodsname     商品名称
         * @param goodsnum      商品数量
         */
        buyDiamond: function(diamondMoney, goodsid, goodsname, goodsnum){
            var self = this;
            //每次点击购买商品的时候都将初始化
            self.buyReturn = false;
            var goodsnum = goodsnum || 1;
            //如果检查其他层已经存在，则先消除
            self.hideORremoveDom(self.contianer.children()[0], function(){
                //检查用户是否存在，并且是否已经登录
                if(!self.isPayaccount) {
                    self.checkPayaccount();
                }else{
                    self.showBuyDiamond(diamondMoney, goodsid, goodsname, goodsnum);
                }
            });
        },

        /**
         * 现实购买商品层
         * @param diamondMoney
         * @param goodsid
         * @param goodsname
         * @param goodsnum
         */
        showBuyDiamond: function(diamondMoney, goodsid, goodsname, goodsnum){
            var self = this;
            var body = {
                diamondMoney: diamondMoney,
                goodsid: goodsid,
                goodsname: goodsname,
                goodsnum: goodsnum
            };
            self.goodsData = body;

            //去查询一下余额
            self._queryBalance(null, function(){
                //console.log('....cb中...');
                body.balance = self.balance;
                //将当前的商品信息存储起来
                self.goodsData = body;
                var bugDiamondHTML = template.render('payaccount-pay-bug-diamond-tpl', { body: body });
                self.appendToMainContiner(bugDiamondHTML);
                var bugDiamondDom = $('#payaccount-pay-bug-diamond');
                self.showDomAStimeout(bugDiamondDom);
                //取消
                $('#payaccount-pay-bug-cancel-btn').on('tap', $.proxy(self, 'removeBuyDiamond'));
                //确认购买
                $('#payaccount-pay-bug-submit-btn').on('tap', $.proxy(self, 'buyDiamondAsBalance'));
            });

        },

        /**
         * 根据当前余额判断是否需要充值还是直接使用余额购买
         */
        buyDiamondAsBalance: function(evt){
            var self = this;
            var body = self.goodsData;
            //盛米足够支付，则直接创建支付订单
            if(body.balance >= body.diamondMoney){
                self.buyReturn = false;
                self.postBuyDiamondServer(body);
            }else{
                //盛米不足，则先进行充值盛米
                self.buyReturn = true;
                self.payAction();
            }
        },

        /**
         * 移除当前购买商品层
         */
        removeBuyDiamond: function(){
            var self = this;
            self.hideORremoveDom(self.contianer.children()[0]);
        },

        /**
         * 购买商品，（接口文档规定的是 要先创建一个订单，然后获取回执的刚创建的订单号，然后再支付购买，
         *           --> 创建新订单和购买支付的过程应该在一步完成，完成过程后台进行自动处理，前段只关心
         *           --> 一次性购买商品支付的成功或失败）
         * @param body
         * @returns {boolean}
         */
        postBuyDiamondServer: function(body){
            var self = this, body = body;
            if(self.isPost) return false;
            var url = self.getWebServerUrl('buyDiamond');
            var postData = {
                goods_id: body.goodsid,
                goods_name: body.goodsname,
                goods_num: body.goodsnum,
                money: body.goodsnum * (body.diamondMoney),
                note: '购买' + body.goodsname + ' [' + PayAccount.utils.setDateFormat(Date.now()) + ']',
                token: self.tokener()
            };
            self.isPost = true;

            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                if(String(res.code) == '1'){
                    self.goodsData.balance = self.balance = res.result.balance;
                    self.goodsData.servertime = res.result.servertime;
                    self.hideORremoveDom(self.contianer.children()[0], function(){
                        if(self.balance <= 10){
                            PayAccount.tipDialog({
                                msg: '购买商品成功! <br />您的账户还有盛米余额：<strong style="color:#FD7F1F;">' + self.balance + '</strong>。',
                                type: 'success',
                                autoClose: false,
                                btnOk: {
                                    val: '充值盛米',
                                    call: function(){
                                        self.payAction();
                                    }
                                },
                                btnCancel: {
                                    val: '取消'
                                }
                            });
                        }else{
                            self.hideORremoveDom('payaccount-pay-bug-diamond', function(){
                                PayAccount.tipDialog({
                                    msg: '购买商品成功! <br />您的账户还有盛米余额：<strong style="color:#FD7F1F;">' + self.balance + '</strong>',
                                    type: 'success',
                                    autoClose: false,
                                    btnCancel: { val: '关闭' }
                                });
                            });
                        }
                    });
                }else if(String(res.code) == '10004'){
                    self.loginAgainAsToken();
                }else{
                    PayAccount.tipDialog({ msg: res.msg || '购买商品失败，请您重试!', type: 'error' });
                }
            }, function(err){
                self.isPost = false;
                PayAccount.tipDialog({ msg: '当前网络异常，请稍后重试!', type: 'error' });
            });

        },


        /**++++++++++++++++++++++++++++++++++++支付相关+===+++++++++++++++++++++++++++++++++++++++++++++++**/


        /**
         * 盛米支付不足，充值=====================
         */
        initPay: function(id){
            var self = this;
            if(id && '' != id){
                var dom = typeof id === 'string' ? $('#' + id) : $(id);
                dom.on('tap', $.proxy(self, 'payAction'));
            }else{
                self.payAction();
            }
        },

        /**
         * 初始化充值层
         * @param evt
         * @param typeSTR
         */
        payAction: function(evt, typeSTR){
            var self = this;
            //console.log(typeSTR);
            //如果检查其他层已经存在，则先消除
            self.hideORremoveDom(self.contianer.children()[0], function(){
                //检查用户是否存在，并且是否已经登录
                if(!self.isPayaccount) {
                    self.checkPayaccount();
                }else{
                    //首先去查询余额，无论成功或者失败都执行回调
                    self.getChargeStatus(function(res){
                        self._queryBalance(null, function(){
                            self.showPay(res);
                        });
                    });
                }
            });
        },

        /**
         * 获取支付类型列表
         * @param cb
         * @returns {boolean}
         */
        getChargeStatus: function(cb){
            var self = this;
            var CS = self.CS;

            if(self.isPost) return false;
            self.isPost = true;
            var url = self.getWebServerUrl('chargeStatus');
            var postData = { token: self.tokener() };
            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                if(String(res.code) == '1'){
                    var cgs = res.result;
                    var rs = [];
                    for(var key in cgs){
                        if(CS[key]){
                            var obj = $.extend(CS[key], cgs[key]);
                            obj.key = key;
                            rs.push(obj);
                        }
                    }
                    console.log(rs);
                    if(cb && typeof cb === 'function') cb(rs);

                }else if(String(res.code) == '10004'){
                    self.loginAgainAsToken();
                }else{
                    PayAccount.tipDialog({ msg: '查询充值卡类型失败', type: 'error' });
                }
            }, function(err){
                self.isPost = false;
            }, { type: self.config.XHR_TYPE });

        },

        /**
         * 显示充值层
         */
        showPay: function(res){
            var self = this;
            var body = {
                balance: self.balance,
                cardList: res
            };
            var payaccountPayHTML = template.render('payaccount-pay-tpl', { body: body });
            self.appendToMainContiner(payaccountPayHTML);
            var payaccountPayDom = $('#payaccount-pay');
            //显示修改密码弹层
            self.showDomAStimeout(payaccountPayDom);

            //滚动处理
            PayAccount.simpScroller(document.querySelector('#alipay-content'));
            PayAccount.simpScroller(document.querySelector('#cardpay-content'));

            //隐藏或移除当前层
            $('#payaccount-pay-cancel-btn').on('tap', $.proxy(self, 'removePay'));
            //payaccountPayDom.on('swipeUp', $.proxy(self, 'removePay'));
            //修改密码
            $('#payaccount-pay-submit-btn').on('tap', $.proxy(self, 'postPayServer'));
            //tab选项
            payaccountPayDom.find('.pay-tab').on('tap', $.proxy(self, 'selectTab'));
            //支付宝金额选择
            payaccountPayDom.find('.alipay-item').on('tap', $.proxy(self, 'selectItem'));
            //充值卡选择
            payaccountPayDom.find('.cardpay-item').on('tap', $.proxy(self, 'selectCard'));
            //充值卡金额选择
            //payaccountPayDom.find('.cardpay-sub-item').on('tap', $.proxy(self, 'selectItem'));
        },

        /**
         * 选择充值类型  (支付宝 | 充值卡)
         * @param evt
         */
        selectTab: function(evt){
            var self = this, target = evt.currentTarget || evt.target, $target = $(target);
            //还原默认充值配置，根据Tab选择
            if($target.attr('relf') == 'cardpay-content'){   //充值卡
                self.payMoney = 50;
                self.payType = $('#cardpay-content').find('.cardpay-item').first().attr('data-type');
                self.title = $('#cardpay-content').find('.cardpay-item').first().attr('data-name');
                self.payKey = $('#cardpay-content').find('.cardpay-item').first().attr('data-key');
                self.cardmtList = $('#cardpay-content').find('.cardpay-item').first().attr('data-cardmtlist');
                self.premium = $('#cardpay-content').find('.cardpay-item').first().attr('data-premium');
            }else{  //默认为支付宝
                self.payMoney = 100;
                self.payType = 'WS_WAP_PAYWAP';
            }
            console.log('类型:' + self.payType, '名称：' + self.title);
            self.payCategory = $target.attr('data-category');
            var payaccountPayDom = $('#payaccount-pay');
            //重置样式
            payaccountPayDom.find('.cardpay-sub-item').removeClass('on');
            payaccountPayDom.find('.alipay-item').removeClass('on');
            //让首项默认被选中
            payaccountPayDom.find('.cardpay-sub-item').first().addClass('on');
            payaccountPayDom.find('.alipay-item').first().addClass('on');
            //改变当前触发按钮样式
            payaccountPayDom.find('.pay-tab').removeClass('on');
            $target.addClass('on');
            //显示对应的内容层
            payaccountPayDom.find('.pay-tab-content').hide();
            var relf = target.getAttribute('relf');
            $('#' + relf).show();
            //重置所在屏幕中央
            self.resetTransformTo(payaccountPayDom);
        },

        /**
         * 选择充值卡选项
         * @param evt
         */
        selectCard: function(evt){
            var self = this, target = evt.currentTarget || evt.target, $target = $(target);
            var title = $target.attr('data-name');
            var status = $target.attr('data-status');
            var premium = $target.attr('data-premium');
            if(parseInt(status, 10) == 0) { return false; }
            //当前选择的充值卡类型
            self.payType = $target.attr('data-type');
            self.payKey = $target.attr('data-key');
            self.cardmtList = $target.attr('data-cardmtlist');
            self.premium = premium;
            self.title = title;
            console.log('category: ' + self.payCategory,  'type：' + self.payType + '; 名称：' + self.title);
            //移除选中样式
            $('#payaccount-pay').find('.cardpay-item').removeClass('on');
            $('#payaccount-pay').find('.cardpay-items-con').hide();
            $target.addClass('on');
            $target.find('.cardpay-items-con').show();
            //旋转标识
            $target.find('.pay-arrow');
        },

        /**
         * 选择充值金额项
         * @param evt
         */
        selectItem: function(evt){
            var self = this, target = evt.currentTarget || evt.target, $target = $(target);
            //移除选中样式
            if($target.hasClass('cardpay-sub-item')){
                $('#payaccount-pay').find('.cardpay-sub-item').removeClass('on');
            }else{
                $('#payaccount-pay').find('.alipay-item').removeClass('on');
            }
            $target.addClass('on');
            //当前选择的充值金额项
            self.payMoney = parseFloat($target.attr('data-value'), 10);
            //console.log('当前选择的金额项为：' + self.payMoney, '当前的类型: ' + self.payType);
        },

        /**
         * 判断支付类型确认，如果是支付宝则直接请求后台；如果是充值卡，则现实充值卡填写层
         * @param evt
         */
        postPayServer: function(evt){
            var self = this, target = evt.currentTarget || evt.target;
            if(self.payCategory != 'alipay'){
                //显示 充值卡充值填写层
                self.showCardPay(self.payType, self.payMoney);
            }else{
                //直接使用支付宝充值
                self.postAlipayServer(evt, self.payType, self.payMoney);
            }
        },

        /**
         * 移除充值选择层
         * @param evt
         */
        removePay: function(evt){
            var self = this;
            self.hideORremoveDom('payaccount-pay');
        },
        /**
         * 重置充值选择层相对于屏幕的位置
         * @param dom
         */
        resetTransformTo: function(dom){
            var self = this;
            var dom = typeof dom === 'string' ? $('#' + dom) : $(dom);
            var cw = (self.ww - dom.width()) * .5,
                ch = (self.wh - dom.height()) * .5;
            dom.css({
                '-webkit-transform': 'translate3d(' + cw + 'px,' + ch +'px, 0)',
                '-moz-transform': 'translate3d(' + cw + 'px,' + ch +'px, 0)',
                '-ms-transform': 'translate3d(' + cw + 'px,' + ch +'px, 0)',
                '-o-transform': 'translate3d(' + cw + 'px,' + ch +'px, 0)',
                'transform': 'translate3d(' + cw + 'px,' + ch +'px, 0)'
            });
        },

        /*========支付宝充值========= TODO （上线前需要修改请求参数，这里暂时写死了） */
        postAlipayServer: function(evt, type, money){
            var self = this, target, $target;
            if(evt){
                target = evt.currentTarget || evt.target;
                $target = $(target);
            }
            //支付宝web端默认为 即时到帐
            var type = type || 'WS_WAP_PAYWAP';
            var money = parseFloat(money, 10) || 10;

            if(self.isPost) return false;
            var url = self.getWebServerUrl('topUp');
            var postData = {
                clienttype: 2 || self.payCatetorys.clientType, //1-web; 2-手机客户端
                money: 0.1 || money, //money,
                category: self.payCatetorys[self.payCategory].match(/\{\{(\d)\}\}/i)[1], //充值分类  1-支付宝 2-易宝 3-SMS 4-财付通 5-mo9先玩后付6 -微信支付web扫码
                type: type,   //充值卡类型
                token: self.tokener()
            };
            self.isPost = true;
            $target.html('').addClass('loading').css('background-color', '#989898');

            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                $target.removeClass('loading').html('确认充值').css('background-color', 'rgb(18, 207, 207)');
                //console.log(res);
                if(String(res.code) == '1'){
                    var redirectURL = res.result.chargeurl;
                    self.goodsData.servertime = res.result.servertime;
                    PayAccount.tipDialog({
                        msg: '是否要转到支付宝进行支付？',
                        type: 'success',
                        autoClose: false,
                        btnOk: {
                            val: '去支付',
                            call: function(){
                                //一：新建标签
                                /*var a = document.createElement('a');
                                a.setAttribute('href', redirectURL);
                                a.setAttribute('target', '_blank');
                                var e = document.createEvent("MouseEvents");
                                e.initEvent("click", true, true);
                                a.dispatchEvent(e);*/
                                //二：用iframe弹层
                                self.payIframeAction(redirectURL);
                            }
                        },
                        btnCancel: { val: '取消' }
                    });
                    //window.location.href = redirectURL;
                }else if(String(res.code) == '10004'){
                    self.loginAgainAsToken();
                }else{
                    PayAccount.tipDialog({ msg: res.msg || '充值失败！', type: 'error' });
                }
            }, function(err){
                self.isPost = false;
                $target.removeClass('loading').html('确认充值').css('background-color', 'rgb(18, 207, 207)');
                PayAccount.tipDialog({ msg: '网络异常，请稍后重试', type: 'error' });
            });


        },

        /**
         * iframe显示支付宝支付页面 error
         * @param url
         * @returns {boolean}
         */
        payIframeAction: function(url){
            var self = this, url = url;
            if(!url) return false;
            //如果检查其他层已经存在，则先消除
            self.hideORremoveDom(self.contianer.children()[0], function(){
                //检查用户是否存在，并且是否已经登录
                if(!self.isPayaccount) {
                    self.checkPayaccount();
                }else{
                    self.showPayIframe(url);
                }
            });
        },

        showPayIframe: function(url){
            var self = this, url = url;
            var payIframeHTML = template.render('payaccount-pay-iframe-tpl', {});
            self.appendToMainContiner(payIframeHTML);
            var payIframeDom = $('#payaccount-pay-iframe');
            self.showDomAStimeout(payIframeDom);
            payIframeDom.addClass('loading');
            var iframe = payIframeDom.find('#pay-iframe');
            iframe.attr('src', url);
            iframe.on('load', function(){
                payIframeDom.removeClass('loading');
                iframe.show();
            });
            $('#pay-iframe-close-btn').on('tap', $.proxy(self, 'removePayIframe'));

            var qbURL = self.getWebServerUrl('queryBalance');
            var qbPostData = { token: self.tokener() };
            //3秒轮询 查询余额，对比是否已经充值成功了
            var sint = setInterval(function(){
                queryBalance();
            }, 3000);
            function queryBalance(){
                PayAccount.utils.doAjax(qbURL, qbPostData, function(res){
                    if(String(res.code) === '1'){
                        if(parseFloat(res.result.balance, 10) > self.balance){
                            //如果查询到的余额 > 当前本地余额， 表示充值成功了
                            clearInterval(sint);
                            //修改本地余额值
                            self.balance = res.result.balance;
                            self.insertItemFormUserData('balance', res.result.balance);
                            self.removePayIframe(function(){
                                //充值成功后显示详细信息
                                /*PayAccount.tipDialog({
                                 msg: '充值成功! 您当前的余额为：' + res.result.balance + ' 盛米',
                                 type: 'success',
                                 autoClose: false,
                                 btnOk: { val: '关闭' }
                                 });*/

                                 self.showPaySuccess(self.goodsData, self.buyReturn);
                            });
                        }
                    }
                }, function(err){}, self.config.XHR_TYPE);
            }
        },

        removePayIframe: function(cb){
            this.hideORremoveDom('payaccount-pay-iframe', cb);
        },

        /*=======充值卡充值=======*/
        showCardPay: function(type, money){
            var self = this;
            var cardmtList = self.cardmtList || (function(){
                var rs = [];
                for(var key in self.CS){
                    if(key == self.key){
                        rs = (self.CS[key]).cardmtList.join(',');
                    }
                }
                return rs;
            })();
            var body = {
                mtlist: cardmtList.split(','),
                balance: self.balance
            };
            var cardPayHTML = template.render('payaccount-pay-card-tpl', { body: body });
            self.appendToMainContiner(cardPayHTML);
            var cardPayDom = $('#payaccount-pay-card');
            cardPayDom.attr('data-type', type);
            console.log(cardPayDom.attr('data-type'));
            //显示充值类型标题
            $('#pay-title').html(self.title);
            //显示金额选择项
            /*var payCardBalanceDom = $('#pay-card-balance');
            payCardBalanceDom.html("\u00A5 "+ money +"（"+ (money * 10) +"盛米）");
            console.log("&yen;&nbsp;"+ money +"（"+ (money * 10) +"盛米）");*/
            //显示充值卡填写弹层
            self.showDomAStimeout(cardPayDom);
            //返回充值类型选择层
            $('#payaccount-pay-card-cancel-btn').on('tap', $.proxy(self, 'returnPay'));
            //确认充值卡充值
            $('#payaccount-pay-card-submit-btn').on('tap', $.proxy(self, 'postCardPayServer'));

        },

        /**
         * 返回充值类型选择层
         * @param evt
         */
        returnPay: function(evt){
            //显示修改密码弹层
            this.payCategory = 'alipay';    //默认支付宝充值
            this.payType = 'WS_WAP_PAYWAP'; //如果是充值卡；默认 电信充值卡
            this.payMoney = 500;           //默认5000盛米 rmb：500
            //this.showPay();
            this.payAction();
        },

        /**
         * 充值卡充值请求后台
         * @param evt
         */
        postCardPayServer: function(evt){
            var self = this, target = evt.currentTarget || evt.target, $target = $(target);
            //卡号
            var cardNo = $.trim($('#card-no').val());
            var cardPassword = $.trim($('#card-password').val());
            var cardmt = $.trim($('#card-mt').val());
            if('' == cardNo){
                PayAccount.tipDialog({ msg: '充值卡号不能为空，请您填写卡号!', type: 'error', autoClose: true });
                return false;
            }
            if('' == cardPassword){
                PayAccount.tipDialog({ msg: '卡号密码不能为空，请您填写卡号密码!', type: 'error', autoClose: true });
                return false;
            }
            if('' == cardmt || 0 == cardmt){
                PayAccount.tipDialog({ msg: '请选择您当前的充值卡面额!', type: 'error', autoClose: true });
                return false;
            }
            //构建数据对象，请求后台
            if(self.isPost) return false;
            var postData = {
                clienttype: self.payCatetorys.clientType, //1-web; 2-phone (手机客户端)
                money: cardmt,    //上线
                category: self.payCatetorys[self.payCategory].match(/\{\{(\d)\}\}/i)[1], //充值分类  1-支付宝 2-易宝 3-SMS 4-财付通 5-mo9先玩后付6 -微信支付web扫码
                type: self.payType,   //充值卡类型
                cardamt: cardmt,    //充值卡面值
                cardno: cardNo,
                cardpwd: cardPassword,
                token: self.tokener()
            };
            self.isPost = true;
            $target.html('').addClass('loading').css('background-color', '#989898');
            //请求后台
            var url = self.getWebServerUrl('topUp');
            PayAccount.utils.doAjax(url, postData, function(res){
                self.isPost = false;
                $target.removeClass('loading').html('确认充值').css('background-color', 'rgb(18, 207, 207)');
                if(String(res.code) == '1'){
                    //更改本地金额
                    self.goodsData.balance = self.balance;
                    //如果是通过购买商品转到充值面板的，我们需要重新定位到购买商品面板
                    /*if(self.buyReturn){
                        self.buyDiamond(    self.goodsData.diamondMoney,
                                            self.goodsData.goodsid,
                                            self.goodsData.goodsname,
                                            self.goodsData.goodsnum     );
                    }else{
                        self.hideORremoveDom('payaccount-pay-card', function(){
                            //PayAccount.tipDialog({ msg: '充值成功!', type: 'success' });
                            //应该是显示充值成功显示充值信息面板
                            self.showPaySuccess(self.goodsData.concat(res));
                        });
                    }*/

                    //显示提交成功的层
                    self.showPayCardSubmit();

                }else if(String(res.code) == '10004'){
                    self.loginAgainAsToken();
                }else{
                    PayAccount.tipDialog({ msg: res.msg || '当前网络异常，请您售后充实!', type: 'error' });
                }
            }, function(err){
                self.isPost = false;
                $target.removeClass('loading').html('确认充值').css('background-color', 'rgb(18, 207, 207)');
                PayAccount.tipDialog({ msg: '当前网络异常，请您售后充实!', type: 'error' });
            }, { type: self.config.XHR_TYPE });


        },

        showPayCardSubmit: function(){
            var self = this;
            self.hideORremoveDom(self.contianer.children()[0], function(){
                var payCardSuccessHTML = template.render('payaccount-pay-card-success-tpl', {});
                self.appendToMainContiner(payCardSuccessHTML);
                var payCardSuccessDom = $('#payaccount-paysuccess-card');
                //显示充值卡填写弹层
                self.showDomAStimeout(payCardSuccessDom);

                //事件监听
                $('#payaccount-submit-btn').on('tap', function(evt){
                    self.hideORremoveDom('payaccount-paysuccess-card');
                });
            });
        },


        /*=================充值成功 模块===================*/

        showPaySuccess: function(res){
            var self = this;
            var body = res;
            body.account = self.sdkUserID;
            body.balance = self.balance;
            body.payMoney = self.payMoney;
            body.payType = self.payCatetorys.types[self.payType];    // '支付宝网页版即时到账';
            body.payDate = res.servertime;
            var paySuccessHTML = template.render('payaccount-pay-success-tpl', { body: body });
            self.appendToMainContiner(paySuccessHTML);
            var paySuccessDom = $('#payaccount-paysuccess');
            //显示充值卡填写弹层
            self.showDomAStimeout(paySuccessDom);

            //事件监听
            $('#payaccount-pays-close-btn').on('tap', $.proxy(self, 'returnGame'));
            $('#payaccount-return-submit-btn').on('tap', $.proxy(self, 'returnGame'));
        },

        returnGame: function(){
            var self = this;
            if(self.buyReturn){
                console.log(self.goodsData);
                self.buyDiamond(self.goodsData.diamondMoney, self.goodsData.goodsid,self.goodsData.goodsname,self.goodsData.goodsnum);
            }else{
                self.hideORremoveDom(self.contianer.children()[0]);
            }
        }


    };

    //注入到window对象中.
    return PayAccount;

}).call(this, Zepto || jQuery);




