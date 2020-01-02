const fs = require('fs').promises
const path = require('path')

exports.sourceNodes = async ({ actions }) => {
  console.log('Gatsby invoking example sourceNodes.')

  const { createNode } = actions
  const rawData = await fs.readFile(path.resolve('./data.json'), 'utf-8')
  const data = JSON.parse(rawData)

  //   data.forEach(datum => createNode(processDatum(datum)))
  let today = new Date()
  let yesterday = new Date().setDate(today.getDate() - 1)
  data.data.data.map((datum, idx) => {
    console.log(datum)
    createNode({
      id: idx.toString(),
      internal: {
        type: 'json',
        contentDigest: 'ok rate metrics'
      },
      ...datum
    })
  })
}
