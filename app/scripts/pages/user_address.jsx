//已完成订单
import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import UserActions from '../actions/userActions';
import UserStore from '../stores/userStore';
import UserInfo from '../components/userInfo.jsx';
import WechatStore from '../stores/wechatStore';

class UserAddress extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            user: {},
            addresses: [],
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
        console.log(state);
        this.setState(state);
    }

    removeAddress(address){
      console.log(address);
      alert('暂不能使用');
    }

    render() {
        let addressList = this.state.addresses.map((address) => {
          return  <div className="list-block list_message">
                    <ul>
                      <li className="swipeout">
                        <div className="swipeout-content item-content">
                          <div className="item-media">
                            <p className="user_user"><span className="name">{address.name}</span><span className="user_phone">{address.telephone}</span></p>
                          </div>
                           <div className="item-inner"><p>{address.address}</p></div>
                        </div>
                        <div className="swipeout-actions-right">
                          <a onClick={this.removeAddress.bind(this, address)} className="action1 bg-orange">删除</a>
                          <Link to="edit_address_info" query={{address_id: address.id}} className="action1">
                              编辑
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
        });

    	return (
    		<div className="page">
                <div className="page-content no-padding user_bg">
                    <UserInfo 
                        info={this.state}
                        buttonClass={['btn', 'btn', 'btn active']}
                    >
                    </UserInfo>
                    <div className="all">
                        <div className="user_jifen user_jifen_border"><span className="img_jf"><img src="images/jf.png"/></span><span className="jifen">积分</span><span>{this.state.user.bonus}</span></div>
                        <div className="user_jifen"><span className="img_fv"><img src="images/fv.png"/></span><span className="jifen">等级</span><span>v{this.state.user.level}</span></div>
                        <div className="user_jifen user_jifen_bg"><span className="img_address"><img src="images/address.png"/></span><span className="jifen">常用地址</span></div>
                        {addressList}
                    </div>
                </div>              
    		</div>
    	);
    }
}

export default UserAddress;