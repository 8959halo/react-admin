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
    Select
} from 'antd'

import {reqCategorys} from "../../api";
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
        isShowAdd: false // 是否显示添加框
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
    addCategory = () => {

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
                        <a href='javascript:;'>修改分类</a>
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

        //读取当前数组状态
        const {categorys, isShowAdd} = this.state
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
                    title="添加分类"
                    visible={isShowAdd}
                    onOk={this.addCategory}
                    onCancel={() => {
                        this.setState({isShowAdd: false})
                    }}
                >
                    {/*把一级分类列表传到AddForm组件中*/}
                    <AddForm categorys={categorys}/>
                </Modal>
            </div>
        )
    }
}

class AddForm extends Component {
    //声明
    // static propTypes ={
    //
    //     categorys : PropTypes.array.isRequired
    // }

    render() {

        //取出Form表单中的方法或者函数  作用是表单验证和获取输入框的值
        const {getFieldDecorator} = this.props.form
        // const {categorys} = this.props
        console.log(getFieldDecorator);

        return (
            <Form>
                <Item label='所属分类'>


                    {/*指定名字 配置初始值*/}
                    {getFieldDecorator('xxx', {
                        initialValue: ''
                    })()}

                    <Select>
                        <Option key='1' value='0'>一级标题</Option>


                    </Select>
                </Item>

                <Item label='分类名称'>
                    <Input placeholder='请输入分类名称'/>
                </Item>

            </Form>
        )
    }

}

//通过Form组件对象的create方法返回的函数用来包装组件，生成一个新的组件
AddForm = Form.create()(AddForm)