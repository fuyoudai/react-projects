import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { Card, Table, Button, Popconfirm, message } from 'antd'
import { loadProduct } from '../../../store/actions/product'
import { listApi, delOne, modifyOne } from '../../../services/products'
import { serverUrl } from '../../../utils/config'

function List(props) {
  // const [dataSource, setDataSource] = useState([])
  // const [total,setTotal] = useState(0)
  // const [currentPage,setCurrentPage] = useState(0)

  const { lists, page, total } = props

  useEffect(() => {
    props.dispatch(
      loadProduct({
        page:1
      })
    )
    // listApi().then(res => {
    //   console.log(res,"list")
    //   setDataSource(res.products)
    //   setTotal(res.totalCount)
    // })
  }, [])
  const loadData = () => {
    props.dispatch(
      loadProduct({
        page
      })
    )
  }
  const columns = [
    {
      title: '序号',
      key: '_id',
      width: 80,
      align: 'center',
      render: (txt,record,index) => index+1
    },
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '主图',
      dataIndex: 'coverImg',
      render:(txt,record) => record.coverImg ? (
        <img src={serverUrl+record.coverImg} alt={record.name} style={{width:"120px"}} />
      ):("暂无图片")
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '是否在售',
      dataIndex: 'onSale',
      render:(txt, record) => record.onSale ? "在售" : "已下架"
    },
    {
      title: '操作',
      render: (txt, record, index) => {
        return (
          <div>
            <Button type="primary" size="small" onClick={()=>{
              props.history.push(`/admin/products/edit/${record._id}`)
            }}>修改</Button>
            <Popconfirm
              title="确定删除此项?"
              onCancel={() => console.log('用户取消删除')}
              onConfirm={() => {
                delOne(record._id).then(res => {
                  message.success('删除成功')
                  loadData();
                }).catch(err =>{
                  message.error('删除失败')
                })
              }}
            >
              <Button style={{ margin: '0 0.5rem' }} type="danger" size="small">删除</Button>
            </Popconfirm>
            <Button
              size="small"
              onClick={()=>{
                modifyOne(record._id, {onSale: !record.onSale}).then(res => {
                  loadData();
                })
              }}
            >
              {record.onSale?'下架':'上架'}
            </Button>
          </div>
        )
      }
    }
  ]
  return (
    <Card
      title="商品列表"
      extra={
        <Button
          type="primary"
          size="small"
          onClick={() => props.history.push('/admin/products/edit')}
        >
          新增
        </Button>}
    >
      <Table 
        rowKey="_id"
        pagination={{total,defaultPageSize:2,onChange:page => props.dispatch(loadProduct({page}))}} 
        columns={columns} bordered dataSource={lists} />
    </Card>
  )
}

export default connect(state=>state.product)(List)
