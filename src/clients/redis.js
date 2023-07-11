import Redis from "ioredis";
const redis = new Redis({
    port: 17458,
    host: "redis-17458.c16.us-east-1-3.ec2.cloud.redislabs.com",
    password: "CBlEfyXsr7pq8TSR4wPgxkB5jMVkG6xi",
});

export default redis;