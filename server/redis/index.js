// /* eslint-disable max-len */
const redis = require('redis');

const redisPort = 6379;
const client = redis.createClient(redisPort);

// log error to the console if any occurs
client.on('error', (err) => {
  console.log(err);
});

client.ping(function(err, result) {
  console.log(result, 'from redis');
});

module.exports = client;
