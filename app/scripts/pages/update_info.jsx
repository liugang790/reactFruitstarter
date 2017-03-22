import React from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';

class UpdateInfo extends React.Component {
	render() {
		return (
			<div className="page">
                <div className="page-content no-padding">
				<div>更新信息</div>
				<div> 5.25 </div>
				<div>「fix」</div>
				<div>1. 修复了购物车的显示问题</div>
				<div>2. 为首页添加商品添加了一个折衷的方案。。不漂亮。。难看</div>
				<div>「todo」</div>
				<div>1. 修复添加商品页的 bug</div>
				<div>2. 显示描述文字</div>
				<div>3. 调整首页 UI</div>
				</div>
			</div>
		);
	}
}
export default UpdateInfo;