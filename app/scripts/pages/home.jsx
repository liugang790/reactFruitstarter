import React from 'react';
import ItemList from '../components/itemList.jsx';
import NumberInput from '../components/numberInput.jsx';
import NearbrandStore from '../stores/nearbrandStore';
import NearbrandActions from '../actions/nearbrandActions';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import Slider from 'react-slick';
import CartStore from '../stores/cartStore';
import WechatStore from '../stores/wechatStore';
import OrderStore from '../stores/orderStore';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shop_id: null,
            shop_type: null,
            items: [],
            banners: [],
            fruits: [],
            cartCount: 0,
            loading: false
        };
    }

    componentDidMount() {
        new Framework7().showIndicator()
        this.unsubscribe = NearbrandStore.listen(this.onStatusChange.bind(this));
        NearbrandActions.loadItems();
        WechatStore.setTitle("水果忍者");
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(state) {
        state.cartCount = CartStore.cartCount(state.shop_id)
        this.setState(state);
        new Framework7().hideIndicator()
    }

    addToCart(fruit) {
        if (fruit.is_cart) {
            CartStore.removeToCart(fruit, this.state.shop_id);
        }else{
            CartStore.addToCart(fruit, this.state.shop_id);
        }
        this.state.cartCount = CartStore.cartCount(this.state.shop_id)
        let index = this.state.fruits.findIndex((_fruit) => {
            console.log(_fruit.fid === fruit.fid);
            return _fruit.fid === fruit.fid;
        });
        this.state.fruits = React.addons.update(this.state.fruits, {[index]: {is_cart: {$set: !fruit.is_cart}}});
        this.setState(this.state);
        console.log(this.state.fruits[index]);
        localStorage.setItem(`last_shop_id`, this.state.shop_id);
    }

    driectPay(fruit) {
        console.log(fruit);
        OrderStore.clearAll(this.state.shop_id);
        OrderStore.driectPay(fruit, this.state.shop_id);
    }

    render() {
        let settings = {
          dots: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 3000,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };
        let bannersView = this.state.banners.map((banner) => {
            return <div className="banner">
                       <a href={banner.link} className="a_url">
                        <img id='banner_id' className="banner" src={banner.img_url}></img>
                       </a>
                   </div>
        });

        let cardImagesCss = [
            {
                icon: 'http://o6rl71xns.bkt.clouddn.com/applea.png',
                name: '鲜果'
            },
            {
                icon: 'http://o6rl71xns.bkt.clouddn.com/appleb.png',
                name: '礼盒'
            },
            {
                icon: 'http://o6rl71xns.bkt.clouddn.com/applec.png',
                name: '果盘'
            },
            {
                icon: 'http://o6rl71xns.bkt.clouddn.com/bb.png',
                name: '果切'
            }
        ];
        let cardImages = cardImagesCss.map((css) => {
            return <div className="col-img">
                        <img src={css.icon}></img>
                        <div className="fruit_name">{css.name}</div>
                    </div>
        });
        let cardListViewItemStyle = {
            // height: "200px"
        }
        let cardListViewItemFirstLineStyle = {
            // height: "100px"
        }
        let cardListViewItemFirstLineImageStyle = {
            // height: "100px",
            // width: "40%",
            // padding: "2%"
        }
        let cardListViewItemSeLineStyle = {
            // height: "20px",
            // width: "90%",
            // padding: "4%"
        }
        let cardListView = this.state.fruits.map((fruit) => {
            return <div className="card">
                        <div className="card-content">
                            <div style={cardListViewItemStyle}>
                               <div style={cardListViewItemFirstLineStyle} className="card_over">
                                    <div className="card_img"><img src={fruit.img_url} style={cardListViewItemFirstLineImageStyle}></img></div>
                                    <div className="card_sel"><div className="card_sel_mess">{fruit.desc}</div></div>
                                    <div className="aixin"><img src="http://o6rl71xns.bkt.clouddn.com/ax.png"/></div>
                               </div>
                               <div style={cardListViewItemSeLineStyle}>
                                    <div className="card_font">{fruit.name}</div>
                               </div>
                               <div className="card_message">
                                    <span className="card_money"><a className="card_symp">￥</a>{fruit.price}</span>
                                    <label>购买数量</label>
                                    { fruit.is_cart ? null : <NumberInput  className="card_count" fruit={fruit}> </NumberInput>}
                                    <a className="gwc" onClick={this.addToCart.bind(this, fruit)}>{fruit.is_cart ? '取消添加' : '购物车'}</a>
                                    { fruit.is_cart ? null : <a className="zjgm" onClick={this.driectPay.bind(this, fruit)}>直接购买</a> }
                               </div>
                            </div>
                        </div>
                    </div>
        });
        
        let bottonm_div = null;
        if(/home/.test(window.location.hash) == false){
            bottonm_div = <div className="psfw_a_zj"><span className="psfw_img_zj"><img src="http://o6rl71xns.bkt.clouddn.com/pfw.png"/></span><span className="psfw_zj">本店为根据所在位置推送最近水果店</span></div>

        }else{
            bottonm_div = <div className="psfw"><span className="psfw_img"><img src="http://o6rl71xns.bkt.clouddn.com/pfw.png"/></span>配送范围</div>
        }
        return (
            <div className="page">
                <div className="page-content no-padding">
                    <div>
                        <Slider {...settings}>
                            {bannersView}
                        </Slider>
                    </div>
                    <div>
                        <div className="row h_padding">
                            {cardImages}
                        </div>
                    </div>
                    <div>
                        {cardListView}
                    </div>
                </div>

                <div className="toolbar tabbar">
                    <div className="toolbar-inner">
                        <Link to="cart" query={{shop_id: this.state.shop_id}} className="tab-link active">
                          <span className="card_gocar">
                            <i className="icon demo-icon-1">
                                <img className="go_shop" src="http://o6rl71xns.bkt.clouddn.com/shop.png"/>
                                <span className="badge bg-red">{this.state.cartCount}</span>
                            </i>
                          </span>
                        </Link>
                        {bottonm_div}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

