module.exports = `
    var elem=document.createElement("script");elem.src="https://quantcast.mgr.consensu.org/cmp.js";elem.async=!0;elem.type="text/javascript";var scpt=document.getElementsByTagName("script")[0];scpt.parentNode.insertBefore(elem,scpt);(function(){function d(){if(!window.frames.__cmpLocator)if(document.body){var b=document.body,a=document.createElement("iframe");a.style="display:none";a.name="__cmpLocator";b.appendChild(a)}else setTimeout(d,5)}function c(b){var a="string"===typeof b.data;var c=a?-1!=b.data.indexOf("__cmpCall")?JSON.parse(b.data):{}:b.data;if(c.__cmpCall){var e=c.__cmpCall;window.__cmp(e.command,e.parameter,function(c,d){var f={__cmpReturn:{returnValue:c,success:d,callId:e.callId}};b.source.postMessage(a?JSON.stringify(f):f,"*")})}}d();window.__cmp=function(b){var a=arguments;if(a.length)if("ping"===a[0])a[2]({gdprAppliesGlobally:!1,cmpLoaded:!1},!0);else{if("__cmp"==b)return!1;"undefined"===typeof __cmp.a&&(__cmp.a=[]);__cmp.a.push([].slice.apply(a))}else return __cmp.a};window.__cmp.gdprAppliesGlobally=!1;window.__cmp.msgHandler=c;window.addEventListener?window.addEventListener("message",c,!1):window.attachEvent("onmessage",c)})();window.__cmp("init",{Language:"en","Initial Screen Reject Button Text":"I do not accept","Initial Screen Accept Button Text":"I accept","Purpose Screen Header Title Text":"Privacy settings","Purpose Screen Body Text":"You can set your consent preferences and determine how you want your data to be used based on the purposes below. You may set your preferences for us independently from those of third-party partners. Each purpose has a description so that you know how we and partners use your data.","Vendor Screen Body Text":"You can set consent preferences for each individual third-party company below. Expand each company list item to see what purposes they use data for to help make your choices. In some cases, companies may disclose that they use your data without asking for your consent, based on their legitimate interests. You can click on their privacy policies for more information and to opt out.","Vendor Screen Accept All Button Text":"Accept all","Vendor Screen Reject All Button Text":"Reject all","Initial Screen Body Text":"We and our partners use technology such as cookies on our site to personalise content and ads, provide social media features, and analyse our traffic. Click below to consent to the use of this technology across the web. You can change your mind and change your consent choices at anytime by returning to this site.","Initial Screen Body Text Option":1,"Publisher Name":"AndroidHeadlines","Publisher Logo":"https://www.androidheadlines.com/wp-content/uploads/2014/05/Android-Headlines-RGB.png","Min Days Between UI Displays":5,"No Option":!1,"Default Value for Toggles":"on"});
`