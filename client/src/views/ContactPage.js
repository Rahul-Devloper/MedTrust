import React from 'react'
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
  Menu,
  Avatar,
} from 'antd'
import { MailOutlined, UserOutlined } from '@ant-design/icons'
import logo from '../assets/images/logo/logoText.png'
import MenuFooter from '../layouts/components/footer'
import { Link, NavLink } from 'react-router-dom'

const { Header, Content } = Layout

const ContactPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)

    // Display a success notification
    message.success('Query submitted successfully! Redirecting to home...', 2)

    // Manual redirect after 2 seconds
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 0,
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            style={{ width: '50%', height: '50px', borderRadius: '0' }}
            preview={false}
            src={logo}
          />
          <Menu
            mode='horizontal'
            defaultSelectedKeys={['about']}
            style={{ lineHeight: '64px', marginLeft: '50px', flex: 1 }}>
            <Menu.Item key='home'>
              <NavLink exact to='/' activeClassName='ant-menu-item-selected'>
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key='about'>
              <NavLink to='/about' activeClassName='ant-menu-item-selected'>
                About
              </NavLink>
            </Menu.Item>
            <Menu.Item key='privacy-policy'>
              <NavLink
                to='/privacy-policy'
                activeClassName='ant-menu-item-selected'>
                Privacy Policy
              </NavLink>
            </Menu.Item>
            <Menu.Item key='contact'>
              <NavLink to='/contact' activeClassName='ant-menu-item-selected'>
                Contact
              </NavLink>
            </Menu.Item>
            <Menu.Item key='find-doctor'>
              <NavLink
                to='/guest/find-doctor'
                activeClassName='ant-menu-item-selected'>
                Find Doctor
              </NavLink>
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <Button
            type='primary'
            style={{
              marginRight: '10px',
              backgroundColor: '#57ddbe',
              borderColor: '#57ddbe',
              borderRadius: '50px',
            }}>
            <Link to='/signup'>Sign Up</Link>
          </Button>
          <Button
            type='primary'
            style={{
              backgroundColor: '#57ddbe',
              borderColor: '#57ddbe',
              borderRadius: '50px',
            }}>
            <Link to='/login'>Sign In</Link>
          </Button>
        </div>
      </Header>

      <Content
        style={{
          padding: '20px',
          marginTop: '20px',
          backgroundColor: 'ghostwhite',
        }}>
        <Row gutter={[32, 32]} style={{ padding: '40px 0' }}>
          <Col xs={24} md={12}>
            <img
              src={
                'https://static.vecteezy.com/system/resources/previews/020/513/757/non_2x/landline-phone-clipart-flat-design-isolated-on-white-background-free-vector.jpg'
              }
              alt='Contact Us'
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Col>

          <Col xs={24} md={12}>
            <Form
              name='contact_form'
              onFinish={onFinish}
              layout='vertical'
              style={{ maxWidth: '100%', margin: '10px' }}>
              <Form.Item
                name='name'
                label='Your Name'
                rules={[
                  { required: true, message: 'Please input your name!' },
                ]}>
                <Input
                  prefix={<UserOutlined />}
                  placeholder='Enter your name'
                />
              </Form.Item>

              <Form.Item
                name='email'
                label='Your Email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'The input is not a valid email!' },
                ]}>
                <Input
                  prefix={<MailOutlined />}
                  placeholder='Enter your email'
                />
              </Form.Item>

              <Form.Item
                name='message'
                label='Message'
                rules={[
                  { required: true, message: 'Please input your message!' },
                ]}>
                <Input.TextArea placeholder='Enter your message' rows={4} />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{
                    marginRight: '10px',
                    backgroundColor: '#57ddbe',
                    borderColor: '#57ddbe',
                    borderRadius: '50px',
                    textAlign: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <MenuFooter />
      </Content>
    </Layout>
  )
}

export default ContactPage
