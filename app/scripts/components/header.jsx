import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

    constructor(props, context) {
        super(props);
    }

    render() {
        let title = 'React Framework7 StarterKit';
        if(this.props.location === '/info') title = 'Info';

        return (
            <div className="navbar">
                <div className="navbar-inner">
                    <div className="left sliding">
                        <Link to="home" className="link back">
                            <i className="icon icon-back"></i>
                            <span className="link">Back</span>
                        </Link>
                    </div>
                    <div className="center sliding">{title}</div>
                </div>

            </div>
        );
    }

}

Header.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Header;