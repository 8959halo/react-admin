import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    Button,
    Icon,
    Table,
    Modal,
    Form,
    Input,
    Select,
    message
} from 'antd'

import {reqCategorys,reqAddCategory} from "../../api";
import Search from "antd/lib/input/Search";

const Item = Form.Item
const Option = Select.Option
/*
管理的分类管理路由组件
 */
export default class Category extends Component {
    //初始化数组状态
    state = {
        categorys: [],   //一级分类列表
        isShowAdd: false ,// 是否显示添加框
        isShowUpdate: false //是否显示更新分类框
    }

    //获取一级分类标题
    getCategorys = async () => {
        const result = await reqCategorys('0')
        if (result.status === 0) {
            const categorys = result.data
            //更新状态
            this.setState({
                categorys
            })
        }
    }

    //添加一级分类
     addCategory = async () => {
        //隐藏Modal框
         this.setState({
             isShowAdd: false
         })

         //得到输入的数据
          const {parentId,categoryName} =this.form.getFieldsValue()
         //提交添加分类请求   添加分类需要parentId  categoryName 通过form对象传递,需要getField方法，
         //但目前在父组件，不能获取到子组件的方法，需要子组件向父组件传递form的方法，属于子向父传用函数，父组件给子组件函数，子组件传form
         const result = await reqAddCategory(parentId,categoryName)
         //判断
         if (result.status===0){
             message.success('添加成功')
             this.getCategorys()
         }
     }
     //显示更新分类界面
    showUpdate = (category) =>{

        this.setState({
            isShowUpdate : true
        })
        //保存分类对象  this是组件对象
        this.category = category

        //显示更新分类的Modal
    }
    //更新分类
    updateCategory =() =>{

    }


    //做请求
    componentDidMount() {
        this.getCategorys()

    }

    componentWillMount() {
        //所有列
        this.columns = [{
            title: '品类名称',
            dataIndex: 'name',
            // render: (value) => <a href="javascript:;">{value}</a>,
        }, {
            title: '操作',
            width: 300,
            render: (category) => {
                return (
                    <span>
                        <a href='javascript:;' onClick={() => this.showUpdate(category)}>修改分类</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href='javascript:;'>查看子分类</a>
                    </span>
                )
            }
            // render(category){
            //     return(
            //         <span>
            //             <a href='javascript:;'>修改分类</a>
            //             &nbsp;&nbsp;&nbsp;&nbsp;
            //             <a href='javascript:;'>查看子分类</a>
            //         </span>
            //     )
            //
            // }
        }];

    }


    render() {

        //得到列的数组
        const columns = this.columns


        // const categoryName = this.category.name

        //读取当前数组状态
        const {categorys, isShowAdd ,isShowUpdate} = this.state
        return (
            <div>
                <Card>
                    <span style={{fontSize: 20}}>一级分类列表</span>
                    <Button type='primary' style={{float: 'right'}} onClick={() => this.setState({isShowAdd: true})}>
                        <Icon type='plus'/>
                        添加分类
                    </Button>
                </Card>
                <Table
                    columns={columns}
                    rowKey='_id'
                    dataSource={categorys}
                    loading={!categorys || categorys.length === 0}
                    bordered
                    pagination={{defaultPageSize: 6, showSizeChanger: true, showQuickJumper: true}}
                />
                <Modal
                    title="更新分类"
                    visible={isShowUpdate}
                    onOk={this.updateCategory}
                    onCancel={() => {
                        this.setState({isShowUpdate: false})
                    }}
                >
                    {/*<UpdateForm categoryName={categoryName} setForm ={ (form) =>this.form=form}/>*/}
                </Modal>
                <Modal
                    title="添加分类"
                    visible={isShowAdd}
                    onOk={this.addCategory}
                    onCancel={() => {
                        this.setState({isShowAdd: false})
                    }}
                >
                    {/*把一级分类列表传到AddForm组件中*/}
                    <AddForm categorys={categorys} setForm ={ (form) =>this.form=form}/>
                </Modal>
            </div>
        )
    }
}
//更新分类的form组件
class UpdateForm extends Component {
    //声明
    static propTypes = {

        categoryName: PropTypes.string.isRequired,
        //这个函数用于接收
        setForm :PropTypes.func.isRequired
    }
    componentWillMount(){
        //子组件和父组件form方法存放的位置不一样 子组件存在属性里面， 父组件直接存在组件对象中
        this.props.setForm(this.props.form)
    }

    render() {
        // console.log('-----', this.props);

        //取出Form表单中的方法或者函数  作用是表单验证和获取输入框的值
        const {getFieldDecorator} = this.props.form
        const {categoryName} = this.props

        return (
            <Form>
                <Item >
                    {
                        getFieldDecorator('categoryName',{
                            initialValue: categoryName
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>

            </Form>
        )
    }

}

//通过Form组件对象的create方法返回的函数用来包装组件，生成一个新的组件
UpdateForm = Form.create()(UpdateForm)

//添加分类的form组件
class AddForm extends Component {
    //声明
    static propTypes = {

        categorys: PropTypes.array.isRequired,
        //这个函数用于接收
        setForm :PropTypes.func.isRequired
    }
    componentWillMount(){
        //子组件和父组件form方法存放的位置不一样 子组件存在属性里面， 父组件直接存在组件对象中
        this.props.setForm(this.props.form)
    }

    render() {
        // console.log('-----', this.props);

        //取出Form表单中的方法或者函数  作用是表单验证和获取输入框的值
        const {getFieldDecorator} = this.props.form
        const {categorys} = this.props

        return (
            <Form>
                <Item label='所属分类'>
                    {/*指定名字 配置初始值*/}
                    {
                        getFieldDecorator('parentId', {
                            initialValue: '0'    //value=0默认显示一级分类
                        })(
                            <Select>
                                <Option key='0' value='0'>一级标题</Option>
                                {    //调用数组的map方法， 返回的是一个Option
                                    categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                                }


                            </Select>
                        )
                    }


                </Item>

                <Item label='分类名称'>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue: ''
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>

            </Form>
        )
    }

}

//通过Form组件对象的create方法返回的函数用来包装组件，生成一个新的组件
AddForm = Form.create()(AddForm)