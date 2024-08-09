import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Rate, Tag, Typography } from 'antd'

const { Title, Text } = Typography

const RatingCard = ({
  rating,
  title,
  description,
  detailsLink,
  helpfulCount,
  reviewer,
  heading,
  date,
  extra,
  isTag,
}) => {
  return (
    <Card title={heading} style={{ marginBottom: '20px' }} extra={extra}>
      {rating && (
        <Row gutter={16}>
          <Col span={24}>
            <Rate disabled value={rating} />
          </Col>
        </Row>
      )}
      {title && (
        <Row gutter={16}>
          <Col span={24}>
            <Title level={4}>{title}</Title>
          </Col>
        </Row>
      )}
      {description && (
        <Row gutter={16}>
          <Col span={24}>
            <p>{description}</p>
          </Col>
        </Row>
      )}
      {(reviewer || date) && (
        <Row gutter={16} justify='space-between'>
          {reviewer && (
            <Col>
              {isTag === false ? (
                <span>{reviewer}</span>
              ) : (
                <Tag color='geekblue'>{reviewer}</Tag>
              )}
            </Col>
          )}
          {date && (
            <Col>
              <Text>{date}</Text>
            </Col>
          )}
        </Row>
      )}
    </Card>
  )
}

RatingCard.propTypes = {
  rating: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  detailsLink: PropTypes.string,
  helpfulCount: PropTypes.number,
  reviewer: PropTypes.string,
  heading: PropTypes.string,
  date: PropTypes.string,
  extra: PropTypes.node, // Add prop type for extra
}

RatingCard.defaultProps = {
  detailsLink: '#',
  helpfulCount: 0,
}

export default RatingCard
