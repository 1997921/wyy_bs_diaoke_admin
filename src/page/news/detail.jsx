import React from 'react';
import Product from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _mm = new Mutil();
const _product = new Product();

class Showdetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            subtitle: '',
            href: '',
            status: 1
        }
    }

    componentDidMount() {
        this.loadProduct();

    }

    //加载艺术大师详情数据
    loadProduct() {
        if (this.state.id) {
            _product.news_detail(this.state.id).then((res) => {
                this.setState(res);
                _product.getNewslist();
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }
    }


    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="新闻详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">新闻名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">新闻标题</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.createdata}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">更新时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.updata}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">操作人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.uploadname}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">新闻内容</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Showdetail;