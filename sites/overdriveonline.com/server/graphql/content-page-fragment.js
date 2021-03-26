const gql = require('graphql-tag');

module.exports = gql`

fragment ContentPageFragment on Content {
  id
  name
  images(input:{ pagination: { limit: 0 }, sort: { order: values } }) {
    edges {
      node {
        id
        src(input: { options: { auto: "format,compress", q: 70 } })
        alt
        caption
        credit
      }
    }
  }
}

`;
