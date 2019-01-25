import React, {Component,PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    Button,
    Table,
    Form,
    Input,
    Modal,
    message,
    Tree
} from 'antd'
import {formateDate} from '../../utils/utils'
import menuList from '../../config/menuConfig'
import {reqRoles, reqAddRole, reqUpdateRole} from '../../api'

const FormItem = Form.Item
const {TreeNode} = Tree
/*
后台管理的角色管理路由组件
 */
export default class Role extends Component {
    state ={
        isShowAdd: false,  // 显示添加角色的Modal
        isShowRoleAuth:false, //显示设置角色权限的Modal
        roles:[], //角色列表
        role: {}  //当前选中的对象
    }
    /*
  初始化Table的字段数据
   */
    initColumns = () => {
        /*
        {
          "menus": [
            "/home"
          ],
          "_id": "5c30c5bdc3bc1f6128a60375",
          "name": "测试",
          "auth_name": "admin",
          "create_time": 1546700221686,
          "__v": 0,
          "auth_time": 1548001177165
        }
         */
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                // render: (create_time) => formateDate(create_time)
                render: formateDate
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formateDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            }
        ]
    }
    //显示添加角色界面
    showAddRole =() =>{
        this.setState({
            isShowAdd: true
        })
    }
    //显示设置角色权限界面
    showRoleAuth =() =>{
        this.setState({
            isShowRoleAuth:true
        })
    }


    //异步获取角色列表
    getRoles = async () =>{
        //获取数据
        const result = await reqRoles()
        if (result.status===0){
            const roles = result.data
            //更新数据
            this.setState({
                roles
            })
        }

    }
    /*
 添加角色
  */
    addRole = async () => {
        const roleName = this.form.getFieldValue('roleName')
        this.form.resetFields()
        this.setState({
            isShowAdd: false
        })

        const result = await reqAddRole(roleName)
        if (result.status === 0) {
            message.success('添加角色成功')
            const role = result.data

            // const roles = this.state.roles  // 不会重新渲染
            const roles = [...this.state.roles]

            roles.push(role)
            this.setState({
                roles: roles
            })

        }
    }

    //用来绑定行操作的事件监听
    onRow = (role) => {
        return {
            onClick: (event) =>{ //点击行
                this.setState({
                    role
                })
            },
        }
    }
    //初始化
    componentWillMount(){
        this.initColumns()
    }
    componentDidMount (){
        this.getRoles()
    }

    render() {
        const {roles,isShowAdd,isShowRoleAuth, role} = this.state

        //选择功能的配置
        const rowSelection = {
            type:'radio',
            selectedRowKeys: [role._id],
            onChange: (selectedRowKeys,selectedRows) =>{
                console.log('----------',selectedRowKeys, selectedRows);
                //界面显示需要更新状态中的role的值，
                this.setState({
                    role: selectedRows[0]
                })
            }


        }
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={()=> this.showAddRole()}>创建角色</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                {/*判断当前角色有没有_id 有的话就可以操作，没有就disabled*/}
                    <Button type='primary' onClick={()=> this.showRoleAuth()} disabled={!role._id}>设置角色权限</Button>
                </Card>
                <Table
                    columns={this.columns}
                    rowKey='_id'
                    dataSource={roles}
                    bordered
                    rowSelection={rowSelection}
                    onRow={this.onRow}
                    pagination={{defaultPageSize: 100, showQuickJumper: true}}>

                </Table>
                <Modal
                    title="创建角色"
                    visible={isShowAdd}
                    onCancel={() => {
                        this.setState({isShowAdd: false})
                    }}
                    onOk={this.addRole}
                >
                    <AddRoleForm setForm={(form) => this.form = form}/>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowRoleAuth}
                    onCancel={() => {
                        this.setState({isShowRoleAuth: false})
                    }}
                    onOk={this.addRole}
                >
                    <RoleAuthForm setForm={(form) => this.form = form}/>
                </Modal>


            </div>
        )
    }
}


//添加角色表单组件
export class AddRoleForm extends PureComponent{

    //接收！！！！！！！！！！！！！！！！！！！！！
    componentWillMount(){
        this.props.setForm(this.props.form)
    }

    render(){

        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        }
        return(
            <Form>
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('roleName', {
                            initialValue: ''
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }

}
AddRoleForm = Form.create()(AddRoleForm)


/*
用来设置角色权限的form组件
 */
class RoleAuthForm extends PureComponent {

    //外部传进来roleName的值
    //声明
    static propTypes = {
        roleName : PropTypes.string
    }



    render() {
        const {roleName} = this.props
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        }

        return (

            <Form>
                <FormItem label='角色名称：' {...formItemLayout}>
                    <Input value={roleName}/>
                </FormItem>
            </Form>
        )
    }
}


