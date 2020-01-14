const path = require('path')

/**
 * 这里是构造页面的职责和逻辑实现，不关心数据来源，但要为每一组数据以组件为最小单位拼装页面。
 *
 * 支持定义组件顺序和大小比例。
 * [
 *   {
 *      title,
 *      componentSortedList: [{
 *        component,
 *        args: {...}
 *      }...]
 *      queryTimestamp,
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
          title
          date
        }
      }
    }
  `)
  if (result.errors) {
    console.log('Failed on creating pages. Errors: ', result.errors)
    return
  }

  const {
    allChartableInput: { nodes: pages }
  } = result.data

  pages.map((page, idx) => {
    console.log(`http://localhost:8000/${page.title}/${page.date}`)
    createPage({
      component: template,
      path: `/${page.title}/${page.date}`,
      context: {
        id: page.id
      }
    })
  })
}

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()

  const coreJs2config = config.resolve.alias['core-js']
  delete config.resolve.alias['core-js']
  config.resolve.alias[`core-js/modules`] = `${coreJs2config}/modules`
  try {
    config.resolve.alias[`core-js/es`] = path.dirname(require.resolve('core-js/es'))
  } catch (err) {}
  actions.replaceWebpackConfig(config)
  actions.setWebpackConfig({
    resolve: {
      // It's important to have 'node_modules' in resolve module,
      // otherwise the webpack resolve won't be able to find dependencies
      // correctly.
      modules: ['node_modules']
    }
  })
}
