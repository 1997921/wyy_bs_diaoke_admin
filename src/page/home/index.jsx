
import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import './index.scss';
import Statistic  from 'service/statistic-service.jsx'
import Mutil from 'util/mm.jsx'

const _mm   = new Mutil();
const _Statistic = new Statistic();
class Home extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			userCount : '-',
			productCount: '-',
			orderCount : '-'
		}
	}
	componentDidMount(){
		this.loadCount(); 
	}
	loadCount(){
		_Statistic.getHomeCount().then( res => {
			this.setState(res);
		},errMsg => {
			_mm.errorTips(errMsg);
		})
	}
	render(){
		return (
				<div id="page-wrapper">
					
					<PageTitle title = "首页" >
					
					</PageTitle>
					<div className="row">
						<div className="col-md-4">
							<Link to="/user" className="color-box brown">
								{/**用户**/}
								<p className="count">{this.state.userCount}</p>
								<p className="desc">
									<i className="fa fa-user-o"></i>
									<span>用户浏览量</span>
								</p>
							</Link>
						</div>
						<div className="col-md-4">
							<Link to="/product" className="color-box green">
								{/**商品**/}
								<p className="count">{this.state.productCount}</p>
								<p className="desc">
									<i className="fa fa-list"></i>
									<span>展品数量</span>
								</p>
							</Link>
						</div>
						<div className="col-md-4">
							<Link to="/order" className="color-box blue">
								{/**订单**/}
								<p className="count">{this.state.orderCount}</p>
								<p className="desc">
									<i className="fa fa-check-square-o"></i>
									<span>新闻数量</span>
								</p>
							</Link>
						</div>
					</div>
				</div>
			)
	}
}

export default Home;