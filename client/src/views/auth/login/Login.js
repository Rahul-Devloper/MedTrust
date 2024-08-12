import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox, Modal } from 'antd'
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import LeftContent from '../leftContent'
import {
  loginAction,
  googleLoginAction,
  verifyOtpAction, // Assuming you have an action to verify the OTP
} from '../../../redux/actions/authActions'
import { ErrorNotification } from '../../../components'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpModalVisible, setOtpModalVisible] = useState(false)
  const [otp, setOtp] = useState('')
  const [userId, setUserId] = useState(null)
  const dispatch = useDispatch()

  // Handle email password login
  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    // Validate email regex
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) {
      ErrorNotification('Please enter a valid email')
      return
    }

    // Make sure the password is at least 6 characters
    if (password.length < 6) {
      ErrorNotification('Please enter a valid password')
      return
    }

    // Dispatch email, password and history to action
    const user = await dispatch(
      loginAction({ email, password, history, setLoading })
    )
    if (user?.userId) {
      setOtpModalVisible(true)
      setUserId(user?.userId)
    }
  }

  // Handle google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    const userObject = jwt_decode(credentialResponse.credential)
    const { name, email } = userObject
    setLoading(true)

    // Dispatch email, password and history to action
    dispatch(googleLoginAction({ name, email, history }))
  }

  // Handle google login failure
  const handleGoogleFailure = () => {
    console.log('GOOGLE_LOGIN_ERROR')
  }

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      ErrorNotification('Please enter a valid 6-digit OTP')
      return
    }

    dispatch(
      verifyOtpAction({ userId, otp, history, setLoading }) // Assuming you have this action
    )
  }

  return (
    <>
      <Row className='hp-authentication-page'>
        <LeftContent />

        <Col lg={12} md={12} sm={12} className='hp-py-sm-0 hp-py-md-64'>
          <Row className='hp-h-100' align='middle' justify='center'>
            <Col
              xxl={11}
              xl={15}
              lg={20}
              md={20}
              sm={24}
              className='hp-px-sm-8 hp-pt-24 hp-pb-48'>
              <h1 className='hp-mb-sm-0'>Login</h1>
              <p className='hp-mt-sm-0 hp-mt-8 hp-text-color-black-60'>
                Welcome back, please login to your account.
              </p>

              <Form
                layout='vertical'
                name='basic'
                initialValues={{ remember: true }}
                className='hp-mt-sm-16 hp-mt-32'>
                <Form.Item
                  label='Email :'
                  className='hp-mb-16'
                  rules={[
                    { required: true, message: 'Please enter your email' },
                  ]}>
                  <Input
                    id='validating'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label='Password :'
                  className='hp-mb-8'
                  rules={[
                    { required: true, message: 'Please enter your password' },
                  ]}>
                  <Input.Password
                    id='warning2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Row align='middle' justify='space-between'>
                  <Form.Item className='hp-mb-0'>
                    <Checkbox name='remember'>Remember me</Checkbox>
                  </Form.Item>

                  <Link
                    className='hp-button hp-text-color-black-80 hp-text-color-dark-40'
                    to='/forgot-password'>
                    Forgot Password?
                  </Link>
                </Row>

                <Form.Item className='hp-mt-16 hp-mb-8'>
                  <Button
                    block
                    type='primary'
                    htmlType='submit'
                    onClick={handleLoginSubmit}
                    loading={loading}>
                    Sign in
                  </Button>
                </Form.Item>
              </Form>

              <Col className='hp-form-info'>
                <span className='hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4'>
                  Don’t you have an account?
                </span>

                <Link
                  className='hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption'
                  to='/signup'>
                  {' '}
                  Create an account
                </Link>
              </Col>

              <Col className='hp-or-line hp-text-center hp-mt-16'>
                <span className='hp-caption hp-text-color-black-80 hp-text-color-dark-30 hp-px-16 hp-bg-color-black-0 hp-bg-color-dark-100'>
                  Or
                </span>
              </Col>

              <Col className='hp-or-line hp-text-center hp-mt-16'>
                <Button
                  type='primary'
                  onClick={() => (window.location.href = '/guest/find-doctor')}>
                  Guest Login
                </Button>
              </Col>

              {/* <Col
                className="hp-account-buttons hp-mt-16"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleSuccess(credentialResponse);
                  }}
                  onError={() => {
                    handleGoogleFailure();
                  }}
                />
              </Col> */}

              <Col
                className='hp-other-links hp-mt-24'
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                }}>
                <Link
                  to='/privacy'
                  className='hp-text-color-black-80 hp-text-color-dark-40'
                  style={{
                    marginRight: '8px',
                  }}>
                  Privacy Policy
                </Link>
                <Link
                  to='/terms'
                  className='hp-text-color-black-80 hp-text-color-dark-40'>
                  Term of use
                </Link>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* OTP Modal */}
      <Modal
        title='Enter OTP Sent To Your Registered Email'
        visible={otpModalVisible}
        onCancel={() => setOtpModalVisible(false)}
        footer={[
          <Button key='submit' type='primary' onClick={handleOtpSubmit}>
            Submit
          </Button>,
        ]}>
        <Form.Item
          label='OTP'
          rules={[{ required: true, message: 'Please enter your OTP' }]}>
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
        </Form.Item>
      </Modal>
    </>
  )
}

export default Login;
