import Reflux from 'reflux';
import {request} from '../constants/constant';

var NearbrandActions = Reflux.createActions([
    'loadItems',
    'loadItemsSuccess',
    'loadItemsError',
    'showItemDetail'
]);

NearbrandActions.loadItems.preEmit = function (data) {
    request('/fnwx/nearbrand/').then(function(json) {
            NearbrandActions.loadItemsSuccess(json)
        }).catch(function(ex) {
            NearbrandActions.loadItemsError(ex)
        });
};

export default NearbrandActions;