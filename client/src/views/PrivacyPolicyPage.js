import React from 'react'
import { Layout, Menu, Button, Row, Col, Avatar, Typography, Tag } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/images/logo/logoText.png'
import MenuFooter from '../layouts/components/footer'
import { SiTrustpilot } from 'react-icons/si'
import { MdOutlineSecurity } from 'react-icons/md'
import { FaBook, FaStethoscope } from 'react-icons/fa6'
import { GrUserExpert } from 'react-icons/gr'
import CardGrid from '../components/Cards/CardGrid'

const { Header, Content } = Layout
const { Title, Paragraph } = Typography

const PrivacyPolicyPage = () => {
  const renderAnimatedCircles = () => (
    <svg width='200' height='200' style={{ position: 'absolute', zIndex: 10 }}>
      <circle
        cx='100'
        cy='100'
        r='30'
        stroke='rgb(30, 156, 227)'
        strokeWidth='4'
        fill='none'
        className='circle-animation'
      />
      <circle
        cx='100'
        cy='100'
        r='30'
        stroke='rgb(87, 221, 190)'
        strokeWidth='4'
        fill='none'
        className='circle-animation'
        style={{ animationDelay: '0.5s' }}
      />
      <circle
        cx='100'
        cy='100'
        r='30'
        stroke='rgb(30, 156, 227)'
        strokeWidth='4'
        fill='none'
        className='circle-animation'
        style={{ animationDelay: '1s' }}
      />
    </svg>
  )
  const dataWithIcons = [
    {
      icon: (
        <FaStethoscope
          style={{ fontSize: '30px', color: 'rgb(30, 156, 227)' }}
        />
      ),
      title: 'Find Top Doctors',
      description:
        'Easily search for and connect with highly-rated healthcare professionals based on specialty, location, and patient feedback',
    },
    {
      icon: (
        <MdOutlineSecurity
          style={{ fontSize: '30px', color: 'rgb(30, 156, 227)' }}
        />
      ),
      title: 'Secure & Confidential',
      description:
        ' We prioritize the security of your personal health information with advanced encryption and data protection',
    },
    {
      icon: (
        <SiTrustpilot
          style={{ fontSize: '30px', color: 'rgb(30, 156, 227)' }}
        />
      ),
      title: 'Real Patient Reviews',
      description:
        'Read verified reviews from real patients to make informed decisions about your healthcare',
    },
    {
      icon: (
        <GrUserExpert
          style={{ fontSize: '30px', color: 'rgb(30, 156, 227)' }}
        />
      ),
      title: 'Expert Healthcare Advice',
      description:
        'Our network of professionals offers expert medical advice to help you manage your health effectively.',
    },
  ]
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
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Tag
              color='geekblue'
              style={{
                fontSize: '24px',
                padding: '5px 10px',
                marginBottom: '20px',
              }}>
              Privacy Policy
            </Tag>
            <p className='paragraphStyles'>
              At MedTrust, we respect your privacy and are committed to
              protecting the personal information you share with us. This
              privacy policy explains how we collect, use, and safeguard your
              information.
            </p>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Title level={3}>1. Information We Collect</Title>
            <Paragraph>
              We collect information that you provide directly to us when you
              use our services, such as when you create an account, post
              reviews, or communicate with healthcare providers. The information
              we collect may include your name, email address, contact
              information, and any content you submit to the platform.
            </Paragraph>

            <Title level={3}>2. How We Use Your Information</Title>
            <Paragraph>
              We use the information we collect for various purposes, including:
            </Paragraph>
            <ul>
              <li>To provide and improve our services</li>
              <li>To connect patients with healthcare providers</li>
              <li>To personalize your experience on the platform</li>
              <li>To send you updates, promotions, and other communications</li>
            </ul>

            <Title level={3}>3. Data Sharing and Disclosure</Title>
            <Paragraph>
              We do not share your personal information with third parties
              except as necessary to provide our services, comply with legal
              obligations, or protect the rights and safety of our users.
            </Paragraph>

            <Title level={3}>4. Data Security</Title>
            <Paragraph>
              We take reasonable measures to protect your personal information
              from unauthorized access, use, or disclosure. However, no method
              of transmission over the Internet is completely secure, and we
              cannot guarantee absolute security.
            </Paragraph>

            <Title level={3}>5. Your Rights</Title>
            <Paragraph>
              You have the right to access, update, and delete your personal
              information. You may also request to restrict the processing of
              your information or object to its use under certain circumstances.
            </Paragraph>

            <Title level={3}>6. Changes to This Policy</Title>
            <Paragraph>
              We may update this privacy policy from time to time. When we make
              changes, we will notify you by updating the policy date at the top
              of this page. Your continued use of the platform after the changes
              become effective means that you agree to the revised policy.
            </Paragraph>

            <Title level={3}>7. Contact Us</Title>
            <Paragraph>
              If you have any questions or concerns about this privacy policy or
              our data practices, please contact us at:
            </Paragraph>
            <br />
            <br />
          </Col>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            xs={24}
            sm={12}
            md={12}
            lg={12}
            xl={12}>
            <img
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwEko0bhKiCiQxMSdkyZfpX2WHWTM4uXsPLw&s'
              }
              alt='right-content'
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Col>
        </Row>

        <MenuFooter />
      </Content>
    </Layout>
  )
}

export default PrivacyPolicyPage
