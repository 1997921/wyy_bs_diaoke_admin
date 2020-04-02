

import React from 'react';
/**
 * rc-pagination 分页组件
 */
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';
//通用富文本编辑器，依赖jQuery
class RichEditor extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.loadEditor();
	}
	//在props改变时触发
	componentWillReceiveProps(nexProps){
		// let detailChange = this.props.detail !== nexProps.detail;
		// if(!detailChange){
		// 	return '';
		// }
		//给文本编辑器传值
		if(this.props.defaultDetail !== nexProps.defaultDetail){
			this.simditor.setValue(nexProps.defaultDetail);
		}
		
	}
	loadEditor(){
		let element = this.refs['textarea'];
		this.simditor = new Simditor({
			textarea : $(element),
			defaultValue : this.props.placeholder || '请输入内容',
			upload : {
				url : '/manage/product/upload.do',
				defaultImage : '',
				fileKey : 'upload_file'
			}
		})
		this.bindEditorEvent();
	}
	//初始化富文本编辑器事件
	bindEditorEvent(){
		//valuechanged 这个事件把jquery 暴露给 组件RichEditor
		this.simditor.on('valuechanged', e => {
			this.props.onValueChange(this.simditor.getValue());
		})
	}
	render(){
		return (
			<div className="rich-editor">
				<textarea ref="textarea"></textarea>
			</div>
			)
	}
}
export default RichEditor;