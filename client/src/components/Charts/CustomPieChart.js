import React from 'react'
import { VictoryPie, VictoryTooltip, VictoryTheme } from 'victory'
import { Card } from 'antd'

const CustomPieChart = ({
  title,
  data,
  colorScale = 'qualitative',
  width = 400,
  height = 400,
  labelRadius = 50,
  style = { labels: { fontSize: 14, fill: 'black' } },
}) => {
  return (
    <Card
      style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <h3>{title}</h3>
      {data.length > 0 ? (
        <VictoryPie
          data={data}
          colorScale={colorScale}
          theme={VictoryTheme.material}
          labelRadius={labelRadius}
          style={style}
          width={width}
          height={height}
          labels={({ datum }) => datum.label}
          labelComponent={<VictoryTooltip />}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </Card>
  )
}

export default CustomPieChart
