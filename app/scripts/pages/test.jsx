import React from 'react';
import cookie from 'react-cookie';
import WechatStore from '../stores/wechatStore';

class Test extends React.Component {
	constructor(props) {
        super(props);
        this.props.shop_id = this.props.shop_id ? this.props.shop_id : window.location.href.split('shop_id=')[1];
        let keys = [];
        for (var key in localStorage){
   			keys.push(key);
		}
        this.state = {
        	keys: keys,
        	open_id: cookie.load("openid"),
        };
    }


    componentDidMount() {
        WechatStore.setTitle("测试页面");
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
    	let content = this.state.keys.map((key) => {
    		return 	<div>
    					<div>{key}:</div>
    					<p>{localStorage[key]}</p>
    				</div>
    	});
    	return (
    		<div className="page">
                <div className="page-content no-padding">
    				<div>{content}</div>
    				<form id="address-form" className="list-block">
	    				<ul>
	                        <li>
			    				<div className="item-content">
			                        <div className="item-inner">
			                          <div className="item-input">
			                            <input type="text" value={this.state.open_id}/>
			                          </div>
			                        </div>
			                    </div>
			                </li>
			            </ul>
		            </form>
    			</div>
    		</div>
    	);
    }
}

export default Test;