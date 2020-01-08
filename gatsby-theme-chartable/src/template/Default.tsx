import React, { ComponentType } from 'react'
import { graphql } from 'gatsby'

import Scatter from '../component/Scatter'
import style from './default.module.less'

import { ComponentArgs } from '../component/interface'

interface ComponentSpec extends ComponentArgs {
  component: String
}
interface chartableInput {
  componentSortedList: Array<ComponentSpec>
  title: String
  date: String
}

interface Props {
  data: {
    chartableInput: chartableInput
  }
}

export default class Default extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { componentSortedList: components, title, date } = this.props.data.chartableInput

    const componentDOM = components.map(({ component: componentName, args }, idx) => {
      console.log('Render component with', args)
      switch (componentName) {
        case 'Scatter':
          return <Scatter args={args} key={idx.toString()} />
      }
    })

    return (
      <React.Fragment>
        {/* <div className={style.header}>{title}</div> */}
        {componentDOM}
      </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
  query($id: String) {
    chartableInput(id: { eq: $id }) {
      componentSortedList {
        component
      }
      title
      date
    }
  }
`
