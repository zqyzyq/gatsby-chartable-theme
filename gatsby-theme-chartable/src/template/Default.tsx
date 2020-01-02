import React from 'react'
import { graphql } from 'gatsby'

interface Props {
  data: object
}

export class Default extends React.Component {
  constructor(props: Props) {
    super(props)
    console.log(props)
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
