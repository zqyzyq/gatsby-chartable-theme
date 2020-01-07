const path = require('path')

/**
 * 这里是构造页面的职责和逻辑实现，不关心数据来源，但要为每一组数据创建一个页面。
 *
 * 以组件为最小单位拼装页面，支持定义组件顺序和大小比例。
 * [
 *   {
 *      Title,
 *      ComponentSortedList: [{
 *        Component,
 *        Args: {...}
 *      }...]
 *      QueryTimestamp,
 *   }
 * ]
 * Gatsby创建web页面的API
 **/
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const template = path.resolve(path.join(__dirname, `src/template/Default.tsx`))

  const result = await graphql(`
    {
      allChartableInput {
        nodes {
          id
          componentSortedList {
            component
          }
          date
        }
      }
    }
  `)
  if (result.errors) {
    console.log('Failed on creating pages. Errors: ', result.errors)
    return
  }

  console.log('Creating pages...................')

  const {
    allChartableInput: { nodes: pages }
  } = result.data

  pages.map((page, idx) => {
    console.log(`${page.id}`)
    createPage({
      component: template,
      path: `/ok-rate?type=${page.id}&date=`
    })
  })
}
