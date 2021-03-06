import React from 'react';
import Router from 'react-router';
import routes from './routes';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

Router.run(routes, Router.HashLocation, (Handler, state) => {
    React.render(<Handler location={state.path}/>, document.body)
});