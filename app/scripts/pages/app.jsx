import React, { cloneElement } from 'react/addons';
import { RouteHandler } from 'react-router';
import { Link } from 'react-router';
import Header from '../components/header.jsx'
import Toolbar from '../components/toolbar.jsx'
var { CSSTransitionGroup } = React.addons;

import TimeoutTransitionGroup from '../../lib/timeoutTransitionGroup.js';

class App extends React.Component {

    componentDidMount(prevProps, prevState) {
        var myApp = new Framework7();
        var $$ = Dom7;
        var mainView = myApp.addView('.view-main', {
            dynamicNavbar: true
        });
    }

    render() {
        // TODO : get transition name from store
        var transitionName = this.props.location === "/home" ? "view-transition-reveal-from-right" : "view-transition-show-from-right";
        return (
            <div className="views">
                <div className="view view-main">
                    <div className="pages navbar-through toolbar-through">
                            <RouteHandler key={this.props.location}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
