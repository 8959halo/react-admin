import React, {Component} from 'react'
import {Card, Select, Input, Button, Icon, Table} from 'antd'
import {reqProducts} from "../../api";


const Option = Select.Option


/*
管理的商品的主界面路组件
 */
export default class ProductIndex extends Component {
    state = {
        total : 0,   //商品的总数量
        products: []   //当前页的列表数据
    }
    //初始化生成table所有列的数组
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => <span>￥{price}</span>
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: () =>
                    <span>
                        <Button type='primary'>上架</Button>
                        &nbsp;&nbsp;&nbsp;
                        <span>在售</span>
                    </span>
            },
            {
                title: '操作',
                render: (product) =>
                    <span>
                        <a href="javascript:;">详情</a>
                        &nbsp; &nbsp;
                        <a href="javascript:;" onClick={ () =>this.props.history.push('/product/save-update',product)}>修改</a>
                    </span>
            },

        ]

    }

    //异步获取指定页的数据
    getProducts = async (pageNum) => {

        const result = await reqProducts(pageNum, 6)
        if (result.status===0){
            //读取
            const {total,list} = result.data
            this.setState({
                total,
                products: list

            })
        }

    }


    componentWillMount() {
        this.initColumns()
    }

    //发送请求
    componentDidMount() {
        this.getProducts(1)  //后台分页  先显示第一页
    }

    render() {
        const {products,total} = this.state
        return (
            <div>
                <Card>
                    <Select value='1'>
                        <Option key='1' value='1'>根据商品名称</Option>
                        <Option key='2' value='2'>根据商品描述</Option>
                    </Select>
                    &nbsp; &nbsp;
                    <Input style={{width: 200}} placeholder='关键字'/>
                    &nbsp; &nbsp;
                    <Button type='primary'>搜索</Button>
                    <Button type='primary' style={{float: 'right'}} onClick={() => this.props.history.push('/product/save-update',products)}>
                        <Icon type='plus' />添加商品</Button>
                </Card>
                <Table
                    columns={this.columns}
                    //判断当前的panrentId是否为0,
                    dataSource={products}
                    bordered
                    pagination={{defaultPageSize: 6, total,showSizeChanger: true, showQuickJumper: true,onChange: this.getProducts}}
                />
            </div>
        )
    }
}