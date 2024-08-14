import React from 'react'
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTooltip,
  VictoryTheme,
} from 'victory'
import { Card } from 'antd'

const CustomBarChart = ({
  title,
  data,
  xKey = 'month',
  yKey = (datum) => datum.doctors + datum.patients,
  color = '#4c72b0',
  height = 250,
  padding = { top: 20, bottom: 50, left: 50, right: 50 },
}) => {
  return (
    <Card title={title}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        height={height}
        padding={padding}>
        <VictoryAxis
          tickFormat={data.map((item) => item[xKey])}
          style={{ tickLabels: { fontSize: 10, angle: -45 } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `${x}`}
          style={{ tickLabels: { fontSize: 10 } }}
        />
        <VictoryBar
          data={data}
          x={xKey}
          y={yKey}
          labels={({ datum }) =>
            `Doctors: ${datum.doctors}, Patients: ${datum.patients}`
          }
          labelComponent={<VictoryTooltip />}
          style={{
            data: { fill: color },
          }}
        />
      </VictoryChart>
    </Card>
  )
}

export default CustomBarChart
