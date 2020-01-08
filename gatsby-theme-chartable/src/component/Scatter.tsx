import React from 'react'

import { ComponentArgs } from './interface'

import { ResponsiveContainer, ScatterChart, Scatter, Cell, XAxis, YAxis } from 'recharts'
import { scaleLog } from 'd3-scale'

const scale = scaleLog().base(Math.LN10)

export default class ScatterPlot extends React.Component<ComponentArgs> {
  render() {
    const { width, height, data } = this.props.args

    return (
      <ResponsiveContainer>
        <ScatterChart data={data}>
          <XAxis scale={scale} dataKey={1} />
          <YAxis scale={scale} dataKey={2} />
        </ScatterChart>
      </ResponsiveContainer>
    )
  }
}
