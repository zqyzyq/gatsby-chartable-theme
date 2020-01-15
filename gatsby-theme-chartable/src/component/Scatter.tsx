import React from 'react'

import { ComponentArgs } from './interface'

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  TickFormatterFunction,
  Legend,
  Tooltip,
  CartesianGrid,
  Label,
  TooltipProps
} from 'recharts'
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent'
import { scaleLog } from 'd3-scale'

const scale = scaleLog().base(10)

const tickCount = 10
const generator = (n: number) => {
  let values: number[] = [100]
  for (let i = 0; i < n; i++) {
    values.push(values[i] * 10)
  }
  return values.slice(1)
}

const log10ScaledAxisTickValue = generator(tickCount - 1)

const log10ScaledAxisTick = ['1k', '10k', '100k', '1m', '10m', '100m', '1b', '10b', '100b']

const renderScaledTick: TickFormatterFunction = value => {
  const tick = Math.log10(value) - 3
  if (tick > log10ScaledAxisTick.length) {
    return value
  }
  return log10ScaledAxisTick[tick]
}

const CustomTooltip = (props: TooltipProps) => {
  // payload[0] doesn't exist when tooltip isn't visible
  if (props.active) {
    // mutating props directly is against react's conventions
    // so we create a new payload with the name and value fields set to what we want
    const newPayload = [
      {
        name: 'API',
        // all your data which created the tooltip is located in the .payload property
        value: props.payload[0].payload.callee
        // you can also add "unit" here if you need it
      },
      ...props.payload
    ]

    // we render the default, but with our overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />
  }

  // we just render the default
  return <DefaultTooltipContent {...props} />
}

export default class ScatterPlot extends React.Component<ComponentArgs> {
  render() {
    const { data } = this.props.args

    return (
      <ResponsiveContainer width={750} height={250}>
        <ScatterChart margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="ok_rate">
            <Label angle={-90} value="OK RATE" position="insideLeft" offset={10} fontSize={14} />
          </YAxis>
          <XAxis
            dataKey="SUM_qps_"
            type="number"
            domain={[1000, 1000000000000]}
            scale={scale}
            ticks={log10ScaledAxisTickValue}
            tickFormatter={renderScaledTick}
            tick={{ angle: -15 }}
            name="请求次数"
            label={{ value: '请求次数', position: 'insideBottomRight', offset: -15 }}
          />
          <Scatter name="Rest API" data={data} fill="#8884d8" />
          <Legend />
          <Tooltip content={CustomTooltip} />
        </ScatterChart>
      </ResponsiveContainer>
    )
  }
}
