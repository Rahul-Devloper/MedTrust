import { Avatar, Card, Col, Progress, Rate, Row, Tag } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'

const ProfileCard2 = ({
  avatar,
  title,
  description,
  details,
  progressBars,
  ratingData,
  paragraph,
  progressBarSize,
}) => {
  console.log('paragraph==>', paragraph)
  console.log('avatar==>', avatar)
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
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar
            src={avatar}
            alt='Avatar'
            size={100}
            className='doctor-card-avatar'
          />
          {ratingData && (
            <div>
              <Rate allowHalf disabled value={ratingData.value} />
              <span className='ant-rate-text'>{`(${ratingData.value})`}</span>
              <div>
                <Tag color={ratingData?.color ? ratingData.color : 'white'}>
                  {ratingData.label}
                </Tag>
              </div>
            </div>
          )}
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
            {progressBars ? (
              <Row gutter={16}>
                <Col
                  xs={24}
                  sm={24}
                  md={10}
                  lg={10}
                  style={{ textAlign: 'center' }}>
                  <div>
                    {progressBars.map((bar, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <Progress
                          width={progressBarSize || 80}
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
                      </div>
                    ))}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={14} lg={14}>
                  <p style={{ color: 'gray' }}>
                    {typeof paragraph === 'object' ? (
                      <>
                        <strong>{paragraph?.label}</strong> - {paragraph?.value}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                </Col>
              </Row>
            ) : (
              <p style={{ color: 'gray' }}>
                {typeof paragraph === 'object' ? (
                  <>
                    <strong>{paragraph?.label}</strong> - {paragraph?.value}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default ProfileCard2
