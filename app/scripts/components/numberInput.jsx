import React from 'react';
import { Link } from 'react-router';
import OrderStore from '../stores/orderStore';

class NumberInput extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
          fruit: this.props.fruit
        };
        console.log(this.state.fruit);
    }

    decrement() {
        this.state.fruit.number -= 1;
        if (this.state.fruit.number < 1) {
        	 this.state.fruit.number = 1
        }
        this.setState({fruit: this.state.fruit});
        OrderStore.totalPrice(this.state.fruit);
    }


    increment() {
        this.state.fruit.number += 1;
        if (this.state.fruit.number > 99) {
        	 this.state.fruit.number = 99;
        }
        this.setState({fruit: this.state.fruit});
        OrderStore.totalPrice(this.state.fruit);
    }

    changeFruitNumber(evt) {
        let number = parseInt(evt.target.value);
        if (number < 1) {
        	number = 1;
        }
        if (number > 99){
        	number = 99;
        }
        this.state.fruit.number = number;
        this.setState({fruit: this.state.fruit});
        console.log(this.state.fruit);
    }

    render(){
    	return (
	    	<span className="card_num">
		    	<span onClick={this.decrement.bind(this)} className="card_jian"> - </span>
		        <input className="cart_number" type="number"
		        	onChange={this.changeFruitNumber.bind(this)} 
		        	value={this.state.fruit.number}
		        />
		        <span onClick={this.increment.bind(this)} className="card_jia"> + </span>
	    	</span>
	    );
    }
}

export default NumberInput;
