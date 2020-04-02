

import Mutil from 'util/mm.jsx'
const _mm = new Mutil();
class Product {
	//获取轮播图列表
	getProductList(listParam) {
		let url = '',
			data = {};
		if (listParam.listType === 'list') {
			url = "/manage/product/list.do";
			data.pageNum = listParam.pageNum;
		} else if (listParam.listType === 'search') {
			url = "/manage/product/search.do";
			data.pageNum = listParam.pageNum;
			data[listParam.searchType] = listParam.KeyWord;
		}
		return _mm.request({
			type: 'post',
			url: url,
			data: data
		})
	}


	//获取展品列表
	getPicshowList(listParam) {
		let url = '',
			data = {};
		if (listParam.listType === 'list') {
			url = "/manage/product/picShowlist.do";
			data.pageNum = listParam.pageNum;
		} else if (listParam.listType === 'search') {
			url = "/manage/product/search.do";
			data.pageNum = listParam.pageNum;
			data[listParam.searchType] = listParam.KeyWord;
		}
		return _mm.request({
			type: 'post',
			url: url,
			data: data
		})

	}
	//展品查看详情
	checkShow_pic(productId) {
		return _mm.request({
			type: 'post',
			url: '/manage/product/show_detail.do',
			data: {
				productId: productId || 0
			}
		})
	}
	//展品编辑的提交
	show_save(product) {
		// console.log(product)
		let show_list = [],
			imgs = product.subImages;
		imgs.forEach(function (url, sum, arr) {
			show_list.push(url)
		})
		show_list = JSON.stringify(show_list);
		// console.log(show_list)
		return _mm.request({
			type: 'post',
			url: '/manage/product/show_save.do',
			data: {
				id  :product.id,
				name: product.name,
				subtitle: product.subtitle,
				url: product.url,
				status: product.status,
				subImages: show_list,
				detail:product.detail,
				crogry:product.crogry

			}
		})
	}
	//展品添加的提交
	Showpic_save(product){
		// console.log(product)
		let show_list = [],
			imgs = product.subImages;
		imgs.forEach(function (url, sum, arr) {
			show_list.push(url)
		})
		show_list = JSON.stringify(show_list);
		// console.log(show_list)
		return _mm.request({
			type: 'post',
			url: '/manage/product/showpic_save.do',
			data: {
				createId  :product.createId,
				name: product.name,
				subtitle: product.subtitle,
				status: product.status,
				subImages: show_list,
				detail:product.detail,
				crogry:product.crogry

			}
		})
	}


	//获取雕刻名家列表
	getArtlist(listParam) {
		let url = '/manage/product/art_list.do',
			data = {};
		data.pageNum = listParam.pageNum;
		return _mm.request({
			type: 'post',
			url: url,
			data: data
		})
	}
	//雕刻名家信息的删除
	art_delect(productId) {
		productId = productId.productId;
		return _mm.request({
			type: 'post',
			url: '/manage/product/art_delete.do',
			data: {
				productId: productId || 0
			}
		})

	}
	//雕刻名家查看详情
	art_detail(productId) {
		return _mm.request({
			type: 'post',
			url: '/manage/product/art_detail.do',
			data: {
				productId: productId || 0
			}
		})
	}
	//雕刻名家编辑提交
	artlist_save(product){
		// console.log(product)
		let show_list = [],
			imgs = product.subImages;
		imgs.forEach(function (url, sum, arr) {
			show_list.push(url)
		})
		show_list = JSON.stringify(show_list);
		// console.log(show_list)
		return _mm.request({
			type: 'post',
			url: '/manage/product/artlist_edit.do',
			data: {
				id: product.id,
				name: product.name,
				subtitle: product.subtitle,
				subImages: show_list,
				detail:product.detail
			}
		})

	}
	//获取新闻列表
	getNewslist(listParam) {
		let url = '/manage/product/news_list.do',
			data = {};
		data.pageNum = listParam.pageNum;
		return _mm.request({
			type: 'post',
			url: url,
			data: data
		})
	}
	//新闻列表详情查询
	news_detail(productId) {
		return _mm.request({
			type: 'post',
			url: '/manage/product/news_detail.do',
			data: {
				productId: productId || 0
			}
		})

	}
	//新闻编辑保存
	news_edit(product) {
		return _mm.request({
			type: 'post',
			url: '/manage/product/news_save.do',
			data: {
				id:product.id,
				name:product.name,
				subtitle:product.subtitle,
				uploadname:product.uploadname,
				status:product.status,
				detail:product.detail
			}
		})
	}
	//新闻的删除
	news_delect(productId) {
		productId = productId.productId;
		return _mm.request({
			type: 'post',
			url: '/manage/product/news_delete.do',
			data: {
				productId: productId || 0
			}
		})
	}
	//新闻新建保存
	news_add(product){
		return _mm.request({
			type: 'post',
			url: '/manage/product/news_add.do',
			data: {
				product
			}
		})
	}
	//用户信息查询
	getUsertList() {
		let url = '/manage/product/user_list.do';
		return _mm.request({
			type: 'post',
			url: url,
		})
	}

	//用户信息的提交保存
	save_setpwd(product) {
		// console.log(product.id)
		let productId = product.id,
			product_set = product.setpwd;
		return _mm.request({
			type: 'post',
			url: '/manage/product/user_save.do',
			data: {
				productId: productId || 0,
				product_set: product_set
			}
		})
	}
	//检查新增的表单数据
	checkProduct(product) {
		let result = {
			status: true,
			msg: '验证通过'
		};
		if (typeof product.name !== 'string' || product.name.length === 0) {
			return {
				status: false,
				msg: '名称不能为空'
			}
		}
		//判断商品名称为空
		// if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
		// 	return {
		// 		status : false,
		// 		msg : '标题不能为空'
		// 	}
		// }
		//判断描述为空
		// if(typeof product.subImages !== 'string' || product.subImages.length === 0){
		// 	return {
		// 		status : false,
		// 		msg : '请上传图片'
		// 	}
		// }


		return result;
	}
	//轮播图的编辑与新加
	saveProduct(product) {
		return _mm.request({
			type: 'post',
			url: '/manage/product/add.do',
			data: product
		})
	}
	//获取商品数据
	getProduct(productId) {
		return _mm.request({
			type: 'post',
			url: '/manage/product/detail.do',
			data: {
				productId: productId || 0
			}
		})
	}
	//根据当前路径来判断调动不同的状态改变的接口
	setProductStatus(productId, status) {
		return _mm.request({
			type: 'post',
			url: '/product/set_line_status.do',
			data: {
				productId: productId || 0
			}
		})
	}
}

export default Product;