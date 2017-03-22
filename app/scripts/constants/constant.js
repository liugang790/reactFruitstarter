let isDev = true;
let cartKey = 'fn_cart';
let orderKey = 'fn_order';
let isAuth = function(response) {
	if (response.status === 401) {
		let state = encodeURIComponent(window.location.href.split('#')[1]);
		let url = null;
        if(/shop_/.test(window.location.href)){
            url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5df0e871a2ccd3be&redirect_uri=http%3A%2F%2Fclient.techmars.net%2Ffnswx%2Ffnsauth%2F&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
        }else{
            url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfc47a3719449aa0e&redirect_uri=http%3A%2F%2Fclient.techmars.net%2Ffnwx%2Ffnauth%2F&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
        }
        window.location.href = url;
	}
}

let request = function (url, method, data) {
	data = data ?  JSON.stringify(data) : '';
	if (isDev) {
		return fetch(`http://192.168.18.112:9000${url}`, {
            method: method || 'get',
            body:  data
        })
        .then(function(response) {
            return response.json();
        })
	}else {
		return fetch(`http://192.168.18.112:9000${url}`, {
            headers: {
                //auth-code
                'Content-Type': 'application/json'
            },
            method: method || 'get',
            body:  data//credentials
        })
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }else{
                isAuth(response);
            }
        })
	}
}

let redirect_to = function (url){
    window.location.href = `/#/${url}`;
}

export {cartKey, orderKey, request, redirect_to};
