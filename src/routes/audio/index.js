const { NodeAudioVolumeMixer } = require('node-audio-volume-mixer');

async function getSessions (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              title: { type: 'string' },
              volume: { type: 'number' }
            }
          }
        }
      }
    },
    handler: async (request, reply) => {
      const audioSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
      const vols = audioSessions.map(session => ({
        id: session.pid,
        title: session.name,
        volume: NodeAudioVolumeMixer.getAudioSessionVolumeLevelScalar(session.pid),
      }));
      return vols;
    }
  })
  fastify.route({
    method: 'POST',
    url: '/:id',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            volume: { type: 'number' }
          }
        }
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { volume } = request.query;

      console.log('Setting volume for session', id, 'to', volume);
      NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(parseInt(id), parseFloat(volume));
      const session = NodeAudioVolumeMixer.getAudioSessionProcesses().find(session => session.pid === parseInt(id));
      return {
        id: session.pid,
        title: session.name,
        volume: NodeAudioVolumeMixer.getAudioSessionVolumeLevelScalar(session.pid),
      }
    }
  })
}

module.exports = getSessions;