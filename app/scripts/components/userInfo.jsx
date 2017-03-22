import React, { cloneElement } from 'react/addons';
import { Link } from 'react-router';

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          buttonClass: this.props.buttonClass
        };
    }

    render() {
        return (
            <div className="content-block">
                <div className="head">
                    <div className="head_pic"><span><img src={this.props.info.user.headimgurl}/></span></div>
                  
                    <div className="head_ID"><span>{this.props.info.user.nickname}</span><span className="vv">v{this.props.info.user.level}</span></div>
                </div>
                <p className="btn-row">
                    <Link to="user" className={this.state.buttonClass[0]}><span>{this.props.info.orders.finished ? this.props.info.orders.finished.length : 0}</span><span>已完成</span></Link>
                    <Link to="info" className={this.state.buttonClass[1]}><span>{this.props.info.orders.unfinished ? this.props.info.orders.unfinished.length : 0}</span><span>未完成</span></Link>
                    <Link to="user_address" className={this.state.buttonClass[2]}><span>{this.props.info.addresses ? this.props.info.addresses.length : 0}</span><span>地址</span></Link>
                </p>
            </div>
        );
    }

}

UserInfo.propTypes = {
    info: React.PropTypes.object,
    buttonClass: React.PropTypes.array,
};

export default UserInfo;

