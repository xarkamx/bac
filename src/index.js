const fastifyAutoload = require('@fastify/autoload');
const path = require('path');

async function app (fastify, opts) {
  console.log('app', path.join(__dirname, 'plugins'))
  fastify.register(fastifyAutoload, {
    dir: path.join(__dirname, 'plugins'),
    options: opts
  })

  fastify.register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes'),
    options: opts
  })
}

module.exports = app;