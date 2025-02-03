module.exports = {
  client: {
    service: {
      name: 'federation-practice',
      localSchemaFile: '../servers/router/superschema.graphql'
    },
    includes: ['src/**/*.{ts,tsx,graphql}']
  }
}
