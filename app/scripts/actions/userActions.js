import Reflux from 'reflux';
import {request} from '../constants/constant';

let UserActions = Reflux.createActions([
    'loadInfo',
    'loadAddressInfo',
    'updateInfo',
    'loadInfoSuccess',
    'loadAddressInfoSuccess',
    'updateInfoSuccess',
    'loadError'
]);

UserActions.loadInfo.preEmit = function (data) {
    request('/fnwx/console/').then(function(json) {
            UserActions.loadInfoSuccess(json);
        }).catch(function(ex) {
            UserActions.loadError(ex);
        });
};

UserActions.loadAddressInfo.preEmit = function (data) {
    request('/fnwx/useraddr/').then(function(json) {
            UserActions.loadAddressInfoSuccess(json);
        }).catch(function(ex) {ww
            UserActions.loadError(ex);
        });
};

UserActions.updateInfo.preEmit = function (data) {
    console.log(data);
    let shop_id = window.location.href.split('shop_id=')[1];
    let method = 'put'
    if (shop_id) {
        method = 'post'
    }

    request('/fnwx/useraddr/', method, data).then(function(json) {
            UserActions.updateInfoSuccess(json);
        }).catch(function(ex) {
            UserActions.loadError(ex);
        });
};

export default UserActions;