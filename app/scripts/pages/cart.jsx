import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import CartItem from '../components/cartItem.jsx';
import NumberInput from '../components/numberInput.jsx';
import CartStore from '../stores/cartStore';
import OrderStore from '../stores/orderStore';
import WechatStore from '../stores/wechatStore';

class Cart extends React.Component {
	constructor(props) {
        super(props);
        this.props.shop_id = this.props.shop_id ? this.props.shop_id : window.location.href.split('shop_id=')[1];
        if (this.props.shop_id == undefined) {
            this.props.shop_id = localStorage.getItem(`last_shop_id`);
        }
        console.log(this.props.shop_id);
        let cartItems = CartStore.cartItems;
        console.log(cartItems);
        cartItems.forEach((fruit) => {
                fruit.checked = false;
        });
        this.state = {
        	fruits: cartItems,
            orderCount: OrderStore.orderCount(this.props.shop_id),
            loading: false,
            checked: false,
            total_price: 0
        };
    }

    removeToCart(fruit){
    	CartStore.removeToCart(fruit, this.props.shop_id);
        OrderStore.removeToOrder(fruit, this.props.shop_id);
        this.state.fruits = CartStore.cartItems;
        this.state.orderCount = OrderStore.orderCount(this.props.shop_id);
    	this.setState(this.state);
    }

    checkAll(evt) {
        this.state.fruits.forEach((fruit) => {
            fruit.checked = evt.target.checked;
        });
        this.state.checked = evt.target.checked;
        if (evt.target.checked) {
            OrderStore.addItemsToOrder(this.state.fruits, this.props.shop_id);
        }else{
            OrderStore.clearAll(this.props.shop_id);
        }
        this.setState(this.state);
    }
    
    componentDidMount() {
        this.unsubscribe = OrderStore.listen(this.onChangePrice.bind(this));
        OrderStore.clearAll(this.props.shop_id);
        WechatStore.setTitle("购物车");

        // 默认全选
        this.state.fruits.forEach((fruit) => {
            fruit.checked = true;
        });
        this.state.checked = true;
        OrderStore.addItemsToOrder(this.state.fruits, this.props.shop_id);
        this.setState(this.state);
    }
    componentWillUnmount() {
        this.unsubscribe(); // 注意：在组件销毁时，一定要解除监听
    }
    onChangePrice(price) {
        let _checked = true;
        this.state.fruits.forEach((fruit) => {
            if (fruit.checked === false) {
                _checked = false;
                return;
            }
        });
        this.state.checked = _checked;
        this.state.total_price = price;
        this.state.orderCount = OrderStore.orderCount(this.props.shop_id);
        this.setState(this.state); // re-render
    }

    driectPay(fruit) {
        OrderStore.clearAll(this.props.shop_id);
        OrderStore.driectPay(fruit, this.props.shop_id);
    }

    render() {
    	let cardListView = this.state.fruits.map((fruit) => {
            return <div className="card cart">
                        <div className="card-content">
                            <div>
                                <CartItem
                                    fruit={fruit}
                                    shop_id = {this.props.shop_id}
                                >
                                </CartItem>
                                 <div className="cart-bottom">
                                    <span className="cart_price"><a>￥</a>{fruit.price}</span>
                                    <span className="cart_count">购买数量</span>
                                    <NumberInput 
                                        fruit={fruit}>
                                    </NumberInput>
                                    <span className="buttons-row-span">
                                        <a className="delete" onClick={this.removeToCart.bind(this, fruit)}>删除</a>
                                        <a className="gojs"  onClick={this.driectPay.bind(this, fruit)}>去结算</a>
                                    </span>
                               </div>
                            </div>
                        </div>
                    </div>
        });
    	return (
    		<div className="page">
                <div className="page-content no-padding">
    				{cardListView}
    			</div>
                <div className="toolbar tabbar">
                    <div className="toolbar-inner">
                        <span><input className="cart_all" type="checkbox" checked={this.state.checked} onChange={this.checkAll.bind(this)}/></span>
                        <span className="checkboxFour checkboxFour_left">
                           <input className="input_checkbox"  id="checkboxFourInput" type="checkbox" checked={this.state.checked} onChange={this.checkAll.bind(this)}/>
                           <label for="checkboxFourInput"></label>
                        </span>
                        <span className="cart_choice">全选</span>
                        <span className="cart_total">合计:</span>
                        <span className="cart_money"><a>￥</a>{this.state.total_price.toFixed(2)}</span>
                        <span className="cart_fee">(不含运费)</span>
                        <Link to="prepay" query={{shop_id: this.props.shop_id}} className="tab-link active jiesuan">
                            <i className="icon demo-icon-1">
                                <span className="bbb">结算</span>
                                <span className="badge bg-red">{this.state.orderCount}</span>
                            </i>
                        </Link>
                    </div>
                </div>
    		</div>
    	);
    }
}

export default Cart;
