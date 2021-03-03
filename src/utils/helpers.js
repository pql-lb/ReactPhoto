

 export function checkLoginState () {
    return new Promise((res, rej) => {
       window.FB.getLoginStatus(function(response) {
           res(response)
       });
     })
   }
export function loadFbApi() {
   return new Promise((res, rej) => {
     if (!window.FB) { 
         (function(d, s, id) {
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) return;
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
         window.fbAsyncInit = function() {
             let FB_APP_ID = 1796391010517069;
             window.FB.init({
                 appId      : FB_APP_ID,
                 cookie     : true, 
                 // the session
                 xfbml      : true, 
                 version    : 'v9.0' 
             })
             window.FB.AppEvents.logPageView();
             console.log('fired')
             res()
       } 
     } else {
         res()
     }
     })
   }
export function login() {
     return new Promise((resolve2, rej) => {
       window.FB.login(function(res) {
         console.log('logged in', res.authResponse.accessToken)
         let access = res.authResponse.accessToken;
         resolve2(access)
       }, {scope: 'read_insights, manage_pages'})
     })
   }
export function statusChange(response) {
     return new Promise(async (resolve, rej) => {
       if (response.status === 'unknown'||response.status === 'not_authorized') {  
           login()
           .then(access => {
             this.setState({accessToken: access})
             localStorage.setItem('access', access)
             resolve(access)
           })
       } else {
         //Should NOT be showing btn in this condition
           this.setState({accessToken: response.authResponse.accessToken})
           localStorage.setItem('access', response.authResponse.accessToken)
           resolve(response.authResponse.accessToken)
       }            
     })
   }
export function testAPI() {
     return new Promise((res, rej) => {
       window.FB.getLoginStatus(resp => {
         console.log(resp)
           window.FB.api('/me/accounts', {access_token: resp.authResponse.accessToken}, (response) => {
               console.log('RESPONSE',response)
               if (response) {
                 res(response)
               } else {
                 rej()
               }
           })
       })
     })
   }
