const Redis = require("ioredis")
const redis = new Redis({
  sentinels: [
    { host: "10.0.0.162" },
    { host: "10.0.0.82" },
    { host: "10.0.0.245" },
  ],
  name: "redis-primary",
});

module.exports = redis
