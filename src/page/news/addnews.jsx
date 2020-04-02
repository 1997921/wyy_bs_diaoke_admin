import React from 'react';
import Product from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './addnews.scss';

const _mm = new Mutil();
const _product = new Product();

class AddNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            href: '',
            status: 1,
            subImages: [],
        }
    }

    componentDidMount() {
        this.loadProduct();

    }

    //加载图片详情数据
    loadProduct() {
        if (this.state.id) {
            _product.getProduct(this.state.id).then((res) => {
                console.log(res)
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }
    }

    //上传图片成功
    onUploadSuccess(res) {
        let subImages = this.state.subImages;
        subImages.push(res)
        this.setState({
            subImages: subImages
        })
    }

    //上传图片失败
    onUploadError(errMsg) {
        _mm.errorTips(errMsg)
    }

    //删除图片
    onImageDelete(e) {
        //去标签属性 getAttribute
        let index = parseInt(e.target.getAttribute(index)),
            subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages: subImages
        })
    }

    // 富文本编辑器的变化
    onDetailValueChange(value) {
        this.setState({
            detail: value
        })
    }

    //简单字段改变，图片名称，描述，价格，库存
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        })
    }

    //提交
    onSubmit(e) {
        let product = {
                name: this.state.name,
                subtitle: this.state.subtitle,
                href: this.state.href,
                status: this.state.status,
                subImages: '',//TODO
                detail: this.state.detail,
            },
            productCheckResult = _product.checkProduct(product);
        if (this.state.id) {
            product.id = this.state.id;
        }
        if (productCheckResult.status) {
            _product.news_edit(product).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/news/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        } else {
            _mm.errorTips(productCheckResult.msg);
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑新闻' : '添加新闻'}/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">新闻名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入新闻名称"
                                   name='name' value={this.state.name} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">新闻标题</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入新闻描述" name='subtitle'
                                   value={this.state.subtitle} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">上传人姓名</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入上传人姓名" name='name'
                                   value={this.state.name} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">上传时间</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"  name='updata'
                                   value={this.state.name} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">新闻状态</label>
                        <div className="col-md-5">
                            <select value={this.state.status} className="form-control" name="status"
                                    onChange={(e) => this.onValueChange(e)}>
                                <option value="1">下线</option>
                                <option value="0">上线</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">新闻内容</label>
                        <div className="col-md-10">
						    	<RichEditor detail={this.state.detail} defaultDetail={this.state.defaultDetail} onValueChange = {(value) => this.onDetailValueChange(value)}/>
						    </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" onClick={(e) => {
                                this.onSubmit(e)
                            }}>提交
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default AddNews;