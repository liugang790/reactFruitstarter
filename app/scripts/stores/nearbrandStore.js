import Reflux from 'reflux';
import NearbrandActions from '../actions/nearbrandActions';

var NearbrandStore = Reflux.createStore({

    init() {
        this.items = [];
        this.banners = [];
        this.fruits = [];
        this.showDetailItem = null;

        this.listenTo(NearbrandActions.loadItems, this.loadItems);
        this.listenTo(NearbrandActions.loadItemsSuccess, this.loadItemsSuccess);
        this.listenTo(NearbrandActions.loadItemsError, this.loadItemsError);
        this.listenTo(NearbrandActions.showItemDetail, this.showItemDetail);
    },

    loadItems() {
        this.trigger({
            loading: true
        });
    },

    loadItemsSuccess(json) {
        this.items = json;
        this.banners = json.banners;
        // this.shop_type = json.shop.type;
        this.shop_id = json.shop.id;
        this.fruits = json.fruits.map((fruit)=>{
            fruit.number = 1;
            fruit.is_cart = false;
            return fruit;
        });
        console.log(this.fruits);
        this.trigger({
            shop_id: this.shop_id,
            items: this.items,
            banners: this.banners,
            fruits: this.fruits,
            loading: false
        });
    },

    loadItemsError(error) {
        let msg = error && error.message ? error.message : 'An error occurred.';
        this.trigger({
            error: msg,
            loading: false
        });
    },

    showItemDetail(item) {
        if(this.showDetailItem === item){
            console.log("Same item already detailed");
        } else {
            this.showDetailItem = item;
            this.trigger({
                showDetailItem: this.showDetailItem
            });
        }
    }

});

export default NearbrandStore;