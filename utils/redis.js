const redis = require('redis');

const client = redis.createClient({
    password: "MLTWIwkPtKqAGbJECFzoE0LUW6zNqyaJ",
    socket: {
        host: "redis-10083.c301.ap-south-1-1.ec2.cloud.redislabs.com",
        port: 10083,
    },
});

client.connect()
    .then(() => {
        console.log('Redis connected')
    })
    .catch((err) => {
        console.log(err.message)
    })

module.exports=client;