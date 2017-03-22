import Reflux from 'reflux';
import UserActions from '../actions/userActions';

var UserStore = Reflux.createStore({

    init() {
        this.info = {};
        this.showDetailItem = null;

        this.listenTo(UserActions.loadInfo, this.loadInfo);
        this.listenTo(UserActions.updateInfo, this.updateInfo);
        this.listenTo(UserActions.loadInfoSuccess, this.loadInfoSuccess);
        this.listenTo(UserActions.updateInfoSuccess, this.updateInfoSuccess);
        this.listenTo(UserActions.loadError, this.loadError);
        this.listenTo(UserActions.loadAddressInfoSuccess, this.loadAddressInfoSuccess);
    },

    loadInfo() {
        this.trigger({
            loading: true
        });
    },

    loadInfoSuccess(json) {
        console.log(json);
        this.trigger({
            user: json.user,
            addresses: json.addresses,
            orders:  json.orders,
            loading: false
        });
    },

    loadAddressInfoSuccess(json) {
        this.info = json;
        this.trigger({
            info: this.info,
            loading: false
        });
    },

    updateInfoSuccess(json) {
        this.info = json;
        this.trigger({
            info: this.info,
            loading: false
        });
    },

    loadError(error) {
        let msg = error && error.message ? error.message : 'An error occurred.';
        this.trigger({
            error: msg,
            loading: false
        });
    }

});

export default UserStore;