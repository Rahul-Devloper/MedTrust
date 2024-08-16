import React from 'react'
import {
  Layout,
  Menu,
  Button,
  Carousel,
  Row,
  Col,
  Card,
  Tag,
  Rate,
  Avatar,
  Image,
} from 'antd'
import { Link, NavLink } from 'react-router-dom'
import CardGrid from '../components/Cards/CardGrid'
import CarouselOne from '../assets/images/pages/home/carouselOne.png'
import CarouselTwo from '../assets/images/pages/home/carouselTwo.png'
import CarouselThree from '../assets/images/pages/home/carouselThree.png'
import LeftImage from '../assets/images/pages/home/leftImage.png'
import RightImage from '../assets/images/pages/home/rightImage.png'
import MaleAvatar from '../assets/images/illustrations/doctorMaleAvatar.png'
import FemaleAvatar from '../assets/images/illustrations/doctorFemaleAvatar.png'
import logo from '../assets/images/logo/logoText.png'
import MenuFooter from '../layouts/components/footer'
import '../assets/css/fontStyles.css'

const { Header, Content } = Layout

const HomePage = () => {
  const categories = [
    'Verified Doctors',
    'Trusted Reviews',
    'Data Security',
    'User-Friendly',
  ]

  const testimonials = [
    {
      content:
        'This app has transformed the way I find and interact with doctors!',
      author: 'John Doe',
      rating: 5,
      avatar: MaleAvatar,
    },
    {
      content: 'A wonderful experience, highly recommended!',
      author: 'Jane Smith',
      rating: 4,
      avatar: FemaleAvatar,
    },
    {
      content: 'Very easy to use and find specialists in my area.',
      author: 'Mark Johnson',
      rating: 5,
      avatar: MaleAvatar,
    },
    {
      content: 'The best app for finding healthcare providers quickly.',
      author: 'Emily Davis',
      rating: 4,
      avatar: FemaleAvatar,
    },
  ]

  // Function to render animated SVG circles
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            style={{ width: '50%', height: '50px', borderRadius: '0' }}
            preview={false}
            src={logo}
          />
          <Menu
            mode='horizontal'
            defaultSelectedKeys={['home']}
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
          padding: '0 20px',
          marginTop: '20px',
          backgroundColor: 'ghostwhite',
        }}>
        <Carousel autoplay>
          <div>
            <img
              src={CarouselOne}
              alt='carousel-1'
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
          <div>
            <img
              src={CarouselTwo}
              alt='carousel-2'
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
          <div>
            <img
              src={CarouselThree}
              alt='carousel-3'
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
        </Carousel>

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
            App Specialities
          </Tag>
          <CardGrid toRenderView={true} children={categories} />
          {/* <div style={{ position: 'absolute', top: 0, right: 0 }}>
            {renderAnimatedCircles()}
          </div> */}
        </div>

        {/* First Row: Image Left, Content Right */}
        <Row
          gutter={[32, 32]}
          style={{
            marginTop: '40px',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: 'white',
          }}>
          <Col span={12}>
            <img
              src={LeftImage}
              alt='left-content'
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col span={12}>
            <Tag
              color='geekblue'
              style={{
                fontSize: '24px',
                padding: '5px 10px',
                marginBottom: '20px',
              }}>
              Why Choose Us ?
            </Tag>
            <p className='paragraphStyles'>
              Our platform connects you with top-rated healthcare professionals,
              providing you with verified reviews and comprehensive information
              to make informed decisions about your health. With a user-friendly
              interface and robust data security, we ensure your experience is
              both seamless and secure
            </p>
          </Col>
          <div
            style={{
              position: 'absolute',
              top: '6.5rem',
              right: '39.5rem',
            }}>
            {renderAnimatedCircles()}
          </div>
        </Row>

        {/* Second Row: Content Left, Image Right */}
        <Row
          gutter={[32, 32]}
          style={{
            marginTop: '40px',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: 'white',
          }}>
          <Col span={12}>
            <Tag
              color='geekblue'
              style={{
                fontSize: '24px',
                padding: '5px 10px',
                marginBottom: '20px',
              }}>
              Empowering your health journey
            </Tag>
            <p className='paragraphStyles'>
              Our platform connects you with top healthcare professionals and
              facilities, providing you with reliable reviews and ratings from
              real patients. Whether you’re looking for a specialist, checking
              services, or reading experiences shared by others, our app ensures
              you make informed decisions. Seamlessly search for doctors,
              compare ratings—all in one secure and easy-to-use platform. We’re
              here to empower you with the information you need for your health
              journey
            </p>
          </Col>
          <Col span={12}>
            <img
              src={RightImage}
              alt='right-content'
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Col>
          <div
            style={{
              position: 'absolute',
              top: '6.5rem',
              left: '17.5rem',
            }}>
            {renderAnimatedCircles()}
          </div>
        </Row>

        {/* Achievements Section */}
        <div
          style={{
            backgroundColor: '#57ddbe',
            padding: '40px 20px',
            marginTop: '60px',
            borderRadius: '10px',
            textAlign: 'center',
            color: '#fff',
          }}>
          <Row
            justify='space-between'
            gutter={[16, 16]}
            style={{ color: '#fff' }}>
            <Col span={6}>
              <div>
                <h2 style={{ color: '#fff' }}>12+</h2>
                <p style={{ color: '#fff' }}>Years of Industry Knowledge</p>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <h2 style={{ color: '#fff' }}>550+</h2>
                <p style={{ color: '#fff' }}>Signed In Practitioners Listed</p>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <h2 style={{ color: '#fff' }}>300+</h2>
                <p style={{ color: '#fff' }}>Active Medical Respondants</p>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <h2 style={{ color: '#fff' }}>UK-Wide</h2>
                <p style={{ color: '#fff' }}>Coverage Across the Nation</p>
              </div>
            </Col>
          </Row>
        </div>

        {/* Testimonials Section */}
        {/* Testimonials Section */}
        <div
          style={{
            marginTop: '60px',
            textAlign: 'center',
            marginBottom: '40px',
            backgroundColor: 'white',
          }}>
          <Tag
            color='geekblue'
            style={{
              fontSize: '24px',
              padding: '5px 10px',
              marginBottom: '20px',
              marginTop: '40px',
            }}>
            Testimonials
          </Tag>
          <Carousel className='homepageCarousel' autoplay>
            {testimonials
              .reduce((acc, testimonial, index) => {
                if (index % 1 === 0) {
                  acc.push([testimonial])
                } else {
                  acc[acc.length - 1].push(testimonial)
                }
                return acc
              }, [])
              .map((pair, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#f0f0f0',
                  }}>
                  {pair.map((testimonial, subIndex) => (
                    <Card
                      key={subIndex}
                      style={{
                        margin: '10px',
                        width: '45%',
                        padding: '20px',
                        textAlign: 'left',
                        background: '#f0f0f0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        backgroundColor: 'rgb(30 156 227)',
                        color: 'white',
                      }}>
                      <img
                        src={Math.random() > 0.5 ? MaleAvatar : FemaleAvatar}
                        alt='avatar'
                        style={{
                          width: 100,
                          height: 'auto',
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          marginBottom: '10px',
                        }}
                      />
                      <div>
                        <p>{testimonial.content}</p>
                        <p>
                          <strong>- {testimonial.author}</strong>
                        </p>
                        <Rate
                          disabled
                          defaultValue={Math.random() > 0.5 ? 5 : 4}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
          </Carousel>
        </div>

        <MenuFooter />
      </Content>
    </Layout>
  )
}

export default HomePage
