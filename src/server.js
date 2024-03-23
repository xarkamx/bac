const fastify = require('fastify')

const app = fastify({
  logger: true
})
app.register(require('./index.js'))
app.listen({
  port: 3000,
  host: process.env.SERVER_HOSTNAME ?? "127.0.0.1"
})

app.ready((err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`server listening}`)
})

module.exports = app