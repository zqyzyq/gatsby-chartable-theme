import React from 'react'
import { graphql } from 'gatsby'

interface Props {
  data: object
}

export default class Default extends React.Component {
  constructor(props: any) {
    super(props)
    console.log('构造默认主题页:', props)
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
