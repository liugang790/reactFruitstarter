import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import UserActions from '../actions/userActions';
import UserStore from '../stores/userStore';
import { redirect_to } from '../constants/constant';
import WechatStore from '../stores/wechatStore';

class EditAddressInfo extends React.Component {
	 constructor(props) {
        console.log(props);
        super(props);
        this.props.shop_id = window.location.href.split('shop_id=')[1];
        this.props.address_id = window.location.href.split('address_id=')[1];
    }

    saveAddress() {
        var myApp = new Framework7();
        var $$ = Dom7;
        var formData = myApp.formToJSON('#address-form');
        console.log(formData);
        formData.province = formData.block;
        formData.city = formData.block;
        formData.county = formData.block;
        formData.street = formData.block;
        formData.default = true;
        UserActions.updateInfo(formData);
    }

    componentDidMount() {
        this.unsubscribe = UserStore.listen(this.onStatusChange.bind(this));
        WechatStore.setTitle("创建收货信息");
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(state) {
      console.log(state);
      if (state.error) {
        alert("地址保存失败");
      }else{
        if (this.props.shop_id) {
          redirect_to(`prepay?shop_id=${this.props.shop_id}`);
        } else {
          redirect_to('user_address');
        }
      }
    }
    render() {  
      let inputStyle = {
           color:'#000',
        };
    	return (
    		<div className="page">
                <div className="page-content no-padding edit_address_bg">
                   <div className="address_info_bg">
                    <p className="address_mes">填写收货信息</p>
                    <form id="address-form" className="list-block">
                      <ul>
                        <li className="li_mess">
                          <div className="item-content">
                            <div className="item-inner">
                              <div className="item-title label">姓名</div>
                              <div className="item-input">
                                <input style={inputStyle} type="text" name="name" placeholder="最少两个字"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li className="li_mess">
                            <div className="item-content">
                            <div className="item-inner">
                              <div className="item-title label">电话</div>
                              <div className="item-input">
                                <input style={inputStyle} type="text" name="telephone" placeholder="不少于 7 位数"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li className="li_mess">
                            <div className="item-content">
                            <div className="item-inner">
                              <div className="item-title label">地区</div>
                              <div className="item-input">
                                <input style={inputStyle} type="text" name="block" placeholder="省份 城市 区县"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li className="li_mess">
                            <div className="item-content">
                            <div className="item-inner">
                              <div className="item-title label">地址</div>
                              <div className="item-input">
                                <input style={inputStyle} type="text" name="address" placeholder="5 - 60 个汉字,且不能全为数字"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li className="li_mess">
                            <div className="item-content">
                            <div className="item-inner">
                              <div className="item-title label">邮编</div>
                              <div className="item-input">
                                <input style={inputStyle} type="text" name="post_code" placeholder="6 位邮政编码"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                       <div className="xz_moren">
                        <span className="checkboxFour xz_moren_ss">
                           <input className="input_checkbox moren" name="default" id="checkboxFourInput" type="checkbox"/>
                           <label for="checkboxFourInput"></label>
                        </span>
                       <span className="xz_moren_span">设置成默认地址</span>
                       </div>
                    </form>
                    <div className="content-block-bb">
                      <a onClick={this.saveAddress.bind(this)} className="button form-to-json button_btn">保存地址</a>
                    </div>
               </div>
    			</div>
    		</div>
    	);
    }
}

export default EditAddressInfo;