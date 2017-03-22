import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';

class Search extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            fruits: [],
            loading: false
        };
    }

    render() {
        
    	return (
    		<div className="page">
                <div className="page-content no-padding">
                    <div className="search_put">
		               <span className="search_input"><input type="search" className="type_serch" placeholder="输入商家、品类、商圈"/></span><span className="search_font"><a><img src="http://o6rl71xns.bkt.clouddn.com/sssa.png"/></a><a>购买过的店铺</a></span>
                    </div>
                    <div className="search_card">
                        <div className="search_fd">
                           <div className="search_fd_top">
                                <div className="search_top_left">
                                    <img src="http://7xqlzr.dl1.z0.glb.clouddn.com/abstract01.jpg"/>
                                </div>
                                <div className="search_top_right">
                                    <div><span>水果忍者</span><span>（成都市高新中航分店）</span></div>
                                    <div className="search_address">成都市高新区天府大道北段28号</div>
                                    <div><span className="search_stars"><img src="http://o6rl71xns.bkt.clouddn.com/stars.png"/></span><span className="search_garde">0.9分</span></div>
                                    <div className="search_jl"><span className="search_kl">九方购物中心</span><span><a><img src="http://o6rl71xns.bkt.clouddn.com/ddb.png"/></a><a>距离1.2KM</a></span></div>
                                </div>
                           </div>
                        </div>
                        <div className="search_fd_div">
                              <span className="search_sympol ">^</span><span className="youhui">优惠</span><span className="ff">优惠信息：</span><span className="ff">满100减10</span><span className="ff">满200减20</span><span className="ff">满300减30</span>
                        </div>
                   </div> 
                   <div className="search_card">
                        <div className="search_fd">
                           <div className="search_fd_top">
                                <div className="search_top_left">
                                    <img src="http://7xqlzr.dl1.z0.glb.clouddn.com/abstract01.jpg"/>
                                </div>
                                <div className="search_top_right">
                                    <div><span>水果忍者</span><span>（成都市高新中航分店）</span></div>
                                    <div className="search_address">成都市高新区天府大道北段28号</div>
                                    <div><span className="search_stars"><img src="http://o6rl71xns.bkt.clouddn.com/stars.png"/></span><span className="search_garde">0.9分</span></div>
                                    <div className="search_jl"><span className="search_kl">九方购物中心</span><span><a><img src="http://o6rl71xns.bkt.clouddn.com/ddb.png"/></a><a>距离1.2KM</a></span></div>
                                </div>
                           </div>
                        </div>
                        <div className="search_fd_div">
                              <span className="search_sympol ">^</span><span className="youhui">优惠</span><span className="ff">优惠信息：</span><span className="ff">满100减10</span><span className="ff">满200减20</span><span className="ff">满300减30</span>
                        </div>
                   </div> 
                   <div className="search_card">
                        <div className="search_fd">
                           <div className="search_fd_top">
                                <div className="search_top_left">
                                    <img src="http://7xqlzr.dl1.z0.glb.clouddn.com/abstract01.jpg"/>
                                </div>
                                <div className="search_top_right">
                                    <div className="fendian"><span>水果忍者</span><span>（成都市高新中航分店）</span></div>
                                    <div className="search_address">成都市高新区天府大道北段28号</div>
                                    <div><span className="search_stars"><img src="http://o6rl71xns.bkt.clouddn.com/stars.png"/></span><span className="search_garde">0.9分</span></div>
                                    <div className="search_jl"><span className="search_kl">九方购物中心</span><span><a><img src="http://o6rl71xns.bkt.clouddn.com/ddb.png"/></a><a>距离1.2KM</a></span></div>
                                </div>
                           </div>
                        </div>
                        <div className="search_fd_div">
                              <span className="search_sympol ">^</span><span className="youhui">优惠</span><span className="ff">优惠信息：</span><span className="ff">满100减10</span><span className="ff">满200减20</span><span className="ff">满300减30</span>
                        </div>
                   </div> 
		        </div>
    		</div>
    	);
    }
}

export default Search;