import React from 'react';
import Product from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import FileUploader from 'util/file-uploader/index.jsx';

const _mm = new Mutil();
const _product = new Product();

class ShowSave extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
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
            _product.art_detail(this.state.id).then((res) => {
                res.defaultDetail = res.detail;
                this.setState(res);
                this.show_pic();
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }
    }
     //展示图片
     show_pic(){
        let subImages=[],
            images=this.state.url.split(',');
            images=JSON.stringify(images);
            images=JSON.parse(images)
        for(let i=0;i<images.length;i++){
             let url=images[i],
                 uri=url.split("http://localhost:8001/img/")[1],
                 sub={
                     uri:uri,
                     url:url
                 }
             subImages.push(sub)
        }
        subImages=JSON.stringify(subImages)
        subImages=JSON.parse(subImages)
        // console.log(subImages)
        this.setState({
            subImages:subImages
        })
        
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
                  id:this.state.id,
                name: this.state.name,
                subtitle: this.state.title,
                subImages: this.state.subImages,
                detail: this.state.detail,
            },
            productCheckResult = _product.checkProduct(product);
        if (this.state.id) {
            product.id = this.state.id;
        }
        if (productCheckResult.status) {
            _product.artlist_save(product).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/artlist/index');
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
                <PageTitle title="编辑艺术家信息"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">艺术家名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入图片名称"
                                   name='name' value={this.state.name} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">艺术家描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入图片描述" name='title'
                                   value={this.state.title} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">艺术家图片</label>
                        <div className="col-md-10">
						    	{this.state.subImages.length ? this.state.subImages.map( 
						    			(image,index) => (<div key={index} className="img-con"><img src={image.url} className="img" /><i className="fa fa-close" index={index} onClick ={(e) => this.onImageDelete(e)}></i></div>)
						    		) : (<div>请上传图片</div>)
						    	}
						    </div>
                        <div className="col-md-10 col-md-offset-2 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                          onError={(errMsg) => this.onUploadError(errMsg)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">艺术家介绍</label>
                        <div className="col-md-10">
						    	<RichEditor detail={this.state.msg} defaultDetail={this.state.defaultDetail} onValueChange = {(value) => this.onDetailValueChange(value)}/>
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

export default ShowSave;