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
            _product.art_detail(this.state.id).then((res) => {
                this.setState(res);
                _product.getArtlist();
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }
    }


    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="艺术大师详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">人物名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">人物描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.title}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">人物展示</label>
                        <div className="col-md-10">
                            <img src={this.state.url} className="img"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">人物介绍</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Showdetail;