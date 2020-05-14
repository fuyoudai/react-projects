import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, message, Upload, Icon } from 'antd'
import { createApi, getOneById, modifyOne } from '../../../services/products'
import { serverUrl } from '../../../utils/config'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

function Edit(props) {
  const { getFieldDecorator } = props.form;
  const [currentData, SetCurrentData] = useState({})
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(''))
  const id = props.match.params.id;

  useEffect(() => {
    if (id) {
      getOneById(id).then(res => {
        SetCurrentData(res)
        setImageUrl(res.coverImg)
        setEditorState(BraftEditor.createEditorState(res.content))
      })
    }
  }, [id])

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  //图片上传
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') { //上传成功
      // Get this url from response in real world.
      setLoading(false);
      console.log(info, "info")
      setImageUrl(info.file.response.info)
    }
  };

  //富文本编辑器
  const handleEditorChange = (editorState) => {
    setEditorState(editorState)
  }

  const handleSubmit = e => {
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    console.log(editorState.toHTML())
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (id) {
          modifyOne(id, { ...values, coverImg: imageUrl, content: editorState.toHTML() }).then(res => {
            message.success("修改成功")
            props.history.push('/admin/products')
          }).catch(err => {
            message.error('修改失败')
          })
        } else {
          createApi({ ...values, coverImg: imageUrl, content: editorState.toHTML() }).then(res => {
            message.success("新增成功")
            props.history.push('/admin/products')
          }).catch(err => {
            message.error('新增失败')
          })
        }
      } else {
        // message.error('请输入正确的内容')
      }
    })
  }
  const priceValidate = (rule, value, callback) => {
    if (value * 1 <= 0) {
      callback('商品价格必须大于0')
    } else {
      callback()
    }
  }
  return (
    <Card
      title="商品编辑"
      extra={
        <Button onClick={() => props.history.push("/admin/products")}>
          返回
        </Button>
      }
    >
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Item label="商品名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入商品名称'
              }
            ],
            initialValue: currentData.name
          })(<Input placeholder="请输入商品名称" />)}
        </Form.Item>
        <Form.Item label="商品价格">
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: '请输入商品价格'
              },
              {
                validator: priceValidate
              }
            ],
            initialValue: currentData.price
          })(<Input placeholder="请输入商品价格" />)}
        </Form.Item>
        <Form.Item label="主图">
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={serverUrl + "/api/v1/common/file_upload"}
            onChange={info => handleChange(info)}
          >
            {imageUrl ? <img src={serverUrl + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="商品详情">
          <BraftEditor
            value={editorState}
            onChange={(e) => handleEditorChange(e)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">保存</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Form.create({ name: 'productEdit' })(Edit)
