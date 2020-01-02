const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const template = path.resolve(path.join(__dirname, `src/template/default.tsx`))

  //   const result = await graphql(``)
  //   if (result.errors) {
  //     console.log('Failed on creating pages. Errors: ', result.errors)
  //     return
  //   }

  console.log('Creating pages...................')
  createPage({
    component: template,
    path: '/path/to/report'
  })
}
