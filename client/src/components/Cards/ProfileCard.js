import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Card, Progress, Row, Col, Rate, Tag } from 'antd'
import Meta from 'antd/lib/card/Meta'

const ProfileCard = ({
  avatar,
  title,
  description,
  details,
  progressBars,
  actions,
  ratingData,
  profileCardStyle,
}) => {
  return (
    <Card
      style={{
        width: '75%',
        marginBottom: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        ...profileCardStyle,
      }}
      className='doctor-card'>
      <Row gutter={16} align='start'>
        {avatar && (
          <Col
            xs={24}
            sm={24}
            md={4}
            lg={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Avatar
              src={avatar}
              alt='Avatar'
              size={100}
              className='doctor-card-avatar'
            />
          </Col>
        )}
        <Col xs={24} sm={24} md={14} lg={14}>
          <div className='doctor-card-info'>
            <Meta title={title} description={description} />
            <Rate allowHalf disabled value={ratingData.value} />
            <span className='ant-rate-text'>{`(${ratingData.value})`}</span>
            <div>
              <Tag color={ratingData?.color ? ratingData.color : 'white'}>
                {ratingData.label}
              </Tag>
            </div>
            <Row gutter={[16, 16]} justify={'space-evenly'}>
              {progressBars?.map((bar, index) => (
                <Col key={index} style={{ textAlign: 'center' }}>
                  <Progress
                    key={index}
                    width={80}
                    className='progress'
                    type='circle'
                    percent={(bar.value / 5) * 100}
                    format={() => `${bar.value}`}
                    strokeColor={bar?.color ? bar.color : 'blue'}
                  />
                  <div style={{ paddingTop: '5px' }}>
                    <Tag color={bar?.color ? bar.color : 'blue'}>
                      {bar.label}
                    </Tag>
                  </div>
                </Col>
              ))}
            </Row>
            <br />
            {details?.map((detail, index) => (
              <span key={index} style={{ marginRight: '10px' }}>
                <strong>{detail.label}: </strong>
                {detail.value}
              </span>
            ))}
          </div>
        </Col>
        {actions && (
          <Col
            xs={24}
            sm={24}
            md={6}
            lg={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <div className='doctor-card-actions'>
              {actions?.map((action) => (
                <Button
                  type={action.type}
                  style={{ marginBottom: '10px' }}
                  disabled={action.disabled}
                  onClick={action.onClick}
                  key={action.label}>
                  {action.label}
                </Button>
              ))}
            </div>
          </Col>
        )}
      </Row>
    </Card>
  )
}

ProfileCard.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  details: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  progressBars: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
}

export default ProfileCard
