import { Avatar, Card, Col, Rate, Row, Tag } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'

const ProfileCard2 = ({
  avatar,
  title,
  description,
  details,
  progressBars,
  actions,
  ratingData,
  paragraph,
}) => {
  console.log('paragraph==>', paragraph)
  return (
    <Card
      style={{
        width: '100%',
        marginBottom: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      className='doctor-card'>
      <Row gutter={16} align='start'>
        <Col
          xs={24}
          sm={24}
          md={6}
          lg={6}
          style={{
            display: 'flex',
            flexDirection: 'column', // Ensures avatar and ratings are stacked
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar
            src={avatar}
            alt='Avatar'
            size={100}
            className='doctor-card-avatar'
          />
          <div>
            <Rate allowHalf disabled value={ratingData.value} />
            <span className='ant-rate-text'>{`(${ratingData.value})`}</span>
            <div>
              <Tag color={ratingData?.color ? ratingData.color : 'white'}>
                {ratingData.label}
              </Tag>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={18} lg={18}>
          <div className='doctor-card-info'>
            <Meta title={title} description={description} />
            <br />
            <div>
              {details.map((detail, index) => (
                <span key={index} style={{ marginRight: '10px' }}>
                  <strong>{detail.label}: </strong>
                  {detail.value}
                </span>
              ))}
            </div>
            <br />
            <p style={{ color: 'gray' }}>{paragraph}</p>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default ProfileCard2
