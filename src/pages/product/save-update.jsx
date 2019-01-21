import React, {Component} from 'react'
import {Icon, Input, Select, Form, Button} from 'antd'


const Option = Select.Option
const Item = Form.Item

/*
管理的商品的添加更新路由组件
 */
export  class ProductSaveUpdate extends Component {
    render() {
        const product = this.props.location.state ||{}
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 12 },
        };
        return (
            <div>
                <h2>
                    <a href="javascript:" onClick={() => this.props.history.goBack()}>
                        <Icon type='arrow-left'/>
                    </a>
                    &nbsp;&nbsp;
                    {product._id ? '编辑商品' : '添加商品'}

                    <Form>
                        <Item label='商品名称' labelCol={{span: 2}} wrapperCol={{span: 12}}>
                            {
                                getFieldDecorator('name',{
                                    initialValue : product.name
                                })(<Input placeholder='请输入商品名称'/>)
                            }

                        </Item>
                        <Item label='商品描述' {...formItemLayout}>
                            {
                                getFieldDecorator('desc',{
                                    initialValue : product.desc
                                })(<Input placeholder='请输入商品描述'/>)
                            }

                        </Item>
                        <Item label='商品价格' {...formItemLayout}>
                            {
                                getFieldDecorator('price',{
                                    initialValue : product.price
                                })(<Input placeholder='请输入商品价格' addonAfter='元'/>  )
                            }

                        </Item>
                        <Item label='商品分类' {...formItemLayout}>
                            {
                                getFieldDecorator('category1',{
                                    initialValue : '1'
                                })(
                                    <Select style={{width: 250}}>
                                        <Option key='1' value='1'>AAA</Option>
                                        <Option key='2' value='2'>BBB</Option>
                                    </Select>
                                )
                            }
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {
                                getFieldDecorator('category2',{
                                    initialValue : '3'
                                })(
                                    <Select style={{width: 250}}>
                                        <Option key='3' value='3'>ccc</Option>
                                        <Option key='4' value='4'>ddd</Option>
                                    </Select>
                                )
                            }

                        </Item>

                    </Form>

                </h2>
            </div>

        )
    }
}
export default Form.create()(ProductSaveUpdate)