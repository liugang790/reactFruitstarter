import Reflux from 'reflux';
import {request} from '../constants/constant';

let ShopActions = Reflux.createActions([
    'updateShopInfo',
    'shopincome',
    'updateInfoSuccess',
    'loadIncomeSuccess',
    'fruitslist',
    'fruitslistSuccess'
]);

ShopActions.updateShopInfo.preEmit = function (data) {
    console.log(data);
    request('/fnswx/updateshop/', 'put', data).then(function(json) {
            ShopActions.updateInfoSuccess(json);
        }).catch(function(ex) {
            ShopActions.loadError(ex);
        });
};

ShopActions.shopincome.preEmit = function (data) {
    request('/fnswx/shopincome/').then(function(json) {
            ShopActions.loadIncomeSuccess(json);
        }).catch(function(ex) {
            ShopActions.loadError(ex);
        });
};

ShopActions.fruitslist.preEmit = function (data) {
    request('/fnswx/fruitslist/').then(function(json) {
            ShopActions.fruitslistSuccess(json);
        }).catch(function(ex) {
            ShopActions.loadError(ex);
        });
};


export default ShopActions;