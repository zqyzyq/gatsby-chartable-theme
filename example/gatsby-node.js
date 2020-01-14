const fs = require('fs').promises
const path = require('path')

exports.sourceNodes = async ({ actions }) => {
  console.log('Gatsby invoking example sourceNodes.')

  const { createNode } = actions
  const rawData = await fs.readFile(path.resolve('./data.json'), 'utf-8')
  const data = JSON.parse(rawData)

  //   data.forEach(datum => createNode(processDatum(datum)))
  let today = new Date()
  let yesterday = new Date(today.setDate(today.getDate() - 1))
  console.log(yesterday.toISOString())
  let yy = yesterday.getFullYear()
  let mm = yesterday.getMonth() + 1
  let dd = yesterday.getDate()
  let originData = data.data.data
  let title = 'RestAPI服务质量日表'

  createNode({
    id: `${title}@${yy}-${mm}-${dd}`,
    internal: {
      type: 'chartableInput',
      contentDigest: '符合chartable格式的数据'
    },
    componentSortedList: [
      {
        component: 'Scatter',
        args: {
          width: 600
        }
      }
    ],
    title: title,
    date: `${yy}-${mm}-${dd}`
  })
}
