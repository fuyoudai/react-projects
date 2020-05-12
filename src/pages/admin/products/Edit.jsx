import React from 'react'
import {Card,Form,Input, Button} from 'antd'

function Edit(props) {
  const {getFieldDecorator} = props.form;
  return (
    <Card title="商品编辑">
      <Form>
        <Form.Item label="商品名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入商品名称'
              }
            ]
          })(<Input placeholder="请输入商品名称" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary">保存</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Form.create({name:'productEdit'})(Edit)
