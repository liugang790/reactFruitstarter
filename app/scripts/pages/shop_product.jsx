import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import ShopActions from '../actions/shopActions';
import ShopStore from '../stores/shopStore';

class ShopProduct extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            fruits: [],
            loading: false
        };
    }

    componentDidMount() {
        this.unsubscribe = ShopStore.listen(this.onStatusChange.bind(this));
        ShopActions.fruitslist();
        WechatStore.setTitle("水果忍者");
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(state) {
        this.setState(state);
        console.log(this.state);
    }


    render() {
	    return(
	    	<div className="page">
	            <div className="page-content">
		            <div className="shop_product">
                       <div className="shop_product_li">
                          <span>
                              <select className="select">
                              <option value="volvo">Volvo</option>
                              <option value="saab">Saab</option>
                              <option value="opel">Opel</option>
                              <option value="audi">Audi</option>
                              </select>
                           </span>
                           <span>   
                              <select className="select">
                              <option value="volvo">Volvo</option>
                              <option value="saab">Saab</option>
                              <option value="opel">Opel</option>
                              <option value="audi">Audi</option>
                              </select>
                            </span>
                            <span> 
                              <a className="btn_jian">-</a><input className="btn_num" type="number" /><a className="btn_jia">+</a>
                           </span>
                          
                       </div>
                </div>
                <div>
                    <span className="shop_save">添加商品</span>
                </div>
	            </div>
    		</div>
	    );
	}
}
export default ShopProduct;