//已完成订单
import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import UserActions from '../actions/userActions';
import UserStore from '../stores/userStore';
import UserInfo from '../components/userInfo.jsx';
import WechatStore from '../stores/wechatStore';
import moment from 'moment';

class User extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            user: {},
            addresses: {},
            orders: {},
            loading: false
        };
    }

    componentDidMount() {
        this.unsubscribe = UserStore.listen(this.onStatusChange.bind(this));
        UserActions.loadInfo();
        WechatStore.setTitle("个人中心");
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(state) {
        this.setState(state);
        console.log(this.state);
    }

    render() {
      let orderList = null;
      if (this.state.orders.finished) {
        orderList = this.state.orders.finished.map((order) => {
          let foodList = null;
          if(order.detail){
            foodList = order.detail.map((food) => {
              return  <div className="info_mess">
                         <div className="info_mess_img"><img src="http://7xqlzr.dl1.z0.glb.clouddn.com/abstract01.jpg"/></div>
                         <div className="info_mess_count">
                              <span>{food.name}</span>
                              <a>数量：</a><a>{food.weight}</a>
                         </div>
                         <div className="info_mess_price">
                             ￥<span className="info_money">{food.cost.toFixed(2)}</span>
                         </div>
                      </div>
            });
          }
          return  <div className="info_order">
                    <div className="info_time">
                       <span>订单号：</span>
                       <span>{order.order_no}</span>
                       <span className="info_num">下单日期：</span>
                       <span>2016-4-2 11:34:56「缺少数据」</span>
                    </div>
                    {foodList}
                    <div className="info_mess_total">
                        <span className="wait_pay">代付款</span><span>共<a>{order.detail ? order.detail.length : 0}</a>件产品</span><span className="hj">合计：</span><span>￥<a className="hj_price">{order.total_cost.toFixed(2)}</a></span><span className="yunfei">（含运费<a>0.00</a>元）</span>
                    </div>
                </div>
          });
      }
    	return (
            <div className="page">
                <div className="page-content no-padding">
                    <UserInfo 
                        info={this.state}
                        buttonClass={['btn', 'btn', 'btn']}
                    >
                    </UserInfo>
                    <div className="aall">
                      {orderList}
                    </div>
                </div>
            </div>
        );
    }
}

export default User;