import Reflux from 'reflux';
import {request, isDev} from '../constants/constant';

let WechatStore = Reflux.createStore({
	init() {
    },

    initConfig(apilist, callback) {
        request('/fnwx/jsconf/', 'post', {url: window.location.href}).then(function(config) {
            wx.config({
                debug: false,
                appId: config.appId,
                timestamp: config.timeStamp,
                nonceStr: config.nonceStr,
                signature: config.signature,
                jsApiList: apilist
            })
            callback(config);
        }).catch(function(ex) {
            alert(ex);
            console.log(ex);
        });
    },

    share(title, link, imgUrl){
        this.initConfig(['onMenuShareTimeline', 'onMenuShareAppMessage'], (config)=>{
            wx.onMenuShareTimeline({
                title: '必应',
                link: 'https://cn.bing.com',
                imgUrl: '',
                success: function () { 
                },
                cancel: function () { 
                }
            });
        });
    },

    pay(order_id, success, fail){
        this.initConfig(['chooseWXPay'], (config)=>{
            request('/fnwx/jspara/', 'post', {order_id: order_id}).then(function(data) {
                wx.chooseWXPay({
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign,
                    success: success,
                    cancel: fail
                });
            }).catch(function(ex) {
                fail(ex);
            });
        });
    },

    setTitle(title){
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            var body = document.getElementsByTagName('body')[0];
            document.title = title;
            var iframe = document.createElement("iframe");
            iframe.setAttribute("src", "//o6rl71xns.bkt.clouddn.com/loading.png");
            iframe.addEventListener('load', function() {
            setTimeout(function() {
                iframe.removeEventListener('load', null, true);
                    document.body.removeChild(iframe);
                }, 0);
            });
            document.body.appendChild(iframe);
        }else {
            document.title = title
        }
    }
});

export default WechatStore;
