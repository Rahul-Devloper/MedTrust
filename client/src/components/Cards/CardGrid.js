// CategoryGrid.js
import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import '../../assets/css/cards.css'

const CardGrid = ({ children, gridStyle }) => {
  return (
    <Card>
      {children?.map((child, index) => (
        <Card.Grid key={index} style={gridStyle}>
          {child}
        </Card.Grid>
      ))}
    </Card>
  )
}

CardGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
  gridStyle: PropTypes.object,
}

CardGrid.defaultProps = {
  gridStyle: { width: '25%', textAlign: 'center' },
}

export default CardGrid
