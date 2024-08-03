import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Rate, Button, Typography } from 'antd'
import { LikeOutlined, MessageOutlined, FlagOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text, Link } = Typography

const RatingCard = ({
  rating,
  title,
  description,
  detailsLink,
  helpfulCount,
  reviewer,
  reviewDate,
}) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Rate disabled defaultValue={rating} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Title level={4}>{title}</Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Paragraph
            ellipsis={{ rows: 2, expandable: true, symbol: 'More Details' }}>
            {description}
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={16} justify='space-between'>
        <Col>
          <Text>{reviewer}</Text>
        </Col>
        <Col>
          <Text>{reviewDate}</Text>
        </Col>
      </Row>
    </Card>
  )
}

RatingCard.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  detailsLink: PropTypes.string,
  helpfulCount: PropTypes.number,
  reviewer: PropTypes.string.isRequired,
  reviewDate: PropTypes.string.isRequired,
}

RatingCard.defaultProps = {
  detailsLink: '#',
  helpfulCount: 0,
}

export default RatingCard
