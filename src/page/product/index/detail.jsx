import React from 'react';
import Product from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import './save.scss';

const _mm = new Mutil();
const _product = new Product();

class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            href: '',
            status: 1
        }
    }

    componentDidMount() {
        this.loadProduct();

    }

    //加载商品详情数据
    loadProduct() {
        if (this.state.id) {
            _product.getProduct(this.state.id).then((res) => {
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }
    }


    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="图片详情 "/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">图片名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">图片状态</label>
                        <div className="col-md-5">
                            <select disabled value={this.state.status} className="form-control" name="status" onChange={(e) => this.onValueChange(e)}>
                                <option value="1">下线</option>
                                <option value="0">上线</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">图片展示</label>
                        <div className="col-md-10">
                            <img src={this.state.url} className="img"/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ProductDetail;