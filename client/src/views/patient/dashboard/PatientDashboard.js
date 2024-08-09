import React from 'react'
import { Row, Col, Card } from 'antd'
import { useSelector } from 'react-redux'
import MenuFooter from '../../../layouts/components/footer'

const PatientDashboard = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <Row gutter={[32, 0]}>
        <Col span={24}>
          <h2
            style={{
              marginLeft: '10px',
            }}>
            Welcome, {user?.name.split(' ')[0]} 👋
          </h2>
        </Col>
      </Row>
      <Row gutter={[32, 0]}>
        <Col span={24}>
          <h2
            style={{
              marginLeft: '10px',
            }}>
            Please select what you want to do...
          </h2>
        </Col>
      </Row>
      <div className='site-card-wrapper'>
        <Row gutter={16} justify='center'>
          <Col span={8}>
            <Card
              hoverable
              onClick={() => (window.location.href = '/patient/find-doctor')}
              title='Find a Doctor'
              bordered={false}
              style={{ height: '100%' }}>
              Search for a doctor and check out reviews, ratings, and more.
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              title='Review a Doctor'
              bordered={false}
              style={{ height: '100%' }}>
              Look into your past appointments and review your experience with
              the doctor.
            </Card>
          </Col>
        </Row>
      </div>
      <MenuFooter />
    </>
  )
}

export default PatientDashboard
