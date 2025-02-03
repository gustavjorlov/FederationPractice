module.exports = {
  client: {
    service: {
      name: 'federation-practice',
      localSchemaFile: '../router/superschema.graphql'
    },
    includes: ['src/**/*.{ts,tsx,graphql}']
  }
}
