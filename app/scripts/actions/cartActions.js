import Reflux from 'reflux';

var CartActions = Reflux.createActions([
    'addToCart',
    'removeToCart',
    'clearAll'
]);

export default CartActions;