import Reflux from 'reflux';
import ShopActions from '../actions/shopActions';

var ShopStore = Reflux.createStore({

    init() {
        this.listenTo(ShopActions.updateInfoSuccess, this.updateInfoSuccess);
        this.listenTo(ShopActions.loadIncomeSuccess, this.loadIncomeSuccess);
        this.listenTo(ShopActions.fruitslistSuccess, this.fruitslistSuccess);
    },

    updateInfoSuccess(json) {
        console.log(json);
        this.trigger({
            info: json
        });
    },

    fruitslistSuccess(json){
        console.log(json);
        this.trigger({
            fruits: json
        });

    },

    loadIncomeSuccess(json){
        console.log(json);
        this.trigger(json);
    },

    loadError(error) {
        let msg = error && error.message ? error.message : 'An error occurred.';
        this.trigger({
            error: msg,
            loading: false
        });
    }

});

export default ShopStore;