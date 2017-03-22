import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import ShopActions from '../actions/shopActions';
import ShopStore from '../stores/shopStore';
import WechatStore from '../stores/wechatStore';

class ShopInfo extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
          shop_info:{},
          loading: false
        };
    }

    componentDidMount() {
        this.unsubscribe = ShopStore.listen(this.onStatusChange.bind(this));
        WechatStore.setTitle("店铺信息");
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(state) {
        this.setState(state);
        console.log(state);
        let info = this.state.info;
        var myApp = new Framework7();
        myApp.alert('保存成功', `店名: ${info.name} \n 位置: ${info.address} \n 编号: ${info.number}`);
    }

    saveShopInfo() {
      var myApp = new Framework7();
      var $$ = Dom7;
      var formData = myApp.formToJSON('#shop-form');
      console.log(formData);
      formData.country = 'china';
      formData.province = '';
      formData.county = '';
      formData.city = '';
      formData.street = '';
      formData.block = '';
      ShopActions.updateShopInfo(formData);
    }

    canceledShopInfo(){
      alert('这个取消没什么卵用');
    }

    render() {
      let inputStyle = {
           color:'#000',
           height:'70px',
        };
	    return(
	    	<div className="page">
	            <div className="page-content">
                   <div className="shop_info">
		           <form id="shop-form" className="list-block">
                      <ul>
                        <li>
                          <div className="item-content">
                            <div className="item-inner">
                              <div className="item-title label">店名</div>
                              <div className="item-input">
                                <input style={inputStyle} type="text" name="name" placeholder="店铺名字"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li>
                            <div className="item-content">
                            <div className="item-inner">
                              <div className="item-title label">位置</div>
                              <div className="item-input">
                                <input style={inputStyle} type="text" name="address" placeholder="店铺地址"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li>
                            <div className="item-content">
                            <div className="item-inner">
                              <div className="item-title label">编号</div>
                              <div className="item-input">
                                <input style={inputStyle} type="text" name="number" placeholder="店铺编号"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </form>
                    <div className="shop_btn shop_info_btn">
                       <span className="shop_save" onClick={this.saveShopInfo.bind(this)}>保存</span>
                       <span className="shop_cancle" onClick={this.canceledShopInfo.bind(this)}>取消</span>
                    </div>
                    </div>
	            </div>
    		</div>
	    );
	}
}
export default ShopInfo;