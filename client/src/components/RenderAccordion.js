import React from 'react'
import { Collapse, Progress } from 'antd'
import PropTypes from 'prop-types'

const { Panel } = Collapse

const RenderAccordion = ({ data, accordion = true }) => {
  return (
    <Collapse accordion={accordion}>
      {data.map((item, index) => (
        <Panel header={item.condition} key={index} style={{ padding: '10px' }}>
          <Progress
            percent={item.frequency}
            format={() => item.frequencyLabel}
          />
          <p>{item.description}</p>
        </Panel>
      ))}
    </Collapse>
  )
}

RenderAccordion.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.string.isRequired,
      frequency: PropTypes.number.isRequired,
      frequencyLabel: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  accordion: PropTypes.bool,
}

export default RenderAccordion
