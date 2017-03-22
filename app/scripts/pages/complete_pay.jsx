import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import OrderStore from '../stores/orderStore';
import WechatStore from '../stores/wechatStore';

class CompletePay extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	order_no: window.location.href.split('order_no=')[1] || ''
        };
    }

    componentDidMount() {
        WechatStore.setTitle("立即支付");
    }

    render() {
    	return (
    		<div className="page">
                <div className="page-content no-padding complete_pay_bg">
                    <div className="gougou"><img src="http://o6rl71xns.bkt.clouddn.com/wcg.png"/></div>
                    <div className="pay_over">支付完成</div>
                    <div className="order">{`订单号: ${this.state.order_no}`}</div>
                    <Link to="home" className="button tab-link  goon">
                        继续逛
                    </Link>
                    <Link to="user" className="button tab-link  myorder">
                        我的订单
                    </Link>
                </div>
    		</div>
    	);
    }
}

export default CompletePay;