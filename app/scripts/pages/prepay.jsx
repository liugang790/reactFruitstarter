import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import OrderActions from '../actions/orderActions';
import OrderStore from '../stores/orderStore';
import { redirect_to } from '../constants/constant';
import UserActions from '../actions/userActions';
import UserStore from '../stores/userStore';
import WechatStore from '../stores/wechatStore';

class Prepay extends React.Component {
	constructor(props) {
        super(props);
        this.props.shop_id = this.props.shop_id ? this.props.shop_id : window.location.href.split('shop_id=')[1];
        this.state = {
        	fruits: OrderStore.orderItems,
            total_price: OrderStore.allPrice(),
            addressInfo: {},
            loading: false,
        };
    }

    payToOrder(){
        new Framework7().showPreloader("订单创建中...");
        OrderActions.createOrder(this.state.fruits);
    }

    componentDidMount() {
        this.unsubscribeAddressInfo = UserStore.listen(this.showAdressInfo.bind(this));
        this.unsubscribe = OrderStore.listen(this.onOrderCreated.bind(this));
        WechatStore.setTitle("立即支付");
        UserActions.loadAddressInfo();
    }

    componentWillUnmount() {
        this.unsubscribeAddressInfo();
        this.unsubscribe();
    }

    showAdressInfo(data) {
        console.log(data.info[data.info.length-1]);
        this.state.addressInfo = data.info[data.info.length-1]
        this.setState(this.state);
        console.log(this.state);
    }

    onOrderCreated(order) {
        // TODO
        // {id: 6746, order_no: "201600000000", total_cost: 1}
        // 处理支付
        new Framework7().hidePreloader();
        if (order) {
            WechatStore.pay(order.id, (response)=>{
                redirect_to(`complete_pay?order_no=${order.order_no}`);
            }, (response)=>{
                alert("付款失败");
            });
        }
    }

    render() {
    	let cardListView = this.state.fruits.map((fruit) => {
            return <div className="card">
                        <div className="card-content">
                            <div className="prepay_all">
                               <div className="prepay_img">
                                    <img src={fruit.img_url}></img>
                               </div>
                               <div className="prepay_mess">
                                    <div>{fruit.name}</div>
                                    <div className="prepay_count">
                                        <span className="prepay_jg"><a className="prepay_sympol">￥</a>{fruit.price}</span>
                                        <span className="prepay_num">/{fruit.number}件</span>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
        });
        let addressUI = null;
        if (this.state.addressInfo) {
            addressUI = <div>
                            <div className="address_left">
                                <p className="address_font"><span className="prepay_sd">送至</span><span className="prepay_sd">{this.state.addressInfo.name}</span><span className="prepay_phone">{this.state.addressInfo.telephone}</span></p>
                                <p className="address_dz">{this.state.addressInfo.address}</p>
                            </div>
                            <div className="address_right">&gt;</div> 
                        </div>
        }else{
            addressUI = <div className="address_font">
                            <p className="address_dz">点击添加地址</p>
                        </div>
        }
        
    	return (
    		<div className="page">
                <div className="page-content no-padding prepay_bg">
    				<div>
                        <Link to="edit_address_info" query={{shop_id: this.props.shop_id}} className="tab-link active sd_address">
                            {addressUI}
                        </Link>
                    </div>
	    			<div>
	    				{cardListView}
	    			</div>
                    <div className="prepay_kuaidi"><span className="kuaidi">快递：￥<a className="kuaidi_fee">0.00</a></span><span className="kuaidi">总价：<a className="kuaidi_sympol">￥</a><a className="kuaidi_total">{this.state.total_price}</a></span></div>
                    <div className="pay_way">请选择支付方式</div>
	    			<div className="weixin_pay">
                        <span className="checkboxFour checkboxFour_sel">
                           <input className="input_checkbox"  id="checkboxFourInput" type="checkbox" />
                           <label for="checkboxFourInput"></label>
                        </span>
                        <span className="wxgou"><img src="http://o6rl71xns.bkt.clouddn.com/gougou.png"/></span>
	    				<span className="wp">微信支付</span><span className="tj">推荐</span>
	    			</div>
	    			<a onClick={this.payToOrder.bind(this)} className="button tab-link lj_pay">
	    				立即支付
	    			</a>
    			</div>
    		</div>
    	);
    }
}

export default Prepay;