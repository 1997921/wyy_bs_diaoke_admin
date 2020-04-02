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
            url: [],
            status: 0,
            subImages:[],
            detail:"",
            crogry:1,
            msg:"",
            pagination:1
        }
    }

    componentDidMount() {
        this.loadProduct();

    }

    //加载图片详情数据
    loadProduct() {
        if (this.state.id) {
            _product.checkShow_pic(this.state.id).then((res) => {
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
        // console.log(this.state.detail)
    }

    //简单字段改变，图片名称，描述，价格，库存
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        })
    }
    //字段检查
    checkProduct(product){

    }
    //品类的转换
    crogry(crogry){
        crogry==="0"?crogry="s":crogry==="1"?crogry="y":crogry="n";
        return crogry;
    }
    //提交
    onSubmit(e) {
        let product = {
                id  :this.state.id,
                name: this.state.name,
                subtitle: this.state.subtitle,
                status: this.state.status,
                subImages: this.state.subImages,//TODO
                detail: this.state.detail,
                crogry:this.crogry(this.state.crogry)
            },
            productCheckResult =_product.checkProduct(product);
        // if (this.state.id) {
        //     product.id = this.state.id;
        // }
        if (productCheckResult.status) {
            _product.show_save(product).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/showpic/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        } else {
            _mm.errorTips(productCheckResult.msg);
        }
    }

    render() {
        // console.log(this.state.subImages)
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑图片' : '编辑展品信息'}/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">展品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入图片名称"
                                   name='name' value={this.state.name} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">展品标题</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入图片描述" name='subtitle'
                                   value={this.state.subtitle} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">展品状态</label>
                        <div className="col-md-5">
                            <select value={this.state.status} className="form-control" name="status"
                                    onChange={(e) => this.onValueChange(e)}>
                                <option value="1">下线</option>
                                <option value="0">上线</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">展品类别</label>
                        <div className="col-md-5">
                            <select  value={this.state.crogry} className="form-control" name="crogry" onChange={(e) => this.onValueChange(e)}>
                                <option value="0">石雕</option>
                                <option value="1">玉雕</option>
                                <option value="2">泥雕</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">图片展示</label>
                        {
                            // console.log(this.state.subImages)
                        }
                        <div className="col-md-10">
						    	{this.state.subImages.length ? this.state.subImages.map( 
						    			(url,index) => (<div key={index} className="img-con"><img src={url.url} className="img" /><i className="fa fa-close" index={index} onClick ={(e) => this.onImageDelete(e)}></i></div>)
						    		) : (<div>请上传图片</div>)
						    	}
						    </div>
                        <div className="col-md-10 col-md-offset-2 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                          onError={(errMsg) => this.onUploadError(errMsg)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">展品介绍</label>
                        <div className="col-md-10">
						    	<RichEditor  defaultDetail={this.state.msg} onValueChange = {(value) => this.onDetailValueChange(value)}/>
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