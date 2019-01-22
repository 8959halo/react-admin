import React, {Component} from 'react'
import {
    Card,
    Table,
    Button,

} from 'antd'

/*
后台管理的用户管理路由组件
 */

// componentWillMount(){
//     this.init
// }

export default class User extends Component {
    render() {
        return (
            <div>
                user
            </div>
            /*
            <div>
                <Card>
                    <Button type='primary'>创建用户</Button>
                </Card>
                <Table>
                    columns={this.columns}
                    rowKey='_id'
                    dataSource={}
                    bordered
                    rowSelection={rowSelection}
                    onRow={this.onRow}
                    pagination={{defaultPageSize: 100, showQuickJumper: true}}>
                </Table>


            </div>
            */
        )
    }
}