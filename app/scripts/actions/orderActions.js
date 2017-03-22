import Reflux from 'reflux';
import {request} from '../constants/constant';

let OrderActions = Reflux.createActions([
    'addToOrder',
    'removeToOrder',
    'clearAll',
    'createOrder',
    'orderCreatedSuccess',
    'orderCreatedError'
]);

OrderActions.createOrder.preEmit = function (data) {
    data = {
        shop_id: 1,
        items: data
    };
    console.log(data);
    request('/fnwx/order/', 'post', data).then(function(json) {
            OrderActions.orderCreatedSuccess(json);
        }).catch(function(ex) {
            OrderActions.orderCreatedError(ex);
        });
};

export default OrderActions;