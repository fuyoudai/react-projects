import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Dropdown, Icon, Avatar, Badge } from 'antd';
import {withRouter} from 'react-router-dom'
import {adminRoutes} from '../../routes'
import './frame.css' 
import {clearToken} from '../../utils/auth'
const { Header, Content, Sider } = Layout;

function Index(props) {
  console.log(props)
  const routes = adminRoutes.filter(route=>route.isShow)
  const popMenu = (
    <Menu onClick={p => {
      if(p.key === 'logOut') {
        clearToken()
        props.history.push('/login')
      } else if(p.key === 'noti') {
        props.history.push('/admin/notices')
      }
    }}>
      <Menu.Item key="noti">通知中心</Menu.Item>
      <Menu.Item key="setting">设置</Menu.Item>
      <Menu.Item key="logOut">退出</Menu.Item>
    </Menu>
  )
  return (
    <Layout>
      <Header className="header">
        <div>
          <div className="logo" />
          <Menu theme="dark" 
                mode="horizontal"
                style={{position: 'relative',top: '50%',transform: 'translateY(-50%)'}} 
                defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </div>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar>U</Avatar>
            <Badge dot={!props.isAllRead}>
              <span style={{margin:'0 5px'}}>超级管理员</span>
            </Badge>
            <Icon type="down" />
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {routes.map(route=>{
              return (
                <Menu.Item 
                  key={route.path} 
                  icon={route.icon} 
                  onClick={p=>props.history.push(p.key)}>
                  {route.title}
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: '16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = state => state.notice

export default connect(mapStateToProps)(withRouter(Index))
