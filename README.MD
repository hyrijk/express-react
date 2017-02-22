express + react 前后端分离练习

`client` 为前端代码，使用了 React、React Router、Redux 和 Material-UI  
`server` 为 Express 后端代码，使用 MongoDB

---

### 部署说明

先部署后端，再部署前端

#### 后端

1. 跳转到 `server` 目录，修改配置文件   
    ```
    $ cp config.default.js config.js
    $ vi config.js
    ```

2. 运行
    ```
    $ npm install
    $ node index.js
    ```

#### 前端

1. 跳转到 `client` 目录，修改配置文件
    ```
    $ vi setting.js
    ```
2. 运行
    ```
    $ npm install
    $ npm start
    ```