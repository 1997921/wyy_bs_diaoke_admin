

import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import ListSearch from 'page/product/index/index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';

import Product  from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';

const _mm 	= new Mutil();
const _product = new Product();
class Show extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pageNum : 1,
			list : [],
			listType : 'list'
		}
	}
	componentDidMount(){
		this.loadProductList();
	}
	//加载展品列表
	loadProductList(){
		let listParam = {};
		listParam.listType 		= this.state.listType;
		listParam.pageNum 		= this.state.pageNum;
		//如搜索的话，传入搜索类型
		if(this.state.listType == 'search'){
			listParam.searchType 	= this.state.searchType;
			listParam.KeyWord = this.state.searchKeyWord;
		}
		//请求接口
		_product.getPicshowList(listParam).then(res => {
			this.setState(res);
		},errMsg => {
			this.setState({
				list : []
			})
			_mm.errorTips(errMsg);
		});
	}
	//当页数发生变化的时候
	onPageNumChange(PageNum){
		this.setState({
			pageNum:PageNum
		},() =>{
			this.loadProductList();
		})
	}
	//改变图片状态
	onSetProductStatus(e,productId,currentStatus){
		let newStatus 	= currentStatus == 1 ? 0 : 1,
		confrimTips 	= currentStatus == 1 ? '确认要下线该图片？' : '确认要上线该图片？';
		if(window.confirm(confrimTips)){
			_product.setProductStatus({
				productId : productId,
				status : newStatus
			}).then(res => {
				_mm.successTips(res);
				this.loadProductList();
			}, errMsg => {
				_mm.errorTips(errMsg);
			})
		}
	}
	//搜索
	onSearch(searchType,searchKeyWord){
		let listType = searchKeyWord === '' ? 'list' : 'search';
		this.setState({
			listType : listType,
			pageNum : 1,
			searchType : searchType,
			searchKeyWord : searchKeyWord
		}, () => {
			this.loadProductList();
		})
    }
    //判断一下品类
    category(product){
       if(product==="s"){
		product="石雕";
       }else if(product==="y"){
		product="玉雕"
	   }else{
		product="泥雕"
	   }
       return product
    }
	render(){
		let tableHeads = [
			{name:'展品ID',width:'10%'},
			{name:'展品名称',width:'20%'},
			{name:'展品标题',width:'20%'},
			{name:'所属类别',width:'20%'},
			{name:'图片状态',width:'15%'},
			{name:'操作',width:'15%'},
		];
		return (
			<div id="page-wrapper">
				<PageTitle title="展品图片信息">
					<div className="page-header-right">
						<Link to="/showpic/addedit/" className="btn btn-primary"><i className="fa fa-plus"></i><span>添加展品信息</span></Link>
					</div>
				</PageTitle>
				<ListSearch onSearch={ (searchType,searchKeyWord) => {this.onSearch(searchType,searchKeyWord)} }/>
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map( (product,index) =>{
                            product.catagory=this.category(product.show_catagory);
							console.log(product.catagory)
							return (
								<tr key={index}>
									<td>{product.categoryId}</td>
									<td>
										<p>{product.name}</p>
										
									</td>
									<td>{product.title}</td>
									<td>{product.catagory}</td>
									<td>
										<p>{product.status == 1 ? '在线' : '已下线'}</p>
										<button className="btn btn-xs btn-warning" onClick={ (e) => {this.onSetProductStatus(e , product.id , product.status)} }>{product.status == 1 ? '下线' : '上线'}</button>
									</td>
									<td>
										<Link className="opear" to={`/showpic/detail/${product.id}`}>查看详情</Link>
										<Link className="opear" to={`/showpic/save/${product.id}`}>编辑</Link>
									</td>
								</tr>
							)
						})
					}
				</TableList>
				{/** 
					current 代表当前页
					total   代表总页数
				**/}
					<Pagination current={this.state.pageNum} total={this.state.total}  onChange={(PageNum) => {this.onPageNumChange(PageNum)}}/>
				
			</div>
			);
	}
}

export default Show;