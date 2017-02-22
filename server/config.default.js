module.exports = {
  port: 4000,             // 服务运行端口
  secret: 'hand-in-hand', // JWT token 密钥
  mongodb: {              
    host: 'localhost',
    port: 27017,
    database: 'react-hand-in-hand'
  }
}
