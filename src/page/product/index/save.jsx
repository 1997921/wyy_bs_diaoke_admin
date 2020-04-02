import React from 'react';
import Product from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';

import FileUploader from 'util/file-uploader/index.jsx';
import './save.scss';

const _mm = new Mutil();
const _product = new Product();

class ProductSave extends React.Component {
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
        console.log(res)
        let pic_url=this.state.url;
        if(pic_url!==""){
            alert("小主喜欢的图片太多了，可只能留一张呦~")
        }else{
            let url = res.url;
        this.setState({
            url:url
        })
        }
        if(res===undefined||res===""){
            alert("上传失败")
        }  
    }
    //上传图片失败
    onUploadError(errMsg) {
        _mm.errorTips(errMsg)
    }

    //删除图片
    onImageDelete() {
        //去标签属性 getAttribute
       let url="";
        this.setState({
            url:url
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
                status: this.state.status,
                subImages: this.state.url,//TODO
                categoryId:this.state.categoryId
            },
            productCheckResult = _product.checkProduct(product);
        if (this.state.id) {
            product.id = this.state.id;
        }
        if (productCheckResult.status) {
            _product.saveProduct(product).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        } else {
            _mm.errorTips(productCheckResult.msg);
        }
    }

    render() {
        // console.log(this.state.url)
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑图片' : '添加图片'}/>
                <div className="form-horizontal">
                <div className="form-group">
                        <label className="col-md-2 control-label">图片ID</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入ID"
                                   name='categoryId' value={this.state.categoryId} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">图片名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入图片名称"
                                   name='name' value={this.state.name} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">图片标题</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入图片描述" name='subtitle'
                                   value={this.state.subtitle} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">图片状态</label>
                        <div className="col-md-5">
                            <select value={this.state.status} className="form-control" name="status"
                                    onChange={(e) => this.onValueChange(e)}>
                                <option value="1">下线</option>
                                <option value="0">上线</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">图片展示</label>
                        <div className="col-md-10 pic">
						    	{this.state.url!=="" ? <div  className="img-con"><img src={this.state.url} className="img" /><i className="fa fa-close"  onClick ={(e) => this.onImageDelete(e)}></i></div>
						    		: (<div>只能传一张照片</div>)
						    	}
						    </div>
                        <div className="col-md-10 col-md-offset-2 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                          onError={(errMsg) => this.onUploadError(errMsg)}/>
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

export default ProductSave;