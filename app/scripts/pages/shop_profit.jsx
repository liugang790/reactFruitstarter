import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import ShopActions from '../actions/shopActions';
import ShopStore from '../stores/shopStore';
import WechatStore from '../stores/wechatStore';

class ShopProfit extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
          total_income: 0,
          pre_income: 0,
          detail:[]
        };
    }

    componentDidMount() {
        this.unsubscribe = ShopStore.listen(this.onStatusChange.bind(this));
        WechatStore.setTitle("店铺信息");
        ShopActions.shopincome();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(state) {
      console.log(state);
      this.setState(state);
    }

    render() {
      let detailList = this.state.detail.map((order) => {
            return <div className="shop_detail_mess">
                      <div>
                          <div className="shop_detail_mess_top">
                              <span>今天「没有数据」</span><span className="zengjia zz">+{order.cost.toFixed(2)}</span>
                          </div>
                          <div className="shop_detail_mess_bottom">
                              <span>{order.time}</span>
                              <span className="zengjia"><a>订单号：</a><a>{order.order_num}</a><a>{order.product}</a></span>
                          </div>
                      </div>
                  </div>

        });
	    return(
	    	<div className="page">
	            <div className="page-content">
		            <div className="shop_profit">
                       <div className="shop_profit_top">
                         <div className="shop_profit_yuan">
                              <span className="ye">账户余额(元)</span>
                              <span className="shop_profit_money">{this.state.total_income.toFixed(2)}</span>
                          </div>
                       </div>
                       <div className="shop_sr">
                           <span className="yesterday">昨日收入：<a>{this.state.pre_income.toFixed(2)}</a></span>
                           <span className="today">累积收入:<a>{'没数据'}</a></span>
                       </div>
                       <div className="shop_detail">明细</div>
                       {detailList}
                  </div>
	            </div>
              <div className="shop_profit_btn">
                 <span className="shop_save">转出「暂不开放」</span>
                 <span className="shop_cancle">转入「暂不开放」</span>
              </div>
    		</div>
	    );
	}
}
export default ShopProfit;