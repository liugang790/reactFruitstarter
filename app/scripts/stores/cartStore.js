import Reflux from 'reflux';
import CartActions from '../actions/cartActions';
import {cartKey} from '../constants/constant';

let CartStore = Reflux.createStore({
	init() {
        let shop_id = window.location.href.split('shop_id=')[1];
        let cartItemsString = null;
        if (shop_id == undefined) {
            shop_id = localStorage.getItem(`last_shop_id`);
        }
        if (shop_id) {
            cartItemsString = localStorage.getItem(`${cartKey}_${shop_id}`);
        }
		if (cartItemsString === null || cartItemsString === undefined) {
			this.cartItems = [];
		}else{
			this.cartItems = JSON.parse(cartItemsString);
		}
        this.listenTo(CartActions.addToCart, this.addToCart);
        this.listenTo(CartActions.removeToCart, this.removeToCart);
        this.listenTo(CartActions.clearAll, this.clearAll);
    },

    addToCart(cartItem, shop_id) {
    	let _isRepeat = false;
    	this.cartItems.forEach((_cartItem, index, items) => {
    		if (_cartItem.fid === cartItem.fid) {
    			_isRepeat = true;
    			items[index] = cartItem;
                return;
    		}
    	});
    	if (_isRepeat) {
    		this.updateCartItems(this.cartItems, shop_id);
    	}else{
    		this.updateCartItems([cartItem].concat(this.cartItems), shop_id);
    	}
    },

    removeToCart(cartItem, shop_id) {
    	this.updateCartItems(this.cartItems.filter(_cartItem => _cartItem.fid !== cartItem.fid), shop_id);
    },

    clearAll(shop_id) {
    	this.updateCartItems([], shop_id);
    },

    cartCount(shop_id) {
        let cartItemsString = null;
        if (shop_id) {
            cartItemsString = localStorage.getItem(`${cartKey}_${shop_id}`);
        }
        if (cartItemsString === null || cartItemsString === undefined) {
            this.cartItems = [];
        }else{
            this.cartItems = JSON.parse(cartItemsString);
        }
        return this.cartItems.length;
    },

    updateCartItems(cartItems, shop_id) {
        console.log(cartItems);
    	localStorage.setItem(`${cartKey}_${shop_id}`, JSON.stringify(cartItems));
        this.cartItems = cartItems;
    	this.trigger(cartItems)
    }
});

export default CartStore;
