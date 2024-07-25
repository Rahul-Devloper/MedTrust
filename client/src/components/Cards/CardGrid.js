import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { useHistory } from 'react-router-dom'
import '../../assets/css/cards.css'

const CategoryGrid = ({ children, gridStyle, toRenderView, viewPath }) => {
  const history = useHistory()

  const handleChildClick = (child) => {
    const formattedChild = child.trim().replace(/\s+/g, '-')
    viewPath.length !== 0 && history.push(`${viewPath}${formattedChild.trim()}`)
  }

  return (
    <Card>
      {children?.map((child, index) =>
        toRenderView ? (
          <Card.Grid
            key={index}
            style={gridStyle}
            onClick={() => handleChildClick(child)}>
            {child}
          </Card.Grid>
        ) : (
          <Card.Grid key={index} style={gridStyle}>
            {child}
          </Card.Grid>
        )
      )}
    </Card>
  )
}

CategoryGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
  gridStyle: PropTypes.object,
  toRenderView: PropTypes.bool,
  viewPath: PropTypes.string,
}

CategoryGrid.defaultProps = {
  gridStyle: { width: '25%', textAlign: 'center', cursor: 'pointer' },
  toRenderView: true,
  viewPath: '',
}

export default CategoryGrid
