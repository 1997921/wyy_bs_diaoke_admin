import React from 'react';
import Product from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';

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
            status: 1,
            detail:"",
            subImages:[],
        }
    }

    componentDidMount() {
        this.loadProduct();

    }

    //加载商品详情数据
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
    //展示照片
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

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="展品详情 "/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">展品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">展品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">展品状态</label>
                        <div className="col-md-5">
                            <select disabled value={this.state.status} className="form-control" name="status" onChange={(e) => this.onValueChange(e)}>
                                <option value="1">下线</option>
                                <option value="0">上线</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">展品类别</label>
                        <div className="col-md-5">
                            <select disabled value={this.state.show_catagory} className="form-control" name="show_catagory" onChange={(e) => this.onValueChange(e)}>
                                <option value="0">石雕</option>
                                <option value="1">玉雕</option>
                                <option value="2">泥雕</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">图片展示</label>
                        <div className="col-md-10">
						    	{this.state.subImages.length ? this.state.subImages.map( 
						    			(url,index) => (<div key={index}  disabled  className="img-con"><img src={url.url} className="img" /></div>)
						    		) : (<div>请上传图片</div>)
						    	}
						    </div>
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default Showdetail;