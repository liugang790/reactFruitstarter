import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Cart from './pages/cart.jsx';
import Info from './pages/info.jsx';
import Prepay from './pages/prepay.jsx'
import CompletePay from './pages/complete_pay.jsx'
import EditAddressInfo from './pages/edit_address_info.jsx';
import User from './pages/user.jsx';
import UserAddress from './pages/user_address.jsx';
import Search from './pages/search.jsx';
import NotFound from './pages/notFound.jsx';
import ShopInfo from './pages/shop_info.jsx'
import ShopProduct from './pages/shop_product.jsx'
import ShopProfit from './pages/shop_profit.jsx'
import Test from './pages/test.jsx'
import UpdateInfo from './pages/update_info.jsx'

var routes = (
    <Route name="app" path="/" handler={ App }>
        <Route name="info" handler={ Info } />
        <Route name="home" handler={ Home } />
        <Route name="cart" handler={ Cart } />
        <Route name="prepay" handler={ Prepay } />
        <Route name="complete_pay" handler={ CompletePay } />
        <Route name="edit_address_info" handler={ EditAddressInfo } />
        <Route name="user" handler={ User } />
        <Route name="user_address" handler={ UserAddress } />
        <Route name="search" handler={ Search } />
        <Route name="shop_info" handler={ ShopInfo } />
        <Route name="shop_product" handler={ ShopProduct } />
        <Route name="shop_profit" handler={ ShopProfit } />
        <Route name="update_info" handler={ UpdateInfo } />
        <Route name="test" handler={ Test } />
        <DefaultRoute handler={ Home } />
        <NotFoundRoute handler={ NotFound } />
    </Route>
);

export default routes;