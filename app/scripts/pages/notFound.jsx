import React from 'react';
import WechatStore from '../stores/wechatStore';

class NotFound extends React.Component {

    componentDidMount() {
        WechatStore.setTitle("这个网页不存在诶");
    }

    render() {
        return (
        <div className="page">
            <div className="page-content">
                <div className="content-block">
                    <h1>出错了!</h1>
                    你到了一个不存在的页面
                </div>
            </div>
        </div>
        );
    }

}

export default NotFound;