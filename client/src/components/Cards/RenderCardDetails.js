import React from 'react'
import { Card, Col, Row } from 'antd'
import PropTypes from 'prop-types'
import '../../assets/css/cards.css' // Make sure to create this CSS file
import { GrCertificate } from 'react-icons/gr'

const RenderCardDetails = ({ title, description, icon }) => {
  console.log('description==>', description)
  return (
    <Card
      style={{
        width: '100%',
        marginBottom: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
      }}
      className='detail-card'>
      <Row gutter={16}>
        <Col
          xs={24}
          sm={24}
          md={20}
          lg={20}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          {title?.length > 0 && <h3 style={{ marginBottom: 0 }}>{title}</h3>}
          {description?.length > 0 && (
            <p style={{ marginTop: '10px', fontSize: '16px' }}>{description}</p>
          )}
        </Col>
        <Col
          xs={24}
          sm={24}
          md={4}
          lg={4}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'start',
          }}>
          {icon}
        </Col>
      </Row>
    </Card>
  )
}

RenderCardDetails.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.element,
}

RenderCardDetails.defaultProps = {
  icon: <GrCertificate style={{ fontSize: '24px' }} />,
}

export default RenderCardDetails
