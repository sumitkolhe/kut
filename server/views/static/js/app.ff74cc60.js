(function(t){function e(e){for(var r,o,i=e[0],l=e[1],c=e[2],d=0,p=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],r=!0,i=1;i<a.length;i++){var l=a[i];0!==n[l]&&(r=!1)}r&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var r={},n={app:0},s=[];function o(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=r,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(a,r,function(e){return t[e]}.bind(null,r));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var r=a("8a23"),n=a.n(r);n.a},"0b55":function(t,e,a){"use strict";var r=a("eabd"),n=a.n(r);n.a},"150b":function(t,e,a){},"1fd3":function(t,e,a){},3490:function(t,e,a){"use strict";var r=a("1fd3"),n=a.n(r);n.a},"56d7":function(t,e,a){"use strict";a.r(e);a("b0c0"),a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("Navbar",{on:{toggle:t.renderComponent}}),a("v-main",{staticStyle:{"z-index":"0"}},[a("Particles",{key:t.render}),a("transition",{attrs:{name:"fade",mode:"out-in"}},[a("router-view",{staticStyle:{"z-index":"999"}})],1)],1),a("Footer",{attrs:{app:""}})],1)},s=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",[a("v-app-bar",{attrs:{height:t.height,color:"navbarColor",flat:"",app:""}},[a("v-btn",{staticClass:"hidden-sm-and-up",attrs:{icon:"",color:"svgColor"},on:{click:function(e){t.drawer=!t.drawer}}},[a("svg",{attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M6,13H14L10.5,16.5L11.92,17.92L17.84,12L11.92,6.08L10.5,7.5L14,11H6V13Z"}})])]),a("h2",[t._v(t._s(t.title))]),a("v-spacer"),a("div",[1==t.athomeroute&&0==t.mobileMode?a("v-btn",{staticClass:"svg-padding",attrs:{icon:"",color:"svgColor"},on:{click:function(e){return t.changeRoute()}}},[a("svg",{attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M3,14L3.5,14.07L8.07,9.5C7.89,8.85 8.06,8.11 8.59,7.59C9.37,6.8 10.63,6.8 11.41,7.59C11.94,8.11 12.11,8.85 11.93,9.5L14.5,12.07L15,12C15.18,12 15.35,12 15.5,12.07L19.07,8.5C19,8.35 19,8.18 19,8A2,2 0 0,1 21,6A2,2 0 0,1 23,8A2,2 0 0,1 21,10C20.82,10 20.65,10 20.5,9.93L16.93,13.5C17,13.65 17,13.82 17,14A2,2 0 0,1 15,16A2,2 0 0,1 13,14L13.07,13.5L10.5,10.93C10.18,11 9.82,11 9.5,10.93L4.93,15.5L5,16A2,2 0 0,1 3,18A2,2 0 0,1 1,16A2,2 0 0,1 3,14Z"}})])]):0==t.athomeroute&&0==t.mobileMode?a("v-btn",{staticClass:"hidden-xs-down svg-padding",attrs:{icon:"",color:"svgColor"},on:{click:function(e){return t.changeRoute()}}},[a("svg",{attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M7,7H11V9H7A3,3 0 0,0 4,12A3,3 0 0,0 7,15H11V17H7A5,5 0 0,1 2,12A5,5 0 0,1 7,7M17,7A5,5 0 0,1 22,12H20A3,3 0 0,0 17,9H13V7H17M8,11H16V13H8V11M17,12H19V15H22V17H19V20H17V17H14V15H17V12Z"}})])]):t._e(),0==t.isthemedark?a("v-btn",{staticClass:"svg-padding",attrs:{icon:"",color:"svgColor"},on:{click:function(e){return t.changeTheme()}}},[a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[a("path",{attrs:{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}})])]):a("v-btn",{staticClass:"svg-padding",attrs:{color:"svgColor",icon:""},on:{click:function(e){return t.changeTheme()}}},[a("svg",{attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z"}})])]),a("v-menu",{attrs:{"offset-y":"","content-class":"modale","open-on-click":""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-btn",t._g({staticClass:"svg-padding",attrs:{color:"svgColor",icon:""}},r),[a("svg",{attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"}})])])]}}])},[a("v-card",[a("v-list",[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[a("h3",[t._v(t._s(t.title))])]),a("v-list-item-subtitle",{staticClass:"subtitle-1"},[t._v(t._s(t.version))])],1),a("v-list-item-action",[a("a",{attrs:{href:"https://github.com/sumitkolhe/Reduced",target:"_blank"}},[a("v-btn",{attrs:{icon:"",color:"svgColor"}},[a("svg",{attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"}})])])],1)])],1)],1),a("v-divider"),a("v-list",[a("v-list-item",[a("v-list-tile-title",[t._v("Server Status")]),a("v-badge",{staticClass:"ml-12",attrs:{content:t.content,inline:"",color:t.color}})],1)],1)],1)],1)],1)],1),a("v-navigation-drawer",{class:{navigationDrawerColor:!t.$vuetify.theme.dark,navigationDrawerColor:t.$vuetify.theme.dark},attrs:{"mobile-breakpoint":"999999",width:"350",app:"",fixed:"",floating:"",clipped:""},scopedSlots:t._u([{key:"append",fn:function(){return[a("div",{staticClass:"text-center mb-4 d-lg-none"},[a("v-btn",{attrs:{color:"svgColor",icon:""},on:{click:function(e){t.drawer=!t.drawer}}},[a("svg",{staticStyle:{width:"40px",height:"40px"},attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"}})])])],1)]},proxy:!0}]),model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{attrs:{flat:""}},[a("v-list-item-group",{attrs:{mandatory:!0,"active-class":"active"}},[a("v-list-item",{staticClass:"selecteditem",on:{click:function(e){return t.changeRoute()}}},[a("v-list-item-content",[a("v-list-item-title",{class:{"white--text navigationmenutext":this.$vuetify.theme.dark,"black--text navigationmenutext":!this.$vuetify.theme.dark}},[t._v("Home")])],1),a("v-list-item-icon",{staticClass:"image"},[a("svg",{attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"#000",d:"M7,7H11V9H7A3,3 0 0,0 4,12A3,3 0 0,0 7,15H11V17H7A5,5 0 0,1 2,12A5,5 0 0,1 7,7M17,7A5,5 0 0,1 22,12H20A3,3 0 0,0 17,9H13V7H17M8,11H16V13H8V11M17,12H19V15H22V17H19V20H17V17H14V15H17V12Z"}})])])],1),a("v-list-item",{staticClass:"selecteditem",on:{click:function(e){return t.changeRoute()}}},[a("v-list-item-content",[a("v-list-item-title",{class:{"white--text navigationmenutext":this.$vuetify.theme.dark,"black--text navigationmenutext":!this.$vuetify.theme.dark}},[t._v("Dashboard")])],1),a("v-list-item-icon",{staticClass:"image"},[a("svg",{attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"#000",d:"M3,14L3.5,14.07L8.07,9.5C7.89,8.85 8.06,8.11 8.59,7.59C9.37,6.8 10.63,6.8 11.41,7.59C11.94,8.11 12.11,8.85 11.93,9.5L14.5,12.07L15,12C15.18,12 15.35,12 15.5,12.07L19.07,8.5C19,8.35 19,8.18 19,8A2,2 0 0,1 21,6A2,2 0 0,1 23,8A2,2 0 0,1 21,10C20.82,10 20.65,10 20.5,9.93L16.93,13.5C17,13.65 17,13.82 17,14A2,2 0 0,1 15,16A2,2 0 0,1 13,14L13.07,13.5L10.5,10.93C10.18,11 9.82,11 9.5,10.93L4.93,15.5L5,16A2,2 0 0,1 3,18A2,2 0 0,1 1,16A2,2 0 0,1 3,14Z"}})])])],1)],1)],1)],1)],1)},i=[],l=(a("96cf"),a("1da1")),c=a("d4ec"),u=a("bee2"),d=a("bc3a"),p=a.n(d),v="api/",h=function(){function t(){Object(c["a"])(this,t)}return Object(u["a"])(t,null,[{key:"getstatus",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*","Cache-Control":"no-cache"}},t.abrupt("return",p.a.get(v+"status",e).then((function(t){return t})).catch((function(t){return t.response.status})));case 2:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"getURL",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*"}},t.abrupt("return",p.a.post(v+"check/",{linktocheck:e},a).then((function(t){return t})).catch((function(t){return t.response})));case 2:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"putURL",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e,a){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*"}},""!=a){t.next=5;break}return t.abrupt("return",p.a.post(v+"shorten/",{longurl:e},r).then((function(t){return t.data})).catch((function(t){return t.response.status})));case 5:return t.abrupt("return",p.a.post(v+"shorten/",{alias:a,longurl:e},r).then((function(t){return t.data})).catch((function(t){return t.response.status})));case 6:case"end":return t.stop()}}),t)})));function e(e,a){return t.apply(this,arguments)}return e}()}]),t}(),m=h,f={name:"Navbar",components:{},computed:{height:function(){return this.$vuetify.breakpoint.xs?65:80},mobileMode:function(){return!!this.$vuetify.breakpoint.xs}},mounted:function(){this.$vuetify.theme.dark=JSON.parse(localStorage.getItem("isThemeDark"))||!1,this.isthemedark=this.$vuetify.theme.dark,"/"==this.$router.currentRoute.path?this.athomeroute=!0:this.athomeroute=!1},methods:{changeTheme:function(){this.$vuetify.theme.dark=!this.$vuetify.theme.dark,this.isthemedark=!this.isthemedark,localStorage.setItem("isThemeDark",JSON.stringify(this.$vuetify.theme.dark)),this.$emit("toggle")},changeRoute:function(){1==this.athomeroute?(this.$router.push("/dashboard"),this.athomeroute=!1):0==this.athomeroute&&(this.$router.push("/"),this.athomeroute=!0)}},data:function(){return{title:"Reduced",version:"v1.1.0",content:"OFFLINE",color:"error",response:null,drawer:!1,isthemedark:!1,athomeroute:""}},created:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m.getstatus();case 2:t.response=e.sent,200==t.response.status&&"OK"==t.response.data.status&&(t.content="ONLINE",t.color="success");case 4:case"end":return e.stop()}}),e)})))()}},g=f,b=(a("0b55"),a("2877")),C=a("6544"),x=a.n(C),k=a("40dc"),y=a("4ca6"),V=a("8336"),w=a("b0af"),H=a("ce7e"),L=a("8860"),_=a("da13"),A=a("1800"),M=a("5d23"),S=a("1baa"),O=a("34c3"),j=a("e449"),R=a("f774"),$=a("2fa4"),B=Object(b["a"])(g,o,i,!1,null,"2d8e36cf",null),I=B.exports;x()(B,{VAppBar:k["a"],VBadge:y["a"],VBtn:V["a"],VCard:w["a"],VDivider:H["a"],VList:L["a"],VListItem:_["a"],VListItemAction:A["a"],VListItemContent:M["a"],VListItemGroup:S["a"],VListItemIcon:O["a"],VListItemSubtitle:M["b"],VListItemTitle:M["c"],VMenu:j["a"],VNavigationDrawer:R["a"],VSpacer:$["a"]});var N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-footer",{attrs:{padless:"",inset:"",color:"footerColor",width:"100%"}},[a("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[a("strong",[t._v(" Made with "),a("svg",{staticClass:"pr-1 beat",staticStyle:{width:"24px",height:"24px","vertical-align":"middle"},attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"red",d:"M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"}})]),t._v(" using "),a("svg",{staticStyle:{"vertical-align":"middle"},attrs:{width:"20px",height:"20px",viewBox:"0 0 256 221",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",preserveAspectRatio:"xMidYMid"}},[a("g",[a("path",{attrs:{d:"M204.8,0 L256,0 L128,220.8 L0,0 L50.56,0 L97.92,0 L128,51.2 L157.44,0 L204.8,0 Z",fill:"#41B883"}}),a("path",{attrs:{d:"M0,0 L128,220.8 L256,0 L204.8,0 L128,132.48 L50.56,0 L0,0 Z",fill:"#41B883"}}),a("path",{attrs:{d:"M50.56,0 L128,133.12 L204.8,0 L157.44,0 L128,51.2 L97.92,0 L50.56,0 Z",fill:"#35495E"}})])])])])],1)],1)},T=[],D={name:"Footer",components:{},data:function(){return{}}},E=D,J=(a("917e"),a("62ad")),Z=a("553a"),P=Object(b["a"])(E,N,T,!1,null,"370fa082",null),q=P.exports;x()(P,{VCard:w["a"],VCol:J["a"],VFooter:Z["a"]});var F=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"particles-js"}})},U=[],z={name:"ParticlesJS",mounted:function(){var t=this;a("572f"),this.$nextTick((function(){t.initParticlesJS()}))},beforeDestroy:function(){window["pJSDom"][0].pJS.fn.vendors.destroypJS(),window["pJSDom"]=[]},data:function(){return{light:"#fff",dark:"#000"}},computed:{particlesNumber:function(){return 50},theme:function(){return this.$vuetify.theme.dark?this.light:this.dark}},methods:{initParticlesJS:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:particlesJS("particles-js",{particles:{number:{value:t.particlesNumber,density:{enable:!0,value_area:800}},color:{value:t.theme},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:1,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:3,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:t.theme,opacity:.5,width:1},move:{enable:!0,speed:1,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"repulse"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:800,line_linked:{opacity:1}},bubble:{distance:800,size:80,duration:2,opacity:.8,speed:3},repulse:{distance:400,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0});case 1:case"end":return e.stop()}}),e)})))()}}},Y=z,Q=(a("3490"),Object(b["a"])(Y,F,U,!1,null,null,null)),G=Q.exports,K={name:"App",components:{Navbar:I,Footer:q,Particles:G},data:function(){return{render:1}},methods:{renderComponent:function(){this.render+=1}}},X=K,W=(a("034f"),a("7496")),tt=a("f6c4"),et=Object(b["a"])(X,n,s,!1,null,null,null),at=et.exports;x()(et,{VApp:W["a"],VMain:tt["a"]});var rt=a("f309");r["a"].use(rt["a"]);var nt=new rt["a"]({theme:{dark:!1,themes:{light:{svgColor:"#000",navbarColor:"#fff",footerColor:"#fff",textColor:"#fff",navigationDrawerColor:"#f55555"},dark:{svgColor:"#fff",textColor:"#000",navbarColor:"#121212",footerColor:"#121212",navigationDrawerColor:"#212121"}}}}),st=nt,ot=a("8c4f"),it=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"body"},[a("v-container",{attrs:{fluid:""}},[a("v-row",{attrs:{justify:"center",color:"bgColor"}},[a("v-col",{staticClass:"mt-2 mt-md-12",attrs:{cols:"12",sm:"10",md:"8",lg:"8",xl:"6"}},[a("v-row",{staticClass:"mb-8 mt-2 mt-lg-2 mt-md-0 mx-1",attrs:{justify:"center",align:"center",wrap:""}},[a("h1",{staticStyle:{"font-size":"22px","font-weight":"500"},attrs:{color:"black"}},[t._v(" Create short links quickly "),a("svg",{staticStyle:{"vertical-align":"middle"},attrs:{viewBox:"0 0 24 24",width:"26",height:"26",stroke:"currentColor","stroke-width":"2",fill:"currentColor","stroke-linecap":"round","stroke-linejoin":"round"}},[a("polygon",{attrs:{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"}})])])]),a("v-row",{staticClass:"mx-1",attrs:{justify:"center",dense:"",align:"center"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.longurl,expression:"longurl"}],staticClass:"urlbox",class:{badinfo:t.badurl,urlboxdark:t.$vuetify.theme.dark},attrs:{placeholder:t.urlplaceholder,type:"text"},domProps:{value:t.longurl},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sub(e)},input:function(e){e.target.composing||(t.longurl=e.target.value)}}})]),a("v-row",{staticClass:"mx-1 mx-sm-6 mx-md-12",attrs:{justify:"center",align:"center",dense:""}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.alias,expression:"alias"}],staticClass:"urlbox",class:{badinfo:t.badalias,urlboxdark:t.$vuetify.theme.dark},attrs:{placeholder:t.aliasplaceholder,type:"text"},domProps:{value:t.alias},on:{input:function(e){e.target.composing||(t.alias=e.target.value)}}})]),a("v-row",{staticClass:"mt-md-4 mt-sm-0",attrs:{justify:"center",align:"center",dense:""}},[t.loading?a("button",{staticClass:"btn",class:{btndark:t.$vuetify.theme.dark},attrs:{"x-large":"",rounded:"",ripple:!1,type:"submit"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sub(e)},click:t.sub}},[a("div",{staticClass:"shortenSpinner"})]):a("button",{staticClass:"btn",class:{btndark:t.$vuetify.theme.dark},attrs:{"x-large":"",rounded:"",ripple:!1,type:"submit"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sub(e)},click:t.sub}},[t._v(t._s(t.buttonstatus))])]),""!=t.local?a("v-row",{staticClass:"mx-1",attrs:{justify:"center",dense:"",align:"center"}},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",[t._v("Orignal")]),a("th",[t._v("Shortened")]),a("th",[t._v("Actions")])])]),a("tbody",t._l(t.local,(function(e,r){return a("tr",{key:r},[a("td",{attrs:{"data-label":"Original"}},[a("div",[a("p",[t._v(t._s(e.link.longurl))])])]),a("td",{attrs:{"data-label":"Shortened"}},[t._v(t._s(e.link.shorturl))]),a("td",{attrs:{"data-label":"Actions"}},[a("v-btn",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.link.shorturl,expression:"(local.link.shorturl)",arg:"copy"}],attrs:{icon:"",color:"green"},on:{click:function(e){t.copy=!0}}},[a("svg",{attrs:{viewBox:"0 0 24 24",width:"22",height:"22",stroke:"currentColor","stroke-width":"2",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}},[a("rect",{attrs:{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}}),a("path",{attrs:{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"}})])]),a("v-btn",{attrs:{color:"blue",icon:""},on:{click:function(e){return t.generateqrcode(r)}}},[a("svg",{staticStyle:{width:"24px",height:"24px"},attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z"}})])]),a("v-btn",{attrs:{color:"error",icon:""},on:{click:function(e){return t.removefromlocal(r)}}},[a("svg",{staticClass:"css-i6dzq1",attrs:{viewBox:"0 0 24 24",width:"22",height:"22",stroke:"currentColor","stroke-width":"2",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}},[a("polyline",{attrs:{points:"3 6 5 6 21 6"}}),a("path",{attrs:{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}}),a("line",{attrs:{x1:"10",y1:"11",x2:"10",y2:"17"}}),a("line",{attrs:{x1:"14",y1:"11",x2:"14",y2:"17"}})])])],1)])})),0)])]):t._e()],1)],1)],1),a("div",[a("v-snackbar",{attrs:{color:"green",elevation:"24",top:"",rounded:"pill",timeout:"1000"},model:{value:t.copy,callback:function(e){t.copy=e},expression:"copy"}},[a("h3",{staticClass:"text-center"},[t._v("Copied")])])],1),a("div",[a("v-snackbar",{attrs:{timeout:"3000",color:"red",elevation:"24",top:"",rounded:"pill"},model:{value:t.limit,callback:function(e){t.limit=e},expression:"limit"}},[a("h3",{staticClass:"text-center"},[t._v("Quota Exceeded")])])],1),a("v-dialog",{attrs:{"overlay-color":"black","max-width":"250"},model:{value:t.qrcode,callback:function(e){t.qrcode=e},expression:"qrcode"}},[a("v-sheet",{attrs:{"align-center":"",color:"white"}},[a("v-card-text",{staticClass:"text-center"},[a("qrcode",{attrs:{value:t.qrcodevalue,options:{width:200}}})],1)],1)],1)],1)},lt=[],ct=(a("a434"),a("9911"),{name:"Home",components:{},data:function(){return{headers:[{text:"Orignal",align:"center",value:"link.longurl",sortable:!1},{text:"Shortened",align:"center",value:"link.shorturl",sortable:!1},{text:"Actions",align:"center",value:"actions",sortable:!1}],qrcode:!1,qrcodevalue:"",badurl:!1,badalias:!1,longurl:"",shorturl:null,alias:"",response:"",copy:!1,limit:!1,local:[],drawer:!1,loading:!1,buttonstatus:"Shorten",urlplaceholder:"Enter long url...",aliasplaceholder:"Alias (Optional)"}},created:function(){this.local=JSON.parse(localStorage.getItem("links"))||[]},methods:{sub:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""==t.longurl){e.next=11;break}return t.badalias=!1,t.badurl=!1,t.buttonstatus="Shortening",t.loading=!0,e.next=7,m.putURL(t.longurl,t.alias);case 7:t.response=e.sent,"IURL"==t.response.status?(t.badurl=!0,t.longurl="",t.urlplaceholder="Invalid URL"):"AAE"==t.response.status?(t.badalias=!0,t.alias="",t.aliasplaceholder="Alias not available"):429==t.response?t.limit=!0:(delete t.response.clicks,delete t.response.stats,delete t.response.created,delete t.response._id,delete t.response.alias,delete t.response.__v,delete t.response.expire_at,t.local=t.response,t.store(t.local)),e.next=14;break;case 11:t.badurl=!0,t.longurl="",t.urlplaceholder="Invalid URL";case 14:t.buttonstatus="Shorten",t.loading=!1;case 16:case"end":return e.stop()}}),e)})))()},store:function(){var t=[];t=JSON.parse(localStorage.getItem("links"))||[],500!=this.local&&(t.splice(0,0,{link:this.local}),localStorage.setItem("links",JSON.stringify(t))),this.local=JSON.parse(localStorage.getItem("links"))},removefromlocal:function(t){this.local.splice(t,1),localStorage.setItem("links",JSON.stringify(this.local)),this.local=JSON.parse(localStorage.getItem("links"))},generateqrcode:function(t){this.qrcode=!this.qrcode;var e=JSON.parse(localStorage.getItem("links"));this.qrcodevalue=e[t].link.shorturl}}}),ut=ct,dt=(a("cc6c"),a("99d9")),pt=a("a523"),vt=a("169a"),ht=a("0fd9"),mt=a("8dd9"),ft=a("2db4"),gt=Object(b["a"])(ut,it,lt,!1,null,"55d53dfe",null),bt=gt.exports;x()(gt,{VBtn:V["a"],VCardText:dt["a"],VCol:J["a"],VContainer:pt["a"],VDialog:vt["a"],VRow:ht["a"],VSheet:mt["a"],VSnackbar:ft["a"]});var Ct=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"body",attrs:{fluid:""}},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{staticClass:"mt-2 mt-md-8",attrs:{cols:"12",sm:"10",md:"8",lg:"10",xl:"8"}},[a("v-row",{staticClass:"mb-6 mt-2 mt-lg-0 mt-md-0 mx-1",attrs:{justify:"center",align:"center",wrap:""}},[a("h1",{staticStyle:{"font-size":"32px","font-weight":"700","font-family":""},attrs:{color:"black"}},[t._v("👋 Hey")])]),a("v-row",{staticClass:"mb-6 mx-1",attrs:{justify:"center",align:"center",wrap:""}},[a("h1",{staticStyle:{"font-size":"22px","font-weight":"500","font-family":""},attrs:{color:"black"}},[t._v("Enter a link to check its details")])]),a("v-row",{staticClass:"mx-1",attrs:{justify:"center",align:"center"}},[a("v-col",{attrs:{cols:"12",sm:"10",md:"10",lg:"8",xl:"8"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.staturl,expression:"staturl"}],staticClass:"urlbox",class:{badinfo:t.badurl,urlboxdark:t.$vuetify.theme.dark},attrs:{placeholder:t.placeholder,type:"text"},domProps:{value:t.staturl},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.staturl(e)},input:function(e){e.target.composing||(t.staturl=e.target.value)}}})])],1),a("v-row",{staticClass:"mt-md-0 mt-sm-0",attrs:{justify:"center",align:"center",dense:""}},[a("button",{staticClass:"btn",class:{btndark:t.$vuetify.theme.dark},attrs:{"x-large":"",rounded:"",ripple:!1,type:"submit"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getstats(e)},click:t.getstats}},[t._v(t._s(t.buttonstatus))])]),""!=t.createdon?a("v-row",{staticClass:"mt-10 justify-space-around"},[a("v-col",{attrs:{cols:"12",sm:"6",md:"6",lg:"3",xl:"3"}},[a("v-sheet",{staticClass:"mx-auto card"},[a("svg",{staticStyle:{width:"32px",height:"32px"},attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"#fff",d:"M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"}})]),a("v-card-title",[a("span",{staticClass:"mx-auto card-title"},[t._v("Created on")])]),a("v-card-text",{staticClass:"card-info"},[t._v(t._s(t.createtime)+" | "+t._s(t.createdon))])],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6",lg:"3",xl:"3"}},[a("v-sheet",{staticClass:"mx-auto card"},[a("svg",{staticStyle:{width:"32px",height:"32px"},attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"#fff",d:"M8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15M10.5,17L12,14L13.5,17H10.5M16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15M22,11A10,10 0 0,0 12,1A10,10 0 0,0 2,11C2,13.8 3.2,16.3 5,18.1V22H19V18.1C20.8,16.3 22,13.8 22,11M17,20H15V18H13V20H11V18H9V20H7V17.2C5.2,15.7 4,13.5 4,11A8,8 0 0,1 12,3A8,8 0 0,1 20,11C20,13.5 18.8,15.8 17,17.2V20Z"}})]),a("v-card-title",[a("span",{staticClass:"mx-auto card-title"},[t._v("Expiration Date")])]),a("v-card-text",{staticClass:"card-info"},[t._v(t._s(t.expiretime)+" | "+t._s(t.expiredate))])],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6",lg:"3",xl:"3"}},[a("v-sheet",{staticClass:"mx-auto card"},[a("svg",{staticStyle:{width:"32px",height:"32px"},attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"#fff",d:"M10.76,8.69A0.76,0.76 0 0,0 10,9.45V20.9C10,21.32 10.34,21.66 10.76,21.66C10.95,21.66 11.11,21.6 11.24,21.5L13.15,19.95L14.81,23.57C14.94,23.84 15.21,24 15.5,24C15.61,24 15.72,24 15.83,23.92L18.59,22.64C18.97,22.46 19.15,22 18.95,21.63L17.28,18L19.69,17.55C19.85,17.5 20,17.43 20.12,17.29C20.39,16.97 20.35,16.5 20,16.21L11.26,8.86L11.25,8.87C11.12,8.76 10.95,8.69 10.76,8.69M15,10V8H20V10H15M13.83,4.76L16.66,1.93L18.07,3.34L15.24,6.17L13.83,4.76M10,0H12V5H10V0M3.93,14.66L6.76,11.83L8.17,13.24L5.34,16.07L3.93,14.66M3.93,3.34L5.34,1.93L8.17,4.76L6.76,6.17L3.93,3.34M7,10H2V8H7V10"}})]),a("v-card-title",[a("span",{staticClass:"mx-auto card-title"},[t._v("Total Clicks")])]),a("v-card-text",{staticClass:"card-info"},[t._v(t._s(t.totalclicks))])],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6",lg:"3",xl:"3"}},[a("v-sheet",{staticClass:"mx-auto card"},[a("svg",{staticStyle:{width:"32px",height:"32px"},attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"#fff",d:"M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"}})]),a("v-card-title",[a("span",{staticClass:"mx-auto card-title"},[t._v("Orignal link")])]),a("v-card-text",{staticClass:"card-info"},[a("a",{attrs:{href:t.originallink,target:"_blank"}},[t._v(t._s(t.originallink))])])],1)],1)],1):t._e()],1)],1),a("div",[a("v-snackbar",{attrs:{timeout:"3000",color:"red",elevation:"24",top:"",rounded:"pill"},model:{value:t.aliasdoesnotexist,callback:function(e){t.aliasdoesnotexist=e},expression:"aliasdoesnotexist"}},[a("h3",{staticClass:"text-center"},[t._v("Invalid Link")])])],1),a("div",[a("v-snackbar",{attrs:{timeout:"3000",color:"red",elevation:"24",top:"",rounded:"pill"},model:{value:t.limitReached,callback:function(e){t.limitReached=e},expression:"limitReached"}},[a("h3",{staticClass:"text-center"},[t._v("Quota Exceeded")])])],1)],1)},xt=[],kt=(a("ac1f"),a("466d"),{name:"Dashboard",components:{},data:function(){return{staturl:"",url:"",originallink:"",totalclicks:"",createdon:"",createtime:"",expiredate:"",expiretime:"",placeholder:"Enter a shortened link",response:"",date:"",limitReached:!1,statdate:"",buttonstatus:"Check",badurl:!1,aliasdoesnotexist:!1,value:[],labels:[],store:[],gradient:["#00c6ff","#F0F","#FF0"]}},methods:{getstats:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.createdon="",t.totalclicks="",t.originallink="",t.createtime="",t.expiredate="",t.expiretime="",t.badurl=!1,t.value=[],t.labels=[],t.store=[],""==t.staturl){e.next=16;break}return t.buttonstatus="Checking..",e.next=14,m.getURL(t.staturl);case 14:if(t.response=e.sent,200==t.response.status){for(t.date=new Date(t.response.data.created),t.expire=new Date(t.response.data.expire),t.createdon=t.date.toDateString(),t.createtime=t.response.data.created.match(/\d\d:\d\d/)[0],t.expiretime=t.response.data.expire.match(/\d\d:\d\d/)[0],t.totalclicks=t.response.data.clicks,t.originallink=t.response.data.longurl,t.expiredate=t.expire.toDateString(),a=0;a<t.response.data.stats.length;a++)t.statdate=new Date(t.response.data.stats[a]),t.store[a]=t.statdate.getUTCDate()+"-"+t.statdate.getUTCMonth()+"-"+t.statdate.getUTCFullYear();r=t.graph(t.store),t.labels=r[0],t.value=r[1],console.log(t.response.data.stats.length)}else 404==t.response.status?t.aliasdoesnotexist=!0:400==t.response.status?(t.badurl=!0,t.staturl="",t.placeholder="Not a valid link"):429==t.response.status&&(t.limitReached=!0);case 16:t.buttonstatus="Check";case 17:case"end":return e.stop()}}),e)})))()},graph:function(t){var e,a=[],r=[];t.sort();for(var n=0;n<t.length;n++)t[n]!==e?(a.push(t[n]),r.push(1)):r[r.length-1]++,e=t[n];return[a,r]}}}),yt=kt,Vt=(a("88c3"),Object(b["a"])(yt,Ct,xt,!1,null,"1b9355ba",null)),wt=Vt.exports;x()(Vt,{VCardText:dt["a"],VCardTitle:dt["b"],VCol:J["a"],VContainer:pt["a"],VRow:ht["a"],VSheet:mt["a"],VSnackbar:ft["a"]}),r["a"].use(ot["a"]);var Ht=new ot["a"]({mode:"history",routes:[{path:"/",name:"home",component:bt},{path:"/dashboard",name:"dashboard",component:wt}]}),Lt=a("4eb5"),_t=a.n(Lt),At=a("b2e5"),Mt=a.n(At);a("150b");r["a"].component(Mt.a.name,Mt.a),r["a"].use(_t.a),r["a"].config.productionTip=!1,new r["a"]({vuetify:st,router:Ht,render:function(t){return t(at)}}).$mount("#app")},"85a5":function(t,e,a){},"88c3":function(t,e,a){"use strict";var r=a("85a5"),n=a.n(r);n.a},"8a23":function(t,e,a){},9084:function(t,e,a){},"917e":function(t,e,a){"use strict";var r=a("9084"),n=a.n(r);n.a},cc6c:function(t,e,a){"use strict";var r=a("fe90"),n=a.n(r);n.a},eabd:function(t,e,a){},fe90:function(t,e,a){}});
//# sourceMappingURL=app.ff74cc60.js.map