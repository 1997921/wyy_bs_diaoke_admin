import React from 'react';
import Product from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _mm = new Mutil();
const _product = new Product();

class Useredit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            list:[],
            setpwd:"",
        }
    }

    componentDidMount() {
        this.loadProduct();

    }

    //加载图片详情数据
    loadProduct() {
        if (this.state.id) {
            _product.getUsertList(this.state.id).then((res) => {
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }
    }
    //简单字段改变，图片名称，描述，价格，库存
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        })
    }
    //检查当前的元素
    check_user(product){
        if(!product){
            alert("获取信息为空，您不能提交")
        }
        product.setpwd===""?alert("请输入你要修改的密码"):
            _product.save_setpwd(product).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/user/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })

    }
    //提交
    onSubmit(password) {
        console.log(password)
        let product = {
                password:password,
                id: this.props.match.params.id,
                setpwd:this.state.setpwd,
            },
            productCheckResult = this.check_user(product)
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title='修改密码'/>
                {
				this.state.list.map( (product,index) =>{
                    return (
                <div className="form-horizontal">
               
                    <div className="form-group" key={index}>
                        <label className="col-md-2 control-label">当前密码</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                  readOnly
                                   name='password' value={product.password} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                
                    <div className="form-group">
                        <label className="col-md-2 control-label">修改密码为</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入要修改的密码" name='setpwd'
                                   value={this.state.setpwd} onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" onClick={
                                (e)=>{
                                    let password=product.password;
                                    this.onSubmit(password,e)

                                }                               
                            }>提交
                            </button>
                        </div>
                    </div>
                     
                </div>
                   )
                }) 
                }
            </div>
        );
    }
}

export default Useredit;