import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Rate, Button, Typography, Tag } from 'antd'
import { LikeOutlined, MessageOutlined, FlagOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text, Link } = Typography

const RatingCard = ({
  rating,
  title,
  description,
  detailsLink,
  helpfulCount,
  reviewer,
  heading,
  date,
}) => {
  console.log('reviewRate==>', rating)
  return (
    <Card title={heading} style={{ marginBottom: '20px' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Rate disabled value={rating} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Title level={4}>{title}</Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <p>{description}</p>
        </Col>
      </Row>
      <Row gutter={16} justify='space-between'>
        <Col>
          <Tag color='geekblue'>{reviewer}</Tag>
        </Col>
        <Col>
          <Text>{date}</Text>
        </Col>
      </Row>
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
  reviewDate: PropTypes.string,
}

RatingCard.defaultProps = {
  detailsLink: '#',
  helpfulCount: 0,
}

export default RatingCard
