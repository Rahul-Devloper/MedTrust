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

const AboutPage = () => {
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
              About MedTrust
            </Tag>
            <p className='paragraphStyles'>
              MedTrust is a trusted healthcare platform designed to connect
              patients with qualified medical professionals. Our mission is to
              provide personalized healthcare solutions by offering a seamless
              platform for booking appointments, accessing patient reviews, and
              ensuring top-quality medical care.
            </p>
            <div
              style={{
                textAlign: 'center',
                marginTop: '40px',
                position: 'relative',
              }}>
              <Tag
                color='purple'
                style={{
                  fontSize: '24px', // h2 typically has a font size of 24px
                  padding: '5px 10px',
                  margin: '10px',
                  marginBottom: '40px',
                }}>
                What we Offer
              </Tag>
              <CardGrid dataWithIcons={dataWithIcons} />
              {/* <div style={{ position: 'absolute', top: 0, right: 0 }}>
            {renderAnimatedCircles()}
          </div> */}
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Tag
              color='geekblue'
              style={{
                fontSize: '24px',
                padding: '5px 10px',
                marginBottom: '20px',
              }}>
              Our Mission
            </Tag>
            <p className='paragraphStyles'>
              At MedTrust, our mission is to create a healthcare ecosystem that
              prioritizes patient empowerment, transparency, and access to
              quality medical care. We are committed to ensuring that patients
              receive the best possible experience by providing them with the
              tools they need to find trusted medical professionals, read honest
              reviews, and make informed healthcare decisions.
              <br />
              <br />
              We aim to bridge the gap between patients and healthcare providers
              by fostering trust, improving communication, and delivering
              excellence in care. MedTrust is dedicated to setting new standards
              in healthcare technology through innovation, security, and
              patient-centered services.
            </p>
            <br />
            <br />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <img
              src={
                'https://mylakehuron.com/wp-content/uploads/2022/10/doctors-fist-bump-teamwork-motivation-solidarity-hands-sign-commitment-motivation-goal-healthcare-group-people-standing-together-support-innovation-mission-medical-inclusion-scaled.jpg'
              }
              alt='right-content'
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Col>
        </Row>
        <Row
          gutter={[32, 32]}
          style={{
            marginTop: '40px',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: 'white',
          }}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <img
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtsE_BCO0EOwPLLkeftJ2QhApgkHWWh3ulRQ&s'
              }
              alt='left-content'
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Tag
              color='geekblue'
              style={{
                fontSize: '24px',
                padding: '5px 10px',
                marginBottom: '20px',
              }}>
              Our Vision
            </Tag>
            <p className='paragraphStyles'>
              At MedTrust, we believe in empowering patients to take control of
              their health by providing access to the best medical professionals
              and healthcare services. Our goal is to make healthcare more
              accessible, transparent, and patient-centered. <br />
              <br />
              Whether you're looking to book an appointment with a specialist,
              read patient reviews, or simply learn more about a medical
              condition, MedTrust is your trusted partner in healthcare.
            </p>
            <br />
            <Button
              type='primary'
              style={{
                backgroundColor: '#57ddbe',
                borderColor: '#57ddbe',
                borderRadius: '50px',
              }}>
              <Link to='/login'>Start Reviewing</Link>
            </Button>
          </Col>
        </Row>

        <MenuFooter />
      </Content>
    </Layout>
  )
}

export default AboutPage
