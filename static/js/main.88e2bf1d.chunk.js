(this.webpackJsonpreactfront=this.webpackJsonpreactfront||[]).push([[0],{31:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},61:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),r=n(21),c=n.n(r),i=(n(43),n(4)),o=n(5),l=n(7),d=n(6),u=(n(44),n(45),n(46),n(19)),h=n(8),j=n(16),b=n.n(j),p=n(20),g=n(17);var m=n(9),O=n(0),x=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={email:"",password:"",name:"",instaPass:"",instaUser:"",emailBlur:null,passwordBlur:null,invalidLogin:!1,instaUserBlur:null,instaPassBlur:null,nameBlur:null,errorMsg:" ",hidden:!0,loginAlert:"",signUp:!1},e.handleChange=function(t){console.log(t.target.id,t.target.value),e.setState(Object(g.a)({},t.target.id,t.target.value))},e.handleBlur=function(t){if("instaUser"===t.target.id|"instaPass"===t.target.id)if(t.target.value<2){var n=t.target.id+"Blur";e.setState(Object(g.a)({},n,!0))}else{var s=t.target.id+"Blur";e.setState(Object(g.a)({},s,!1))}else if(e.state[t.target.id].length<4){var a=t.target.id+"Blur";e.setState(Object(g.a)({},a,!0))}else{var r=t.target.id+"Blur";e.setState(Object(g.a)({},r,!1))}},e.handleSubmit=function(){var t=e.state,n=t.email,s=t.password;t.invalidLogin;if(n.length>1&&s.length>1){e.setState({hidden:!1,loginAlert:"Logging in..."});var a={email:n,password:s};fetch("https://multer-test123.herokuapp.com/signin",{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}}).then((function(t){return 200===t.status?(e.setState({invalidLogin:!1}),t.json()):(e.setState({invalidLogin:!0}),t.json())})).then(function(){var t=Object(p.a)(b.a.mark((function t(n){var s,a,r,c,i,o,l,d,u,h;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s=n.Error,!1!==e.state.invalidLogin||s){t.next=28;break}return"token",a=new Date,r=a.getTime(),r+=36e5,a.setTime(r),document.cookie="userId="+n.userId+";expires="+a.toUTCString()+";path=/",document.cookie="token="+n.token+";expires="+a.toUTCString()+";path=/",c=document.cookie.match(new RegExp("(^| )token=([^;]+)")),i=c[0].split("="),o=i[1],l=new FormData,e.setState({loginAlert:"Gathering images..."}),setTimeout((function(){e.setState({loginAlert:"Linking with instagram..."})}),1e3),t.next=17,fetch("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png");case 17:return d=t.sent,t.next=20,d.blob();case 20:u=t.sent,h=new File([u],"test.jpg",{type:"image/jpeg"}),l.append("image",h),console.log(o),new Promise((function(e,t){fetch("https://multer-test123.herokuapp.com/test",{method:"POST",body:l,headers:{Authorization:"Bearer ".concat(o)}}).then(function(){var n=Object(p.a)(b.a.mark((function n(s){return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:200===s.status?e():(403===s.status&&console.log(s),t());case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(e){return console.log("problem",e)}))})).then((function(){e.props.forceRender(),document.cookie.match(new RegExp("(^| )token=([^;]+)"))&&e.setState({test:!0})})),t.next=31;break;case 28:console.log("error"),e.setState({errorMsg:n.Error,hidden:!0}),setTimeout((function(){return e.setState({errorMsg:" "})}),5e3);case 31:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}else e.setState({errorMsg:"Please ensure both fields are entered correctly.",hidden:!0}),setTimeout((function(){return e.setState({errorMsg:" "})}),5e3)},e.signUp=function(){e.setState((function(e){return{signUp:!e.signUp}}))},e.handleSignUp=function(){var t=e.state,n=t.instaUserBlur,s=t.instaPassBlur,a=t.nameBlur,r=t.emailBlur,c=t.passwordBlur,i=t.name,o=t.email,l=t.password,d=t.instaUser,u=t.instaPass;if(o.length>3&&l.length>3&&i.length>3&&null!==d&&null!==u){e.setState({hidden:!1,loginAlert:"Processing..."});var h={name:i,password:l,email:o,instaUsername:d,instaPassword:u};fetch("https://multer-test123.herokuapp.com/signup",{method:"POST",body:JSON.stringify(h),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(t){t.Error?e.setState({errorMsg:t.Error,hidden:!0,loginAlert:""}):e.setState({errorMsg:"User successfully created.",hidden:!0,loginAlert:""})}))}else null===s|null===n|null===a|null===c|null===r?(e.setState({errorMsg:"Please ensure all fields have been completed."}),setTimeout((function(){return e.setState({errorMsg:""})}),5e3)):o.length<4?(e.setState({errorMsg:"Email must be more than 4 characters long."}),setTimeout((function(){return e.setState({errorMsg:""})}),5e3)):l.length<4?(e.setState({errorMsg:"Password must be more than 4 characters long."}),setTimeout((function(){return e.setState({errorMsg:""})}),5e3)):i.length<4&&(e.setState({errorMsg:"Name must be more than 4 characters long."}),setTimeout((function(){return e.setState({errorMsg:""})}),5e3))},e}return Object(o.a)(n,[{key:"render",value:function(){var e=this;console.log(this.state);var t=this.state,n=t.emailBlur,s=t.instaUser,r=t.instaPass,c=t.signUp,i=t.passwordBlur,o=t.nameBlur,l=t.instaUserBlur,d=t.instaPassBlur,u=t.name,j=t.hidden,b=t.test,p=t.email,g=t.password,m=t.loginAlert,x=t.invalidLogin,f=t.errorMsg;return Object(O.jsx)(a.a.Fragment,{children:Object(O.jsxs)("div",{style:c?{height:"90vh",paddingBottom:30,marginTop:15}:null,className:"rowMine",children:[b&&!x?Object(O.jsx)(h.a,{to:"/btnPage"}):null,!c&&Object(O.jsxs)(a.a.Fragment,{children:[Object(O.jsx)("h1",{children:"Sign In"}),Object(O.jsx)("span",{className:"alert",children:f}),Object(O.jsx)("label",{children:"Email:"}),Object(O.jsx)("input",{id:"email",style:n?{borderBottom:"1px solid red"}:null===n?{borderBottom:"1px solid rgb(50, 15, 107)"}:{borderBottom:"1px solid green"},value:p,onBlur:function(t){return e.handleBlur(t)},onChange:function(t){return e.handleChange(t)},className:"input"}),Object(O.jsx)("label",{children:"Password:"}),Object(O.jsx)("input",{id:"password",style:i?{borderBottom:"1px solid red"}:null===i?{borderBottom:"1px solid rgb(50, 15, 107)"}:{borderBottom:"1px solid green"},onBlur:function(t){return e.handleBlur(t)},value:g,onChange:function(t){return e.handleChange(t)},type:"password",className:"input"}),Object(O.jsxs)("div",{className:"btnContain",children:[Object(O.jsxs)("div",{className:"btnContainCol",children:[Object(O.jsxs)("button",{onClick:this.handleSubmit,className:"btn login",children:[Object(O.jsxs)("div",{id:j?"hide":null,className:"lds-defaultTwo left",children:[Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{})]}),Object(O.jsx)("span",{id:j?null:"hide",className:"loginTxt",children:"LOGIN"})]}),Object(O.jsx)("div",{className:"loginAlert",children:m})]}),Object(O.jsx)("button",{className:"btn signup",children:Object(O.jsx)("span",{className:"signTxt",onClick:this.signUp,children:" SIGNUP "})})]})]}),c&&Object(O.jsxs)(a.a.Fragment,{children:[Object(O.jsx)("h1",{children:"Sign Up"}),Object(O.jsx)("span",{style:f.length<2?{display:"none"}:{display:"block"},className:"alert",children:f}),Object(O.jsx)("label",{children:"Full Name:"}),Object(O.jsx)("input",{onBlur:function(t){return e.handleBlur(t)},style:o?{borderBottom:"1px solid red"}:null===o?{borderBottom:"1px solid rgb(50, 15, 107)"}:{borderBottom:"1px solid green"},id:"name",value:u,onChange:function(t){return e.handleChange(t)}}),Object(O.jsx)("label",{children:"Email:"}),Object(O.jsx)("input",{id:"email",style:n?{borderBottom:"1px solid red"}:null===n?{borderBottom:"1px solid rgb(50, 15, 107)"}:{borderBottom:"1px solid green"},value:p,onBlur:function(t){return e.handleBlur(t)},onChange:function(t){return e.handleChange(t)},className:"input"}),Object(O.jsx)("label",{children:"Password:"}),Object(O.jsx)("input",{id:"password",style:i?{borderBottom:"1px solid red"}:null===i?{borderBottom:"1px solid rgb(50, 15, 107)"}:{borderBottom:"1px solid green"},onBlur:function(t){return e.handleBlur(t)},value:g,onChange:function(t){return e.handleChange(t)},type:"password",className:"input"}),Object(O.jsx)("label",{children:"Instagram username:"}),Object(O.jsx)("input",{onBlur:function(t){return e.handleBlur(t)},style:l?{borderBottom:"1px solid red"}:null===l?{borderBottom:"1px solid rgb(50, 15, 107)"}:{borderBottom:"1px solid green"},id:"instaUser",value:s,onChange:function(t){return e.handleChange(t)}}),Object(O.jsx)("label",{children:"Instagram password:"}),Object(O.jsx)("input",{onBlur:function(t){return e.handleBlur(t)},style:d?{borderBottom:"1px solid red"}:null===d?{borderBottom:"1px solid rgb(50, 15, 107)"}:{borderBottom:"1px solid green"},id:"instaPass",value:r,onChange:function(t){return e.handleChange(t)}}),Object(O.jsxs)("div",{className:"btnContain",children:[Object(O.jsxs)("div",{className:"btnContainCol",children:[Object(O.jsxs)("button",{onClick:this.handleSignUp,className:"btn login",children:[Object(O.jsxs)("div",{id:j?"hide":null,className:"lds-defaultTwo left",children:[Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{})]}),Object(O.jsx)("span",{id:j?null:"hide",className:"loginTxt",children:"SIGNUP"})]}),Object(O.jsx)("div",{className:"loginAlert",children:m})]}),Object(O.jsx)("button",{className:"btn signup",children:Object(O.jsx)("span",{className:"signTxt",onClick:this.signUp,children:" SIGNIN "})})]})]})]})})}}]),n}(a.a.Component),f=Object(m.b)((function(e){return{}}))(x),v=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={impressions:new Array,reach:new Array},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this,t={access_token:this.props.access[0].split("?")[1]},n=document.cookie.match(new RegExp("(^| )token=([^;]+)"))[0].split("=")[1];fetch("https://multer-test123.herokuapp.com/info",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n)},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){e.setState({impressions:t.TOKEN.data[0].values,reach:t.TOKEN.data[1].values}),e.props.setName(t.NAME),setTimeout((function(){e.forceUpdate()}),500)})).catch((function(e){return console.log(e)})),fetch("https://multer-test123.herokuapp.com/recentPhotos",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n)},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){console.log("INFO PHOTOS",t),e.props.setPhotos(t.OBJ),e.props.setAvatar(t.OBJ[0].url)}))}},{key:"render",value:function(){var e=this.state,t=e.impressions,n=e.reach;return Object(O.jsxs)(a.a.Fragment,{children:[Object(O.jsxs)("div",{className:"insights",children:[Object(O.jsx)("span",{style:{fontWeight:500,fontSize:"20px"},children:"Impressions in the last week:"}),t.length>0&&Object(O.jsxs)("div",{className:"flexMain",children:[t[0].value," views",Object(O.jsxs)("span",{className:"week",children:["week ending ",t[0].end_time]}),Object(O.jsxs)("span",{className:"iBtn",children:[Object(O.jsx)("span",{className:"left"}),Object(O.jsx)("span",{className:"right"})]})]})]}),Object(O.jsxs)("div",{className:"insights",children:[Object(O.jsx)("span",{style:{fontWeight:500,fontSize:"20px"},children:"Reach in the last week:"}),n.length>0&&Object(O.jsxs)("div",{className:"flexMain",children:[n[0].value," views",Object(O.jsxs)("span",{className:"week",children:["week ending ",n[0].end_time]}),Object(O.jsxs)("span",{className:"iBtn",children:[Object(O.jsx)("span",{className:"left"}),Object(O.jsx)("span",{className:"right"})]})]})]})]})}}]),n}(a.a.Component),y=Object(m.b)((function(e){return{}}))(v),w=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props,t=e.conditions,n=e.overlay,s=e.scale,r=e.color,c=e.top,i=e.left;return n?Object(O.jsx)(a.a.Fragment,{children:!0===t&&Object(O.jsx)("div",{className:"dashboardBlurLoader",children:Object(O.jsx)("div",{className:"dashboardLoader",children:Object(O.jsxs)("div",{style:{transform:"scale(".concat(s,")"),marginLeft:i,marginTop:c},className:"lds-defaultThree ".concat(r),children:[Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{})]})})})}):Object(O.jsx)(a.a.Fragment,{children:!0===t&&Object(O.jsxs)("div",{style:{transform:"scale(".concat(s,")"),marginLeft:i,marginTop:c},className:"lds-defaultThree ".concat(r),children:[Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{})]})})}}]),n}(a.a.Component),N=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).handleLogout=function(){document.cookie.match(new RegExp("(^| )token=([^;]+)"))[0].split("=")[1];var t=new Date,n=t.getTime();n-=1,t.setTime(n),document.cookie="token=null;expires="+t.toUTCString()+";path=/",document.cookie="access=null;expires="+t.toUTCString()+";path=/",document.cookie="userId=null;expires="+t.toUTCString()+";path=/",e.props.logout(!0)},e}return Object(o.a)(n,[{key:"render",value:function(){return Object(O.jsxs)("div",{className:"btnHolder",children:[Object(O.jsx)(u.b,{style:{textDecoration:"none"},to:"/upload",children:Object(O.jsx)("div",{style:{height:"auto"},className:"btnDash purpleGradient",children:"Schedule an upload"})}),Object(O.jsx)(u.b,{style:{textDecoration:"none"},to:"/scheduled",children:Object(O.jsx)("div",{style:{height:"auto"},className:"btnDash purpleGradient",children:"View your scheduled posts"})}),Object(O.jsx)("div",{style:{height:"auto"},onClick:this.handleLogout,className:"btnDash purpleGradient",children:"Logout of the associated instagram account"})]})}}]),n}(a.a.Component),k=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(O.jsx)(a.a.Fragment,{children:Object(O.jsxs)("div",{className:"flexError",children:[Object(O.jsx)("h1",{children:"You do not appear to be signed in, please sign in."}),Object(O.jsx)("a",{href:"https://lbaker15.github.io/ReactPhoto/",children:"Sign in here"})]})})}}]),n}(a.a.Component),S=n(13),C=n(14),T=function(e){var t=Object(h.g)();return e.setAccess(t.search),Object(O.jsx)("div",{children:" "})},B=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={name:"",avatar:"",hovered:!1,recentPhotos:new Array,completed:!1,loggedOut:!1},e.setName=function(t){e.setState({name:t})},e.setAvatar=function(t){e.setState({avatar:t})},e.setPhotos=function(t){e.setState({recentPhotos:t}),setTimeout((function(){e.forceUpdate()}),1e3)},e.setAccess=function(t){if(!document.cookie.match(new RegExp("(^| )access=([^;]+)"))){var n=new Date,s=n.getTime();s+=72e5,n.setTime(s),document.cookie="access=".concat(t,";expires=").concat(n.toUTCString(),";path=/;"),setTimeout((function(){e.forceUpdate()}),500)}},e.logout=function(){e.setState({loggedOut:!0})},e}return Object(o.a)(n,[{key:"render",value:function(){var e=document.cookie.match(new RegExp("(^| )token=([^;]+)")),t=document.cookie.match(new RegExp("(^| )userId=([^;]+)")),n=document.cookie.match(new RegExp("(^| )access=([^;]+)")),s=this.state,r=s.name,c=s.avatar,i=(s.completed,s.recentPhotos),o=s.loggedOut;return console.log(i),e&&t?Object(O.jsxs)("div",{className:"dashFlex",children:[o?Object(O.jsx)(h.a,{to:"/"}):null,Object(O.jsx)(w,{top:"-125px",left:"-25px",color:"purpleD",scale:1.5,overlay:!0,conditions:0===i.length||0===r.length||0===c.length}),Object(O.jsx)(T,{setAccess:this.setAccess}),n&&Object(O.jsxs)(a.a.Fragment,{children:[Object(O.jsx)("div",{class:"leftPanel",children:i.length>0&&i.map((function(e,t){if(t<4)return Object(O.jsxs)("div",{className:"widget widget".concat(e.number),children:[Object(O.jsx)("div",{className:"widgImg",style:{backgroundImage:"url(".concat(e.url,")")}}),Object(O.jsxs)("div",{style:{color:"rgb(50, 15, 107)",marginTop:"6px",textAlign:"center",fontFamily:"poppins"},className:"likes",children:[Object(O.jsx)(S.a,{icon:C.e}),Object(O.jsxs)("span",{style:{paddingLeft:"5px"},children:[e.likes," "]})]})]},t)}))}),Object(O.jsxs)("div",{className:"mainSection",children:[Object(O.jsxs)("div",{className:"head",children:[Object(O.jsx)("div",{class:"headAvatar",style:{backgroundImage:"url(".concat(c,")")},children:" "}),Object(O.jsxs)("span",{style:{marginLeft:"10px"},children:["Welcome ",r," "]})]}),Object(O.jsx)(y,{access:n,setPhotos:this.setPhotos,setName:this.setName,setAvatar:this.setAvatar})]}),Object(O.jsx)(N,{logout:this.logout})]})]}):Object(O.jsx)(k,{})}}]),n}(a.a.Component),U=Object(m.b)((function(e){return{}}))(B);n(61),n(31);var P=Object(m.b)((function(e){return{}}))((function(){return Object(O.jsxs)(a.a.Fragment,{children:[Object(O.jsxs)("li",{"data-tag":"1",children:[Object(O.jsx)(S.a,{icon:C.c})," ",Object(O.jsx)("a",{href:"https://lbaker15.github.io/ReactPhoto/#/dashboard",children:"Dashboard"})," "]}),Object(O.jsxs)("li",{"data-tag":"2",children:[Object(O.jsx)(S.a,{icon:C.d})," ",Object(O.jsx)("a",{href:"https://lbaker15.github.io/ReactPhoto/#/scheduled",children:"View Schedule"})," "]}),Object(O.jsxs)("li",{"data-tag":"3",children:[Object(O.jsx)(S.a,{icon:C.a})," ",Object(O.jsx)("a",{href:"https://lbaker15.github.io/ReactPhoto/#/upload",children:"Upload"})," "]})]})})),A="DRAWER";function I(e){return{type:A,value:e}}var D=n(36),R=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={drawerOpen:!1},e.openDrawer=function(){e.props.dispatch(I({val:!0}))},e.closeDrawer=function(t){var n=t.target.attributes.getNamedItem("data-tag");t.target!==e.list.current&&t.target!==e.listUl.current&&null===n&&e.props.dispatch(I({val:!1}))},e.list=a.a.createRef(),e.listUl=a.a.createRef(),e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=null!==this.props.parent?this.props.parent:null;setTimeout((function(){c.a.findDOMNode(t.current);t.current.addEventListener("click",(function(t){return e.closeDrawer(t)}))}),2e3)}},{key:"render",value:function(){var e=this.state.drawerOpen,t=this.props.sidebar;return Object(O.jsxs)(a.a.Fragment,{children:[!t&&Object(O.jsx)("div",{style:{marginLeft:"25px",fontSize:"35px"},className:"burgerIcon",onClick:this.openDrawer,children:Object(O.jsx)(S.a,{icon:C.f})}),t&&Object(O.jsx)(a.a.Fragment,{children:Object(O.jsxs)(D.Animate,{play:e,start:{translateX:"-250px"},end:{translateX:"0px"},children:[Object(O.jsx)("div",{className:"blur"}),Object(O.jsxs)("div",{onClick:this.openDrawer,className:"list",ref:this.list,children:[Object(O.jsx)("ul",{ref:this.listUl,children:Object(O.jsx)(P,{parent:this.listUl})}),Object(O.jsx)("button",{className:"logout",children:"Logout"})]})]})})]})}}]),n}(a.a.Component),L=Object(m.b)((function(e){return{sidebar:e.sidebar}}))(R),M=n(37),E=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={fileUpload:!1},e.handleOpen=function(){e.setState((function(e){return{fileUpload:!e.fileUpload}}))},e.handleDrop=function(t,n){console.log("image/jpeg"===t[0].type),"image/jpeg"===t[0].type&&e.props.setImg(t[0])},e.fileInputRef=a.a.createRef(),e}return Object(o.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=(t.hovered,t.preview),s=t.file,r=this.state.fileUpload;return console.log(String(s.name).length>12),Object(O.jsxs)(a.a.Fragment,{children:[!r&&Object(O.jsx)(a.a.Fragment,{children:Object(O.jsx)("button",{onClick:this.handleOpen,className:"fileBox",children:Object(O.jsxs)("span",{style:{display:"flex"},children:["File upload",s?Object(O.jsx)(S.a,{style:{marginLeft:"5px",color:"white",marginRight:"5px"},icon:C.b}):Object(O.jsx)(S.a,{style:{marginLeft:"5px",color:"white",marginRight:"5px"},icon:C.g})]})})}),r&&Object(O.jsx)(a.a.Fragment,{children:Object(O.jsxs)("div",{className:"overlayDrag",children:[Object(O.jsx)("button",{onClick:this.handleOpen,className:"closeD",children:"Close"}),Object(O.jsxs)("div",{className:"leftD",children:[Object(O.jsxs)("div",{className:"dropzone",children:[Object(O.jsx)("h1",{style:{fontWeight:300},children:"Drag Files Here"}),Object(O.jsx)(S.a,{style:{position:"absolute",marginLeft:"140px",color:"rgb(123, 66, 255, 0.6)",fontSize:"50px",marginTop:"190px"},icon:C.c}),Object(O.jsx)(M.FileDrop,{onTargetClick:function(){return e.fileInputRef.current.click()},onDrop:function(t,n){return e.handleDrop(t,n)}})]}),Object(O.jsx)("input",{type:"file",id:"file",style:{display:"none"},ref:this.fileInputRef,onChange:this.props.handleChangeImg})]}),Object(O.jsxs)("div",{className:"rightD",children:[Object(O.jsx)("h1",{children:"Uploaded"}),s&&Object(O.jsxs)("div",{className:"row",children:[Object(O.jsx)("div",{className:"left",children:Object(O.jsx)("img",{src:n})}),Object(O.jsxs)("div",{className:"rF",children:[Object(O.jsxs)("div",{className:"right",children:[Object(O.jsx)("span",{children:String(s.name).length<12?s.name:String(s.name).substring(0,12)+"...."}),Object(O.jsxs)("span",{children:[s.size,"mb"]}),Object(O.jsx)("span",{onClick:this.props.clearImg,children:"X"})]}),Object(O.jsx)("div",{className:"line"})]})]})]})]})})]})}}]),n}(a.a.Component),F=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={file:"",time:"",date:"",alertMsg:"",message:"",hovered:!1},e.handleChange=function(t){e.setState(Object(g.a)({},t.target.id,t.target.value))},e.handleChangeImg=function(t){var n=t.target.files;n.length&&e.setState({preview:URL.createObjectURL(n[0]),file:n[0]})},e.setImg=function(t){console.log(t),e.setState({preview:URL.createObjectURL(t),file:t})},e.clearImg=function(){e.setState({preview:"",file:""})},e.handleUpload=function(){var t=e.state,n=t.file,s=t.time,a=t.date,r=(t.preview,t.message),c=(new Date).getTime();if(console.log(n,s,a),""!==n&&""!==s&&""!==a&&""!==r){var i=document.cookie.match(new RegExp("(^| )userId=([^;]+)"))[0].split("=")[1],o=String(i+"_"+n.name),l=new FormData;l.append("image",n,o);var d=String(a),u=String(s),h=d.split("-"),j=Number(h[0]),b=Number(h[1])-1,p=Number(h[2]),g=u.split(":"),m=Number(g[0]),O=Number(g[1]),x=new Date(Date.UTC(j,b,p,m,O,0,0)).getTime();if(c>x)e.setState({alertMsg:"Scheduled date must be in the future."});else{l.append("time",x),l.append("userId",i),l.append("message",r);var f=document.cookie.match(new RegExp("(^| )token=([^;]+)"))[0].split("=")[1];setTimeout((function(){fetch("https://multer-test123.herokuapp.com/upload",{method:"POST",body:l,headers:{Authorization:"Bearer ".concat(f)}}).then((function(e){return e.json()})).then((function(t){var n=t.Error;n?e.setState({alertMsg:n}):e.setState({alertMsg:"Image successfully uploaded!"}),console.log(t)}))}),2e3)}}else e.setState({alertMsg:"Please ensure all fields are filled in correctly."})},e.refTwo=a.a.createRef(),e}return Object(o.a)(n,[{key:"render",value:function(){var e=document.cookie.match(new RegExp("(^| )token=([^;]+)")),t=document.cookie.match(new RegExp("(^| )userId=([^;]+)"));document.cookie.match(new RegExp("(^| )access=([^;]+)"));if(e&&t){var n=this.state,s=n.file,a=n.time,r=n.date,c=n.preview,i=n.message,o=n.alertMsg,l=n.hovered;return Object(O.jsxs)("div",{className:"entireWidth",ref:this.refTwo,children:[Object(O.jsxs)("div",{className:"formHeaders",children:[Object(O.jsx)("h1",{children:"Schedule An Upload"}),Object(O.jsx)("h2",{children:"Some information about how it works here. Lorem ipsum is the standard language of the typing industry."})]}),Object(O.jsxs)("div",{className:"formFlex",children:[Object(O.jsxs)("div",{className:"inputForm",style:o&&c?{height:"550px"}:{height:"500px"},children:[Object(O.jsx)("div",{style:o?{display:"block"}:{display:"none"},className:"alert",children:o}),Object(O.jsx)("label",{for:"date",children:"Date:"}),Object(O.jsx)("input",{type:"date",id:"date",value:r,onChange:this.handleChange}),Object(O.jsx)("label",{for:"time",children:"Time:"}),Object(O.jsx)("input",{type:"time",id:"time",value:a,onChange:this.handleChange}),Object(O.jsx)("label",{for:"message",children:"message:"}),Object(O.jsx)("input",{type:"text",id:"message",value:i,onChange:this.handleChange}),Object(O.jsx)(E,{setImg:this.setImg,file:s,preview:c,clearImg:this.clearImg,hovered:l,handleChangeImg:this.handleChangeImg}),Object(O.jsx)("button",{className:"btnSubmit",onClick:this.handleUpload,children:"Upload"})]}),Object(O.jsx)(L,{parent:this.refTwo})]})]})}return Object(O.jsx)(k,{})}}]),n}(a.a.Component),_=Object(m.b)((function(e){return{}}))(F),z=n(30),J=(n(70),function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={pastUrls:new Array,futureUrls:new Array,pastShowing:!1,loading:!0,btnDisabled:!1,smallLoader:!1},e.refOne=a.a.createRef(),e.toggle=function(){e.setState((function(e){return{btnDisabled:!0,smallLoader:!0}})),setTimeout((function(){e.setState((function(e){return{pastShowing:!e.pastShowing}}))}),500),setTimeout((function(){e.setState((function(e){return{btnDisabled:!1,smallLoader:!1}}))}),1e3)},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=document.cookie.match(new RegExp("(^| )token=([^;]+)"));if(t){var n=t[0].split("=")[1],s=document.cookie.match(new RegExp("(^| )userId=([^;]+)"));console.log(s);var a={userId:s[0].split("=")[1]};setTimeout((function(){fetch("https://multer-test123.herokuapp.com/getScheduled",{headers:{Authorization:"Bearer ".concat(n),"Content-Type":"application/json"},body:JSON.stringify(a),method:"POST"}).then((function(e){return e.json()})).then(function(){var t=Object(p.a)(b.a.mark((function t(n){var s,a,r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=n.Success,a=new Array,r=new Array,t.next=5,s.map((function(e){var t=e.data,n=e.time,s=(new Date).getTime(),c={name:t,time:n};return fetch(e.location).then((function(e){return e.blob()})).then((function(e){var t=new FileReader;t.readAsDataURL(e),t.onloadend=function(){var e=t.result,i=Object(z.a)(Object(z.a)({},c),{},{img:e});s>n?a.push(i):r.push(i)}}))}));case 5:setTimeout((function(){e.setState({futureUrls:r}),e.setState({pastUrls:a}),e.setState({loading:!1}),e.forceUpdate()}),1e3);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),500)}}},{key:"timeConverter",value:function(e){var t=new Date(Number(e)),n=t.getFullYear(),s=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],a=t.getDate(),r=t.getHours(),c=t.getMinutes();console.log("HOUR, MINS:",r,Number(c)<10);var i=a+" "+s+" "+n,o=r+":"+(Number(c)<10?"0"+String(c):c);return Object(O.jsxs)("div",{className:"timings",children:[Object(O.jsxs)("span",{children:[Object(O.jsx)("span",{className:"bold",children:"Date:"})," ",Object(O.jsx)("br",{})," ",i," "]}),Object(O.jsxs)("span",{children:[Object(O.jsx)("span",{className:"bold",children:"Time:"})," ",Object(O.jsx)("br",{})," ",o," "]})]})}},{key:"render",value:function(){var e=this,t=document.cookie.match(new RegExp("(^| )token=([^;]+)")),n=document.cookie.match(new RegExp("(^| )userId=([^;]+)"));document.cookie.match(new RegExp("(^| )access=([^;]+)"));if(t&&n){var s=this.state,r=s.pastUrls,c=s.smallLoader,i=s.futureUrls,o=s.btnDisabled,l=s.pastShowing,d=s.loading;return Object(O.jsx)(a.a.Fragment,{children:Object(O.jsx)("div",{class:"widthTotal",ref:this.refOne,children:Object(O.jsxs)("div",{className:"scheduled",children:[Object(O.jsx)("h1",{children:"Scheduled posts"}),Object(O.jsx)(w,{top:"50px",left:"-150px",color:"fontD",scale:2,conditions:!0===d,overlay:!1}),!d&&Object(O.jsx)("div",{className:"btns",children:c?Object(O.jsx)("div",{className:"loadingBtnText",children:"Loading..."}):Object(O.jsx)("button",{disbaled:!!o,onClick:this.toggle,children:l?"View Scheduled Posts":"View Past Posts"})}),Object(O.jsxs)("div",{className:"flex",children:[!0===l&&!1===d&&0!==r.length&&r.map((function(t,n){return n===r.length-1&&console.log("PAST URL MAP here"),Object(O.jsxs)("div",{className:"item",children:[Object(O.jsx)("div",{style:{backgroundImage:"url("+t.img+")"},class:"img"}),e.timeConverter(t.time)]},n)})),!0===l&&!1===d&&0===r.length&&Object(O.jsx)("div",{className:"noDisplay",children:"There are no past posts to display."}),!1===l&&!1===d&&0===i.length&&Object(O.jsx)("div",{className:"noDisplay",children:"There are no scheduled posts to display."}),!1===l&&!1===d&&0!==i.length&&i.map((function(t,n){return Object(O.jsxs)("div",{id:n%3===0?n%2===0?"purple":"yellow":"blue",className:"item",children:[Object(O.jsx)("img",{style:{width:180,height:180},src:t.img}),e.timeConverter(t.time)]},n)}))]}),Object(O.jsx)(L,{parent:this.refOne})]})})})}return Object(O.jsx)(k,{})}}]),n}(a.a.Component)),G=Object(m.b)((function(e){return{}}))(J),W=(a.a.Component,function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.state.name;return Object(O.jsx)(a.a.Fragment,{children:Object(O.jsxs)("div",{class:"btnPage",children:[Object(O.jsxs)("span",{className:"btnPageName",children:["Welcome ",e]}),Object(O.jsx)("span",{className:"btnPageInfo",children:"Please authorize your login with facebook by clicking the button below.  Enter information here about privacy policy, needs to be longer. "}),Object(O.jsx)("a",{className:"btnPageLink",href:"https://multer-test123.herokuapp.com/fbAuth",children:"Continue With Facebook"})]})})}}]),n}(a.a.Component)),H=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={loggedIn:!1,accessToken:"",loggedOut:!1,loading:!1,cookie:null},e.redirectPage=function(t){e.setState({loggedIn:t})},e.redirectPageLogout=function(t){e.setState({loggedOut:t})},e.setAccess=function(t){e.setState({accessToken:t})},e.forceRender=function(){var t=document.cookie.match(new RegExp("(^| )token=([^;]+)"));e.setState({cookie:t}),setTimeout((function(){e.forceUpdate()}),500)},e}return Object(o.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=(t.loggedIn,t.loggedOut),s=t.accessToken,r=this.state;r.cookie;return r.loading?Object(O.jsx)("div",{children:"Loading"}):Object(O.jsxs)(u.a,{basename:"/",children:[Object(O.jsx)("div",{className:"linearGrad"}),Object(O.jsxs)(h.d,{children:[Object(O.jsx)(h.b,{exact:!0,path:"/",children:Object(O.jsx)("div",{className:"form",children:Object(O.jsx)(f,{forceRender:this.forceRender})})}),Object(O.jsxs)(a.a.Fragment,{children:[Object(O.jsx)(h.b,{component:function(){return Object(O.jsx)(U,{loggedOut:n,redirectPageLogout:e.redirectPageLogout,redirectPage:e.redirectPage,accessToken:s})},path:"/dashboard"}),Object(O.jsx)(h.b,{path:"/upload",component:_}),Object(O.jsx)(h.b,{path:"/scheduled",component:G}),Object(O.jsx)(h.b,{path:"/btnPage",component:W})]})]})]})}}]),n}(a.a.Component),V=Object(m.b)((function(e){return{}}))(H),X=n(18),K=Object(X.c)({sidebar:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case A:return console.log("reducer",e,t.value.val),t.value.val;default:return e}}}),Y=n(38),q=Object(X.a)(Y.a),Q=Object(X.d)(K,q);c.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(m.a,{store:Q,children:Object(O.jsx)(V,{})})}),document.getElementById("root"))}},[[71,1,2]]]);
//# sourceMappingURL=main.88e2bf1d.chunk.js.map