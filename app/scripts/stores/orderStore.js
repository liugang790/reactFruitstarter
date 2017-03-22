import Reflux from 'reflux';
import OrderActions from '../actions/orderActions';
import {orderKey, redirect_to} from '../constants/constant';

let OrderStore = Reflux.createStore({
	init() {
        let shop_id = window.location.href.split('shop_id=')[1];
        let orderItemsString = null;
        if (shop_id) {
            orderItemsString = localStorage.getItem(`${orderKey}_${shop_id}`);
        }
		if (orderItemsString === null || orderItemsString === undefined) {
			this.orderItems = [];
            this.price = 0;
		}else{
			this.orderItems = JSON.parse(orderItemsString);
            this.price = 0;
		}

        this.createdOrder = {};
        this.listenTo(OrderActions.addToOrder, this.addToOrder);
        this.listenTo(OrderActions.removeToOrder, this.removeToOrder);
        this.listenTo(OrderActions.clearAll, this.clearAll);

        this.listenTo(OrderActions.orderCreatedSuccess, this.orderCreatedSuccess);
        this.listenTo(OrderActions.orderCreatedError, this.orderCreatedError);
    },

    addItemsToOrder(orderItems, shop_id){
        this.clearAll();
        this.updateOrderItems(orderItems, shop_id);
        this.totalPrice(null);
    },

    driectPay(fruit, shop_id){
        console.log(fruit);
        fruit.checked = true;
        this.addToOrder(fruit, shop_id);
        redirect_to(`prepay?shop_id=${shop_id}`);
    },

    addToOrder(orderItem, shop_id) {
    	let _isRepeat = false;
    	this.orderItems.forEach((_orderItem, index, items) => {
    		if (_orderItem.fid === orderItem.fid) {
    			_isRepeat = true;
               items[index] = orderItem;
               return;
    		}
    	});
    	if (_isRepeat) {
    		this.updateOrderItems(this.orderItems, shop_id);
    	}else{
    		this.updateOrderItems([orderItem].concat(this.orderItems), shop_id);
    	}
    },

    removeToOrder(orderItem, shop_id) {
    	this.updateOrderItems(this.orderItems.filter(_orderItem => _orderItem.fid != orderItem.fid), shop_id);
    },

    clearAll(shop_id) {
    	this.updateOrderItems([], shop_id);
    },

    orderCount(shop_id) {
        let orderItemsString = null;
        if (shop_id) {
            orderItemsString = localStorage.getItem(`${orderKey}_${shop_id}`);
        }
        if (orderItemsString === null || orderItemsString === undefined) {
            this.orderItems = [];
        }else{
            this.orderItems = JSON.parse(orderItemsString);
        }
    	return this.orderItems.length;
    },

    updateOrderItems(orderItems, shop_id) {
    	localStorage.setItem(`${orderKey}_${shop_id}`, JSON.stringify(orderItems));
    	this.orderItems = orderItems;
        this.totalPrice(null);
    },

    allPrice(){
        let price = 0;
        this.orderItems.map((_orderItem) => {
            if(_orderItem.checked) {
                price += Number(_orderItem.number) * Number(_orderItem.price)
            }
        });
        return price.toFixed(2);
    },

    totalPrice(fruit) {
        let shop_id = window.location.href.split('shop_id=')[1];
        if (fruit) {
            this.addToOrder(fruit, shop_id);
        }
        this.price = 0;
        this.orderItems.map((_orderItem) => {
            if(_orderItem.checked) {
                this.price += Number(_orderItem.number) * Number(_orderItem.price)
            }
        });
        this.trigger(this.price);
    },

    orderCreatedSuccess(json) {
        this.createdOrder = json;
        this.trigger(this.createdOrder);
    },

    orderCreatedError(error) {
        console.log(error);
    },
});

export default OrderStore;
