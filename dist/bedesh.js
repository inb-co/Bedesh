(function(l){"object"===typeof exports&&"undefined"!==typeof module?module.exports=l():"function"===typeof define&&define.amd?define([],l):("undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this).Bedesh=l()})(function(){return function a(f,e,h){function d(c,k){if(!e[c]){if(!f[c]){var g="function"==typeof require&&require;if(!k&&g)return g(c,!0);if(b)return b(c,!0);g=Error("Cannot find module '"+c+"'");throw g.code="MODULE_NOT_FOUND",g;}g=e[c]={exports:{}};
f[c][0].call(g.exports,function(b){var g=f[c][1][b];return d(g?g:b)},g,g.exports,a,f,e,h)}return e[c].exports}for(var b="function"==typeof require&&require,c=0;c<h.length;c++)d(h[c]);return d}({1:[function(a,f,e){function h(d,b){return b.querySelector(d)}e=f.exports=function(d,b){b=b||document;return h(d,b)};e.all=function(d,b){b=b||document;return b.querySelectorAll(d)};e.engine=function(d){if(!d.one)throw Error(".one callback required");if(!d.all)throw Error(".all callback required");h=d.one;e.all=
d.all;return e}},{}],2:[function(a,f,e){e=f.exports=function(a){a||(a={});"string"===typeof a&&(a={cookie:a});void 0===a.cookie&&(a.cookie="");return{get:function(d){for(var b=a.cookie.split(/;\s*/),c=0;c<b.length;c++){var e=b[c].split("=");if(unescape(e[0])===d)return unescape(e[1])}},set:function(d,b,c){c||(c={});d=escape(d)+"="+escape(b);c.expires&&(d+="; expires="+c.expires);c.path&&(d+="; path="+escape(c.path));return a.cookie=d}}};"undefined"!==typeof document&&(a=e(document),e.get=a.get,e.set=
a.set)},{}],3:[function(a,f,e){a=a("has-dom");f.exports=a()?document:null},{"has-dom":4}],4:[function(a,f,e){f.exports=function(){return"undefined"!==typeof window&&"undefined"!==typeof document&&"function"===typeof document.createElement}},{}],5:[function(a,f,e){f.exports=function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b],d;for(d in c)h.call(c,d)&&(a[d]=c[d])}return a};var h=Object.prototype.hasOwnProperty},{}],6:[function(a,f,e){var h=a("xtend/mutable"),d=a("component-query"),b=
a("get-doc"),c=a("cookie-cutter");console.log("here is Bedesh");var m=Number(new Date),k=b&&b.documentElement;a=function(a){this.options=h({},{daysHidden:15,daysReminder:90,headerContent:"",bodyContent:"",force:!1,onSubmit:function(){},onClose:function(){}},a||a||{});a=c.get("Bedesh-closed");var b=c.get("Bedesh-submited");if(this.options.force||!a&&!b)this.create(),this.show()};a.prototype={constructor:a,create:function(){console.log("creat");var a=b.createElement("div");a.className="bedesh";a.innerHTML=
'<div class="bedesh-overlay bedesh-close"></div><div class="bedesh-container"><div class="bedesh-header">'+this.options.headerContent+'</div><div class="bedesh-body"><form action="">'+this.options.bodyContent+'<input type="email" placeholder="\u0627\u06cc\u0645\u06cc\u0644 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f"><input type="submit" value="\u062b\u0628\u062a \u0627\u06cc\u0645\u06cc\u0644"></form></div></div>';b.body?b.body.appendChild(a):b&&b.addEventListener("DOMContentLoaded",
function(){b.body.appendChild(a)});d(".bedesh-close",a).addEventListener("click",this.close.bind(this),!1)},hide:function(){console.log("hide");k.classList.remove("bedesh-show")},show:function(){console.log("show");k.classList.add("bedesh-show")},close:function(){console.log("close");this.hide();c.set("Bedesh-closed","true",{path:"/",expires:this.getExpirationDate(this.options.daysHidden)})},submit:function(){this.hide();c.set("Bedesh-submited","true",{path:"/",expires:this.getExpirationDate(this.options.daysReminder)})},
getExpirationDate:function(a){return new Date(m+864E5*a)}};f.exports=a},{"component-query":1,"cookie-cutter":2,"get-doc":3,"xtend/mutable":5}]},{},[6])(6)});
