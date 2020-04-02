

import React from 'react';
class ListSearch extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			orderNumber : ''
		}
	}
	//选择查询条件或输入查询
	onValueChange(e){
		let name = e.target.name,
		value = e.target.value.trim();
		this.setState({
			[name] : value
		})
	}
	//点击搜索按钮的时候
	onSearch(e){
		this.props.onSearch(this.state.orderNumber)
	}
	//输入关键词后按回车，自动提交
	onSearchKeywordKeyUp(e){
		if(e.keyCode === 13){
			this.onSearch()
		}
	}
	render(){
		return (
				<div className="row search-wrap">
					<div className="col-md-12">
						<div className="form-inline">
						  <div className="form-group">
						  	<select className="form-control">
								<option value="">按订单号查询</option>
						  	</select>
						  </div>
						  <div className="form-group">
						    <input type="text" className="form-control" placeholder="请输入订单号" name="orderNumber" onKeyUp={ (e) => this.onSearchKeywordKeyUp(e) } onChange={ (e) => this.onValueChange(e)} />
						  </div>
						  <button className="btn btn-primary" onClick={ (e) => {this.onSearch(e)} }>搜索</button>
						</div>
					</div>
				</div>
			);
	}
}
export default ListSearch;