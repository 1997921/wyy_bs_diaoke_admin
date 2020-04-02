
import React from 'react';
/**
 * rc-pagination 分页组件
 */
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

//通用分页组件
class Pagination extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="row">
				<div className="col-md-12 text-center">
					{/**
						 {...this.props}
						相当于current={this.props.current}
						hideOnSinglePage 如只有一页不显示
						showQuickJumper 快速跳转 显示跳转多少页
					**/}
					<RcPagination {...this.props}  pageSize="5" hideOnSinglePage showQuickJumper/>
				</div>
			</div>
			)
	}
}
export default Pagination;