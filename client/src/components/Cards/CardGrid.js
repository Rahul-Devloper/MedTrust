import React from 'react'
import PropTypes from 'prop-types'
import { Card, Affix, Row, Col, Button, Anchor } from 'antd'
import { useHistory } from 'react-router-dom'
import '../../assets/css/cards.css'

const { Link: AnchorLink } = Anchor

const CategoryGrid = ({
  children,
  gridStyle,
  toRenderView,
  viewPath,
  isSticky,
  dataWithIcons,
  targetOffset,
}) => {
  const history = useHistory()

  const handleChildClick = (child) => {
    const formattedChild = child.trim().replace(/\s+/g, '-')
    viewPath.length !== 0 && history.push(`${viewPath}${formattedChild.trim()}`)
  }

  const renderGridContent = () => (
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
      <Row gutter={16} justify={'space-evenly'}>
        {dataWithIcons?.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Meta
                avatar={item.icon}
                title={<h4 style={{ margin: 0 }}>{item.title}</h4>}
                description={
                  <p style={{ fontSize: '14px', margin: 0 }}>
                    {item.description}
                  </p>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  )

  if (isSticky) {
    const colSpan = Math.floor(24 / children.length)

    return (
      <Affix offsetTop={targetOffset}>
        <Anchor>
          <Row
            gutter={0}
            justify={'space-evenly'}
            align={'middle'}
            style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
            {children?.map((child, index) => (
              <Col key={index} className='gutter-row'>
                <div style={{ ...gridStyle, padding: 0, width: '100%' }}>
                  <AnchorLink
                    href={`#${child.trim().replace(/\s+/g, '-')}`}
                    title={
                      <Button type='primary' style={{ width: '100%' }}>
                        {child}
                      </Button>
                    }
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Anchor>
      </Affix>
    )
  }

  return renderGridContent()
}

CategoryGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
  gridStyle: PropTypes.object,
  toRenderView: PropTypes.bool,
  viewPath: PropTypes.string,
  isSticky: PropTypes.bool,
  dataWithIcons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element,
      title: PropTypes.string,
      description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
}

CategoryGrid.defaultProps = {
  gridStyle: { width: '25%', textAlign: 'center', cursor: 'pointer' },
  toRenderView: true,
  viewPath: '',
  isSticky: false,
  dataWithIcons: [],
}

export default CategoryGrid
