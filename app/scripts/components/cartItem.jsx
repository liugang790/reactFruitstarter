import React from 'react';
import { Link } from 'react-router';
import OrderStore from '../stores/orderStore';

class CartItem extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
          fruit: this.props.fruit
        };
        console.log(this.state.fruit);
    }

    checkChanged(evt) {
    	this.state.fruit.checked = evt.target.checked;
    	if (this.state.fruit.checked) {
    		OrderStore.addToOrder(this.state.fruit, this.props.shop_id);
    	}else{
    		OrderStore.removeToOrder(this.state.fruit, this.props.shop_id);
    	}
    	this.setState(this.state);
      console.log(this.state);
    }

    render(){
    	return (
    			<div>
               <div className="cart-top">
                   <span>
                       <span className="checkboxFour cart_sel">
                           <input className="input_checkbox"  id="checkboxFourInput" type="checkbox" onChange={this.checkChanged.bind(this)} checked={this.state.fruit.checked}/>
                           <label for="checkboxFourInput"></label>
                        </span>
                   </span>
                  <div className="cart_img"><img src={this.state.fruit.img_url}></img></div>
                  <div className="cart_me">
                      <div className="cart_name">{this.state.fruit.name}</div>
                      <span className="cart_weight">重量：约100g</span>
                  </div>
               </div>
         </div>
       	);
    }
}

export default CartItem;
