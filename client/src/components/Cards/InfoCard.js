// InfoCard.js
import React from 'react'
import { Avatar, Button, Card } from 'antd'
import PropTypes from 'prop-types'
import '../../assets/css/cards.css'

const { Meta } = Card

const InfoCard = ({
  avatar,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  const actionStyle = {
    height: '100%',
  }

  return (
    <Card
      className='info-card'
      style={actionStyle}
      actions={[
        <Button
          type='primary'
          className='info-card-action'
          onClick={onButtonClick}>
          {buttonText}
        </Button>,
      ]}>
      <Meta
        className='info-card-meta'
        avatar={
          <Avatar
            src={avatar}
            alt='Avatar'
            style={{ width: '100%', height: 'auto' }}
          />
        }
        title={title}
        description={description}
      />
    </Card>
  )
}

InfoCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
}

export default InfoCard
